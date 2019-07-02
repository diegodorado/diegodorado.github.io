import React, {useState, useEffect, useContext} from "react"
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
         FaCog
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
import LiveEmojingContext from './context.js'

//todo: split this file in smaller modules! please!!


const git_raw = 'https://raw.githubusercontent.com/diegodorado/emoji-samples/master/'
const samples = '0123456789abcdefghijklmnopqrstuvwxyzABC'.split('')

let players = []
let schedules = []
let glyphs = []
let tapCount = 0
let listingData = null
let canvasCtx = null
let stopAnimation = false
let backspaceOn = null
let parsedGrammar = null




const Playground = ({pattern}) =>{


  let canvasRef = React.createRef()
  const context = useContext(LiveEmojingContext)
  const [expanded, setExpanded] = useState(false)
  const [tapped, setTapped] = useState(false)
  const [tapping, setTapping] = useState(false)
  const [showInstructions, setShowInstructions] = useState(true)
  const [isDesktop, setIsDesktop] = useState(false)
  const [highlighted, setHighlighted] = useState(false)
  const [error, setError] = useState(false)
  const [samplesLoaded, setSamplesLoaded] = useState(false)
  const [soundOn, setSoundOn] = useState(false)
  const [tempo, setTempo] = useState('')
  const [left, setLeft] = useState('')
  const [right, setRight] = useState('')
  const [canvasWidth, setCanvasWidth] = useState(1)
  const [canvasHeight, setCanvasHeight] = useState(1)


  useEffect(()=>{

    if(context.playingAlone){
      if(Tone.context.state==='running')
         initAudio()

      //todo: use async/await
      fetch(`${git_raw}listing.json`)
        .then( r => r.json())
        .then((data) => setListingData(data))
        .catch((err) => {console.log(err)})

      canvasCtx = canvasRef.current.getContext("2d")
      canvasCtx.lineWidth = 2
      canvasCtx.fillStyle = 'blue'
      canvasCtx.font = 'bold 100px Arial'

      requestAnimationFrame(tick)
    }

    setIsDesktop(typeof window.orientation === "undefined")

    //todo: open play alone when pattern is on url
    //got pattern from url?
    //setLeft( pattern ? pattern : reactLocalStorage.get('pattern', randomPattern()))
    setLeft(left=> pattern ? pattern : reactLocalStorage.get('pattern', randomPattern()))

    setShowInstructions(reactLocalStorage.get('showInstructions', 'true')=== 'true')

    document.addEventListener('fullscreenchange', onFullScreenChange)
    window.addEventListener('resize', onWindowResize)

    onWindowResize()


    // Specify how to clean up after this effect:
    return () => {
      document.removeEventListener("fullscreenchange", onFullScreenChange)
      window.removeEventListener('resize', onWindowResize)

      if(context.playingAlone){
        Tone.context.suspend()
        stopAnimation = true
      }
    }

  },[])



  useEffect(()=>{
    //re-attach listener if left, right or error have changed
    window.addEventListener('keydown', onKeyPress)
    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener("keydown", onKeyPress)
    }
  },[left, right, error, soundOn])



  useEffect(()=>{

    if(context.playingAlone)
      ensureEmojiSamples()

    try {
      parsedGrammar = parser.parse(left+right)
      setError(false)
    }
    catch(error) {
      setError(true)
    }

  },[left, right])



  const setListingData = (data) =>{
    listingData = data
    if(soundOn)
      ensureEmojiSamples()
  }


  const onFullScreenChange = () =>{
    setExpanded(isFullScreen())
  }

  const isFullScreen = () =>{
    const fse= document.fullscreenElement
        || document.mozFullScreenElement
        || document.webkitFullscreenElement
        || document.msFullscreenElement
    return (fse !== undefined)
  }

  const onExpandClick = (e) => {
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
    if(isFullScreen())
      cfs.call(document)
    else
      rfs.call(el)
  }


  const onWindowResize = () =>{

    setCanvasWidth(window.innerWidth)
    setCanvasHeight(window.innerHeight/2)
  }

  const tick = () => {
    if (stopAnimation)
       return
    drawEmojis()
    requestAnimationFrame(tick)
  }

  const drawEmojis = () =>{

    //const off = (Tone.Transport.seconds- Math.floor(Tone.Transport.seconds))
    const width = canvasCtx.canvas.width
    const height = canvasCtx.canvas.height
    canvasCtx.clearRect(0, 0, width, height)
    canvasCtx.font = `${width/10}px Arial`


    if(tapped>0){
      //warning!
      tapped -= 0.3
      canvasCtx.fillStyle = 'green'
      canvasCtx.fillRect(20, 10, 150, 100)
    }


    for(let i = glyphs.length-1; i >= 0 ; i--){
      const g = glyphs[i]
      g.life = g.life*1.2
      canvasCtx.fillText(g.emoji, width*g.offset, (height / 2)-g.life)
      if(g.life>10){
        glyphs.splice(i, 1)
      }
    }


  }

  const initAudio = () =>{
    //chain a compressor
    const comp = new Tone.Compressor(-30, 3).toMaster()
    const urls = samples.reduce((o,n)=> Object.assign(o,{[n]:`/live-emojing/samples/${n}.wav`}),{})
    players = new Tone.Players (urls, () => setSamplesLoaded(true)).connect(comp)
    Tone.context.latencyHint = 'playback'
    Tone.Transport.start()
    setSoundOn(true)
  }


  const addEmoji= (e) => {
    setLeft( l => l + (!e.custom ? e.native : e.name))
  }

  const onCommitClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    commit()
  }


  const onKeyPress = (e) => {
    //todo: implement copy/paste
    if( e.ctrlKey /* || e.altKey || e.metaKey || e.shiftKey   || e.repeat*/ )
      return

    const c = e.key.toLowerCase()

    if( c.length===1 &&  c >='a' && c <='z'){
      const i = c.charCodeAt(0) - 'a'.charCodeAt(0)
      setLeft( l => l + alphaEmoji[i])
    }
    else if(customEmojis.map((e)=>e.name).includes(e.key)){
      e.preventDefault()
      setLeft( l => l + e.key)
    }
    else if(c === 'arrowleft'){
      onLeftClick(e)
    }
    else if(c === 'arrowright'){
      onRightClick(e)
    }
    else if(c === 'backspace'){
      onBackspaceClick(e)
    }
    else if(c === 'delete'){
      e.preventDefault()
      if(right.length>0){
        const r = emojiArray(right)
        r.shift()
        setRight(r.join(''))
      }
    }
    else if(c === 'enter'){
      onCommitClick(e)
    }
    else if(c === 'home'){
      e.preventDefault()
      setLeft('')
      setRight(left + right)
    }
    else if(c === 'end'){
      e.preventDefault()
      setLeft(left + right)
      setRight('')
    }
    else if(c === 'tab'){
      onRandomClick(e)
    }
  }

  const onRandomClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setLeft(randomPattern())
    setRight('')
  }

  const onBackspaceClick = (e) => {
    e.preventDefault()
    if(left.length>0){
      let l = emojiArray(left)
      l.pop()
      setLeft(l.join(''))
    }
  }

  //todo: make this work on mobile
  const onBackspaceDown = (e) => {
    backspaceOn = Date.now()
  }

  const onBackspaceUp = (e) => {
    const delta =  Date.now() - backspaceOn
    if(delta>700){
      setLeft('')
      setRight('')
    }
  }

  const onLeftClick = (e) => {
    e.preventDefault()
    if(left.length>0){
      let l = emojiArray(left)
      const c = l.pop()
      setLeft(l.join(''))
      setRight(c + right )
    }
  }

  const onRightClick = (e) => {
    e.preventDefault()
    if(right.length>0){
      let r = emojiArray(right)
      const c = r.shift()
      setLeft(left + c)
      setRight(r.join(''))
    }
  }


  const moveCarret = (isLeft,index) => {
    const l = emojiArray(left)
    const r = emojiArray(right)
    const all = l.concat(r)

    if(!isLeft)
      index += l.length

    setLeft(all.slice(0,index).join(''))
    setRight(all.slice(index).join(''))
  }


  const onHideInstructionsClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const showInstructions = false
    reactLocalStorage.set('showInstructions', false)
    setShowInstructions(false)
  }


  const onToggleHelpClick = (e) => {
    e.preventDefault()
    reactLocalStorage.set('showInstructions', !showInstructions)
    setShowInstructions(!showInstructions)
  }


  const onSoundToggle = (e) => {
    e.preventDefault()
    if(!context.playingAlone)
      return

    if(Tone.context.state==='running') {
      clearTransportSchedules()
      Tone.Transport.stop()
      Tone.context.suspend().then(() => {
        setSoundOn(false)
      })
    } else if(Tone.context.state === 'suspended') {
      Tone.context.resume().then(()=> {
        Tone.Transport.start()
        setSoundOn(true)
      })
    }
  }



  const clearTransportSchedules = ()=>{
    Tone.Transport.cancel()
    for(let eventId of schedules)
      // this is not working properoly
      Tone.Transport.clear(eventId)

    schedules = []
  }



  const commit = () => {
    if(error)
      return

    const p = left+right
    reactLocalStorage.set('pattern', p)

    setHighlighted(true)
    setTimeout(() => setHighlighted(false),300)

    if(soundOn){
      clearTransportSchedules()
      schedule(parsedGrammar)
    }
    if(!context.playingAlone){
      context.sendPattern(p)
    }


  }

  const ensureEmojiSamples = ()=>{
    const p = left+right
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
        ensureEmojiSample(e[0])
    }


  }

  // this function ensures each emoji has a unique sound
  // it tries to get a short asset for listing.json
  const ensureEmojiSample = (e) =>{
    const id = sanitizeEmojiId(e.id)
    if(listingData!==null){
      const path = listingData[id]
      if(path && !players.has(id))
        players.add(id,encodeURI(`${git_raw}${path}`),()=> console.log(`loaded ${id}!`))
    }
  }

  const schedule = (root)=>{
    const emojis = Object.values(emojiIndex.emojis).map((e)=>e.native)
    const emoji_ids = Object.values(emojiIndex.emojis)
      .reduce((o,e)=>Object.assign(o,{[e.native]:sanitizeEmojiId(e.id)}),{})

    const process_emoji = (params) =>{
      if(!samplesLoaded)
        return

      const eid = emoji_ids[params.node.value]
      const index = emojis.indexOf(params.node.value) % samples.length
      //choose a remote or local sample
      const sample = players.has(eid) ? eid : samples[index]

      const id = Tone.Transport.scheduleRepeat( (time)=>{
        if(Math.random()>params.chance)
          return
        const p = players.get(sample)
        p.start(time)
        Tone.Draw.schedule(() =>{
          glyphs.push({life: 1,offset:(params.offset.valueOf()%1), emoji: params.node.value})
	      }, time)
      }, params.cycle.valueOf(),params.offset.valueOf())
      schedules.push(id)
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
  const emojisToShowFilter = (e)=>{
    const emoji = emojiIndex.emojis[e.short_names[0]]
    return (emoji && alphaEmoji.includes(emoji.native))
  }

  //mimick behaviour
  const onInstructionsClick = (e)=>{
    onPreviewClick(e)
  }

  const onPreviewClick = (e)=>{
    //todo: review this tap behaviour
    return


    if(!context.playingAlone)
      return

    setTapped(true)
    setTapping(true)
    setTimeout(()=> setTapped(false),40)

    setTimeout(()=> {
      if((Tone.Transport.seconds)>3.5){
        tapCount = 0
        setTapping(false)
      }
    },4000)


    const bpm = Math.round(60/Tone.Transport.seconds)
    Tone.Transport.stop().start()

    //is bpm in a razonable range?
    if(bpm < 20)
      setTempo((tapCount===0) ? 'tap again' :  'too slow!')
    else if(bpm > 240)
      setTempo((tapCount===0) ? 'tap again' :  'too fast!')
    else{
      setTempo((tapCount===0) ? 'tap again' :  bpm)
      Tone.Transport.bpm.value = bpm
    }

    tapCount++

  }

  return (
    <div className="play">
      <Helmet htmlAttributes={{class:(expanded ? 'full-screen':'normal') }} />
      <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
      {showInstructions &&
        <div className="instructions" onClick={onInstructionsClick}>
          {context.playingAlone ? null :
            <div className="welcome">
              <img src={context.avatarUrl} width={90} />
              <p>
                Hi {context.nick}.<br/>
                You joined {context.channel}.<br/>
                <em>(<a href="/" onClick={context.toggleConfiguring}>change</a>)</em>
              </p>
            </div>}
          <h4>Instructions:</h4>
          <ul>
            <li>Throw a <a className="dice-btn" href="/" onClick={onRandomClick}><span role="img" aria-label="dice">🎲</span></a> {isDesktop && (<>[TAB] </>)}.</li>
            <li>Play <a className="play-btn" href="/" onClick={onCommitClick}><FaPlay /></a> {isDesktop && (<>[ENTER] </>)}.</li>
            <li>Go full screen <FaExpand className="fullscreen-btn" onClick={onExpandClick}/></li>
            {(false && context.playingAlone) ? <li>Tap screen to set tempo</li>: null}
            {isDesktop && (<li>Magical keyboard! ( A={alphaEmoji[0]}, B={alphaEmoji[1]}, so on)</li>)}
            <li>Got it? Then <a href="/" onClick={onHideInstructionsClick}>hide this</a></li>
          </ul>
        </div>}
      <a className="expand" href="/" onClick={onExpandClick}>
        <FaExpand/>
        <FaCompress/>
      </a>
      <FaQuestionCircle className="help" onClick={onToggleHelpClick}/>
      <div className={`${ tapping ? 'tapping' : '' }  ${ error ? 'error' : '' } input`}>
        <span className="clipper" role="img" aria-label="doubt">🤔</span>
        <span className="tempo">{(parseInt(tempo)===tempo)? <><i>{tempo}</i> bpm</> : tempo}</span>
        <pre onClick={onPreviewClick} className={`${ tapped ? 'tapped' : '' } ${highlighted ? 'highlight' : '' } preview`}>
          {emojiArray(left).map((e,i) => <span key={i} onClick={()=>moveCarret(true,i)}>{e}</span>)}
          <span className="carret"></span>
          {emojiArray(right).map((e,i) => <span key={i} onClick={()=>moveCarret(false,i)}>{e}</span>)}
        </pre>
        <nav>
          <FaCaretLeft onClick={onLeftClick}/>
          <FaCaretRight onClick={onRightClick}/>
          <FaBackspace  onClick={onBackspaceClick} onTouchStart={onBackspaceDown} onTouchEnd={onBackspaceUp} onMouseDown={onBackspaceDown} onMouseUp={onBackspaceUp} onMouseLeave={onBackspaceUp}/>
          {context.playingAlone ? (soundOn ? <FaVolume onClick={onSoundToggle}/> : <FaVolumeSlash onClick={onSoundToggle}/>): null}
          <FaDice onClick={onRandomClick}/>
          <FaPlay className="commit-btn" onClick={onCommitClick}/>
        </nav>
      </div>
      <Picker style={{width:'100%',borderRadius:'0',border:0}} showPreview={false} emojiSize={36} native={true} onClick={addEmoji} i18n={i18nEmojis} recent={recentEmojis} custom={customEmojis} color="#222" include={includeEmojis} emojisToShowFilter={emojisToShowFilter}/>
    </div>
  )
}


export default Playground
