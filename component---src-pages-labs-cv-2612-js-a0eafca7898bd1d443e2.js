(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{157:function(e,t,n){"use strict";n.r(t);var a=n(7),r=n.n(a),i=n(0),o=n.n(i),s=n(174),l=n(165),c=n.n(l),u=(n(168),function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props.children;return o.a.createElement("div",{id:"app"},o.a.createElement("header",null,o.a.createElement(c.a,{bodyAttributes:{class:"dark cv2612"}}),o.a.createElement(s.a,{title:"diego dorado"})),o.a.createElement("main",null,e))},t}(o.a.Component)),d=n(167),h=(n(25),n(215),n(185),n(78),n(76),n(56),n(38),n(258),n(35),function(e,t){if(9===t[0]&&1===t[1]&&0===t[2]||11===t[0]&&2===t[1]&&1===t[2]){for(var n={"6_4_lfo":0,"6_4_en":0},a=0;a<=6;a++){n[a+"_4_fms"]=t[3],n[a+"_4_fb"]=t[4],n[a+"_4_al"]=t[5],n[a+"_4_ams"]=t[6],n[a+"_4_st"]=3;for(var r=0;r<=4;r++){var i=11*(4===r?0:r)+7;n[a+"_"+r+"_mul"]=t[i+0],n[a+"_"+r+"_tl"]=t[i+1],n[a+"_"+r+"_ar"]=t[i+2],n[a+"_"+r+"_d1"]=t[i+3],n[a+"_"+r+"_sl"]=t[i+4],n[a+"_"+r+"_rr"]=t[i+5],n[a+"_"+r+"_am"]=t[i+6],n[a+"_"+r+"_rs"]=t[i+7],n[a+"_"+r+"_det"]=t[i+8],n[a+"_"+r+"_d2"]=t[i+9]}}return{name:e.replace(".dmp",""),params:n}}return null}),m=function(){for(var e={"6_4_lfo":0,"6_4_en":0},t=0;t<=6;t++){e[t+"_4_fms"]=0,e[t+"_4_fb"]=0,e[t+"_4_al"]=0,e[t+"_4_ams"]=0,e[t+"_4_st"]=3;for(var n=0;n<=4;n++)e[t+"_"+n+"_mul"]=0,e[t+"_"+n+"_tl"]=0,e[t+"_"+n+"_ar"]=0,e[t+"_"+n+"_d1"]=0,e[t+"_"+n+"_sl"]=0,e[t+"_"+n+"_rr"]=0,e[t+"_"+n+"_am"]=0,e[t+"_"+n+"_rs"]=0,e[t+"_"+n+"_det"]=0,e[t+"_"+n+"_d2"]=0}return e},p=function(e){for(var t=1,n=0,a=[["am","en"],["rs","st","ams"],["det","al","fb","fms","lfo"],["sl","rr","mul"],["ar","d2","d1"],[],["tl"]];n<a.length;n++){if(a[n].some(function(t){return e.endsWith(t)}))return t;t++}return 0},f=function(){var e=m();for(var t in e)e[t]={cc:null,ch:null};return e};var v=n(166),g=o.a.createContext(),y=(g.Consumer,["ar","d1","sl","d2","rr","tl","mul","det","rs","am","al","fb","ams","fms","st","lfo","en"]),E=function(e){function t(t){var n;return(n=e.call(this,t)||this).handleCC=function(e,t,a){var r=n.state.activeParameter;if(n.state.mapping[r]&&n.state.learning){var i=Object.assign({},n.state.mapping);i[r].ch!==e&&i[r].cc!==t&&(i[r].ch=e,i[r].cc=t,n.setState({mapping:i}),v.reactLocalStorage.setObject("mapping",i))}for(var o=0,s=Object.entries(n.state.mapping);o<s.length;o++){var l=s[o],c=l[0],u=l[1];if(u.cc===t&&u.ch===e){var d=p(c),h=128/Math.pow(2,d),m=Math.floor(a/h);n.updateParam(c,m)}}},n.toggleLearning=function(){n.setState({learning:!n.state.learning})},n.sendParameter=function(e,t){var a=e.split("_"),r=parseInt(a[0]),i=parseInt(a[1]),o=a[2],s=y.indexOf(o);if(-1===s)console.error("Unexpected param "+o+" in code "+e);else{if(6===r)for(var l=0;l<5;l++){var c=[l,i,s];n.state.midi.sendSysexSet(c,t)}else{var u=[r,i,s];n.state.midi.sendSysexSet(u,t)}n.state.emulator.update(r,i,o,t,n.state.params)}},n.sendParameters=function(e){for(var t=0,a=Object.entries(e);t<a.length;t++){var r=a[t],i=r[0],o=r[1];n.sendParameter(i,o)}},n.setActiveParameter=function(e){n.setState({activeParameter:e})},n.updateParam=function(e,t){var a=Object.assign({},n.state.params);a[e]=t,n.setState({params:a})},n.updateParams=function(e,t){for(var a=Object.assign({},n.state.params),r=0,i=Object.entries(e);r<i.length;r++){var o=i[r],s=o[0],l=o[1];a[s]=l}n.setState({params:a}),n.loadingPatch=t},n.filterChannel=function(e){var t=Object.assign({},n.state.filters);t.ch=e,n.setState({filters:t})},n.state={midi:null,emulator:null,learning:!1,activeParameter:null,envelopes:{},mapping:f(),params:m(),filters:{ch:6},soundOn:!1,setActiveParameter:n.setActiveParameter,updateParam:n.updateParam,updateParams:n.updateParams,filterChannel:n.filterChannel,toggleLearning:n.toggleLearning,handleCC:n.handleCC,sendParameters:n.sendParameters},n}r()(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=v.reactLocalStorage.getObject("mapping",{});if(Object.keys(e).length>0){for(var t=Object.assign({},this.state.mapping),n=0,a=Object.entries(e);n<a.length;n++){var r=a[n],i=r[0],o=r[1];t[i]=o}this.setState({mapping:t})}},n.componentDidUpdate=function(e,t){var n,a,r=(n=t.params,a=this.state.params,Object.keys(a).reduce(function(e,t){var r;return n[t]===a[t]?e:Object.assign({},e,((r={})[t]=a[t],r))},{}));Object.entries(r).length>0&&(this.sendParameters(r),this.loadingPatch?this.loadingPatch=!1:this.updateOmniIfChanged(r),this.updateEnvelopesIfChanged(r))},n.updateOmniIfChanged=function(e){for(var t={},n=0,a=Object.keys(e);n<a.length;n++){var r=a[n],i=r.split("_");if("6"===i[0])for(var o=0;o<=6;o++)if("4"===i[1])for(var s=0;s<=4;s++)t[o+"_"+s+"_"+i[2]]=e[r];else t[o+"_"+i[1]+"_"+i[2]]=e[r];else if("4"===i[1])for(var l=0;l<=4;l++)t[i[0]+"_"+l+"_"+i[2]]=e[r]}Object.entries(t).length>0&&this.updateParams(t,!1)},n.updateEnvelopesIfChanged=function(e){var t=this,n=["ar","d1","sl","d2","rr","tl"],a=Object.keys(e).reduce(function(e,t){return n.some(function(e){return t.endsWith(e)})&&e.push(t.substring(0,3)),e},[]).filter(function(e,t,n){return n.indexOf(e)===t});if(a.length){var r=Object.assign({},this.state.envelopes);a.forEach(function(e){var a=n.reduce(function(n,a){return n[""+a]=t.state.params[e+"_"+a],n},{});r[e]=t.calculateEnvelopePoints(a)}),this.setState({envelopes:r})}},n.calculateEnvelopePoints=function(e){var t=Math.round((31-e.ar)/31*100),n=Math.round(e.tl/127*100),a=Math.round(t+(31-e.d1)/31*100),r=Math.round(n+(100-n)*(e.sl/15)),i=Math.round(a+(31-e.d2)/31*50+50);return[[0,100],[t,n],[a,r],[i,Math.round(r+(100-r)*(e.d2/31*.5))],[Math.round(i+(31-e.rr)/31*100),100]].map(function(e){return e.join(",")}).join(" ").replace(/NaN/g,"0")},n.render=function(){return o.a.createElement(g.Provider,{value:this.state},this.props.children)},t}(o.a.Component),b=(n(180),n(82),n(85),n(102),n(259),n(184)),C=function(e){function t(t){var n;return(n=e.call(this,t)||this).midiCtrlInId="",n.midiInId="",n.midiOutId="",n.midiAccess=null,n.onChangeMidiIn=function(e){n.setMidiIn(e.target.value)},n.onChangeMidiCtrlIn=function(e){n.setMidiCtrlIn(e.target.value)},n.onChangeMidiOut=function(e){n.setMidiOut(e.target.value)},n.sysexCount=0,n.sendSysex=function(e){n.sendMidi(e),n.sysexCount++,console.log("sysexCount",n.sysexCount)},n.sendSysexSet=function(e,t){var a=[240,65,38,18,18],r=127-(e[0]+e[1]+e[2]+t)%127;a.push(e[0]),a.push(e[1]),a.push(e[2]),a.push(t),a.push(r),a.push(247),n.sendSysex(a)},n.sendMidi=function(e){var t=n.midiAccess;if(null!==t){var a=t.outputs.get(n.midiOutId);a?a.send(e):console.log("No Midi Out")}},n.onMIDIStateChange=function(e){n.refreshMidiPorts()},n.onCtrlMIDIMessage=function(e){if(e.target.id===n.midiCtrlInId){var t=Array.from(e.data),a=240&t[0];if(176===a){var r=15&t[0],i=127&t[1],o=127&t[2];n.context.handleCC(r,i,o),n.setState({lastMsg:a+","+r+","+i+","+o})}128!==a&&144!==a||(n.sendMidi(t),144===a?n.context.emulator.noteOn(t[1]):n.context.emulator.noteOff(t[1]))}},n.onMIDIMessage=function(e){if(e.target.id===n.midiInId){var t=Array.from(e.data);if(240!==(240&t[0]));else{JSON.stringify(t)===JSON.stringify([240,126,0,6,2,38,38,18,0,0,1,0,0,0,247])&&console.log("CV2612 found!")}}},n.onLearnClick=function(e){e.preventDefault(),n.context.toggleLearning()},n.onPanicClick=function(e){e.preventDefault(),n.sendMidi([255])},n.onClearClick=function(e){e.preventDefault(),n.sendSysexSet([6,4,17],0)},n.onToggleSoundClick=function(e){e.preventDefault(),n.context.toggleSound()},n.state={midiIns:[],midiOuts:[]},n}r()(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=this;navigator.requestMIDIAccess({sysex:!0}).then(function(t){e.midiAccess=t,e.refreshMidiPorts(),t.onstatechange=e.onMIDIStateChange},function(){return console.log("Could not access your MIDI devices.")}),this.context.midi=this},n.setMidiOut=function(e){this.midiOutId=e,this.setState({midiOutId:e}),v.reactLocalStorage.set("midiOutId",e),this.sendHandshake()},n.setMidiIn=function(e){this.midiInId=e,this.setState({midiInId:e}),v.reactLocalStorage.set("midiInId",e);var t=this.midiAccess.inputs.get(e);t?t.onmidimessage=this.onMIDIMessage:console.log("Midi In error")},n.setMidiCtrlIn=function(e){this.midiCtrlInId=e,this.setState({midiCtrlInId:e}),v.reactLocalStorage.set("midiCtrlInId",e);var t=this.midiAccess.inputs.get(e);t?t.onmidimessage=this.onCtrlMIDIMessage:console.log("Midi Ctrl In error")},n.sendHandshake=function(){this.sendSysex([240,126,127,6,1,247])},n.refreshMidiPorts=function(){var e=this.midiAccess,t=Array.from(e.inputs.values()),n=Array.from(e.outputs.values());if(this.setState({midiIns:t,midiOuts:n}),t.length){var a=v.reactLocalStorage.get("midiInId","");""===a||t.map(function(e){return e.id}).includes(a)||(a=t[0].id),a!==this.midiInId&&this.setMidiIn(a),""===(a=v.reactLocalStorage.get("midiCtrlInId",""))||t.map(function(e){return e.id}).includes(a)||(a=t[0].id),a!==this.midiCtrlInId&&this.setMidiCtrlIn(a)}if(n.length){var r=v.reactLocalStorage.get("midiOutId","");""===r||n.map(function(e){return e.id}).includes(r)||(r=n[0].id),r!==this.midiOutId&&this.setMidiOut(r)}},n.render=function(){return o.a.createElement("nav",{className:"midi"},o.a.createElement("span",null,"Ctrl"),o.a.createElement("select",{value:this.state.midiCtrlInId,onChange:this.onChangeMidiCtrlIn},o.a.createElement("option",{key:"",value:""},"Not Connected"),this.state.midiIns.map(function(e){return o.a.createElement("option",{key:e.id,value:e.id},e.name)})),o.a.createElement("span",null,"In"),o.a.createElement("select",{value:this.state.midiInId,onChange:this.onChangeMidiIn},o.a.createElement("option",{key:"",value:""},"Not Connected"),this.state.midiIns.map(function(e){return o.a.createElement("option",{key:e.id,value:e.id},e.name)})),o.a.createElement("span",null,"Out"),o.a.createElement("select",{value:this.state.midiOutId,onChange:this.onChangeMidiOut},o.a.createElement("option",{key:"",value:""},"Not Connected"),this.state.midiOuts.map(function(e){return o.a.createElement("option",{key:e.id,value:e.id},e.name)})),o.a.createElement("a",{className:this.context.learning?"learning":"",href:"/",title:"Click to Learn",onClick:this.onLearnClick},o.a.createElement(b.p,null)),o.a.createElement("a",{href:"/",title:"Click if panic",onClick:this.onPanicClick},o.a.createElement(b.i,null)),o.a.createElement("a",{href:"/",title:"Click to clear midi mapping",onClick:this.onClearClick},o.a.createElement(b.t,null)))},t}(o.a.Component);C.contextType=g;var w=C,M=(n(261),n(204),n(264)),I=new(n.n(M).a)({polyphony:1,rows:1,priority:"last",octave:2}),x=function(e){function t(t){var n;return(n=e.call(this,t)||this).audioCtx=null,n.tick=function(){n.stopAnimation||(n.drawScope(),n.drawSpectrum(),requestAnimationFrame(n.tick))},n.noteOn=function(e){var t=440*Math.pow(2,(e-69)/12);n.onKeyDown({note:e,frequency:t})},n.noteOff=function(e){n.onKeyUp({note:e})},n.onKeyDown=function(e){e.note<0||e.note>127||(n.context.midi.sendMidi([144,e.note,112]),n.ym2612Node&&(-1===n.notes.indexOf(e.note)&&n.notes.push(e.note),n.setFrequency(e.frequency),1===n.notes.length&&n.keyOn()))},n.onKeyUp=function(e){if(!(e.note<0||e.note>127)&&(n.context.midi.sendMidi([128,e.note,0]),n.ym2612Node)){for(var t=0;t<n.notes.length;t++)n.notes[t]===e.note&&n.notes.splice(t,1);0===n.notes.length&&n.keyOff()}},n.update=function(e,t,a,r,i){var o=["fb","ams","fms","st","al"];if((6!==e&&4!==t||!["ar","d1","sl","d2","rr","tl","mul","det","rs","am"].includes(a))&&!(6===e&&o.includes(a)||4!==t&&o.includes(a)||(4!==t||6!==e)&&["lfo","en"].includes(a))){var s=256*Math.floor(e/3)+e%3,l=function(n,a,r){return(i[e+"_"+t+"_"+n]&Math.pow(2,a)-1)<<r};if("lfo"===a||"en"===a){var c=l("en",1,3)|l("lfo",3,0);n.write(34,c)}else if("det"===a||"mul"===a){var u=l("det",3,4)|l("mul",4,0);n.write(48+4*t+s,u)}else if("tl"===a){var d=l("tl",7,0);n.write(64+4*t+s,d)}else if("rs"===a||"ar"===a){var h=l("rs",2,6)|l("ar",5,0);n.write(80+4*t+s,h)}else if("am"===a||"d1"===a){var m=l("am",1,7)|l("d1",5,0);n.write(96+4*t+s,m)}else if("d2"===a){var p=l("d2",5,0);n.write(112+4*t+s,p)}else if("sl"===a||"rr"===a){var f=l("sl",4,4)|l("rr",4,0);n.write(128+4*t+s,f)}else if("al"===a||"fb"===a){var v=l("fb",3,3)|l("al",3,0);n.write(176+s,v)}else if("st"===a||"ams"===a||"fms"===a){var g=l("st",2,6)|l("ams",2,4)|l("fms",3,0);n.write(180+s,g)}}},n.onToggleSoundClick=function(e){e.preventDefault(),"running"===n.audioCtx.state?n.audioCtx.suspend().then(function(){n.setState({soundOn:!1})}):"suspended"===n.audioCtx.state&&n.audioCtx.resume().then(function(){n.initialize()})},n.state={soundOn:!1},n.fftSize=1024,n}r()(t,e);var n=t.prototype;return n.componentDidMount=function(){this.audioCtx=new AudioContext,"running"===this.audioCtx.state&&this.initialize(),this.notes=[],this.context.emulator=this,I.down(this.onKeyDown),I.up(this.onKeyUp),this.scope=this.refs.scope.getContext("2d"),this.scope.fillStyle="rgba(0, 20, 0, 0.1)",this.scope.lineWidth=2,this.scope.strokeStyle="#509eec",this.spectrum=this.refs.spectrum.getContext("2d"),this.spectrum.fillStyle="rgba(0, 20, 0, 0.1)",this.spectrum.lineWidth=1,this.spectrum.strokeStyle="#509eec",this.stopAnimation=!1,this.timeData=new Uint8Array(this.fftSize).fill(128),this.freqData=new Uint8Array(this.fftSize)},n.componentWillUnmount=function(){this.audioCtx.suspend(),I._listeners.down=[],I._listeners.up=[],this.stopAnimation=!0,this.timeData=null,this.freqData=null},n.drawScope=function(){var e=this.scope,t=e.canvas.width,n=e.canvas.height,a=this.fftSize,r=n/256;this.analyser&&this.analyser.getByteTimeDomainData(this.timeData),e.fillRect(0,0,t,n),e.beginPath();for(var i=this.timeData.reduce(function(e,t,n,r){return 0===e&&n>0&&n<a-10&&r[n-1]<128&&r[n+10]>128?n:e},0),o=i;o<a&&o-i<t;o++)e.lineTo(o-i,n-this.timeData[o]*r);e.stroke()},n.drawSpectrum=function(){var e=this.spectrum,t=e.canvas.width,n=e.canvas.height,a=this.fftSize,r=n/256,i=t/a;this.analyser&&this.analyser.getByteFrequencyData(this.freqData),e.fillRect(0,0,t,n),e.beginPath();for(var o,s,l,c=1;c<a;c++){var u=(l=void 0,l=(c-(o=1))/((s=a-1)-o),o*Math.pow(s/o,l)),d=Math.floor(u),h=Math.ceil(u),m=this.freqData[d],p=m+(this.freqData[h]-m)*((u-d)/(h-d));e.lineTo(c*i,n-p*r)}e.stroke()},n.initialize=function(){var e=this;this.audioCtx.audioWorklet.addModule("/cv2612/ym2612-processor.js").then(function(){e.ym2612Node=new AudioWorkletNode(e.audioCtx,"ym2612-generator",{outputChannelCount:[2]}),e.ym2612Node.port.onmessage=function(e){console.log(e.data)},e.ym2612Node.connect(e.audioCtx.destination),e.analyser=e.audioCtx.createAnalyser(),e.analyser.fftSize=e.fftSize,e.ym2612Node.connect(e.analyser),e.write(39,0),e.write(40,0),e.context.sendParameters(e.context.params)}),this.setState({soundOn:!0})},n.setFrequency=function(e){for(var t=2;e>=2048;)e/=2,t++;for(var n=parseInt(e),a=0;a<6;a++){var r=256*Math.floor(a/3)+a%3;this.write(164+r,n>>8&7|(7&t)<<3),this.write(160+r,255&n)}},n.keyOn=function(){for(var e=0;e<6;e++)this.write(40,4*Math.floor(e/3)+e%3+240)},n.keyOff=function(){for(var e=0;e<6;e++)this.write(40,4*Math.floor(e/3)+e%3+0)},n.write=function(e,t){this.ym2612Node&&this.ym2612Node.port.postMessage([e,t])},n.render=function(){return o.a.createElement("div",{className:"emulator"},o.a.createElement("nav",null,o.a.createElement("a",{href:"/",title:"Toggles Sound",onClick:this.onToggleSoundClick},this.state.soundOn?o.a.createElement(b.v,null):o.a.createElement(b.w,null))),o.a.createElement("canvas",{ref:"scope",width:200,height:60}),o.a.createElement("canvas",{ref:"spectrum",width:200,height:60}))},t}(o.a.Component);x.contextType=g;var k,S=x,_=(n(197),0),D=!1,P=function(e){function t(t){var n;return(n=e.call(this,t)||this).onClick=function(e){e.preventDefault(),n.setState({sequencerOn:!n.state.sequencerOn})},n.state={sequencerOn:!1},n}r()(t,e);var n=t.prototype;return n.componentWillUnmount=function(){this.sequencerStop()},n.sequencerStop=function(){clearTimeout(k),D&&(this.context.midi.sendMidi([128,_,0]),D=!1)},n.sequencerTick=function(){var e=this;if(D?(this.context.midi.sendMidi([128,_,0]),D=!1):(_=[0,3,5,7,10].sort(function(){return Math.random()-.5})[0]+12*(3+Math.floor(5*Math.random())),this.context.midi.sendMidi([144,_,100]),D=!0),this.state.sequencerOn){var t=500/Math.pow(2,Math.floor(5*Math.random()));k=setTimeout(function(){return e.sequencerTick()},t)}},n.componentDidUpdate=function(e,t){t.sequencerOn!==this.state.sequencerOn&&(this.state.sequencerOn?this.sequencerTick():this.sequencerStop())},n.render=function(){return null},t}(o.a.Component);P.contextType=g;var O=P,A=(n(271),n(192),n(195),function(e){function t(t){var n;return(n=e.call(this,t)||this).addDmpPatch=function(e,t){var a=h(e,t);if(null!==a){var r=n.state.patches;r.push(a),n.save(r)}},n.onChangeHandler=function(e){var t=function(){if(r){if(i>=a.length)return"break";o=a[i++]}else{if((i=a.next()).done)return"break";o=i.value}var e=o,t=new FileReader;t.onload=function(){var a=new Int8Array(t.result);n.addDmpPatch(e.name,a)},t.readAsArrayBuffer(e)},a=e.target.files,r=Array.isArray(a),i=0;for(a=r?a:a[Symbol.iterator]();;){var o;if("break"===t())break}},n.onChange=function(e){n.setState({current:e.target.value}),e.target.blur()},n.onSave=function(e){if(e.preventDefault(),0!==n.state.patches.length){var t=n.state.patches;t[parseInt(n.state.current)].params=n.context.params,n.save(t)}},n.onCreate=function(e){e.preventDefault();var t=prompt("Name your patch");if(null!==t&&""!==t){var a=n.state.patches;a.push({name:t,params:n.context.params}),n.save(a)}},n.onDelete=function(e){if(e.preventDefault(),!(n.state.patches.length<=1)){var t=n.state.patches.filter(function(e,t){return t!==parseInt(n.state.current)});n.save(t)}},n.onLoadDefaults=function(e){e.preventDefault(),n.loadDefaultPatches()},n.onLeftClick=function(e){e.preventDefault();var t=parseInt(n.state.current);t>0&&n.setState({current:t-1})},n.onRightClick=function(e){e.preventDefault();var t=parseInt(n.state.current);t<n.state.patches.length-1&&n.setState({current:t+1})},n.onUploadClick=function(e){e.preventDefault(),n.refs.file.click()},n.state={patches:[{name:"empty",params:m()}],current:0},n}r()(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=v.reactLocalStorage.getObject("patches",[]);0===e.length||0===Object.keys(e).length?this.loadDefaultPatches():this.setState({patches:e})},n.save=function(e){v.reactLocalStorage.setObject("patches",e),this.setState({patches:e})},n.loadDefaultPatches=function(){var e=this;this.save([]);var t=new XMLHttpRequest;t.onreadystatechange=function(n){if(4===t.readyState&&200===t.status){var a=function(){if(i){if(o>=r.length)return"break";s=r[o++]}else{if((o=r.next()).done)return"break";s=o.value}var t=s,n=new XMLHttpRequest;n.responseType="arraybuffer",n.onreadystatechange=function(a){if(4===n.readyState&&200===n.status){var r=new Int8Array(n.response);e.addDmpPatch(t,r)}},n.open("GET",encodeURI("/cv2612/instruments/"+t)),n.send(null)},r=t.responseText.split(/\r?\n/).filter(function(e){return e.length>1}),i=Array.isArray(r),o=0;for(r=i?r:r[Symbol.iterator]();;){var s;if("break"===a())break}}},t.open("GET","/cv2612/instruments/index.txt"),t.send(null)},n.componentDidUpdate=function(e,t){if(t.current!==this.state.current){var n=parseInt(this.state.current),a=this.state.patches[n];a&&this.loadPatch(a)}if(t.patches.length!==this.state.patches.length){this.setState({current:0});var r=this.state.patches[0];r&&this.loadPatch(r)}},n.loadPatch=function(e){this.context.updateParams(e.params,!0)},n.render=function(){return o.a.createElement("nav",null,o.a.createElement("a",{href:"/",title:"Previous Patch",onClick:this.onLeftClick},o.a.createElement(b.c,null)),o.a.createElement("select",{value:this.state.current,onChange:this.onChange},this.state.patches.map(function(e,t){return o.a.createElement("option",{key:t,value:t},e.name)})),o.a.createElement("a",{href:"/",title:"Next Patch",onClick:this.onRightClick},o.a.createElement(b.d,null)),o.a.createElement("a",{href:"/",title:"Save this Patch",onClick:this.onSave},o.a.createElement(b.n,null)),o.a.createElement("a",{href:"/",title:"Create new Patch",onClick:this.onCreate},o.a.createElement(b.l,null)),o.a.createElement("a",{href:"/",title:"Upload Patches",onClick:this.onUploadClick},o.a.createElement(b.u,null)),o.a.createElement("a",{href:"/",title:"Delete this Patch",onClick:this.onDelete},o.a.createElement(b.a,null)),o.a.createElement("a",{href:"/",title:"Load default Patches",onClick:this.onLoadDefaults},o.a.createElement(b.b,null)),o.a.createElement("input",{style:{display:"none"},ref:"file",type:"file",accept:".dmp",multiple:!0,onChange:this.onChangeHandler}))},t}(o.a.Component));A.contextType=g;var q=A,T=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={},n.code=t.ch+"_"+t.op,n}return r()(t,e),t.prototype.render=function(){return o.a.createElement("div",{className:"envelope"},o.a.createElement("svg",{height:"100",width:"400",viewBox:"0 0 400 100",xmlns:"http://www.w3.org/2000/svg"},o.a.createElement("polyline",{points:this.context.envelopes[this.code]})))},t}(o.a.Component);T.contextType=g,T.defaultProps={ch:6,op:4};var j=T,N=function(e){function t(t){var n;(n=e.call(this,t)||this).onChange=function(e){e.preventDefault(),n.context.updateParam(n.code,parseInt(e.target.value)),n.context.setActiveParameter(n.code)},n.onClick=function(e){e.preventDefault(),n.context.setActiveParameter(n.code)},n.code=t.ch+"_"+t.op+"_"+t.name;var a=p(n.code);return n.max=Math.pow(2,a)-1,n.state={},n}return r()(t,e),t.prototype.render=function(){var e=this.context.mapping[this.code],t=null!==(e.ch&&e.cc),n="slider";return this.context.learning&&(n+=" learn"),this.context.activeParameter===this.code&&(n+=" active"),t&&(n+=" mapped"),o.a.createElement("div",{className:n,onClick:this.onClick,code:this.code},o.a.createElement("label",null,this.props.name),o.a.createElement("input",{type:"range",step:1,min:0,max:this.max,value:this.context.params[this.code],onChange:this.onChange}),o.a.createElement("span",null,this.context.params[this.code]+(this.context.learning?t?" - "+e.ch+":"+e.cc:" - n/a":"")))},t}(o.a.Component);N.contextType=g,N.defaultProps={env:!1,ch:6,op:4};var L=N,R=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){return o.a.createElement("div",{className:"operator"},o.a.createElement("h5",null,"Op ",4===this.props.op?"Omni":this.props.op+1),o.a.createElement(L,{name:"ar",ch:this.props.ch,op:this.props.op}),o.a.createElement(L,{name:"d1",ch:this.props.ch,op:this.props.op}),o.a.createElement(L,{name:"sl",ch:this.props.ch,op:this.props.op}),o.a.createElement(L,{name:"d2",ch:this.props.ch,op:this.props.op}),o.a.createElement(L,{name:"rr",ch:this.props.ch,op:this.props.op}),o.a.createElement(L,{name:"tl",ch:this.props.ch,op:this.props.op}),o.a.createElement(j,{ch:this.props.ch,op:this.props.op}),o.a.createElement(L,{name:"mul",ch:this.props.ch,op:this.props.op}),o.a.createElement(L,{name:"det",ch:this.props.ch,op:this.props.op}),o.a.createElement(L,{name:"rs",ch:this.props.ch,op:this.props.op}),o.a.createElement(L,{name:"am",ch:this.props.ch,op:this.props.op}))},t}(o.a.Component);R.contextType=g,R.defaultProps={ch:6};var J=R;var z=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){return o.a.createElement("div",{className:"channel"},o.a.createElement("table",null,o.a.createElement("tbody",null,o.a.createElement("tr",null,o.a.createElement("td",null,o.a.createElement(L,{name:"lfo"})),o.a.createElement("td",null,o.a.createElement(L,{name:"en"})),o.a.createElement("td",null),o.a.createElement("td",null),o.a.createElement("td",null,o.a.createElement("pre",{className:"algorithm"},function(e){switch(e){case 0:return"\n\n\n\n╔═╗ ╔═╗ ╔═╗ ╔═╗\n║1╠═╣2╠═╣3╠═╣4╠══\n╚═╝ ╚═╝ ╚═╝ ╚═╝\n\n\n\n";case 1:return"\n\n╔═╗\n║1╠═╗\n╚═╝ ║  ╔═╗  ╔═╗\n    ╠══╣3╠══╣4╠══\n╔═╗ ║  ╚═╝  ╚═╝\n║2╠═╝\n╚═╝\n\n";case 2:return"\n\n     ╔═╗\n     ║1╠═╗\n     ╚═╝ ║  ╔═╗\n         ╠══╣4╠══\n╔═╗  ╔═╗ ║  ╚═╝\n║2╠══╣3╠═╝\n╚═╝  ╚═╝\n\n";case 3:return"\n\n╔═╗  ╔═╗\n║1╠══╣2╠═╗\n╚═╝  ╚═╝ ║  ╔═╗\n         ╠══╣4╠══\n     ╔═╗ ║  ╚═╝\n     ║3╠═╝\n     ╚═╝\n\n";case 4:return"\n\n╔═╗  ╔═╗\n║1╠══╣2╠═╗\n╚═╝  ╚═╝ ║\n         ╠══\n╔═╗  ╔═╗ ║\n║3╠══╣4╠═╝\n╚═╝  ╚═╝\n\n";case 5:return"\n      ╔═╗\n    ╔═╣2╠══╗\n    ║ ╚═╝  ║\n╔═╗ ║ ╔═╗  ║\n║1╠═╬═╣3╠══╬══\n╚═╝ ║ ╚═╝  ║\n    ║ ╔═╗  ║\n    ╚═╣4╠══╝\n      ╚═╝\n";case 6:return"\n ╔═╗  ╔═╗\n ║1╠══╣2╠══╗\n ╚═╝  ╚═╝  ║\n      ╔═╗  ║\n      ║3╠══╬══\n      ╚═╝  ║\n      ╔═╗  ║\n      ║4╠══╝\n      ╚═╝\n";case 7:return"\n\n\n╔═╗ ╔═╗ ╔═╗ ╔═╗\n║1║ ║2║ ║3║ ║4║\n╚╦╝ ╚╦╝ ╚╦╝ ╚╦╝\n ╚═══╩═╦═╩═══╝\n       ║\n       ╚══\n\n";default:return"no algorithm"}}(this.context.params[this.props.ch+"_4_al"])))),o.a.createElement("tr",null,o.a.createElement("td",null,o.a.createElement(L,{name:"fb",ch:this.props.ch})),o.a.createElement("td",null,o.a.createElement(L,{name:"ams",ch:this.props.ch})),o.a.createElement("td",null,o.a.createElement(L,{name:"fms",ch:this.props.ch})),o.a.createElement("td",null,o.a.createElement(L,{name:"st",ch:this.props.ch})),o.a.createElement("td",null,o.a.createElement(L,{name:"al",ch:this.props.ch}))),o.a.createElement("tr",null,o.a.createElement("td",null,o.a.createElement(J,{ch:this.props.ch,op:4})),o.a.createElement("td",null,o.a.createElement(J,{ch:this.props.ch,op:0})),o.a.createElement("td",null,o.a.createElement(J,{ch:this.props.ch,op:1})),o.a.createElement("td",null,o.a.createElement(J,{ch:this.props.ch,op:2})),o.a.createElement("td",null,o.a.createElement(J,{ch:this.props.ch,op:3}))))))},t}(o.a.Component);z.contextType=g,z.defaultProps={ch:6};var F=z,B=function(e){function t(){for(var t,n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))||this).onFilterChannel=function(e){e.preventDefault();var n=parseInt(e.target.attributes.ch.value);t.context.filterChannel(n)},t}return r()(t,e),t.prototype.render=function(){var e=this,t=this.context.filters;return o.a.createElement(o.a.Fragment,null,o.a.createElement("nav",null,[6,0,1,2,3,4,5].map(function(n){return o.a.createElement("a",{href:"/",className:t.ch===n?"active":"",key:n,ch:n,onClick:e.onFilterChannel,title:6===n?"Show only Omni channel":"Show only channel "+(n+1)},6===n?"Omni channel":""+(n+1))})),[0,1,2,3,4,5,6].map(function(e){return t.ch===e&&o.a.createElement(F,{key:e,ch:e})}))},t}(o.a.Component);B.contextType=g;var U=B,W=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){return o.a.createElement(E,null,o.a.createElement(S,null),o.a.createElement(w,null),o.a.createElement(O,null),o.a.createElement(q,null),o.a.createElement(U,null))},t}(o.a.Component),H=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){return o.a.createElement(u,{location:this.props.location},o.a.createElement(d.a,{title:"cv2612"}),o.a.createElement(W,null))},t}(o.a.Component);t.default=H},162:function(e,t,n){"use strict";n.d(t,"b",function(){return u});var a=n(0),r=n.n(a),i=n(4),o=n.n(i),s=n(34),l=n.n(s);n.d(t,"a",function(){return l.a}),n.d(t,"c",function(){return s.navigate});n(164);var c=r.a.createContext({}),u=function(e){return r.a.createElement(c.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};u.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},164:function(e,t,n){var a;e.exports=(a=n(173))&&a.default||a},167:function(e,t,n){"use strict";var a=n(175),r=n(0),i=n.n(r),o=n(4),s=n.n(o),l=n(165),c=n.n(l),u=n(162);function d(e){var t=e.description,n=e.lang,r=e.meta,o=e.keywords,s=e.title;return i.a.createElement(u.b,{query:h,render:function(e){var a=t||e.site.siteMetadata.description;return i.a.createElement(c.a,{htmlAttributes:{lang:n},title:s,titleTemplate:"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:a},{property:"og:title",content:s},{property:"og:description",content:a},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:title",content:s},{name:"twitter:description",content:a}].concat(o.length>0?{name:"keywords",content:o.join(", ")}:[]).concat(r)})},data:a})}d.defaultProps={lang:"en",meta:[],keywords:[]},d.propTypes={description:s.a.string,lang:s.a.string,meta:s.a.array,keywords:s.a.arrayOf(s.a.string),title:s.a.string.isRequired},t.a=d;var h="1025518380"},168:function(e,t,n){"use strict";var a=n(178),r=n(163),i=n(177),o=n.n(i),s=n(169),l=n(170),c=n(171);a.a.use(o.a).use(r.b).init({resources:{en:s,es:l},fallbackLng:"en",whitelist:["en","es"],debug:!1,saveMissing:!1,updateMissing:!1,load:"languageOnly",keySeparator:!1,interpolation:{escapeValue:!1}}),a.a.quotes=c;a.a},169:function(e){e.exports={translation:{Work:"Work",Music:"Music",Pics:"Pics",Bio:"Bio",Intro:"I am Diego Dorado, live coder, programmer and electronic artist. I am passionate about research projects that combine technological innovation with artistic expressions.",Explore:"<0>Explore</0> the projects that I've been working on.",MusicIntro:"Hi there. These are some tracks I have produced in the past. They are all uploaded to <0>soundcloud</0>, but I like to see them here. =)","Random Pics":"Random pics, by <0>Nicolás Croce</0>.","These are from Instagram.":"These are from Instagram. But Instagram died today! ","Follow me there!":"Follow me there!",liveCodingSessions:"Lucky you! There is an active channel.",liveCodingSessions_plural:"Never though this possible! There are {{count}} active channels.","":""}}},170:function(e){e.exports={translation:{Work:"Trabajo",Music:"Música",Pics:"Fotos",Bio:"Bio",Intro:"Soy Diego Dorado, live coder, programador y artista electrónico. Me apasionan los proyectos de investigación que combinan innovación tecnológica con expresiones artísticas.",Explore:"<0>Explora</0> los proyectos en los que estuve trabajando.",MusicIntro:"Hola!. Estos son algunos tracks que produje hace un tiempo. Están subidos a <0>soundcloud</0>, pero me gusta tenerlos acá. =)","Random Pics":"Imágenes random, por <0>Nicolás Croce</0>.","These are from Instagram.":"Estas son de Instagram. Pero Instagram murió hoy!","Follow me there!":"Seguime! ","":""}}},171:function(e){e.exports={en:[["André Breton","Beauty will be convulsive or will not be at all."],["André Breton","All my life, my heart has yearned for a thing I cannot name."],["André Breton","It is living and ceasing to live that are imaginary solutions. Existence is elsewhere."],["André Breton","Words make love with one another."],["André Breton","Of all those arts in which the wise excel, Nature's chief masterpiece is writing well."],["Salvador Dali","Intelligence without ambition is a bird without wings."],["Salvador Dali","I don't do drugs. I am drugs."],["Salvador Dali","Surrealism is destructive, but it destroys only what it considers to be shackles limiting our vision."],["Salvador Dali","Drawing is the honesty of the art. There is no possibility of cheating. It is either good or bad."],["Salvador Dali","Have no fear of perfection - you'll never reach it."],["Francis Picabia","A free spirit takes liberties even with liberty itself."],["Francis Picabia","The world is divided into two categories: failures and unknowns."],["Francis Picabia","Only useless things are indispensable."],["Francis Picabia","Good taste is as tiring as good company."],["Jean Arp","Art is a fruit that grows in man, like a fruit on a plant, or a child in its mother's womb."],["Jean Arp","I wanted to create new appearances, to extract new forms from man."],["Jean Arp","As there is not the least trace of abstraction in this art, we will call it concrete art."],["Jean Arp","Artists should work together like the artists of the Middle Ages."],["Jean Arp","We do not wish to copy nature. We do not want to reproduce, we want to produce... directly and without meditation."],["Joan Miro","I try to apply colors like words that shape poems, like notes that shape music."],["Joan Miro","The works must be conceived with fire in the soul but executed with clinical coolness."],["Joan Miro","Throughout the time in which I am working on a canvas I can feel how I am beginning to love it, with that love which is born of slow comprehension."],["Joan Miro","The more ignoble I find life, the more strongly I react by contradiction, in humour and in an outburst of liberty and expansion."],["Joan Miro","The painting rises from the brushstrokes as a poem rises from the words. The meaning comes later. "],["Man Ray","A creator needs only one enthusiast to justify him."],["Man Ray","It has never been my object to record my dreams, just the determination to realize them."],["Man Ray","Don't put my name on it. These are simply documents I make."],["Man Ray","One of the satisfactions of a genius is his will-power and obstinacy."],["Max Ernst","All good ideas arrive by chance."],["Max Ernst","Painting is not for me either decorative amusement, or the plastic invention of felt reality; it must be every time: invention, discovery, revelation. "],["Max Ernst","Woman's nudity is wiser than the philosopher's teachings."],["Max Ernst","Art has nothing to do with taste. Art is not there to be tasted. "],["René Magritte","Everything we see hides another thing, we always want to see what is hidden by what we see."],["René Magritte","Art evokes the mystery without which the world would not exist.."],["René Magritte","The mind loves the unknown. It loves images whose meaning is unknown, since the meaning of the mind itself is unknown."]],es:[["André Breton","La belleza será convulsiva o no lo será en absoluto"],["André Breton","Toda mi vida, mi corazón ha anhelado algo que no puedo nombrar."],["André Breton","Es vivir y dejar de vivir lo que son soluciones imaginarias. La existencia está en otra parte."],["André Breton","Las palabras hacen el amor el uno con el otro."],["André Breton","De todas esas artes en las la sabiduría sobresale, la principal obra maestra de la naturaleza está escribiendo bien."],["Salvador Dali","La inteligencia sin ambición es un pájaro sin alas"],["Salvador Dali","No consumo droga. Soy droga"],["Salvador Dali","El surrealismo es destructivo, pero destruye solo lo que considera ser cadenas limitando nuestra visión."],["Salvador Dali","Dibujar es la honestidad del arte. No hay posibilidad de hacer trampa. Es bueno o es malo."],["Salvador Dali","No tengas miedo de la perfección, nunca la alcanzarás."],["Francis Picabia","Un espíritu libre se toma libertades incluso con la libertad misma."],["Francis Picabia","El mundo está dividido en dos categorías: fallos e incógnitas."],["Francis Picabia","Sólo las cosas inútiles son indispensables"],["Francis Picabia","El buen gusto es tan aburrido como la buena compañía."],["Jean Arp","El arte es una fruta que crece en el hombre, como una fruta en una planta, o un niño en el vientre de su madre."],["Jean Arp","Quería crear nuevas apariencias, extraer nuevas formas del hombre."],["Jean Arp","Como no hay el menor rastro de abstracción en este arte, lo llamaremos arte concreto."],["Jean Arp","Los artistas deben trabajar juntos como los artistas de la Edad Media."],["Jean Arp","No deseamos copiar la naturaleza. No queremos reproducir, queremos producir ... directamente y sin meditación."],["Joan Miro","Intento aplicar colores como palabras que dan forma a poemas, como notas que dan forma a la música."],["Joan Miro","Las obras deben concebirse con fuego en el alma, pero ejecutarse con frialdad clínica."],["Joan Miro","A lo largo del tiempo en el que estoy trabajando en un lienzo, puedo sentir cómo estoy empezando a amarlo, con ese amor que nace de la comprensión lenta."],["Joan Miro","Cuanto más innoble encuentro la vida, más fuertemente reacciono ante la contradicción, con humor y en un estallido de libertad y expansión."],["Joan Miro","La pintura surge de las pinceladas tal como un poema se eleva desde las palabras. El significado viene más tarde."],["Man Ray","Un creador solo necesita un entusiasta que lo justifique."],["Man Ray","Nunca ha sido mi objetivo registrar mis sueños, solo la determinación de realizarlos."],["Man Ray","No le pongas mi nombre. Estos son simplemente documentos que hago."],["Man Ray","Una de las satisfacciones de un genio es su fuerza de voluntad y obstinación."],["Max Ernst","Todas las buenas ideas llegan por casualidad."],["Max Ernst","Pintar no es para mí una diversión decorativa, ni la invención plástica de la realidad sentida; debe ser siempre: invención, descubrimiento, revelación."],["Max Ernst","La desnudez de la mujer es más sabia que las enseñanzas del filósofo."],["Max Ernst","El arte no tiene nada que ver con el gusto. El arte no está ahí para ser probado."],["René Magritte","Todo lo que vemos esconde otra cosa, siempre queremos ver lo que está oculto por lo que vemos."],["René Magritte","El arte evoca el misterio sin el cual el mundo no existiría ..."],["René Magritte","La mente ama lo desconocido. Ama las imágenes cuyo significado es desconocido, ya que el significado de la mente en sí es desconocido"]]}},173:function(e,t,n){"use strict";n.r(t);n(35);var a=n(0),r=n.n(a),i=n(4),o=n.n(i),s=n(55),l=n(2),c=function(e){var t=e.location,n=l.default.getResourcesForPathnameSync(t.pathname);return n?r.a.createElement(s.a,Object.assign({location:t,pageResources:n},n.json)):null};c.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=c},174:function(e,t,n){"use strict";n(25);var a=n(7),r=n.n(a),i=n(0),o=n.n(i),s=n(162),l=n(4),c=n.n(l),u=[["i","1"],["e","3"],["o","0"],["g","6"],["a","4"]],d=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={title:t.title,swaps:t.swaps||u},n}r()(t,e);var n=t.prototype;return n.getDiff=function(){for(var e=0,t=0;t<this.props.title.length;t++)e+=this.state.title[t]===this.props.title[t]?0:1;return e},n.timer=function(){var e=this.state.swaps,t=Math.floor(Math.random()*e.length),n=Math.round(Math.random());this.getDiff()>3&&(n=1);var a=n?0:1;Math.random()<.5&&this.setState({title:this.state.title.replace(e[t][n],e[t][a])})},n.componentDidMount=function(){this.intervalId=setInterval(this.timer.bind(this),100)},n.componentWillUnmount=function(){clearInterval(this.intervalId)},n.render=function(){return o.a.createElement("h1",null,o.a.createElement(s.a,{to:"/"},this.state.title))},t}(o.a.Component);d.propTypes={title:c.a.string.isRequired,swaps:c.a.array},t.a=d},175:function(e){e.exports={data:{site:{siteMetadata:{title:"diego dorado",description:"diego dorado portfolio.",author:"Diego Dorado"}}}}}}]);
//# sourceMappingURL=component---src-pages-labs-cv-2612-js-a0eafca7898bd1d443e2.js.map