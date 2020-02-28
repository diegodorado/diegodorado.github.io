require('dotenv').config()
const faunadb = require('faunadb')
const Twitter = require('twitter')
const GraphemeSplitter = require('grapheme-splitter')

const emojiRgx = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/
const splitter = new GraphemeSplitter()

const q = faunadb.query
const fclient = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

var tclient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

var stream = tclient.stream('statuses/filter', {track: '#emojis'});
stream.on('data', (t)=> {
  if(!t)
    return

  if(t.user.screen_name===process.env.TWITTER_SCREEN_NAME)
    return

  const emojis  = splitter
    .splitGraphemes(t.text)
    .filter(g=> g!=='…' && emojiRgx.test(g))

  if(emojis.length<2)
    return

  processDoc({
    emojis: emojis.join(''),
    tweetId: t.id_str,
    text: t.text,
    user: t.user.screen_name
  })

})

stream.on('error', function(error) {
  console.log(error)
  throw error;
})


const processDoc = async (doc)=>{
  console.log(doc)

  const ret = await fclient.query(
    q.Create(q.Collection('tweets'),{ data: doc})
  )
  console.log(ret)

  const status = `Así suenan los emojis de este tweet:`+
    `${doc.emojis} ` +
    `https://diegodorado.com/es/tw/#${doc.tweetId} ` +
    `https://twitter.com/${doc.user}/status/${doc.tweetId} `
  await tclient.post('statuses/update', {status})

}
