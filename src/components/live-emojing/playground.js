import React from "react"
import PropTypes from 'prop-types'
import Helmet from "react-helmet"
import Fraction from 'fraction.js'
import freesound from 'freesound'
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
         FaVolumeSlash
        } from 'react-icons/fa'
import {alphaEmoji,
        randomPattern,
        emojiArray,
        customEmojis,
        recentEmojis,
        includeEmojis,
        i18nEmojis } from './utils'

import parser from "./tidal"
import Tone from "tone"

class Playground extends React.Component {
  schedules = []
  glyphs = []
  constructor(props){
    freesound.setToken("imAzESuPtzZS9njAVsje0qkPQxr0mbGxSCQmUETN")

    super(props);
    this.state = {
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

  onExpandClick = (e) => {
    e.preventDefault()
    this.setState({ expanded: !this.state.expanded })
  }

  componentDidMount(){
    if(Tone.context.state==='running')
       this.initAudio()

    this.setState({isDesktop: (typeof window.orientation === "undefined")})

    const pattern = reactLocalStorage.get('pattern', randomPattern())
    this.setState({left: pattern, right: ''})
    document.addEventListener("keydown", this.onKeyPress, false)
    window.addEventListener('resize', this.onWindowResize, false)

    this.canvas = this.refs.canvas.getContext("2d")
    this.canvas.lineWidth = 2;
    this.canvas.fillStyle = "blue"
    this.canvas.font = "bold 100px Arial"

    this.stopAnimation = false
    requestAnimationFrame(this.tick)
    this.onWindowResize()

  }


  componentWillUnmount(){
    document.removeEventListener("keydown", this.onKeyPress, false)
    window.removeEventListener('resize', this.onWindowResize, false)

    Tone.context.suspend()
    this.stopAnimation = true
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

    const off = (Tone.Transport.seconds- Math.floor(Tone.Transport.seconds))
    const ctx = this.canvas
    const width = ctx.canvas.width
    const height = ctx.canvas.height
    ctx.clearRect(0, 0, width, height)
    ctx.font = `${width/10}px Arial`

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
    this.samples = ['8','a','b','dot','duf','d','f','h','^k','k', 'm','n','o', 'pf', 'phs','psh','^p','s','^tss','t', 'u']
    const urls = this.samples.reduce((o,n)=> Object.assign(o,{[n]:`/live-emojing/audio/beatbox/${n}.wav`}),{})
    this.players = new Tone.Players (urls , () => this.setState({samplesLoaded:true}) ).connect(comp)

    this.players.add('cp','https://raw.githubusercontent.com/yaxu/SuperDirt/master/samples/cp/HANDCLPA.wav',()=> console.log('loaded clap!'))

    Tone.context.latencyHint = 'playback'
    Tone.Transport.start()
    this.setState({soundOn: true})

  }


  addEmoji= (e) => {
    this.setState({ left: this.state.left + (!e.custom ? e.native : e.name) })
  }

  onCommitClick = (e) => {
    e.preventDefault()
    this.commit()
  }


  onKeyPress = (e) => {
    const c = e.key.toLowerCase()
    if( c.length===1 &&  c >='a' && c <='z'){
      const i = c.charCodeAt(0) - 'a'.charCodeAt(0)
      this.setState({ left: this.state.left + alphaEmoji[i] })
    }
    else if(customEmojis.map((e)=>e.name).includes(e.key)){
      e.preventDefault()
      this.setState({ left: this.state.left + e.key })
    }
    else if(e.key === 'ArrowLeft'){
      this.onLeftClick(e)
    }
    else if(e.key === 'ArrowRight'){
      this.onRightClick(e)
    }
    else if(e.key === 'Backspace'){
      this.onBackspaceClick(e)
    }
    else if(e.key === 'Delete'){
      e.preventDefault()
      if(this.state.right.length>0){
        let r = emojiArray(this.state.right)
        r.shift()
        this.setState({right: r.join('')});
      }
    }
    else if(e.key === 'Enter'){
      this.onCommitClick(e)
    }
  }

  onRandomClick = (e) => {
    e.preventDefault()
    this.setState({left: randomPattern(),right:''});
  }

  onBackspaceClick = (e) => {
    e.preventDefault()
    if(this.state.left.length>0){
      let l = emojiArray(this.state.left)
      l.pop()
      this.setState({left: l.join('')})
    }
  }

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
      this.setState({left: l.join(''), right: c + this.state.right });
    }
  }

