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

createFaunaDB(process.env.FAUNADB_SERVER_SECRET).then(() => {
  console.log('Database created')
})

/* idempotent operation */
function createFaunaDB(key) {
  console.log('Create the database!')
  const client = new faunadb.Client({ secret: key });

  /* Based on your requirements, change the schema here */
  return client.query(q.Create(q.Ref("classes"), { name: "tweets" }))
    .then(()=>{
      return client.query(
        q.Create(q.Ref("indexes"), {
          name: "all_tweets",
          source: q.Ref("classes/tweets")
        }))
    }).catch((e) => {
      // Database already exists
      if (e.requestResult.statusCode === 400 && e.message === 'instance not unique') {
        console.log('DB already exists')
        throw e
      }
    })
}
