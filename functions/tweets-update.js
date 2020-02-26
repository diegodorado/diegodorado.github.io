require('dotenv').config()
const faunadb = require('faunadb')
const Twitter = require('twitter')


const q = faunadb.query
const fclient = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})


var tclient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

exports.handler = async (event, context) => {

  const query = {q: '#emojis', include_entities:false, count:100}

  try {
    const tid = await fclient.query(
      q.Max(q.Match(q.Index('tweet_ids')))
    )
    query.since_id = tid
  }catch(e) {
    console.log(e);
  }

  const data = await tclient.get('search/tweets', query)

  const tweets = data.statuses.map(t =>{
    return {
      tweetId: t.id_str,
      text: t.text,
      user: t.user.screen_name
    }
  })

  if(tweets.length>0){
    const ret = await fclient.query(
      q.Map(tweets,
        q.Lambda('data',q.Create(q.Collection('tweets'),{ data: q.Var('data')}))
      )
    )

    //post some tweets
    for (let r of ret) {
      const t = r.data
      const status = `@${t.user} said ${t.text}`
      await tclient.post('statuses/update', {status})
    }

    return {
      statusCode: 200,
      body: JSON.stringify({msg:`${tweets.length} new tweets`})
    }

  }else{
    return {
      statusCode: 200,
      body: JSON.stringify({msg:'No new twweets.'})
    }
  }

}
