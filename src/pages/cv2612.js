import React from "react"
import Layout from "../layouts/cv2612"
import SEO from "../components/seo"
import Channel from "../components/cv2612/channel"
import Sequencer from "../components/cv2612/sequencer"
import {reactLocalStorage} from 'reactjs-localstorage'
import {CV2612Context} from "../components/cv2612/cv2612Context"
import Slider from "../components/slider"


class CV2612Index extends React.Component {

  midiInId = ''
  midiOutId = ''

  constructor(props){
    super(props);

    this.updateEnvelope = (ch, op) => {
      for(const o of this.state.mapping.operators){
        if(o.props.ch === ch && o.props.op === op)
          o.forceUpdate()
      }
    }

    this.sendCtrl = (ctrl) => {
      const ctrlmap = ['ar','d1','sl','d2','rr','tl','mul','det','rs','am','al','fb','ams','fms','st','lfo']

      const s = ctrl.state
      const p = ctrl.props

      for(let i = 0; i<(this.omniChannel ? 1 : 6 );i++){
        // send data header
        const addr = []
        // part 6 is a three bytes address
        // 6 will be a non channel message
        addr.push(this.omniChannel ? i : ((typeof(p.ch)==='number') ? i : 6))
        // 4 will be a non operator message
        addr.push((typeof(p.op)==='number') ? p.op : 4)
        // ctrl name  to 7-bit number
        addr.push(ctrlmap.indexOf(p.name))
        this.sendSysexSet(addr,s.value)
      }

    }

    this.setActiveControl = (ctrl) => {
      let mapping = {...this.state.mapping}
      if(mapping.activeControl !== ctrl){
        mapping.activeControl = ctrl
        this.setState({mapping})
      }
    }

    this.state = {
      midiAccess: null,
      omniChannel : true,
      fakeSysex : false,
      midiIns: [],
      midiOuts: [],
      lastMsg: '',
      patches: [],
      currentPatch: '',
      mapping:{
        learning: false,
        activeControl: null,
        setActiveControl: this.setActiveControl,
        operators: [],
        controls: [],
        updateEnvelope: this.updateEnvelope,
        sendCtrl: this.sendCtrl,
      }
    }


  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.fakeSysex !== this.state.fakeSysex){
      //fakeSysex changed
      this.sendHandshake()
    }
  }

  onChangeMidiIn = (ev) => {
    this.setMidiIn(ev.target.value)
  }

  onChangeMidiOut = (ev) => {
    this.setMidiOut(ev.target.value)
  }

  setMidiOut(id){
    this.midiOutId = id
    this.setState({midiOutId: id})
    reactLocalStorage.set('midiOutId',id)
    this.sendHandshake()
  }

  setMidiIn(id){
    this.midiInId = id
    this.setState({midiInId: id})
    reactLocalStorage.set('midiInId',id)
    const midiIn = this.state.midiAccess.inputs.get(id)
    if(midiIn){
      midiIn.onmidimessage = this.onMIDIMessage
    }else{
      console.log('Midi In error')
    }
  }

  sendHandshake(){
    // device ID request
    const msg = [0xF0, 0x7E, 0x7F, 0x06, 0x01, 0xF7]
    this.sendSysex(msg)

  }

  sendSysex = (data) => {
    if(this.state.fakeSysex){
      for(const d of data){
        //sending sysex data as cc 128 on channel 16
      }

    }else{
      this.sendMidi(data)
    }
  }

  sendSysexSet = (addr,value) => {
    // send data header
    const msg = [0xF0, 0x41, 0x26, 0x12, 0x12]
    // part 6 is a three bytes address
    // part 7 is the data itself, in this case, a single 7-bit
    // part 8 is the cheksum , 0x7F - the sum of address and value
    const chksum = 0x7F - ((addr[0]+addr[1]+addr[2]+value)%0x7F)
    msg.push(addr[0])
    msg.push(addr[1])
    msg.push(addr[2])
    msg.push(value)
    msg.push(chksum)
    // part 9  is the end byte
    msg.push(0xF7)
    this.sendSysex(msg)
  }

  sendMidi = (data) => {
    const midiOut = this.state.midiAccess.outputs.get(this.midiOutId)
    if(midiOut){
      midiOut.send(data)
    }else{
      console.log('No Midi Out')
    }
  }

  componentDidMount(){
    navigator.requestMIDIAccess( { sysex: true }).then(
      (ma)=>{
        this.setState({midiAccess: ma})
        this.refreshMidiPorts()
        ma.onstatechange = this.onMIDIStateChange
      },()=>console.log('Could not access your MIDI devices.'))

    const patches = reactLocalStorage.getObject('patches',[])
    this.setState({patches:patches})
    if(patches.length>0){
      this.setState({currentPatch:patches[0].name})
    }

  }

  onMIDIStateChange = (e) => {
    // Print information about the (dis)connected MIDI controller
    console.log(e.port.name, e.port.manufacturer, e.port.state, e.port.type)
    this.refreshMidiPorts()
  }



  refreshMidiPorts() {
    const ma = this.state.midiAccess
    const inputs = Array.from(ma.inputs.values())
    const outputs = Array.from(ma.outputs.values())
    this.setState({midiIns:inputs, midiOuts:outputs})

    if(inputs.length){
      let id = reactLocalStorage.get('midiInId')
      // is last id still available??
      if( !inputs.map(i=>i.id).includes(id) ){
        id = inputs[0].id
      }
      if(id !== this.midiInId)
        this.setMidiIn(id)
    }
    if(outputs.length){
      let id = reactLocalStorage.get('midiOutId')
      // is last id still available??
      if( !outputs.map(o=>o.id).includes(id) ){
        id = outputs[0].id
      }
      if(id !== this.midiOutId)
        this.setMidiOut(id)
    }
  }

  onMIDIMessage = (msg) => {

    if(msg.target.id !== this.midiInId)
      return

    const data = Array.from(msg.data)
    const type = data[0] & 0xf0

    if(type===0xF0){ // sysex
      const idReply = [0xF0, 0x7E, 0x00, 0x06, 0x02,  //identity reply
          0x26, 0x26, 0x12, 0x00, 0x00, // ID - family code - model number
          0x01, 0x00, 0x00, 0x00, 0xF7] //version - end
      if(JSON.stringify(data) === JSON.stringify(idReply)){
        this.setState({lastMsg: `CV2612 found!` })
      }
      return
    }

    const ch = data[0] & 0x0f
    const cc = data[1] & 0x7f
    const val = data[2] & 0x7f
    if(type === 0xB0){
      if(this.state.mapping.learning){
        const ctrl = this.state.mapping.activeControl
        if(ctrl)
          ctrl.setMapping(cc,ch)
      }

      for(const k of this.state.mapping.controls){
        if(k.state.cc === cc && k.state.ch === ch){
          k.updateValue(val)
        }
      }

      this.setState({lastMsg: `${type},${ch},${cc},${val}` })
    }

    // resend noteon/off events
    if(type === 0x80 || type === 0x90){
      this.sendMidi(data)
    }


  }

  onLearnClick = (e) => {
    e.preventDefault()
    let mapping = {...this.state.mapping}
    mapping.learning = !mapping.learning
    this.setState({mapping})
  }

  toggleSysexMode = (e) => {
    e.preventDefault()
    this.setState({fakeSysex: !this.state.fakeSysex})
  }

  toggleOmniChannel = (e) => {
    e.preventDefault()
    this.setState({omniChannel: !this.state.omniChannel})
  }

  reset = (e) => {
    e.preventDefault()
    this.sendSysexSet([0x06,0x04,0x10],0x00)
  }

  clear = (e) => {
    e.preventDefault()
    this.sendSysexSet([0x06,0x04,0x11],0x00)
  }

  onChangePatch = (ev) => {
    this.setState({currentPatch: ev.target.value})
    const patch = this.state.patches.filter( (p) => p.name===ev.target.value )[0]

    for(const c of this.state.mapping.controls){
      const ctrl = patch.controls.filter( (ct) => ct[0]===c.props.ch
          && ct[1]===c.props.op
          && ct[2]===c.props.name)[0]
      if(ctrl!==undefined)
        c.updateValue(parseInt(ctrl[3]))
    }

  }

  onUpdatePatchClick = (e) => {
    const controls = this.state.mapping.controls
              .map(c => [c.props.ch, c.props.op,c.props.name,c.state.value])

    const patches = this.state.patches
    for(const p of patches){
      if(p.name===this.state.currentPatch)
        p.controls = controls
    }
    this.setState({patches: patches})
    reactLocalStorage.setObject('patches',patches)

  }

  onDeletePatchClick = (e) => {
    const patches = this.state.patches.filter( (p) => p.name!==this.state.currentPatch )
    this.setState({patches: patches})
    reactLocalStorage.setObject('patches',patches)
  }

  onSavePatchClick = (e) => {
    const controls = this.state.mapping.controls
              .map(c => [c.props.ch, c.props.op,c.props.name,c.state.value])

    let patch = prompt("Name your patch")

    if (patch !== null && patch !== "") {
      const patches = this.state.patches
      patches.push({name:patch, controls: controls})
      this.setState({patches: patches})
      reactLocalStorage.setObject('patches',patches)
    }

  }

  render() {
    return (
      <Layout location={this.props.location} >
        <CV2612Context.Provider value={this.state.mapping}>
          <SEO title="cv2612" />
          <div>
            <p>
              {this.state.lastMsg ||'Click learn to bind a controller'}
            </p>
            <select value={this.state.midiInId} onChange={this.onChangeMidiIn}>
              {this.state.midiIns.map((i) =><option key={i.id} value={i.id}>{i.manufacturer} - {i.name}</option>)}
            </select>
            <select value={this.state.midiOutId} onChange={this.onChangeMidiOut}>
              {this.state.midiOuts.map((o) =><option key={o.id} value={o.id}>{o.manufacturer} - {o.name}</option>)}
            </select>
            <button onClick={this.onLearnClick}>{this.state.mapping.learning ? 'Done':'Learn'}</button>
            <Sequencer sendMidi={this.sendMidi} />
            <button onClick={this.toggleSysexMode}>{this.state.fakeSysex ? 'fakeSysex':'trueSysex'}</button>
            <button onClick={this.toggleOmniChannel}>{this.state.omniChannel ? 'Omni Channel':'Multi Channel'}</button>
            <button onClick={this.reset}>RESET</button>
            <button onClick={this.clear}>CLEAR</button>
            <p>
              <span>Patches:</span>
              <select value={this.state.currentPatch} onChange={this.onChangePatch}>
                {this.state.patches.map((p) =><option key={p.name} value={p.name}>{p.name}</option>)}
              </select>
              <button onClick={this.onUpdatePatchClick}>Update Patch</button>
              <button onClick={this.onDeletePatchClick}>Delete Patch</button>
              <button onClick={this.onSavePatchClick}>Save as new Patch</button>
            </p>

          </div>
          <br/>
          <Slider name="lfo" min={0} max={7} />

          <br/><br/>
          <Channel ch={0} />
          <Channel ch={1} />
          <Channel ch={2} />
          <Channel ch={3} />
          <Channel ch={4} />
          <Channel ch={5} />

        </CV2612Context.Provider>
      </Layout>
    )
  }
}

export default CV2612Index
