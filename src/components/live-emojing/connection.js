import React from "react"
import PropTypes from 'prop-types'
import {reactLocalStorage} from 'reactjs-localstorage'
import simpleDDP from 'simpleddp'
import ws from 'isomorphic-ws'

const opts = {
    endpoint: "ws://localhost:3000/websocket",
    SocketConstructor: ws,
    reconnectInterval: 5000
}


class Connection extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      tried: false,
      connected: false,
      host: '127.0.0.1',
      port: 1337,
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.connected !== this.props.connected){
      this.setState({connected:nextProps.connected});
    }

  }

  componentDidMount(){
    let host = reactLocalStorage.get('ws-host', '')
    if(host!==''){
      const url = window.location.ancestorOrigins[0]
      if(url){
        const match = url.match(/:\/\/(.*)[:|$]/)
        if(match)
          host = match[1]
      }
    }
    if(host==='')
      host = '127.0.0.1'
    const port = 1337 //reactLocalStorage.get('ws-port', '1337')
    // /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/.test(window.location.host)
    this.setState({host: host, port: port})
    this.props.tryConnection(this.state);

    const ddp = new simpleDDP(opts);


    (async ()=>{

      console.log('connecting...');
      await ddp.connect();
      console.log('connected');

      console.log('subscribing...');
      let sub = ddp.subscribe('emojis.all','dft')

      await sub.ready();
      console.log('ready');

      ddp.collection('emojis').onChange((data)=>{
        const next = data.changed.next
        console.log(next.pattern)
      })

    })();


    ddp.on('connected', () => {
      console.log('// do something')
    })

    ddp.on('disconnected', () => {
      console.log('// for example show alert to user')
    })



  }


  onChangeHost = (e) => {
    this.setState({host: e.target.value});
    if(e.target.validity.valid){
      reactLocalStorage.set('ws-host', e.target.value)
    }
  }

  onChangePort = (e) => {
    this.setState({port: e.target.value});
    if(e.target.validity.valid){
      reactLocalStorage.set('ws-port', e.target.value)
    }
  }

  onConnectClick = (e) => {
    e.preventDefault()
    this.props.tryConnection(this.state);
    this.setState({tried: true})
  }

  onCloseConnectionClick = (e) => {
    e.preventDefault()
    this.props.closeConnection()
    this.setState({tried: false})
  }

  render() {
    let msg = 'Connect to Live Emojing. If you are running Atom on the same machine you are viewing this page, default settings should work.'

    if(this.state.tried){
      msg = 'Failed to connect. Are HOST and PORT correct? Is Live Emojing up and running in Atom?'
    }

    let connection

    if (this.state.connected) {
      connection =  (
          <p>
            Connected to {this.state.host}:{this.state.port}. <em><a href="/" onClick={this.onCloseConnectionClick}>Disconnect</a></em>
          </p>
      )
    }else{
      connection = (
        <div>
          <p>{msg}</p>
          <label>Host:</label>
          <input type="text" value={this.state.host} onChange={this.onChangeHost} pattern="^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$" required/>
          <br/><br/>
          <label>Port:</label>
          <input type="number" value="1" min="10" max="65535" value={this.state.port} onChange={this.onChangePort} required disabled />
          <br/><br/>
          <button onClick={this.onConnectClick}>Connect</button>
          <br/><br/>
        </div>
      )

    }

    return (
      <div className="setup">
          {connection}
      </div>
    )
  }
}

//And don't forget that the child will need this function declared in its propTypes:

Connection.propTypes = {
  tryConnection: PropTypes.func.isRequired,
  closeConnection: PropTypes.func.isRequired,
  connected: PropTypes.bool.isRequired,
};

export default Connection
