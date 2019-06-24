import React from "react"
import Layout from "../../layouts/live-emojing"
import SEO from "../../components/seo"
import Playground from '../../components/live-emojing/playground'

/*
import Nick from '../../components/live-emojing/nick'
import simpleDDP from 'simpleddp'
import ws from 'isomorphic-ws'

const opts = {
    endpoint: "ws://av.thundernize.com/websocket",
    SocketConstructor: ws,
    reconnectInterval: 5000
}
*/

class LiveEmojingIndex extends React.Component {
  constructor(props){
    super(props);

    const parts = props.location.hash.split('#')
    const pattern = (parts.length >1) ? decodeURIComponent(parts[1]) : ''

    this.state = {
      connected: false,
      lastMsg: '',
      nick: '',
      pattern: pattern
    }
  }

  componentDidMount(){
    //this.ddp = new simpleDDP(opts);
    //this.ddp.on('connected', () => this.setState({connected: true}))
    //this.ddp.on('disconnected', () => this.setState({connected: false}))
  }

  onCommitPattern = (pattern) => {
    //this.ddp.call('emojis.send', 'dft', this.state.nick, pattern)
  }

  render() {
    return (
      <Layout location={this.props.location} >
        <SEO title="live emojing" />
        <div>
          {//<Nick onChanged={(nick)=>{this.setState({nick:nick})} } connected={this.state.connected}/>
          }
          <Playground pattern={this.state.pattern} onCommit={this.onCommitPattern}/>
        </div>
      </Layout>
    )
  }
}

export default LiveEmojingIndex
