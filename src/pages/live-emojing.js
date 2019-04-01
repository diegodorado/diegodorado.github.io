import React from "react"
import Layout from "../components/le-layout"
import SEO from "../components/seo"
import Nick from '../components/live-emojing/nick'
import Playground from '../components/live-emojing/playground'
import simpleDDP from 'simpleddp'
import ws from 'isomorphic-ws'

const opts = {
    endpoint: "ws://av.thundernize.com/websocket",
    SocketConstructor: ws,
    reconnectInterval: 5000
}


class LiveEmojingIndex extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      connected: false,
      lastMsg: '',
      nick: '',
    }
  }


  componentDidMount(){
    this.ddp = new simpleDDP(opts);

    (async ()=>{

      console.log('connecting...');
      await this.ddp.connect();
      console.log('connected');

      console.log('subscribing...');
      let sub = this.ddp.subscribe('emojis.all','dft')

      await sub.ready();
      console.log('ready');

      this.ddp.collection('emojis').onChange((data)=>{
        const next = data.changed.next
        console.log(next.pattern)
      })

    })();


    this.ddp.on('connected', () => {
      this.setState({connected: true});
    })

    this.ddp.on('disconnected', () => {
      console.log('// for example show alert to user')
      this.setState({connected: false});
    })

  }

  onCommitPattern = (pattern) => {
    this.ddp.call('emojis.send', 'dft', this.state.nick, pattern)
  }

  render() {

    const play = this.state.connected && this.state.nick!==''

    return (
      <Layout location={this.props.location} >
        <SEO title="live emojing" />
        <div>
          <Nick onChanged={(nick)=>{this.setState({nick:nick})} } connected={this.state.connected}/>
          {(play ? <Playground onCommit={this.onCommitPattern}/> : null)}
        </div>
      </Layout>
    )
  }
}

export default LiveEmojingIndex
