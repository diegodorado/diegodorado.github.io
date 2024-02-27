import React from "react"
import Layout from "../../layouts/main"
import SEO from "../../components/seo"
import TicTacToe from "../../components/tictactoe/TicTacToe"


class TicTacToeIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location} >
        <SEO title="ta te ti" />
        <TicTacToe />
      </Layout>
    )
  }
}

export default TicTacToeIndex
