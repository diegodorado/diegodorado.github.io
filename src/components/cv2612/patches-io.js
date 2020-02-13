import {  reactLocalStorage} from 'reactjs-localstorage'
import {  dmp2voice,  emptyPatch} from "./utils/patches-utils"

const init = async () => {
  let patches = []
  // let patches = reactLocalStorage.getObject('patches',[])
  if (patches.length === 0) { //} || Object.keys(state.patches).length===0){
    patches = await defaultPatches()
    reactLocalStorage.setObject('patches', patches)
  }
  return patches
}

const defaultPatches = async () => {
  const p = []
  const resp = await fetch('/cv2612/instruments/index.txt')
  const list = await resp.text()
  const insts = list.split(/\r?\n/).filter(x => x.length > 1)
  for (const i of insts) {
    const resp = await fetch(encodeURI(`/cv2612/instruments/${i}`))
    const buffer = await resp.arrayBuffer()
    const data = new Int8Array(buffer)
    const voice = dmp2voice(data)
    //invalid dmp format can result in null voice
    if(voice){
      const patch = emptyPatch()
      patch.name = i.replace('.dmp', '')
      patch.voices[0] = voice
      p.push(patch)
    }
  }
  return p
}

export default {
  init
}
