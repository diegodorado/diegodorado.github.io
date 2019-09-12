import React from 'react'
import {CV2612Context} from "./context"
import {dmp2patch, emptyParams} from "./utils/patches-utils"

import {reactLocalStorage} from 'reactjs-localstorage'
import { FaPlus,
         FaBackspace,
         FaCaretLeft,
         FaCaretRight,
         FaBomb,
         FaSave,
         FaUpload
        } from 'react-icons/fa'


class Patches extends React.Component {
  static contextType = CV2612Context

  constructor(props){
    super(props)
    this.state = {
      patches: [{name: 'empty', params: emptyParams()}],
      current: 0,
    }
  }

  componentDidMount(){
    const patches = reactLocalStorage.getObject('patches',[])
    if(patches.length===0 || Object.keys(patches).length===0){
      this.loadDefaultPatches()
    }else{
      this.setState({patches:patches})
    }
  }

  save(patches){
    reactLocalStorage.setObject('patches',patches)
    this.setState({patches:patches})
  }

  loadDefaultPatches(){
    //empty previous patches
    this.save([])

    const r = new XMLHttpRequest()
    r.onreadystatechange = (ev) => {
      if(r.readyState === 4 && r.status === 200) {
        const insts = r.responseText.split(/\r?\n/).filter( x => x.length>1)
        for(const i of insts){
          const r = new XMLHttpRequest()
          r.responseType = 'arraybuffer'
          r.onreadystatechange = (ev) => {
            if(r.readyState === 4 && r.status === 200) {
              const d = new Int8Array(r.response)
              this.addDmpPatch(i,d)
            }
          }
          r.open('GET',encodeURI(`/cv2612/instruments/${i}`))
          r.send(null)
        }
      }
    }
    r.open('GET', '/cv2612/instruments/index.txt')
    r.send(null)
  }

  //todo: load to all voices or current voice
  componentDidUpdate(prevProps, prevState) {
    //fixme: if i delete a patch, current doesnt change...
    if(prevState.current !== this.state.current){
      const i = parseInt(this.state.current)
      const patch = this.state.patches[i]
      if(patch)
        this.loadPatch(patch)
    }

    if(prevState.patches.length !== this.state.patches.length){
      this.setState({current:0})
      const patch = this.state.patches[0]
      if(patch)
        this.loadPatch(patch)
    }
  }

  loadPatch(patch) {
    this.context.loadPatch(patch.params)
  }


  addDmpPatch = (name, d) => {
    const patch = dmp2patch(name,d)
    if(patch !== null){
      //is there any risk here?
      const patches = this.state.patches
      patches.push(patch)
      this.save(patches)
    }
  }

  onChangeHandler = (ev) => {
    for(const f of ev.target.files){
      const fr = new FileReader()
      fr.onload = () =>{
        const d = new Int8Array(fr.result)
        this.addDmpPatch(f.name,d)
      }
      fr.readAsArrayBuffer(f)
    }
  }

  onChange = (ev) => {
    this.setState({current: ev.target.value})
    ev.target.blur()
  }

  onSave = (e) => {
    e.preventDefault()
    if(this.state.patches.length===0)
      return

    const patches = this.state.patches
    const i = parseInt(this.state.current)
    patches[i].params = this.context.params
    this.save(patches)

  }

  onCreate = (e) => {
    e.preventDefault()
    let patch = prompt("Name your patch")
    if (patch !== null && patch !== "") {
      const patches = this.state.patches
      patches.push({name:patch, params: this.context.params})
      this.save(patches)
    }
  }

  onDelete = (e) => {
    e.preventDefault()
    if(this.state.patches.length<=1)
      return

    const patches = this.state.patches.filter( (p,i) => i!==parseInt(this.state.current))
    this.save(patches)
  }

  onLoadDefaults = (e) => {
    e.preventDefault()
    this.loadDefaultPatches()
  }

  onLeftClick = (e) => {
    e.preventDefault()
    const i = parseInt(this.state.current)
    if(i>0){
      this.setState({current:i-1})
    }
  }

  onRightClick = (e) => {
    e.preventDefault()
    const i = parseInt(this.state.current)
    if(i<this.state.patches.length-1){
      this.setState({current:i+1})
    }
  }

  onUploadClick = (e) => {
    e.preventDefault()
    this.refs.file.click()
  }

  render() {
    return (
      <nav>
        <a href="/" title="Previous Patch" onClick={this.onLeftClick}><FaCaretLeft/></a>
        <select value={this.state.current} onChange={this.onChange}>
          {this.state.patches.map((p,i) =><option key={i} value={i}>{p.name}</option>)}
        </select>
        <a href="/" title="Next Patch" onClick={this.onRightClick}><FaCaretRight/></a>
        <a href="/" title="Save this Patch" onClick={this.onSave}><FaSave/></a>
        <a href="/" title="Create new Patch" onClick={this.onCreate}><FaPlus/></a>
        <a href="/" title="Upload Patches" onClick={this.onUploadClick}><FaUpload/></a>
        <a href="/" title="Delete this Patch" onClick={this.onDelete}><FaBackspace/></a>
        <a href="/" title="Load default Patches" onClick={this.onLoadDefaults}><FaBomb/></a>
        <input style={{display:'none'}} ref="file" type="file" accept=".dmp" multiple onChange={this.onChangeHandler} / >

      </nav>
    )
  }
}


export default Patches;