  onRightClick = (e) => {
    e.preventDefault()
    if(this.state.right.length>0){
      let r = emojiArray(this.state.right)
      const c = r.shift()
      this.setState({left: this.state.left + c , right: r.join('') });
    }
  }

  onSoundToggle = (e) => {
    e.preventDefault()

    if(Tone.context.state==='running') {
      this.clearTransportSchedules()
      Tone.Transport.stop()
      Tone.context.suspend().then(() => {
        this.setState({soundOn: false})
      });
    } else if(Tone.context.state === 'suspended') {
      Tone.context.resume().then(()=> {
        this.initAudio()
      });
    }

  }

  componentDidUpdate(prevProps, prevState) {
    const p1 = prevState.left+prevState.right
    const p2 = this.state.left+this.state.right

    if(p1===p2)
      return

    const emojis = Object.values(emojiIndex.emojis)

    let f ='['
    for (let c of emojiArray(p2)){
      const e = emojis.filter((e)=>e.native===c)
      if(e.length===0)
        f += c
      else{
        f += ' '+e[0].id
        this.ensureEmojiSample(e[0])
      }
    }
    f+=']'

    try {
      this.parsedGrammar = parser.parse(p2)
      this.setState({error: false})
    }
    catch(error) {
      this.setState({error: true})
    }


  }

  clearTransportSchedules(){
    for(let eventId of this.schedules)
      Tone.Transport.clear(eventId)
    this.schedules = []
    Tone.Transport.cancel()
  }

  commit = () => {
    if(this.state.error)
      return

    const p = this.state.left+this.state.right
    reactLocalStorage.set('pattern', p)
    this.props.onCommit(p)

    this.setState({lastMsg: p, highlighted: true});
    setTimeout(() => {this.setState({highlighted:false})},300)

    if(this.state.soundOn){
      this.clearTransportSchedules()
      this.schedule(this.parsedGrammar)
    }

  }

  // this function ensures each emoji has a unique sound
  // it tries to get a freesound short asset that matches emoji name
  // it fallsback to a local sound otherwise
  ensureEmojiSample(e){

    const sanitize = (name) =>{
      name = name.replace('-','_').replace('+','plus')
      if(parseInt(name).toString()===name)
        name = 'num'+name
      return name
    }


    console.log(sanitize(e.id))


    /*
    const query = e.id
    const filter = "duration:[0.1 TO 0.4]"
    freesound.textSearch(query, {page:1, page_size:1, filter:filter, sort:'rating_desc', fields:'previews'},
        (txt) => {
            const resp = JSON.parse(txt)
            if (resp.results.length >0){
              console.log(e.id,resp.results[0].previews['preview-lq-mp3'])
            }
        },
        (err) => { console.log(err,"Error while searching...")}
    )
    */
  }

