import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"


const Footer = () => {
  const data = useStaticQuery(graphql`
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
  `)
  const [quote, setQuote] = useState(data.allQuotesJson.edges[0].node)

  useEffect(() => {
    const rand = Math.random()
    const quotes = data.allQuotesJson.edges
    setQuote(quotes[Math.floor(rand*quotes.length)].node)
  })


  return (
    <footer>
      <table>
        <tbody>
          <tr><td><cite>{quote.quote}</cite></td></tr>
          <tr><td><span>{quote.author}</span></td></tr>
        </tbody>
      </table>
    </footer>)
}

export default Footer
