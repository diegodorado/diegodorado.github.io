import React from "react"
import Layout from "../components/le-layout"
import SEO from "../components/seo"
import Connection from '../components/live-emojing/connection'
import Nick from '../components/live-emojing/nick'
import Playground from '../components/live-emojing/playground'


class LiveEmojingIndex extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      readyState: 0,
      lastMsg: '',
      nick: '',
    }
  }

  tryConnection = (state) => {
    console.log(state)
    //todo: close connection if open already
    this.client = new WebSocket(`ws://${state.host}:${state.port}`)

    this.client.onopen =  () => {
      this.setState({readyState: this.client.readyState});
    }
    this.client.onerror = () => {
      this.setState({readyState: this.client.readyState});
    }

    this.client.onmessage = (msg) => {
      this.setState({readyState: this.client.readyState});
      console.log(msg)
    }

    this.client.onclose =  ()=> {
      this.setState({readyState: this.client.readyState});
    }

  }

  closeConnection = () => {
    this.client.close()
  }


  onCommitPattern = (pattern) => {
    const data = JSON.stringify({
      user_id: null,
      who: this.state.nick,
      text: pattern
    })
    this.client.send(data)
  }

  render() {

    const connected = (this.state.readyState === 3)//WebSocket.OPEN)
    const play = connected && this.state.nick!==''

    return (
      <Layout location={this.props.location} >
        <SEO title="live emojing" />
        <div>
          <Connection tryConnection={this.tryConnection}  closeConnection={this.closeConnection} connected={connected}/>
          <Nick onChanged={(nick)=>{this.setState({nick:nick})} } connected={connected}/>
          {(play ? <Playground onCommit={this.onCommitPattern}/> : null)}
        </div>
      </Layout>
    )
  }
}

export default LiveEmojingIndex
