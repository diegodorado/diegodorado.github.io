//import {  reactLocalStorage} from 'reactjs-localstorage'
import { dmp2instrument, emptyInstrument} from './utils/patches-utils'

const emptyPreset = () =>{
  const p = {}
  p['name'] = 'empty'
  p['pm'] = 0
  p['patches'] = []
  for(let i=0;i<4;i++)
    p['patches'][i] = emptyPatch()
  return p
}

const emptyPatch = () =>{
  const patch = {}
  patch['lfo'] = 0
  patch['instruments'] = []
  for(let i=0;i<6;i++)
    patch['instruments'][i] = emptyInstrument()
  return patch
} 

//todo: use api for storing patches!
const load = async () => {
  //hack
  const instruments = await defaultInstruments()
  const presets = []

  //creates a complex preset
  const p = emptyPreset()
  p['sv'] = false
  p.name = 'Complex Random Preset'
  for (let i=0;i<4;i++)
    for(let j=0;j<6;j++)
      p.patches[i].instruments[j] = Object.assign({}, instruments[Math.floor(Math.random()*instruments.length)])
  presets.push(p)

  //creates a simple preset for each instrument
  instruments.forEach( inst => {
    const p = emptyPreset()
    p['sv'] = true
    p.name = inst.name
    for (let i=0;i<4;i++)
      for(let j=0;j<6;j++)
        p.patches[i].instruments[j] = Object.assign({}, inst)
    presets.push(p)
  })

  return {instruments,presets}
  /*
  let patches = reactLocalStorage.getObject('patches',[])
  if (patches.length === 0) {
    patches = await defaultPatches()
    reactLocalStorage.setObject('patches', patches)
  }
  return patches
  */
}

const defaultInstruments = async () => {
  const instruments = []
  const resp = await fetch('/cv2612/instruments/index.txt')
  const list = await resp.text()
  const insts = list.split(/\r?\n/).filter(x => x.length > 1)
  for (const i of insts) {
    const resp = await fetch(encodeURI(`/cv2612/instruments/${i}`))
    const buffer = await resp.arrayBuffer()
    const data = new Int8Array(buffer)
    const inst = dmp2instrument(data)
    inst.name = i.replace('.dmp', '')
    instruments.push(inst)
  }
  return instruments
}


export default {
  load
}
