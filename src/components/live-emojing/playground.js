import React from "react"
import PropTypes from 'prop-types'
import Helmet from "react-helmet"
import Fraction from 'fraction.js'
import {reactLocalStorage} from 'reactjs-localstorage'
import { Picker,emojiIndex } from 'mr-emoji'
import '../../../node_modules/mr-emoji/css/emoji-mart.css'
import { FaBackspace,
         FaCaretLeft,
         FaCaretRight,
         FaPlay,
         FaDice,
         FaExpand,
         FaCompress,
         FaVolume,
         FaVolumeSlash,
         FaQuestionCircle,
        } from 'react-icons/fa'
import {alphaEmoji,
        randomPattern,
        emojiArray,
        customEmojis,
        recentEmojis,
        includeEmojis,
        sanitizeEmojiId,
        i18nEmojis } from './utils'

import parser from "./tidal"
import Tone from "tone"


const git_raw = 'https://raw.githubusercontent.com/diegodorado/emoji-samples/master/'


class Playground extends React.Component {
  schedules = []
  glyphs = []
  tapCount = 0
  listingData = null

  constructor(props){
    super(props);
    this.state = {
      tapped: false,
      tempo: '',
      tapping: false,
      showInstructions: true,
      isDesktop: false,
      left: '',
      right: '',
      expanded: false,
      highlighted: false,
      error: false,
      samplesLoaded: false,
      soundOn: false,
      canvasSize: [1,1],
    }
  }




  componentDidMount(){
    if(Tone.context.state==='running')
       this.initAudio()

    fetch(`${git_raw}listing.json`)
      .then( r => r.json())
      .then((data) => this.setListingData(data))
      .catch((err) => {console.log(err)})

    this.setState({isDesktop: (typeof window.orientation === "undefined")})

    const pattern = reactLocalStorage.get('pattern', randomPattern())
    const showInstructions = (reactLocalStorage.get('showInstructions', 'true')=== 'true')
    console.log(showInstructions)

    this.setState({left: pattern, right: '',showInstructions})
    document.addEventListener("keydown", this.onKeyPress, false)
    document.addEventListener("fullscreenchange", this.onFullScreenChange, false)
    window.addEventListener('resize', this.onWindowResize, false)

    this.canvas = this.refs.canvas.getContext("2d")
    this.canvas.lineWidth = 2;
    this.canvas.fillStyle = "blue"
    this.canvas.font = "bold 100px Arial"

    this.stopAnimation = false
    requestAnimationFrame(this.tick)
    this.onWindowResize()

  }

  setListingData(data){
    this.listingData = data
    if(this.state.soundOn)
      this.ensureEmojiSamples()
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.onKeyPress, false)
    document.removeEventListener("fullscreenchange", this.onFullScreenChange, false)
    window.removeEventListener('resize', this.onWindowResize, false)

