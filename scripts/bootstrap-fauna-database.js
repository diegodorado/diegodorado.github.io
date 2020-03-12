require('dotenv').config()
const faunadb = require('faunadb')
const chalk = require('chalk')
const q = faunadb.query

console.log(chalk.cyan('Creating your FaunaDB Database...\n'))

// 1. Check for required enviroment variables
if (!process.env.FAUNADB_SERVER_SECRET) {
  console.log(chalk.yellow('Required FAUNADB_SERVER_SECRET enviroment variable not found.'))
  console.log(`Visit https://app.netlify.com/sites/YOUR_SITE_HERE/settings/deploys`)
  console.log('and set a `FAUNADB_SERVER_SECRET` value in the "Build environment variables" section')
  process.exit(1)
}


/* idempotent operation */
const createFaunaDB = async (key) => {
  console.log('Create the database!')
  const fclient = new faunadb.Client({ secret: key });

  await fclient.query(q.Create(q.Ref("classes"), { name: "tweets" }))
  await fclient.query(q.Create(q.Ref("indexes"), { name: "all_tweets",source: q.Ref("classes/tweets")}))
  await fclient.query(q.Create(q.Ref("indexes"), {
    name: "tweet_ids",
    unique: true,
    serialized: true,
    source: q.Ref("classes/tweets"),
    values: [
      {field: ["data", "tweetId"]}
    ]
  }))

  await fclient.query(q.Create(q.Ref("indexes"), {
    name: "tweet_descending",
    source: q.Ref("classes/tweets"),
    values: [
      {field: ["data", "tweetId",reverse: true]},
      {field: ["data", "user"]},
      {field: ["data", "text"]}
    ]
  }))

}

createFaunaDB(process.env.FAUNADB_SERVER_SECRET).then(() => {
  console.log('Database created')
})
