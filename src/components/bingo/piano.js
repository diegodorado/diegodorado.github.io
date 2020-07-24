import Tone from "tone"
import StartAudioContext from 'startaudiocontext'

const noiseGen = () => {
  let scale = 1
  const lerp = (a, b, t ) => a * ( 1 - t ) + b * t
  const r = []
  for ( let i = 0; i<256; ++i ) 
    r.push(Math.random());
  const l = r.length - 1
  return {
    scale: x => {scale = x},
    sample: x => {
      const s = x * scale
      const f = Math.floor(s)
      const t = s - f
      const ss = t * t * ( 3 - 2 * t )
      return lerp( r[f%l], r[(f+1)%l], ss )
    }
  }
}

class Piano {

  constructor(){
    this.ng = noiseGen()
    this.ng.scale(0.3)
    this._step = 0
    this.last = 0
    this.notes = []
    this.sampler = sampler()
    this.muted = false
  }

  step() {
    return this.ng.sample(this._step++)
  }

  playRandomNote(velocity) {
    const t = performance.now()
    const dt = t - this.last
    //prevent double triggers
    if(this.muted || !this.sampler.loaded || dt<100)
      return

    this.last = t
    const index = Math.floor(this.step()*scale.length)
    const note = scale[index]

    this.notes.unshift(note)
    if (this.notes.length > 4) {
      const n = this.notes.pop()
      this.sampler.triggerRelease(n,'+0.5')
    }
    this.sampler.triggerAttack(note,undefined,velocity)
  }

  playStart(){
    if(this.muted || !this.sampler.loaded)
      return
    this.sampler.releaseAll()
    const idxs = []
    while(idxs.length<3){
      //skip some steps
      this.step()
      this.step()
      const idx =  Math.floor((0.5 + 0.5*this.step())*scale.length)
      if(!idxs.includes(idx))
        idxs.push(idx)
    }
    idxs.forEach( (n,i) => this.sampler.triggerAttackRelease(scale[n],(1+i),`+${i*(0.1+Math.random()*0.2)}`, 0.55+Math.random()*0.3) ) 
  }

  playEnd(){
    if(this.muted || !this.sampler.loaded)
      return
    this.sampler.releaseAll()
    const f = Math.floor(0.2*Math.random()*scale.length)
    const s = 3 + Math.floor(Math.random()*3)
    const notes = [0,1,2,3].map( i => {
      const index = (f+s*i) % scale.length
      return scale[index]
    })
    notes.forEach( (n,i) => this.sampler.triggerAttackRelease(n,3,`+0.${i}1`, 0.55+Math.random()*0.3) ) 
  }

}

const startPiano = async () =>{
  try {
    await StartAudioContext(Tone.context)
    Tone.context.latencyHint = 'fastest'
    const piano = new Piano()
    return piano
  } catch (e) {
    console.log(e)
  }
}

const scale = [2,3,4,5].reduce((arr,el) => [...arr, ...'CDEGA'.split('').map(x => x+el)],[])

const sampler = () =>  new Tone.Sampler({
    "A0" : "A0.[mp3|ogg]",
    "C1" : "C1.[mp3|ogg]",
    "D#1" : "Ds1.[mp3|ogg]",
    "F#1" : "Fs1.[mp3|ogg]",
    "A1" : "A1.[mp3|ogg]",
    "C2" : "C2.[mp3|ogg]",
    "D#2" : "Ds2.[mp3|ogg]",
    "F#2" : "Fs2.[mp3|ogg]",
    "A2" : "A2.[mp3|ogg]",
    "C3" : "C3.[mp3|ogg]",
    "D#3" : "Ds3.[mp3|ogg]",
    "F#3" : "Fs3.[mp3|ogg]",
    "A3" : "A3.[mp3|ogg]",
    "C4" : "C4.[mp3|ogg]",
    "D#4" : "Ds4.[mp3|ogg]",
    "F#4" : "Fs4.[mp3|ogg]",
    "A4" : "A4.[mp3|ogg]",
    "C5" : "C5.[mp3|ogg]",
    "D#5" : "Ds5.[mp3|ogg]",
    "F#5" : "Fs5.[mp3|ogg]",
    "A5" : "A5.[mp3|ogg]",
    "C6" : "C6.[mp3|ogg]",
    "D#6" : "Ds6.[mp3|ogg]",
    "F#6" : "Fs6.[mp3|ogg]",
    "A6" : "A6.[mp3|ogg]",
    "C7" : "C7.[mp3|ogg]",
    "D#7" : "Ds7.[mp3|ogg]",
    "F#7" : "Fs7.[mp3|ogg]",
    "A7" : "A7.[mp3|ogg]",
    "C8" : "C8.[mp3|ogg]"
  }, {
    release : 1,
    baseUrl : "https://tonejs.github.io/audio/salamander/",
    onload: () => {
      //console.log('loaded sampler')
    }
}).toMaster()

export {startPiano}