    Tone.context.suspend()
    this.stopAnimation = true
  }

  onFullScreenChange = () =>{
    this.setState({ expanded: this.isFullScreen()})
  }

  isFullScreen() {
    const fse= document.fullscreenElement
        || document.mozFullScreenElement
        || document.webkitFullscreenElement
        || document.msFullscreenElement
    return (fse !== undefined)
  }

  onExpandClick = (e) => {
    const el = document.documentElement
    const rfs = el.requestFullscreen
        || el.webkitRequestFullScreen
        || el.mozRequestFullScreen
        || el.msRequestFullscreen
    const cfs = document.exitFullscreen
        || document.mozCancelFullScreen
        || document.webkitExitFullscreen
        || document.msExitFullscreen

    e.preventDefault()
    e.stopPropagation()
    if(this.isFullScreen())
      cfs.call(document)
    else
      rfs.call(el)
  }


  onWindowResize = () =>{
    this.setState({canvasSize:[window.innerWidth,window.innerHeight/2]})
  }

  tick = () => {
    if (this.stopAnimation)
       return

    this.drawEmojis()
    requestAnimationFrame(this.tick)
  }

  drawEmojis(){

    //const off = (Tone.Transport.seconds- Math.floor(Tone.Transport.seconds))
    const ctx = this.canvas
    const width = ctx.canvas.width
    const height = ctx.canvas.height
    ctx.clearRect(0, 0, width, height)
    ctx.font = `${width/10}px Arial`


    if(this.tapped>0){
      this.tapped -= 0.3
      ctx.fillStyle = 'green'
      ctx.fillRect(20, 10, 150, 100)
    }


    for(let i = this.glyphs.length-1; i >= 0 ; i--){
      const g = this.glyphs[i]
      g.life = g.life*1.2
      ctx.fillText(g.emoji, width*g.offset, (height / 2)-g.life)
      if(g.life>10){
        this.glyphs.splice(i, 1)
      }
    }


  }

  initAudio(){
    //chain a compressor
    const comp = new Tone.Compressor(-30, 3).toMaster()
    this.samples = '0123456789abcdefghijklmnopqrstuvwxyzABC'.split('')
    const urls = this.samples.reduce((o,n)=> Object.assign(o,{[n]:`/live-emojing/samples/${n}.wav`}),{})
    this.players = new Tone.Players (urls , () => this.setState({samplesLoaded:true}) ).connect(comp)
    Tone.context.latencyHint = 'playback'
    Tone.Transport.start()
    this.setState({soundOn: true})
  }


  addEmoji= (e) => {
    this.setState({ left: this.state.left + (!e.custom ? e.native : e.name) })
  }

  onCommitClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.commit()
  }


  onKeyPress = (e) => {
    if( e.ctrlKey /* || e.altKey || e.metaKey || e.shiftKey   || e.repeat*/ )
      return

    const c = e.key.toLowerCase()
    if( c.length===1 &&  c >='a' && c <='z'){
      const i = c.charCodeAt(0) - 'a'.charCodeAt(0)
      this.setState({ left: this.state.left + alphaEmoji[i] })
    }
    else if(customEmojis.map((e)=>e.name).includes(e.key)){
      e.preventDefault()
      this.setState({ left: this.state.left + e.key })
    }
    else if(c === 'arrowleft'){
      this.onLeftClick(e)
    }
    else if(c === 'arrowright'){
      this.onRightClick(e)
    }
    else if(c === 'backspace'){
      this.onBackspaceClick(e)
    }
    else if(c === 'delete'){
      e.preventDefault()
      if(this.state.right.length>0){
        let r = emojiArray(this.state.right)
        r.shift()
        this.setState({right: r.join('')})
      }
    }
    else if(c === 'enter'){
      this.onCommitClick(e)
    }
    else if(c === 'home'){
      e.preventDefault()
      this.setState({left: '' , right: this.state.left + this.state.right})
    }
    else if(c === 'end'){
      e.preventDefault()
      this.setState({left: this.state.left + this.state.right , right: ''})
    }
    else if(c === 'tab'){
      this.onRandomClick(e)
    }
  }

  onRandomClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({left: randomPattern(),right:''})
  }

  onBackspaceClick = (e) => {
    e.preventDefault()
    if(this.state.left.length>0){
      let l = emojiArray(this.state.left)
      l.pop()
      this.setState({left: l.join('')})
    }
  }

  //todo: make this work on mobile
  onBackspaceDown = (e) => {
    this.backspaceOn = Date.now()

  }

  onBackspaceUp = (e) => {
    const delta =  Date.now() - this.backspaceOn
    if(delta>700){
      this.setState({left: '', right:''})
    }
  }

  onLeftClick = (e) => {
    e.preventDefault()
    if(this.state.left.length>0){
      let l = emojiArray(this.state.left)
      const c = l.pop()
      this.setState({left: l.join(''), right: c + this.state.right })
    }
  }

  onRightClick = (e) => {
    e.preventDefault()
    if(this.state.right.length>0){
      let r = emojiArray(this.state.right)
      const c = r.shift()
      this.setState({left: this.state.left + c , right: r.join('') })
    }
  }

  onHideInstructionsClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const showInstructions = false
    reactLocalStorage.set('showInstructions', showInstructions)
    this.setState({showInstructions})
  }


  onToggleHelpClick = (e) => {
    e.preventDefault()
    const showInstructions = !this.state.showInstructions
    console.log(showInstructions)
    reactLocalStorage.set('showInstructions', showInstructions)
    this.setState({showInstructions})
  }



  onSoundToggle = (e) => {
    e.preventDefault()

    if(Tone.context.state==='running') {
      this.clearTransportSchedules()
      Tone.Transport.stop()
      Tone.context.suspend().then(() => {
        this.setState({soundOn: false})
      })
    } else if(Tone.context.state === 'suspended') {
      Tone.context.resume().then(()=> {
        Tone.Transport.start()
        this.setState({soundOn: true})
      })
    }
  }



  clearTransportSchedules(){
    Tone.Transport.cancel()
    for(let eventId of this.schedules)
      // this is not working properoly
      Tone.Transport.clear(eventId)

    this.schedules = []
  }

  componentDidUpdate(prevProps, prevState) {
    const p1 = prevState.left+prevState.right
    const p2 = this.state.left+this.state.right

    if(p1===p2)
      return

    this.ensureEmojiSamples()

    try {
      this.parsedGrammar = parser.parse(p2)
      this.setState({error: false})
    }
    catch(error) {
      this.setState({error: true})
    }
  }


  commit = () => {
    if(this.state.error)
      return

    const p = this.state.left+this.state.right
    reactLocalStorage.set('pattern', p)
    this.props.onCommit(p)

    this.setState({highlighted: true});
    setTimeout(() => {this.setState({highlighted:false})},300)

    if(this.state.soundOn){
      this.clearTransportSchedules()
      this.schedule(this.parsedGrammar)
    }

  }

  ensureEmojiSamples(){
    const p = this.state.left+this.state.right
    const emojis = Object.values(emojiIndex.emojis)

    //todo: decide if this is going to be used or not
    /*
    let f ='['
    for (let c of emojiArray(p)){
      const e = emojis.filter((e)=>e.native===c)
      if(e.length===0)
        f += c
      else{
        f += ' '+e[0].id
        this.ensureEmojiSample(e[0])
      }
    }
    f+=']'
    */

    for (let c of emojiArray(p)){
      const e = emojis.filter((e)=>e.native===c)
      if(e.length>0)
        this.ensureEmojiSample(e[0])
    }


  }

  // this function ensures each emoji has a unique sound
  // it tries to get a short asset for listing.json
  ensureEmojiSample(e){
    const id = sanitizeEmojiId(e.id)
    if(this.listingData!==null){
      const path = this.listingData[id]
      if(path && !this.players.has(id))
        this.players.add(id,encodeURI(`${git_raw}${path}`),()=> console.log(`loaded ${id}!`))
    }
  }

  schedule = (root)=>{
    const emojis = Object.values(emojiIndex.emojis).map((e)=>e.native)
    const emoji_ids = Object.values(emojiIndex.emojis)
      .reduce((o,e)=>Object.assign(o,{[e.native]:sanitizeEmojiId(e.id)}),{})

    const process_emoji = (params) =>{
      if(!this.state.samplesLoaded)
        return

      const eid = emoji_ids[params.node.value]
      const index = emojis.indexOf(params.node.value) % this.samples.length
      //choose a remote or local sample
      const sample = this.players.has(eid) ? eid : this.samples[index]

      const id = Tone.Transport.scheduleRepeat( (time)=>{
        if(Math.random()>params.chance)
          return
        const p = this.players.get(sample)
        p.start(time)
        Tone.Draw.schedule(() =>{
          this.glyphs.push({life: 1,offset:(params.offset.valueOf()%1), emoji: params.node.value})
	      }, time)
      }, params.cycle.valueOf(),params.offset.valueOf())
      this.schedules.push(id)
    }

    const process_group = (params) =>{
      const steps = Object.keys(params.node).filter((k)=> k!=='type')
      const stepDur = params.duration.div(steps.length)
      let ss = params.offset
      for (let s of steps){
         transverse({
           node: params.node[s],
           offset: ss.clone(),
           duration: stepDur.clone(),
           cycle: params.cycle.clone(),
           chance: params.chance})
        ss = ss.add(stepDur)
      }
    }

    const process_onestep = (params) =>{
       const steps = Object.keys(params.node).filter((k)=> k!=='type')
       const stepDur = new Fraction( 1, 1)
       let ss = params.offset
       for (let s of steps){
         transverse({
           node: params.node[s],
           offset: ss.clone(),
           duration: params.duration.clone(),
           cycle: params.cycle.mul(steps.length),
           chance: params.chance})
          ss = ss.add(stepDur)
       }
    }

    const process_repeat = (params) =>{
      let ss = params.offset

      if( params.node.operator === '*' ){
        const dur = params.duration.div(params.node.repeatValue.value)
        for (let i = 0; i<params.node.repeatValue.value; i++){
         transverse({
           node: params.node.value,
           offset: ss.clone(),
           duration: dur,
           cycle: params.cycle.clone(),
           chance: params.chance})
          ss = ss.add(dur)
        }
      }
      else if( params.node.operator === '/' ){
        for (let i = 0; i<params.node.repeatValue.value; i++){
         transverse({
           node: params.node.value,
           offset: ss.clone(),
           duration: params.duration.clone(),
           cycle: params.cycle.mul(params.node.repeatValue.value),
           chance: params.chance})
        }
      }

    }

    const process_degrade = (params) =>{
       transverse({
         node: params.node.value,
         offset: params.offset,
         duration: params.duration,
         cycle: params.cycle,
         chance: params.chance*0.5})
    }

    const transverse = (params) =>{
      if (params.node.type === 'group')
        process_group(params)
      else if (params.node.type === 'onestep')
        process_onestep(params)
      else if (params.node.type === 'repeat')
        process_repeat(params)
      else if( params.node.type === 'degrade' )
        process_degrade(params)
      else if( params.node.type === 'emoji' )
        process_emoji(params)
    }

    transverse({
      node: root,
      offset: new Fraction(0),
      duration: new Fraction(1),
      cycle: new Fraction(1),
      chance: 1})
  }

  //todo: decide which emojis to show
  emojisToShowFilter = (e)=>{
    const emoji = emojiIndex.emojis[e.short_names[0]]
    return (emoji && alphaEmoji.includes(emoji.native))
  }

  onInstructionsClick = (e)=>{
    this.onPreviewClick(e)
  }

  onPreviewClick = (e)=>{
    this.setState({tapped:true, tapping: true})
    setTimeout(()=> this.setState({tapped:false}),40)

    setTimeout(()=> {
      if((Tone.Transport.seconds)>3.5){
        this.tapCount = 0
        this.setState({tapping: false})
      }
    },4000)


    const bpm = Math.round(60/Tone.Transport.seconds)
    Tone.Transport.stop().start()

    //is bpm in a razonable range?
    if(bpm < 20)
      this.setState({tempo: (this.tapCount===0) ? 'tap again' :  'too slow!'})
    else if(bpm > 240)
      this.setState({tempo: (this.tapCount===0) ? 'tap again' : 'too fast!'})
    else{
      this.setState({tempo: bpm})
      Tone.Transport.bpm.value = bpm
    }

    this.tapCount++

  }

  render() {
    let carret = (<span className="carret"></span>)

    return (
      <div className="play">
        <Helmet htmlAttributes={{class:(this.state.expanded ? 'full-screen':'normal') }} />
        <canvas ref="canvas" width={this.state.canvasSize[0]} height={this.state.canvasSize[1]} />
        {this.state.showInstructions &&
          <div className="instructions" onClick={this.onInstructionsClick}>
            <p><em>Sadly, no active sessions were found... So {`you'll`} have to play alone.</em></p>
            <h4>Instructions:</h4>
            <ul>
              <li>Throw a <a className="dice-btn" href="/" onClick={this.onRandomClick}><span role="img" aria-label="dice">🎲</span></a> {this.state.isDesktop && (<>[TAB] </>)}.</li>
              <li>Play <a className="play-btn" href="/" onClick={this.onCommitClick}><FaPlay /></a> {this.state.isDesktop && (<>[ENTER] </>)}.</li>
              <li>Go full screen <FaExpand className="fullscreen-btn" onClick={this.onExpandClick}/></li>
              <li>Tap screen to set tempo</li>
              {this.state.isDesktop && (<li>Magical keyboard! ( A={alphaEmoji[0]}, B={alphaEmoji[1]}, so on)</li>)}
              <li>Got it? Then <a href="/" onClick={this.onHideInstructionsClick}>hide this</a></li>
            </ul>
          </div>}
        <a className="expand" href="/" onClick={this.onExpandClick}>
          <FaExpand/>
          <FaCompress/>
        </a>
        <FaQuestionCircle className="help" onClick={this.onToggleHelpClick}/>
        <div className={`${this.state.tapping ? 'tapping' : '' }  ${this.state.error ? 'error' : '' } input`}>
          <span className="clipper" role="img" aria-label="doubt">🤔</span>
          <span className="tempo">{(parseInt(this.state.tempo)===this.state.tempo)? <><i>{this.state.tempo}</i> bpm</> : this.state.tempo}</span>
          <pre onClick={this.onPreviewClick} className={`${this.state.tapped ? 'tapped' : '' } ${this.state.highlighted ? 'highlight' : '' } preview`}>
            {this.state.left}{carret}{this.state.right}
          </pre>
          <nav>
            <FaCaretLeft onClick={this.onLeftClick}/>
            <FaCaretRight onClick={this.onRightClick}/>
            <FaBackspace  onClick={this.onBackspaceClick} onMouseUp={this.onBackspaceUp} onMouseDown={this.onBackspaceDown} />
            {this.state.soundOn ? <FaVolume onClick={this.onSoundToggle}/> : <FaVolumeSlash onClick={this.onSoundToggle}/>}
            <FaDice onClick={this.onRandomClick}/>
            <FaPlay className="commit-btn" onClick={this.onCommitClick}/>
          </nav>
        </div>
        <Picker style={{width:'100%',borderRadius:'0',border:0}} showPreview={false} emojiSize={36} native={true} onClick={this.addEmoji} i18n={i18nEmojis} recent={recentEmojis} custom={customEmojis} color="#222" include={includeEmojis} emojisToShowFilter={this.emojisToShowFilter}/>
      </div>
    )
  }
}


Playground.propTypes = {
  onCommit: PropTypes.func.isRequired,
};

export default Playground
