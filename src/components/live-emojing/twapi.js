
const faunadb = require('faunadb')
const FAUNADB_SERVER_SECRET = 'fnADlltZ2tACE44l04ZbDuyG_pEISSFtsdx4HiFV'
const q = faunadb.query
const client = new faunadb.Client({secret: FAUNADB_SERVER_SECRET})

const readAll = async () => {

  const result = await client.query(q.Paginate(q.Match(q.Index('tweets_descending'))))
  return result.data

  // const response = await fetch('/.netlify/functions/tweets-read-all')
  // return response.json()
}

export default {
  readAll: readAll
}
