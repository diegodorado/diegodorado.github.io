(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{159:function(e,t,n){"use strict";n.r(t);var a=n(7),r=n.n(a),i=n(0),s=n.n(i),o=n(170),c=n(167),l=n.n(c),u=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props.children;return s.a.createElement("div",{id:"app"},s.a.createElement("header",null,s.a.createElement(l.a,{bodyAttributes:{class:"dark cv2612"}}),s.a.createElement(o.a,{title:"diego dorado"})),s.a.createElement("main",null,e))},t}(s.a.Component),h=n(168),p=(n(25),n(213),n(189),n(80),n(76),n(56),n(38),n(251),n(35),function(e,t){if(9===t[0]&&1===t[1]&&0===t[2]||11===t[0]&&2===t[1]&&1===t[2]){for(var n={"6_4_lfo":0,"6_4_en":0},a=0;a<=6;a++){n[a+"_4_fms"]=t[3],n[a+"_4_fb"]=t[4],n[a+"_4_al"]=t[5],n[a+"_4_ams"]=t[6],n[a+"_4_st"]=3;for(var r=0;r<=4;r++){var i=11*(4===r?0:r)+7;n[a+"_"+r+"_mul"]=t[i+0],n[a+"_"+r+"_tl"]=t[i+1],n[a+"_"+r+"_ar"]=t[i+2],n[a+"_"+r+"_d1"]=t[i+3],n[a+"_"+r+"_sl"]=t[i+4],n[a+"_"+r+"_rr"]=t[i+5],n[a+"_"+r+"_am"]=t[i+6],n[a+"_"+r+"_rs"]=t[i+7],n[a+"_"+r+"_det"]=t[i+8],n[a+"_"+r+"_d2"]=t[i+9]}}return{name:e.replace(".dmp",""),params:n}}return null}),d=function(){for(var e={"6_4_lfo":0,"6_4_en":0},t=0;t<=6;t++){e[t+"_4_fms"]=0,e[t+"_4_fb"]=0,e[t+"_4_al"]=0,e[t+"_4_ams"]=0,e[t+"_4_st"]=3;for(var n=0;n<=4;n++)e[t+"_"+n+"_mul"]=0,e[t+"_"+n+"_tl"]=0,e[t+"_"+n+"_ar"]=0,e[t+"_"+n+"_d1"]=0,e[t+"_"+n+"_sl"]=0,e[t+"_"+n+"_rr"]=0,e[t+"_"+n+"_am"]=0,e[t+"_"+n+"_rs"]=0,e[t+"_"+n+"_det"]=0,e[t+"_"+n+"_d2"]=0}return e},m=function(e){for(var t=1,n=0,a=[["am","en"],["rs","st","ams"],["det","al","fb","fms","lfo"],["sl","rr","mul"],["ar","d2","d1"],[],["tl"]];n<a.length;n++){if(a[n].some(function(t){return e.endsWith(t)}))return t;t++}return 0},f=function(){var e=d();for(var t in e)e[t]={cc:null,ch:null};return e};var v=n(177),g=s.a.createContext(),y=(g.Consumer,["ar","d1","sl","d2","rr","tl","mul","det","rs","am","al","fb","ams","fms","st","lfo","en"]),C=function(e){function t(t){var n;return(n=e.call(this,t)||this).handleCC=function(e,t,a){var r=n.state.activeParameter;if(n.state.mapping[r]&&n.state.learning){var i=Object.assign({},n.state.mapping);i[r].ch!==e&&i[r].cc!==t&&(i[r].ch=e,i[r].cc=t,n.setState({mapping:i}),v.reactLocalStorage.setObject("mapping",i))}for(var s=0,o=Object.entries(n.state.mapping);s<o.length;s++){var c=o[s],l=c[0],u=c[1];if(u.cc===t&&u.ch===e){var h=m(l),p=128/Math.pow(2,h),d=Math.floor(a/p);n.updateParam(l,d)}}},n.toggleLearning=function(){n.setState({learning:!n.state.learning})},n.sendParameter=function(e,t){var a=e.split("_"),r=parseInt(a[0]),i=parseInt(a[1]),s=a[2],o=y.indexOf(s);if(-1===o)console.error("Unexpected param "+s+" in code "+e);else{if(6===r)for(var c=0;c<5;c++){var l=[c,i,o];n.state.midi.sendSysexSet(l,t)}else{var u=[r,i,o];n.state.midi.sendSysexSet(u,t)}n.state.emulator.update(r,i,s,t,n.state.params)}},n.sendParameters=function(e){for(var t=0,a=Object.entries(e);t<a.length;t++){var r=a[t],i=r[0],s=r[1];n.sendParameter(i,s)}},n.setActiveParameter=function(e){n.setState({activeParameter:e})},n.updateParam=function(e,t){var a=Object.assign({},n.state.params);a[e]=t,n.setState({params:a})},n.updateParams=function(e,t){for(var a=Object.assign({},n.state.params),r=0,i=Object.entries(e);r<i.length;r++){var s=i[r],o=s[0],c=s[1];a[o]=c}n.setState({params:a}),n.loadingPatch=t},n.filterChannel=function(e){var t=Object.assign({},n.state.filters);t.ch=e,n.setState({filters:t})},n.state={midi:null,emulator:null,learning:!1,activeParameter:null,envelopes:{},mapping:f(),params:d(),filters:{ch:6},soundOn:!1,setActiveParameter:n.setActiveParameter,updateParam:n.updateParam,updateParams:n.updateParams,filterChannel:n.filterChannel,toggleLearning:n.toggleLearning,handleCC:n.handleCC,sendParameters:n.sendParameters},n}r()(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=v.reactLocalStorage.getObject("mapping",{});if(Object.keys(e).length>0){for(var t=Object.assign({},this.state.mapping),n=0,a=Object.entries(e);n<a.length;n++){var r=a[n],i=r[0],s=r[1];t[i]=s}this.setState({mapping:t})}},n.componentDidUpdate=function(e,t){var n,a,r=(n=t.params,a=this.state.params,Object.keys(a).reduce(function(e,t){var r;return n[t]===a[t]?e:Object.assign({},e,((r={})[t]=a[t],r))},{}));Object.entries(r).length>0&&(this.sendParameters(r),this.loadingPatch?this.loadingPatch=!1:this.updateOmniIfChanged(r),this.updateEnvelopesIfChanged(r))},n.updateOmniIfChanged=function(e){for(var t={},n=0,a=Object.keys(e);n<a.length;n++){var r=a[n],i=r.split("_");if("6"===i[0])for(var s=0;s<=6;s++)if("4"===i[1])for(var o=0;o<=4;o++)t[s+"_"+o+"_"+i[2]]=e[r];else t[s+"_"+i[1]+"_"+i[2]]=e[r];else if("4"===i[1])for(var c=0;c<=4;c++)t[i[0]+"_"+c+"_"+i[2]]=e[r]}Object.entries(t).length>0&&this.updateParams(t,!1)},n.updateEnvelopesIfChanged=function(e){var t=this,n=["ar","d1","sl","d2","rr","tl"],a=Object.keys(e).reduce(function(e,t){return n.some(function(e){return t.endsWith(e)})&&e.push(t.substring(0,3)),e},[]).filter(function(e,t,n){return n.indexOf(e)===t});if(a.length){var r=Object.assign({},this.state.envelopes);a.forEach(function(e){var a=n.reduce(function(n,a){return n[""+a]=t.state.params[e+"_"+a],n},{});r[e]=t.calculateEnvelopePoints(a)}),this.setState({envelopes:r})}},n.calculateEnvelopePoints=function(e){var t=Math.round((31-e.ar)/31*100),n=Math.round(e.tl/127*100),a=Math.round(t+(31-e.d1)/31*100),r=Math.round(n+(100-n)*(e.sl/15)),i=Math.round(a+(31-e.d2)/31*50+50);return[[0,100],[t,n],[a,r],[i,Math.round(r+(100-r)*(e.d2/31*.5))],[Math.round(i+(31-e.rr)/31*100),100]].map(function(e){return e.join(",")}).join(" ").replace(/NaN/g,"0")},n.render=function(){return s.a.createElement(g.Provider,{value:this.state},this.props.children)},t}(s.a.Component),E=(n(183),n(79),n(82),n(101),n(252),n(186)),I=function(e){function t(t){var n;return(n=e.call(this,t)||this).midiCtrlInId="",n.midiInId="",n.midiOutId="",n.midiAccess=null,n.onChangeMidiIn=function(e){n.setMidiIn(e.target.value)},n.onChangeMidiCtrlIn=function(e){n.setMidiCtrlIn(e.target.value)},n.onChangeMidiOut=function(e){n.setMidiOut(e.target.value)},n.sysexCount=0,n.sendSysex=function(e){n.sendMidi(e),n.sysexCount++,console.log("sysexCount",n.sysexCount)},n.sendSysexSet=function(e,t){var a=[240,65,38,18,18],r=127-(e[0]+e[1]+e[2]+t)%127;a.push(e[0]),a.push(e[1]),a.push(e[2]),a.push(t),a.push(r),a.push(247),n.sendSysex(a)},n.sendMidi=function(e){var t=n.midiAccess;if(null!==t){var a=t.outputs.get(n.midiOutId);a?a.send(e):console.log("No Midi Out")}},n.onMIDIStateChange=function(e){n.refreshMidiPorts()},n.onCtrlMIDIMessage=function(e){if(e.target.id===n.midiCtrlInId){var t=Array.from(e.data),a=240&t[0];if(176===a){var r=15&t[0],i=127&t[1],s=127&t[2];n.context.handleCC(r,i,s),n.setState({lastMsg:a+","+r+","+i+","+s})}128!==a&&144!==a||(n.sendMidi(t),144===a?n.context.emulator.noteOn(t[1]):n.context.emulator.noteOff(t[1]))}},n.onMIDIMessage=function(e){if(e.target.id===n.midiInId){var t=Array.from(e.data);if(240!==(240&t[0]));else{JSON.stringify(t)===JSON.stringify([240,126,0,6,2,38,38,18,0,0,1,0,0,0,247])&&console.log("CV2612 found!")}}},n.onLearnClick=function(e){e.preventDefault(),n.context.toggleLearning()},n.onPanicClick=function(e){e.preventDefault(),n.sendMidi([255])},n.onClearClick=function(e){e.preventDefault(),n.sendSysexSet([6,4,17],0)},n.onToggleSoundClick=function(e){e.preventDefault(),n.context.toggleSound()},n.state={midiIns:[],midiOuts:[]},n}r()(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=this;navigator.requestMIDIAccess({sysex:!0}).then(function(t){e.midiAccess=t,e.refreshMidiPorts(),t.onstatechange=e.onMIDIStateChange},function(){return console.log("Could not access your MIDI devices.")}),this.context.midi=this},n.setMidiOut=function(e){this.midiOutId=e,this.setState({midiOutId:e}),v.reactLocalStorage.set("midiOutId",e),this.sendHandshake()},n.setMidiIn=function(e){this.midiInId=e,this.setState({midiInId:e}),v.reactLocalStorage.set("midiInId",e);var t=this.midiAccess.inputs.get(e);t?t.onmidimessage=this.onMIDIMessage:console.log("Midi In error")},n.setMidiCtrlIn=function(e){this.midiCtrlInId=e,this.setState({midiCtrlInId:e}),v.reactLocalStorage.set("midiCtrlInId",e);var t=this.midiAccess.inputs.get(e);t?t.onmidimessage=this.onCtrlMIDIMessage:console.log("Midi Ctrl In error")},n.sendHandshake=function(){this.sendSysex([240,126,127,6,1,247])},n.refreshMidiPorts=function(){var e=this.midiAccess,t=Array.from(e.inputs.values()),n=Array.from(e.outputs.values());if(this.setState({midiIns:t,midiOuts:n}),t.length){var a=v.reactLocalStorage.get("midiInId","");""===a||t.map(function(e){return e.id}).includes(a)||(a=t[0].id),a!==this.midiInId&&this.setMidiIn(a),""===(a=v.reactLocalStorage.get("midiCtrlInId",""))||t.map(function(e){return e.id}).includes(a)||(a=t[0].id),a!==this.midiCtrlInId&&this.setMidiCtrlIn(a)}if(n.length){var r=v.reactLocalStorage.get("midiOutId","");""===r||n.map(function(e){return e.id}).includes(r)||(r=n[0].id),r!==this.midiOutId&&this.setMidiOut(r)}},n.render=function(){return s.a.createElement("nav",{className:"midi"},s.a.createElement("span",null,"Ctrl"),s.a.createElement("select",{value:this.state.midiCtrlInId,onChange:this.onChangeMidiCtrlIn},s.a.createElement("option",{key:"",value:""},"Not Connected"),this.state.midiIns.map(function(e){return s.a.createElement("option",{key:e.id,value:e.id},e.name)})),s.a.createElement("span",null,"In"),s.a.createElement("select",{value:this.state.midiInId,onChange:this.onChangeMidiIn},s.a.createElement("option",{key:"",value:""},"Not Connected"),this.state.midiIns.map(function(e){return s.a.createElement("option",{key:e.id,value:e.id},e.name)})),s.a.createElement("span",null,"Out"),s.a.createElement("select",{value:this.state.midiOutId,onChange:this.onChangeMidiOut},s.a.createElement("option",{key:"",value:""},"Not Connected"),this.state.midiOuts.map(function(e){return s.a.createElement("option",{key:e.id,value:e.id},e.name)})),s.a.createElement("a",{className:this.context.learning?"learning":"",href:"/",title:"Click to Learn",onClick:this.onLearnClick},s.a.createElement(E.n,null)),s.a.createElement("a",{href:"/",title:"Click if panic",onClick:this.onPanicClick},s.a.createElement(E.h,null)),s.a.createElement("a",{href:"/",title:"Click to clear midi mapping",onClick:this.onClearClick},s.a.createElement(E.r,null)))},t}(s.a.Component);I.contextType=g;var x=I,M=(n(254),n(257),n(258)),_=new(n.n(M).a)({polyphony:1,rows:1,priority:"last",octave:2}),k=function(e){function t(t){var n;return(n=e.call(this,t)||this).audioCtx=null,n.tick=function(){n.stopAnimation||(n.drawScope(),n.drawSpectrum(),requestAnimationFrame(n.tick))},n.noteOn=function(e){var t=440*Math.pow(2,(e-69)/12);n.onKeyDown({note:e,frequency:t})},n.noteOff=function(e){n.onKeyUp({note:e})},n.onKeyDown=function(e){e.note<0||e.note>127||(n.context.midi.sendMidi([144,e.note,112]),n.ym2612Node&&(-1===n.notes.indexOf(e.note)&&n.notes.push(e.note),n.setFrequency(e.frequency),1===n.notes.length&&n.keyOn()))},n.onKeyUp=function(e){if(!(e.note<0||e.note>127)&&(n.context.midi.sendMidi([128,e.note,0]),n.ym2612Node)){for(var t=0;t<n.notes.length;t++)n.notes[t]===e.note&&n.notes.splice(t,1);0===n.notes.length&&n.keyOff()}},n.update=function(e,t,a,r,i){var s=["fb","ams","fms","st","al"];if((6!==e&&4!==t||!["ar","d1","sl","d2","rr","tl","mul","det","rs","am"].includes(a))&&!(6===e&&s.includes(a)||4!==t&&s.includes(a)||(4!==t||6!==e)&&["lfo","en"].includes(a))){var o=256*Math.floor(e/3)+e%3,c=function(n,a,r){return(i[e+"_"+t+"_"+n]&Math.pow(2,a)-1)<<r};if("lfo"===a||"en"===a){var l=c("en",1,3)|c("lfo",3,0);n.write(34,l)}else if("det"===a||"mul"===a){var u=c("det",3,4)|c("mul",4,0);n.write(48+4*t+o,u)}else if("tl"===a){var h=c("tl",7,0);n.write(64+4*t+o,h)}else if("rs"===a||"ar"===a){var p=c("rs",2,6)|c("ar",5,0);n.write(80+4*t+o,p)}else if("am"===a||"d1"===a){var d=c("am",1,7)|c("d1",5,0);n.write(96+4*t+o,d)}else if("d2"===a){var m=c("d2",5,0);n.write(112+4*t+o,m)}else if("sl"===a||"rr"===a){var f=c("sl",4,4)|c("rr",4,0);n.write(128+4*t+o,f)}else if("al"===a||"fb"===a){var v=c("fb",3,3)|c("al",3,0);n.write(176+o,v)}else if("st"===a||"ams"===a||"fms"===a){var g=c("st",2,6)|c("ams",2,4)|c("fms",3,0);n.write(180+o,g)}}},n.onToggleSoundClick=function(e){e.preventDefault(),"running"===n.audioCtx.state?n.audioCtx.suspend().then(function(){n.setState({soundOn:!1})}):"suspended"===n.audioCtx.state&&n.audioCtx.resume().then(function(){n.initialize()})},n.state={soundOn:!1},n.fftSize=1024,n}r()(t,e);var n=t.prototype;return n.componentDidMount=function(){this.audioCtx=new AudioContext,"running"===this.audioCtx.state&&this.initialize(),this.notes=[],this.context.emulator=this,_.down(this.onKeyDown),_.up(this.onKeyUp),this.scope=this.refs.scope.getContext("2d"),this.scope.fillStyle="rgba(0, 20, 0, 0.1)",this.scope.lineWidth=2,this.scope.strokeStyle="#509eec",this.spectrum=this.refs.spectrum.getContext("2d"),this.spectrum.fillStyle="rgba(0, 20, 0, 0.1)",this.spectrum.lineWidth=1,this.spectrum.strokeStyle="#509eec",this.stopAnimation=!1,this.timeData=new Uint8Array(this.fftSize).fill(128),this.freqData=new Uint8Array(this.fftSize)},n.componentWillUnmount=function(){this.audioCtx.suspend(),_._listeners.down=[],_._listeners.up=[],this.stopAnimation=!0,this.timeData=null,this.freqData=null},n.drawScope=function(){var e=this.scope,t=e.canvas.width,n=e.canvas.height,a=this.fftSize,r=n/256;this.analyser&&this.analyser.getByteTimeDomainData(this.timeData),e.fillRect(0,0,t,n),e.beginPath();for(var i=this.timeData.reduce(function(e,t,n,r){return 0===e&&n>0&&n<a-10&&r[n-1]<128&&r[n+10]>128?n:e},0),s=i;s<a&&s-i<t;s++)e.lineTo(s-i,n-this.timeData[s]*r);e.stroke()},n.drawSpectrum=function(){var e=this.spectrum,t=e.canvas.width,n=e.canvas.height,a=this.fftSize,r=n/256,i=t/a;this.analyser&&this.analyser.getByteFrequencyData(this.freqData),e.fillRect(0,0,t,n),e.beginPath();for(var s,o,c,l=1;l<a;l++){var u=(c=void 0,c=(l-(s=1))/((o=a-1)-s),s*Math.pow(o/s,c)),h=Math.floor(u),p=Math.ceil(u),d=this.freqData[h],m=d+(this.freqData[p]-d)*((u-h)/(p-h));e.lineTo(l*i,n-m*r)}e.stroke()},n.initialize=function(){var e=this;this.audioCtx.audioWorklet.addModule("/cv2612/ym2612-processor.js").then(function(){e.ym2612Node=new AudioWorkletNode(e.audioCtx,"ym2612-generator",{outputChannelCount:[2]}),e.ym2612Node.port.onmessage=function(e){console.log(e.data)},e.ym2612Node.connect(e.audioCtx.destination),e.analyser=e.audioCtx.createAnalyser(),e.analyser.fftSize=e.fftSize,e.ym2612Node.connect(e.analyser),e.write(39,0),e.write(40,0),e.context.sendParameters(e.context.params)}),this.setState({soundOn:!0})},n.setFrequency=function(e){for(var t=2;e>=2048;)e/=2,t++;for(var n=parseInt(e),a=0;a<6;a++){var r=256*Math.floor(a/3)+a%3;this.write(164+r,n>>8&7|(7&t)<<3),this.write(160+r,255&n)}},n.keyOn=function(){for(var e=0;e<6;e++)this.write(40,4*Math.floor(e/3)+e%3+240)},n.keyOff=function(){for(var e=0;e<6;e++)this.write(40,4*Math.floor(e/3)+e%3+0)},n.write=function(e,t){this.ym2612Node&&this.ym2612Node.port.postMessage([e,t])},n.render=function(){return s.a.createElement("div",{className:"emulator"},s.a.createElement("nav",null,s.a.createElement("a",{href:"/",title:"Toggles Sound",onClick:this.onToggleSoundClick},this.state.soundOn?s.a.createElement(E.t,null):s.a.createElement(E.u,null))),s.a.createElement("canvas",{ref:"scope",width:200,height:60}),s.a.createElement("canvas",{ref:"spectrum",width:200,height:60}))},t}(s.a.Component);k.contextType=g;var S,w=k,O=(n(203),0),D=!1,b=function(e){function t(t){var n;return(n=e.call(this,t)||this).onClick=function(e){e.preventDefault(),n.setState({sequencerOn:!n.state.sequencerOn})},n.state={sequencerOn:!1},n}r()(t,e);var n=t.prototype;return n.componentWillUnmount=function(){this.sequencerStop()},n.sequencerStop=function(){clearTimeout(S),D&&(this.context.midi.sendMidi([128,O,0]),D=!1)},n.sequencerTick=function(){var e=this;if(D?(this.context.midi.sendMidi([128,O,0]),D=!1):(O=[0,3,5,7,10].sort(function(){return Math.random()-.5})[0]+12*(3+Math.floor(5*Math.random())),this.context.midi.sendMidi([144,O,100]),D=!0),this.state.sequencerOn){var t=500/Math.pow(2,Math.floor(5*Math.random()));S=setTimeout(function(){return e.sequencerTick()},t)}},n.componentDidUpdate=function(e,t){t.sequencerOn!==this.state.sequencerOn&&(this.state.sequencerOn?this.sequencerTick():this.sequencerStop())},n.render=function(){return null},t}(s.a.Component);b.contextType=g;var P=b,q=(n(265),n(195),n(196),function(e){function t(t){var n;return(n=e.call(this,t)||this).addDmpPatch=function(e,t){var a=p(e,t);if(null!==a){var r=n.state.patches;r.push(a),n.save(r)}},n.onChangeHandler=function(e){var t=function(){if(r){if(i>=a.length)return"break";s=a[i++]}else{if((i=a.next()).done)return"break";s=i.value}var e=s,t=new FileReader;t.onload=function(){var a=new Int8Array(t.result);n.addDmpPatch(e.name,a)},t.readAsArrayBuffer(e)},a=e.target.files,r=Array.isArray(a),i=0;for(a=r?a:a[Symbol.iterator]();;){var s;if("break"===t())break}},n.onChange=function(e){n.setState({current:e.target.value}),e.target.blur()},n.onSave=function(e){if(e.preventDefault(),0!==n.state.patches.length){var t=n.state.patches;t[parseInt(n.state.current)].params=n.context.params,n.save(t)}},n.onCreate=function(e){e.preventDefault();var t=prompt("Name your patch");if(null!==t&&""!==t){var a=n.state.patches;a.push({name:t,params:n.context.params}),n.save(a)}},n.onDelete=function(e){if(e.preventDefault(),!(n.state.patches.length<=1)){var t=n.state.patches.filter(function(e,t){return t!==parseInt(n.state.current)});n.save(t)}},n.onLoadDefaults=function(e){e.preventDefault(),n.loadDefaultPatches()},n.onLeftClick=function(e){e.preventDefault();var t=parseInt(n.state.current);t>0&&n.setState({current:t-1})},n.onRightClick=function(e){e.preventDefault();var t=parseInt(n.state.current);t<n.state.patches.length-1&&n.setState({current:t+1})},n.onUploadClick=function(e){e.preventDefault(),n.refs.file.click()},n.state={patches:[{name:"empty",params:d()}],current:0},n}r()(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=v.reactLocalStorage.getObject("patches",[]);0===e.length||0===Object.keys(e).length?this.loadDefaultPatches():this.setState({patches:e})},n.save=function(e){v.reactLocalStorage.setObject("patches",e),this.setState({patches:e})},n.loadDefaultPatches=function(){var e=this;this.save([]);var t=new XMLHttpRequest;t.onreadystatechange=function(n){if(4===t.readyState&&200===t.status){var a=function(){if(i){if(s>=r.length)return"break";o=r[s++]}else{if((s=r.next()).done)return"break";o=s.value}var t=o,n=new XMLHttpRequest;n.responseType="arraybuffer",n.onreadystatechange=function(a){if(4===n.readyState&&200===n.status){var r=new Int8Array(n.response);e.addDmpPatch(t,r)}},n.open("GET",encodeURI("/cv2612/instruments/"+t)),n.send(null)},r=t.responseText.split(/\r?\n/).filter(function(e){return e.length>1}),i=Array.isArray(r),s=0;for(r=i?r:r[Symbol.iterator]();;){var o;if("break"===a())break}}},t.open("GET","/cv2612/instruments/index.txt"),t.send(null)},n.componentDidUpdate=function(e,t){if(t.current!==this.state.current){var n=parseInt(this.state.current),a=this.state.patches[n];a&&this.loadPatch(a)}if(t.patches.length!==this.state.patches.length){this.setState({current:0});var r=this.state.patches[0];r&&this.loadPatch(r)}},n.loadPatch=function(e){this.context.updateParams(e.params,!0)},n.render=function(){return s.a.createElement("nav",null,s.a.createElement("a",{href:"/",title:"Previous Patch",onClick:this.onLeftClick},s.a.createElement(E.c,null)),s.a.createElement("select",{value:this.state.current,onChange:this.onChange},this.state.patches.map(function(e,t){return s.a.createElement("option",{key:t,value:t},e.name)})),s.a.createElement("a",{href:"/",title:"Next Patch",onClick:this.onRightClick},s.a.createElement(E.d,null)),s.a.createElement("a",{href:"/",title:"Save this Patch",onClick:this.onSave},s.a.createElement(E.m,null)),s.a.createElement("a",{href:"/",title:"Create new Patch",onClick:this.onCreate},s.a.createElement(E.k,null)),s.a.createElement("a",{href:"/",title:"Upload Patches",onClick:this.onUploadClick},s.a.createElement(E.s,null)),s.a.createElement("a",{href:"/",title:"Delete this Patch",onClick:this.onDelete},s.a.createElement(E.a,null)),s.a.createElement("a",{href:"/",title:"Load default Patches",onClick:this.onLoadDefaults},s.a.createElement(E.b,null)),s.a.createElement("input",{style:{display:"none"},ref:"file",type:"file",accept:".dmp",multiple:!0,onChange:this.onChangeHandler}))},t}(s.a.Component));q.contextType=g;var A=q,T=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={},n.code=t.ch+"_"+t.op,n}return r()(t,e),t.prototype.render=function(){return s.a.createElement("div",{className:"envelope"},s.a.createElement("svg",{height:"100",width:"400",viewBox:"0 0 400 100",xmlns:"http://www.w3.org/2000/svg"},s.a.createElement("polyline",{points:this.context.envelopes[this.code]})))},t}(s.a.Component);T.contextType=g,T.defaultProps={ch:6,op:4};var j=T,N=function(e){function t(t){var n;(n=e.call(this,t)||this).onChange=function(e){e.preventDefault(),n.context.updateParam(n.code,parseInt(e.target.value)),n.context.setActiveParameter(n.code)},n.onClick=function(e){e.preventDefault(),n.context.setActiveParameter(n.code)},n.code=t.ch+"_"+t.op+"_"+t.name;var a=m(n.code);return n.max=Math.pow(2,a)-1,n.state={},n}return r()(t,e),t.prototype.render=function(){var e=this.context.mapping[this.code],t=null!==(e.ch&&e.cc),n="slider";return this.context.learning&&(n+=" learn"),this.context.activeParameter===this.code&&(n+=" active"),t&&(n+=" mapped"),s.a.createElement("div",{className:n,onClick:this.onClick,code:this.code},s.a.createElement("label",null,this.props.name),s.a.createElement("input",{type:"range",step:1,min:0,max:this.max,value:this.context.params[this.code],onChange:this.onChange}),s.a.createElement("span",null,this.context.params[this.code]+(this.context.learning?t?" - "+e.ch+":"+e.cc:" - n/a":"")))},t}(s.a.Component);N.contextType=g,N.defaultProps={env:!1,ch:6,op:4};var L=N,U=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){return s.a.createElement("div",{className:"operator"},s.a.createElement("h5",null,"Op ",4===this.props.op?"Omni":this.props.op+1),s.a.createElement(L,{name:"ar",ch:this.props.ch,op:this.props.op}),s.a.createElement(L,{name:"d1",ch:this.props.ch,op:this.props.op}),s.a.createElement(L,{name:"sl",ch:this.props.ch,op:this.props.op}),s.a.createElement(L,{name:"d2",ch:this.props.ch,op:this.props.op}),s.a.createElement(L,{name:"rr",ch:this.props.ch,op:this.props.op}),s.a.createElement(L,{name:"tl",ch:this.props.ch,op:this.props.op}),s.a.createElement(j,{ch:this.props.ch,op:this.props.op}),s.a.createElement(L,{name:"mul",ch:this.props.ch,op:this.props.op}),s.a.createElement(L,{name:"det",ch:this.props.ch,op:this.props.op}),s.a.createElement(L,{name:"rs",ch:this.props.ch,op:this.props.op}),s.a.createElement(L,{name:"am",ch:this.props.ch,op:this.props.op}))},t}(s.a.Component);U.contextType=g,U.defaultProps={ch:6};var R=U;var z=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){return s.a.createElement("div",{className:"channel"},s.a.createElement("table",null,s.a.createElement("tbody",null,s.a.createElement("tr",null,s.a.createElement("td",null,s.a.createElement(L,{name:"lfo"})),s.a.createElement("td",null,s.a.createElement(L,{name:"en"})),s.a.createElement("td",null),s.a.createElement("td",null),s.a.createElement("td",null,s.a.createElement("pre",{className:"algorithm"},function(e){switch(e){case 0:return"\n\n\n\n╔═╗ ╔═╗ ╔═╗ ╔═╗\n║1╠═╣2╠═╣3╠═╣4╠══\n╚═╝ ╚═╝ ╚═╝ ╚═╝\n\n\n\n";case 1:return"\n\n╔═╗\n║1╠═╗\n╚═╝ ║  ╔═╗  ╔═╗\n    ╠══╣3╠══╣4╠══\n╔═╗ ║  ╚═╝  ╚═╝\n║2╠═╝\n╚═╝\n\n";case 2:return"\n\n     ╔═╗\n     ║1╠═╗\n     ╚═╝ ║  ╔═╗\n         ╠══╣4╠══\n╔═╗  ╔═╗ ║  ╚═╝\n║2╠══╣3╠═╝\n╚═╝  ╚═╝\n\n";case 3:return"\n\n╔═╗  ╔═╗\n║1╠══╣2╠═╗\n╚═╝  ╚═╝ ║  ╔═╗\n         ╠══╣4╠══\n     ╔═╗ ║  ╚═╝\n     ║3╠═╝\n     ╚═╝\n\n";case 4:return"\n\n╔═╗  ╔═╗\n║1╠══╣2╠═╗\n╚═╝  ╚═╝ ║\n         ╠══\n╔═╗  ╔═╗ ║\n║3╠══╣4╠═╝\n╚═╝  ╚═╝\n\n";case 5:return"\n      ╔═╗\n    ╔═╣2╠══╗\n    ║ ╚═╝  ║\n╔═╗ ║ ╔═╗  ║\n║1╠═╬═╣3╠══╬══\n╚═╝ ║ ╚═╝  ║\n    ║ ╔═╗  ║\n    ╚═╣4╠══╝\n      ╚═╝\n";case 6:return"\n ╔═╗  ╔═╗\n ║1╠══╣2╠══╗\n ╚═╝  ╚═╝  ║\n      ╔═╗  ║\n      ║3╠══╬══\n      ╚═╝  ║\n      ╔═╗  ║\n      ║4╠══╝\n      ╚═╝\n";case 7:return"\n\n\n╔═╗ ╔═╗ ╔═╗ ╔═╗\n║1║ ║2║ ║3║ ║4║\n╚╦╝ ╚╦╝ ╚╦╝ ╚╦╝\n ╚═══╩═╦═╩═══╝\n       ║\n       ╚══\n\n";default:return"no algorithm"}}(this.context.params[this.props.ch+"_4_al"])))),s.a.createElement("tr",null,s.a.createElement("td",null,s.a.createElement(L,{name:"fb",ch:this.props.ch})),s.a.createElement("td",null,s.a.createElement(L,{name:"ams",ch:this.props.ch})),s.a.createElement("td",null,s.a.createElement(L,{name:"fms",ch:this.props.ch})),s.a.createElement("td",null,s.a.createElement(L,{name:"st",ch:this.props.ch})),s.a.createElement("td",null,s.a.createElement(L,{name:"al",ch:this.props.ch}))),s.a.createElement("tr",null,s.a.createElement("td",null,s.a.createElement(R,{ch:this.props.ch,op:4})),s.a.createElement("td",null,s.a.createElement(R,{ch:this.props.ch,op:0})),s.a.createElement("td",null,s.a.createElement(R,{ch:this.props.ch,op:1})),s.a.createElement("td",null,s.a.createElement(R,{ch:this.props.ch,op:2})),s.a.createElement("td",null,s.a.createElement(R,{ch:this.props.ch,op:3}))))))},t}(s.a.Component);z.contextType=g,z.defaultProps={ch:6};var F=z,W=function(e){function t(){for(var t,n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))||this).onFilterChannel=function(e){e.preventDefault();var n=parseInt(e.target.attributes.ch.value);t.context.filterChannel(n)},t}return r()(t,e),t.prototype.render=function(){var e=this,t=this.context.filters;return s.a.createElement(s.a.Fragment,null,s.a.createElement("nav",null,[6,0,1,2,3,4,5].map(function(n){return s.a.createElement("a",{href:"/",className:t.ch===n?"active":"",key:n,ch:n,onClick:e.onFilterChannel,title:6===n?"Show only Omni channel":"Show only channel "+(n+1)},6===n?"Omni channel":""+(n+1))})),[0,1,2,3,4,5,6].map(function(e){return t.ch===e&&s.a.createElement(F,{key:e,ch:e})}))},t}(s.a.Component);W.contextType=g;var H=W,K=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){return s.a.createElement(C,null,s.a.createElement(w,null),s.a.createElement(x,null),s.a.createElement(P,null),s.a.createElement(A,null),s.a.createElement(H,null))},t}(s.a.Component),B=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){return s.a.createElement(u,{location:this.props.location},s.a.createElement(h.a,{title:"cv2612"}),s.a.createElement(K,null))},t}(s.a.Component);t.default=B},164:function(e,t,n){"use strict";n.d(t,"b",function(){return u});var a=n(0),r=n.n(a),i=n(4),s=n.n(i),o=n(34),c=n.n(o);n.d(t,"a",function(){return c.a}),n.d(t,"c",function(){return o.navigate});n(166);var l=r.a.createContext({}),u=function(e){return r.a.createElement(l.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};u.propTypes={data:s.a.object,query:s.a.string.isRequired,render:s.a.func,children:s.a.func}},166:function(e,t,n){var a;e.exports=(a=n(169))&&a.default||a},168:function(e,t,n){"use strict";var a=n(172),r=n(0),i=n.n(r),s=n(4),o=n.n(s),c=n(167),l=n.n(c),u=n(164);function h(e){var t=e.description,n=e.lang,r=e.meta,s=e.keywords,o=e.title;return i.a.createElement(u.b,{query:p,render:function(e){var a=t||e.site.siteMetadata.description;return i.a.createElement(l.a,{htmlAttributes:{lang:n},title:o,titleTemplate:"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:a},{property:"og:title",content:o},{property:"og:description",content:a},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:title",content:o},{name:"twitter:description",content:a}].concat(s.length>0?{name:"keywords",content:s.join(", ")}:[]).concat(r)})},data:a})}h.defaultProps={lang:"en",meta:[],keywords:[]},h.propTypes={description:o.a.string,lang:o.a.string,meta:o.a.array,keywords:o.a.arrayOf(o.a.string),title:o.a.string.isRequired},t.a=h;var p="1025518380"},169:function(e,t,n){"use strict";n.r(t);n(35);var a=n(0),r=n.n(a),i=n(4),s=n.n(i),o=n(55),c=n(2),l=function(e){var t=e.location,n=c.default.getResourcesForPathnameSync(t.pathname);return n?r.a.createElement(o.a,Object.assign({location:t,pageResources:n},n.json)):null};l.propTypes={location:s.a.shape({pathname:s.a.string.isRequired}).isRequired},t.default=l},170:function(e,t,n){"use strict";n(25);var a=n(7),r=n.n(a),i=n(0),s=n.n(i),o=n(164),c=n(4),l=n.n(c),u=[["i","1"],["e","3"],["o","0"],["g","6"],["a","4"]],h=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={title:t.title,swaps:t.swaps||u},n}r()(t,e);var n=t.prototype;return n.getDiff=function(){for(var e=0,t=0;t<this.props.title.length;t++)e+=this.state.title[t]===this.props.title[t]?0:1;return e},n.timer=function(){var e=this.state.swaps,t=Math.floor(Math.random()*e.length),n=Math.round(Math.random());this.getDiff()>3&&(n=1);var a=n?0:1;Math.random()<.5&&this.setState({title:this.state.title.replace(e[t][n],e[t][a])})},n.componentDidMount=function(){},n.componentWillUnmount=function(){},n.render=function(){return s.a.createElement("h1",null,s.a.createElement(o.a,{to:"/"},this.state.title))},t}(s.a.Component);h.propTypes={title:l.a.string.isRequired,swaps:l.a.array},t.a=h},172:function(e){e.exports={data:{site:{siteMetadata:{title:"diego dorado",description:"diego dorado portfolio.",author:"Diego Dorado"}}}}}}]);
//# sourceMappingURL=component---src-pages-labs-cv-2612-js-235c355e4db2e31bd5de.js.map