  schedule = (root)=>{
    const emojis = Object.values(emojiIndex.emojis).map((e)=>e.native)

    const process_emoji = (params) =>{
      const index = emojis.indexOf(params.node.value) % this.samples.length
      const sample = this.samples[index]

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

  schedule2 = (root)=>{
    const emojis = Object.values(emojiIndex.emojis).map((e)=>e.native)

    const sched = (params) =>{
      const index = emojis.indexOf(params.node.value) % this.samples.length
      console.log(emojis.indexOf(params.node.value),params.node.value.charCodeAt(3) )
      const sample = this.samples[index]

      const id = Tone.Transport.scheduleRepeat( (time)=>{
        const p = this.players.get(sample)
        p.start(time)
        Tone.Draw.schedule(() =>{
          this.glyphs.push({life: 1,offset:params.offset.valueOf(), emoji: params.node.value})
	      }, time)
      }, params.cycle.valueOf(),params.offset.valueOf())
      this.schedules.push(id)
    }

    const transverse = (params) =>{
      console.log('transverse',params)

      if (params.node.type === 'group'){
        const steps = Object.keys(params.node).filter((k)=> k!=='type')
        const stepDur = params.duration.mul(new Fraction( 1, steps.length))
        let ss = params.offset
        for (let s of steps){
           transverse({
             node: params.node[s],
             offset: ss,
             duration: stepDur,
             cycle: params.cycle,
             chance: params.chance})
          ss = ss.add(stepDur)
        }
      }
      else if (params.node.type === 'onestep'){
         const steps = Object.keys(params.node).filter((k)=> k!=='type')
         const stepDur = new Fraction( 1, 1)
         let ss = params.offset
         for (let s of steps){
           transverse({
             node: params.node[s],
             offset: ss,
             duration: stepDur,
             cycle: params.cycle*steps.length,
             chance: params.chance})
            ss = ss.add(stepDur)
         }
      }
      else if (params.node.type === 'repeat'){
        if( params.node.repeatValue.type === 'degrade' ) {
          console.log ('degrade',params.node.repeatValue)
          //stepDur = new Fraction( 1, node.repeatValue.value)
        }else if( params.node.repeatValue.type === 'number' ) {
          let ss = params.offset
          if( params.node.operator === '*' )
            params.duration.d *= params.node.repeatValue.value
          else if( params.node.operator === '/' )
            params.duration.n *= params.node.repeatValue.value
          for (let i = 0; i<params.node.repeatValue.value; i++){
           transverse({
             node: params.node.value,
             offset: ss,
             duration: params.duration,
             cycle: params.cycle,
             chance: params.chance})
            ss = ss.add(params.duration)
          }
        }
      }
      else if( params.node.type === 'emoji' ) {
        sched(params)
      }
      else if( params.node.type === 'degrade' ) {
         transverse({
           node: params.node.value,
           offset: params.offset,
           duration: params.duration,
           cycle: params.cycle,
           chance: params.chance*0.5})
      }

    }

    transverse({
      node: root,
      offset: new Fraction(0),
      duration: new Fraction(1),
      cycle: new Fraction(1),
      chance: 1})
  }


  render() {
    let carret = (<span className="carret"></span>)

    let hint = (<p className="hint">Throw a <a className="dice-btn" href="/" onClick={this.onRandomClick}><span role="img" aria-label="dice">🎲</span></a>. Play it <a className="play-btn" href="/" onClick={this.onCommitClick}><FaPlay /></a>. {!this.state.expanded && (<>Go full screen <FaExpand className="fullscreen-btn" onClick={this.onExpandClick}/></>)}
    {this.state.isDesktop && (<><br/>Use your magic keyboard!</>)}</p>)
    if ( this.state.lastMsg){
      hint = (<p className="hint">d1 $  s "{this.state.lastMsg}"</p>)
    }

    return (
      <div className="play">
        <Helmet htmlAttributes={{class:(this.state.expanded ? 'full-screen':'normal') }} />
        <canvas ref="canvas" width={this.state.canvasSize[0]} height={this.state.canvasSize[1]} />

        {hint}
        {this.state.samplesLoaded ? <p className="hint">Samples loaded!</p> : <p className="hint">Loading samples...</p>}
        {this.state.debug && <p className="hint">{this.state.debug}</p>}
        <a className="expand" href="/" onClick={this.onExpandClick}>
          <FaExpand/>
          <FaCompress/>
        </a>
        <div className={`${this.state.error ? 'error' : '' } input`}>
          <span className="clipper">🤔</span>
          <pre className={`${this.state.highlighted ? 'highlight' : '' } preview`}>
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
        <Picker style={{width:'100%',borderRadius:'0',border:0}} showPreview={false} emojiSize={36} native={true} onClick={this.addEmoji} i18n={i18nEmojis} recent={recentEmojis} custom={customEmojis} color="#222" include={includeEmojis}/>
      </div>
    )
  }
}

//And don't forget that the child will need this function declared in its propTypes:

Playground.propTypes = {
  onCommit: PropTypes.func.isRequired,
};

export default Playground
