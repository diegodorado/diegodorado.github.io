import React from "react"
import Layout from "../../layouts/fmtribe"
import SEO from "../../components/seo"
import Helmet from "react-helmet"
import Brand from "../../components/header/brand"
import { FaTimesCircle,
        } from 'react-icons/fa'


class FMTribeIndex extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tab: 0,
      loaded: false,
      started: false,
    }
  }

  componentDidMount(){
  }


  componentWillUnmount(){
    console.log('unmount')
    if(this.ci){
      console.log('exit')
      this.ci.exit()
    }
  }

  onChangeClientState = (newState, addedTags) => {
    if (addedTags.scriptTags) {
        const scriptTag = addedTags.scriptTags[0];
        scriptTag.onload = this.handleOnLoad;
    }
  }

  handleOnLoad = () => {
    const Dos = window.Dos
    const options = {
      onprogress: (stage, total, loaded) => {},
      log: (msg) => {},
      wdosboxUrl: '/fmtribe/wdosbox.js'
    }
    Dos(this.refs.canvas, options).ready((fs, main) => {
      fs.extract('/fmtribe/fmtribe.zip').then(() => {
        this.main = main
        this.setState({loaded:true})
      })
    })
  }

  onStartClick = (e) => {
    this.main(["-c", "FMTRIBE.EXE"]).then((ci) => {
      this.ci = ci
    })
    this.setState({started: true})
    //document.title = "FMTRIBE by @munshkr"
  }

  onReturnClick = (e) => {
    this.ci.exit()
    this.handleOnLoad()
    this.setState({loaded: false, started: false})
  }


  render() {
    return (
      <Layout location={this.props.location} >
        <Helmet onChangeClientState={this.onChangeClientState} script={[{"src": "/fmtribe/js-dos.js", "type": "text/javascript"}]} />
        {this.state.started && <FaTimesCircle className="return" onClick={this.onReturnClick}/>}
        {!this.state.started && <header>
          <Brand title="fm tribe" swaps={[['f','F'],['m','w'],['i','1'],['e','3'],['b','B']]}/>
        </header>}
        <SEO title="fm tribe by @munshkr" />
        <div className={`${this.state.started? 'loaded':''} canvas-wrapper`}>
          <canvas ref="canvas"></canvas>
        </div>

        {!this.state.started && <div id="info" className="usage">
          <p>FMTribe by is an OPL3 synth/drum machine/thingie focused on live jamming for DOS.
          <br/>
          Developed by <a href="https://github.com/munshkr" target="_blank" rel="noopener noreferrer">munshkr</a> and brought to the browser thanks to <a href="https://js-dos.com/" target="_blank" rel="noopener noreferrer">js-dos</a>.
          Checkout <a href="https://github.com/munshkr/fmtribe" target="_blank" rel="noopener noreferrer">fmtribe sources</a>.</p>
          <nav>
            <span onClick={()=> this.setState({tab:0})} >Usage</span>
            <span onClick={()=> this.setState({tab:1})} >Step Sequencer</span>
            <span onClick={()=> this.setState({tab:2})} >Instrument Editor</span>
          </nav>
          {(this.state.tab===0) && <div>
            <ul>
              <li><code>Esc</code>: Exit</li>
              <li><code>F5</code>: Play / pause</li>
              <li><code>F7</code>: Stop after bar (2 times, stop immeadiately)</li>
              <li><code>F9</code>: Tap tempo</li>
              <li><code>Shift</code> + <code>F9</code>: Toggle metronome</li>
              <li><code>F10</code>: Toggle "follow cursor"</li>
              <li><code>Left</code>: Move to previous frame</li>
              <li><code>Right</code>: Move to next frame</li>
              <li><code>Up</code>: Move to previous channel</li>
              <li><code>Down</code>: Move to next channel</li>
              <li><code>Del</code>: Clear pattern for current channel</li>
              <li><code>Ctrl</code> + <code>Del</code>: Clear pattern for all channels</li>
              <li><code>Tab</code>: Switch instrument editor for the current channel</li>
              <li><code>M</code>: Toggle "apply step changes to all frames"</li>
              <li><code>P</code>: Toggle "play channel instrument"</li>
              <li><code>Z</code>: Toggle "record steps"</li>
              <li><code>Alt</code> + Number: Mute/unmute channel</li>
            </ul>
          </div>}
          {(this.state.tab===1) && <div>
            <p>To toggle a step in the pattern of the 16-step sequencer, use the keys:</p>
            <pre>
              <code>
              {`Q W E R T Y U I\nA S D F G H J K`}
              </code>
            </pre>
            <p>To select one of the eight channels, use keys 1 through 8.
              You can mute a channel anytime using <code>Alt</code> + NumberKey.</p>
            <p>Press <code>Alt</code> + StepKey to define microsteps (upto 3 for now).</p>
          </div>}
          {(this.state.tab===2) && <div>
            <p>To customize the parameters of an instrument, press the Tab key, select a field
              and change its value. The parameters will update automatically if the step
              sequencer is playing.</p>
            <ul>
              <li><code>Left</code>/<code>Right</code>: Increase/decrease value for the current field</li>
              <li><code>Up</code>/<code>Down</code>: Move between parameter fields</li>
            </ul>
            <p>Also, you can still change channels with the numbers from the instrument
              editor.</p>
            <p>To change the base note of the instrument, use the keys:</p>
            <pre>
              <code>
              {`W   E       T   Y   U \nA   S   D   F   G   H   J`}
              </code>
            </pre>
            <p>as in a keyboard of one octave. To change the base octave, use     <code>PageUp</code>/<code>PageDown</code>.</p>
          </div>}
          {this.state.loaded && <div className="start">
            <button onClick={this.onStartClick}>Start!</button>
          </div>}
        </div>}


      </Layout>
    )
  }
}

export default FMTribeIndex
