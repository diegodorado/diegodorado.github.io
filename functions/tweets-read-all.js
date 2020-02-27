require('dotenv').config()
const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = async (event, context) => {
  try {
    const result = await client.query(q.Paginate(q.Match(q.Index('tweet_array'))))
    return {statusCode: 200,body: JSON.stringify(result.data)}
  } catch (e) {
    console.log('error', error)
    return {statusCode: 400,body: JSON.stringify(error)}
  }
}
