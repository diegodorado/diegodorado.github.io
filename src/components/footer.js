import React from "react"
import { StaticQuery, graphql } from "gatsby"

const rand = Math.random()

const Footer = ({ data }) => {
  const quotes = data.allQuotesJson.edges
  const quote = quotes[Math.floor(rand*quotes.length)].node
  return (
  <footer>
    <table>
      <tbody>
        <tr><td><cite>{quote.quote}</cite></td></tr>
        <tr><td><span>{quote.author}</span></td></tr>
      </tbody>
    </table>
  </footer>
)}

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allQuotesJson {
          edges {
            node {
              author:_0
              quote:_1
            }
          }
        }
      }
    `}
    render={data => <Footer data={data} {...props} />}
  />
)
