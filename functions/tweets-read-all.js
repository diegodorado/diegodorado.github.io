require('dotenv').config()
const faunadb = require('faunadb')

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = (event, context) => {
  return client.query(q.Paginate(q.Match(q.Ref('indexes/all_tweets'))))
    .then((response) => {
      // create new query out of todo refs. http://bit.ly/2LG3MLg
      const getAllDataQuery = response.data.map((ref) => {
        return q.Get(ref)
      })
      // then query the refs
      return client.query(getAllDataQuery).then((ret) => {
        const data = ret.map((i) => i.data)
        return {
          statusCode: 200,
          body: JSON.stringify(data)
        }
      })
    }).catch((error) => {
      console.log('error', error)
      return {
        statusCode: 400,
        body: JSON.stringify(error)
      }
    })
}
