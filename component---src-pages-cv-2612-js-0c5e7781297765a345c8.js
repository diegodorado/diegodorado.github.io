(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{157:function(e,t,n){"use strict";n.r(t);var a=n(7),r=n.n(a),i=n(0),o=n.n(i),s=n(165),c=n(164),l=n.n(c),u=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props.children;return o.a.createElement("div",{id:"app"},o.a.createElement("header",null,o.a.createElement(l.a,{bodyAttributes:{class:"dark cv2612"}}),o.a.createElement(s.a,{title:"diego dorado"})),o.a.createElement("main",null,e))},t}(o.a.Component),h=n(162),p=(n(35),n(187),n(179),n(180),n(212),n(181),n(79),n(74),n(55),n(36),n(214),n(34),function(e,t){if(9===t[0]&&1===t[1]&&0===t[2]||11===t[0]&&2===t[1]&&1===t[2]){for(var n={"6_4_lfo":0},a=0;a<=6;a++){n[a+"_4_fms"]=t[3],n[a+"_4_fb"]=t[4],n[a+"_4_al"]=t[5],n[a+"_4_ams"]=t[6],n[a+"_4_st"]=3;for(var r=0;r<=4;r++){var i=11*(4===r?0:r)+7;n[a+"_"+r+"_mul"]=t[i+0],n[a+"_"+r+"_tl"]=t[i+1],n[a+"_"+r+"_ar"]=t[i+2],n[a+"_"+r+"_d1"]=t[i+3],n[a+"_"+r+"_sl"]=t[i+4],n[a+"_"+r+"_rr"]=t[i+5],n[a+"_"+r+"_am"]=t[i+6],n[a+"_"+r+"_rs"]=t[i+7],n[a+"_"+r+"_det"]=t[i+8],n[a+"_"+r+"_d2"]=t[i+9]}}return{name:e.replace(".dmp",""),params:n}}return null}),d=function(){for(var e={"6_4_lfo":0,"6_4_dly":0,"6_4_dlyt":0,"6_4_dlyf":0},t=0;t<=6;t++){e[t+"_4_fms"]=0,e[t+"_4_fb"]=0,e[t+"_4_al"]=0,e[t+"_4_ams"]=0,e[t+"_4_st"]=3;for(var n=0;n<=4;n++)e[t+"_"+n+"_mul"]=0,e[t+"_"+n+"_tl"]=0,e[t+"_"+n+"_ar"]=0,e[t+"_"+n+"_d1"]=0,e[t+"_"+n+"_sl"]=0,e[t+"_"+n+"_rr"]=0,e[t+"_"+n+"_am"]=0,e[t+"_"+n+"_rs"]=0,e[t+"_"+n+"_det"]=0,e[t+"_"+n+"_d2"]=0}return e},m=function(e){for(var t=1,n=0,a=[["am"],["rs","st","ams"],["det","al","fb","fms","lfo"],["sl","rr","mul"],["ar","d2","d1"],[],["tl"],["dly","dlyt","dlyf"]];n<a.length;n++){if(a[n].some(function(t){return e.endsWith(t)}))return t;t++}return console.log("invalid param",e),0},f=function(){var e=d();for(var t in e)e[t]={cc:null,ch:null,bits:m(t)};return e};var v=n(168),g=o.a.createContext(),y=(g.Consumer,["ar","d1","sl","d2","rr","tl","mul","det","rs","am","al","fb","ams","fms","st","lfo"]),E=function(e){function t(t){var n;return(n=e.call(this,t)||this).handleCC=function(e,t,a){var r=n.state.activeParameter;if(n.state.mapping[r]&&n.state.learning){var i=Object.assign({},n.state.mapping);i[r].ch!==e&&i[r].cc!==t&&(i[r].ch=e,i[r].cc=t,n.setState({mapping:i}),v.reactLocalStorage.setObject("mapping",i))}for(var o=0,s=Object.entries(n.state.mapping);o<s.length;o++){var c=s[o],l=c[0],u=c[1];if(u.cc===t&&u.ch===e){var h=128/Math.pow(2,u.bits),p=Math.floor(a/h);n.updateParam(l,p)}}},n.toggleLearning=function(){n.setState({learning:!n.state.learning})},n.sendParameter=function(e,t){var a=e.split("_"),r=parseInt(a[0]),i=parseInt(a[1]),o=a[2],s=y.indexOf(o);if(-1!==s)if(6===r)for(var c=0;c<5;c++){var l=[c,i,s];n.state.midi.sendSysexSet(l,t)}else{var u=[r,i,s];n.state.midi.sendSysexSet(u,t)}n.state.emulator.update(r,i,o,t,n.state.params)},n.sendParameters=function(e){Object.entries(e).length;for(var t=0,a=Object.entries(e);t<a.length;t++){var r=a[t],i=r[0],o=r[1];n.sendParameter(i,o)}},n.setActiveParameter=function(e){n.setState({activeParameter:e})},n.updateParam=function(e,t){var a=Object.assign({},n.state.params);a[e]=t,n.setState({params:a})},n.updateParams=function(e){for(var t=Object.assign({},n.state.params),a=0,r=Object.entries(e);a<r.length;a++){var i=r[a],o=i[0],s=i[1];t[o]=s}n.setState({params:t})},n.filterChannel=function(e){var t=Object.assign({},n.state.filters);t.ch=e,n.setState({filters:t})},n.state={midi:null,emulator:null,learning:!1,activeParameter:null,envelopes:{},params:d(),mapping:f(),filters:{ch:6},soundOn:!1,setActiveParameter:n.setActiveParameter,updateParam:n.updateParam,updateParams:n.updateParams,filterChannel:n.filterChannel,toggleLearning:n.toggleLearning,handleCC:n.handleCC,sendParameters:n.sendParameters},n}r()(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=v.reactLocalStorage.getObject("mapping",{});if(Object.keys(e).length>0){for(var t=Object.assign({},this.state.mapping),n=0,a=Object.entries(e);n<a.length;n++){var r=a[n],i=r[0],o=r[1];t[i]=o}this.setState({mapping:t})}},n.componentWillUnmount=function(){},n.componentDidUpdate=function(e,t){var n,a,r=(n=t.params,a=this.state.params,Object.keys(a).reduce(function(e,t){var r;return n[t]===a[t]?e:Object.assign({},e,((r={})[t]=a[t],r))},{}));Object.entries(r).length>0&&(this.sendParameters(r),this.updateChannelsIfOmniChanged(r),this.updateEnvelopesIfChanged(r))},n.updateChannelsIfOmniChanged=function(e){var t=Object.keys(e).filter(function(e){return e.startsWith("6")});if(t.length>0){var n={},a=t,r=Array.isArray(a),i=0;for(a=r?a:a[Symbol.iterator]();;){var o;if(r){if(i>=a.length)break;o=a[i++]}else{if((i=a.next()).done)break;o=i.value}for(var s=o,c=s.split("_"),l=0;l<6;l++)n[l+"_"+c[1]+"_"+c[2]]=e[s]}this.updateParams(n)}},n.updateEnvelopesIfChanged=function(e){var t=this,n=["ar","d1","sl","d2","rr","tl"],a=Object.keys(e).reduce(function(e,t){return n.some(function(e){return t.endsWith(e)})&&e.push(t.substring(0,3)),e},[]).filter(function(e,t,n){return n.indexOf(e)===t});if(a.length){var r=Object.assign({},this.state.envelopes);a.forEach(function(e){var a=n.reduce(function(n,a){return n[""+a]=t.state.params[e+"_"+a],n},{});r[e]=t.calculateEnvelopePoints(a)}),this.setState({envelopes:r})}},n.calculateEnvelopePoints=function(e){var t=Math.round((31-e.ar)/31*100),n=Math.round(e.tl/127*100),a=Math.round(t+(31-e.d1)/31*100),r=Math.round(n+(100-n)*(e.sl/15)),i=Math.round(a+(31-e.d2)/31*50+50);return[[0,100],[t,n],[a,r],[i,Math.round(r+(100-r)*(e.d2/31*.5))],[Math.round(i+(31-e.rr)/31*100),100]].map(function(e){return e.join(",")}).join(" ").replace(/NaN/g,"0")},n.render=function(){return o.a.createElement(g.Provider,{value:this.state},this.props.children)},t}(o.a.Component),C=(n(175),n(87),n(88),n(99),n(216),n(218),n(220)),_=n.n(C),x=n(178),k=new _.a({polyphony:1,rows:1,priority:"last"}),M=function(e){function t(t){var n;return(n=e.call(this,t)||this).audioCtx=null,n.noteOn=function(e){var t=440*Math.pow(2,(e-69)/12);n.onKeyDown({note:e,frequency:t})},n.noteOff=function(e){n.onKeyUp({note:e})},n.onKeyDown=function(e){n.context.midi.sendMidi([144,e.note,112]),n.ym2612Node&&(-1===n.notes.indexOf(e.note)&&n.notes.push(e.note),n.setFrequency(e.frequency),1===n.notes.length&&n.keyOn())},n.onKeyUp=function(e){if(n.context.midi.sendMidi([128,e.note,0]),n.ym2612Node){for(var t=0;t<n.notes.length;t++)n.notes[t]===e.note&&n.notes.splice(t,1);0===n.notes.length&&n.keyOff()}},n.update=function(e,t,a,r,i){if(6!==e){var o=256*Math.floor(e/3)+e%3,s=function(n,a,r){return(i[e+"_"+t+"_"+n]&Math.pow(2,a)-1)<<r};if("lfo"===a)n.write(34,8|7&r);else if("det"===a||"mul"===a){var c=s("det",3,4)|s("mul",4,0);n.write(48+4*t+o,c)}else if("tl"===a){var l=s("tl",7,0);n.write(64+4*t+o,l)}else if("rs"===a||"ar"===a){var u=s("rs",2,6)|s("ar",5,0);n.write(80+4*t+o,u)}else if("am"===a||"d1"===a){var h=s("am",1,7)|s("d1",5,0);n.write(96+4*t+o,h)}else if("d2"===a){var p=s("d2",5,0);n.write(112+4*t+o,p)}else if("sl"===a||"rr"===a){var d=s("sl",4,4)|s("rr",4,0);n.write(128+4*t+o,d)}else if("al"===a||"fb"===a){var m=s("fb",3,3)|s("al",3,0);n.write(176+o,m)}else if("st"===a||"ams"===a||"fms"===a){var f=s("st",2,6)|s("ams",2,4)|s("fms",3,0);n.write(180+o,f)}}else for(var v=0;v<6;v++)n.update(v,t,a,r,i)},n.onToggleSoundClick=function(e){e.preventDefault(),n.state.soundOn?n.ym2612Node.disconnect(n.audioCtx.destination):null===n.audioCtx?n.initialize():n.ym2612Node.connect(n.audioCtx.destination),n.setState({soundOn:!n.state.soundOn})},n.state={soundOn:!1},n}r()(t,e);var n=t.prototype;return n.componentDidMount=function(){this.notes=[],this.context.emulator=this,k.down(this.onKeyDown),k.up(this.onKeyUp)},n.componentWillUnmount=function(){null!==this.audioCtx&&(this.audioCtx=null),k._listeners.down=[],k._listeners.up=[],console.log(k._listeners)},n.initialize=function(){var e=this;this.audioCtx=new AudioContext,this.audioCtx.audioWorklet.addModule("/cv2612/ym2612-processor.js").then(function(){e.ym2612Node=new AudioWorkletNode(e.audioCtx,"ym2612-generator",{outputChannelCount:[2]}),e.ym2612Node.port.onmessage=function(e){console.log(e.data)},e.ym2612Node.connect(e.audioCtx.destination),e.write(39,0),e.write(40,0),e.context.sendParameters(e.context.params)})},n.setFrequency=function(e){for(var t=2;e>=2048;)e/=2,t++;for(var n=parseInt(e),a=0;a<6;a++){var r=256*Math.floor(a/3)+a%3;this.write(164+r,n>>8&7|(7&t)<<3),this.write(160+r,255&n)}},n.keyOn=function(){for(var e=0;e<6;e++)this.write(40,4*Math.floor(e/3)+e%3+240)},n.keyOff=function(){for(var e=0;e<6;e++)this.write(40,4*Math.floor(e/3)+e%3+0)},n.write=function(e,t){this.ym2612Node&&(console.log(e.toString(16),t.toString(16)),this.ym2612Node.port.postMessage([e,t]))},n.render=function(){return o.a.createElement("a",{href:"/",title:"Toggles Sound",onClick:this.onToggleSoundClick},this.state.soundOn?o.a.createElement(x.o,null):o.a.createElement(x.p,null))},t}(o.a.Component);M.contextType=g;var O=M,I=function(e){function t(t){var n;return(n=e.call(this,t)||this).midiInId="",n.midiOutId="",n.midiAccess=null,n.onChangeMidiIn=function(e){n.setMidiIn(e.target.value)},n.onChangeMidiOut=function(e){n.setMidiOut(e.target.value)},n.sendSysex=function(e){n.sendMidi(e)},n.sendSysexSet=function(e,t){var a=[240,65,38,18,18],r=127-(e[0]+e[1]+e[2]+t)%127;a.push(e[0]),a.push(e[1]),a.push(e[2]),a.push(t),a.push(r),a.push(247),n.sendSysex(a)},n.sendMidi=function(e){var t=n.midiAccess;if(null!==t){var a=t.outputs.get(n.midiOutId);a?a.send(e):console.log("No Midi Out")}},n.onMIDIStateChange=function(e){n.refreshMidiPorts()},n.onMIDIMessage=function(e){if(e.target.id===n.midiInId){var t=Array.from(e.data),a=240&t[0];if(240!==a){if(176===a){var r=15&t[0],i=127&t[1],o=127&t[2];n.context.handleCC(r,i,o),n.setState({lastMsg:a+","+r+","+i+","+o})}128!==a&&144!==a||(n.sendMidi(t),144===a?n.context.emulator.noteOn(t[1]):n.context.emulator.noteOff(t[1]))}else{JSON.stringify(t)===JSON.stringify([240,126,0,6,2,38,38,18,0,0,1,0,0,0,247])?n.setState({lastMsg:"CV2612 found!"}):(console.log("sysex reply "),console.log(t))}}},n.onLearnClick=function(e){e.preventDefault(),n.context.toggleLearning()},n.onPanicClick=function(e){e.preventDefault(),n.sendMidi([255])},n.onClearClick=function(e){e.preventDefault(),n.sendSysexSet([6,4,17],0)},n.onToggleSoundClick=function(e){e.preventDefault(),n.context.toggleSound()},n.state={midiIns:[],midiOuts:[]},n}r()(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=this;navigator.requestMIDIAccess({sysex:!0}).then(function(t){e.midiAccess=t,e.refreshMidiPorts(),t.onstatechange=e.onMIDIStateChange},function(){return console.log("Could not access your MIDI devices.")}),this.context.midi=this},n.setMidiOut=function(e){this.midiOutId=e,this.setState({midiOutId:e}),v.reactLocalStorage.set("midiOutId",e),this.sendHandshake()},n.setMidiIn=function(e){this.midiInId=e,this.setState({midiInId:e}),v.reactLocalStorage.set("midiInId",e);var t=this.midiAccess.inputs.get(e);t?t.onmidimessage=this.onMIDIMessage:console.log("Midi In error")},n.sendHandshake=function(){this.sendSysex([240,126,127,6,1,247])},n.refreshMidiPorts=function(){var e=this.midiAccess,t=Array.from(e.inputs.values()),n=Array.from(e.outputs.values());if(this.setState({midiIns:t,midiOuts:n}),t.length){var a=v.reactLocalStorage.get("midiInId");t.map(function(e){return e.id}).includes(a)||(a=t[0].id),a!==this.midiInId&&this.setMidiIn(a)}if(n.length){var r=v.reactLocalStorage.get("midiOutId");n.map(function(e){return e.id}).includes(r)||(r=n[0].id),r!==this.midiOutId&&this.setMidiOut(r)}},n.render=function(){return o.a.createElement("div",null,o.a.createElement("nav",{className:"midi"},o.a.createElement("span",null,"In"),o.a.createElement("select",{value:this.state.midiInId,onChange:this.onChangeMidiIn},this.state.midiIns.map(function(e){return o.a.createElement("option",{key:e.id,value:e.id},e.name)})),o.a.createElement("span",null,"Out"),o.a.createElement("select",{value:this.state.midiOutId,onChange:this.onChangeMidiOut},this.state.midiOuts.map(function(e){return o.a.createElement("option",{key:e.id,value:e.id},e.name)})),o.a.createElement("a",{className:this.context.learning?"learning":"",href:"/",title:"Click to Learn",onClick:this.onLearnClick},o.a.createElement(x.l,null)),o.a.createElement("a",{href:"/",title:"Click if panic",onClick:this.onPanicClick},o.a.createElement(x.h,null)),o.a.createElement("a",{href:"/",title:"Click to clear midi mapping",onClick:this.onClearClick},o.a.createElement(x.m,null)),o.a.createElement(O,null)))},t}(o.a.Component);I.contextType=g;var S,b=I,w=(n(227),0),P=!1,D=function(e){function t(t){var n;return(n=e.call(this,t)||this).onClick=function(e){e.preventDefault(),n.setState({sequencerOn:!n.state.sequencerOn})},n.state={sequencerOn:!1},n}r()(t,e);var n=t.prototype;return n.componentWillUnmount=function(){this.sequencerStop()},n.sequencerStop=function(){clearTimeout(S),P&&(this.context.midi.sendMidi([128,w,0]),P=!1)},n.sequencerTick=function(){var e=this;if(P?(this.context.midi.sendMidi([128,w,0]),P=!1):(w=[0,3,5,7,10].sort(function(){return Math.random()-.5})[0]+12*(3+Math.floor(5*Math.random())),this.context.midi.sendMidi([144,w,100]),P=!0),this.state.sequencerOn){var t=500/Math.pow(2,Math.floor(5*Math.random()));S=setTimeout(function(){return e.sequencerTick()},t)}},n.componentDidUpdate=function(e,t){t.sequencerOn!==this.state.sequencerOn&&(this.state.sequencerOn?this.sequencerTick():this.sequencerStop())},n.render=function(){return null},t}(o.a.Component);D.contextType=g;var j=D,q=(n(229),function(e){function t(t){var n;return(n=e.call(this,t)||this).addDmpPatch=function(e,t){var a=p(e,t);if(null!==a){var r=n.state.patches;r.push(a),n.save(r)}},n.onChangeHandler=function(e){var t=function(){if(r){if(i>=a.length)return"break";o=a[i++]}else{if((i=a.next()).done)return"break";o=i.value}var e=o,t=new FileReader;t.onload=function(){var a=new Int8Array(t.result);n.addDmpPatch(e.name,a)},t.readAsArrayBuffer(e)},a=e.target.files,r=Array.isArray(a),i=0;for(a=r?a:a[Symbol.iterator]();;){var o;if("break"===t())break}},n.onChange=function(e){n.setState({current:e.target.value}),e.target.blur()},n.onSave=function(e){if(e.preventDefault(),0!==n.state.patches.length){var t=n.state.patches;t[parseInt(n.state.current)].params=n.context.params,n.save(t)}},n.onCreate=function(e){e.preventDefault();var t=prompt("Name your patch");if(null!==t&&""!==t){var a=n.state.patches;a.push({name:t,params:n.context.params}),n.save(a)}},n.onDelete=function(e){if(e.preventDefault(),!(n.state.patches.length<=1)){var t=n.state.patches.filter(function(e,t){return t!==parseInt(n.state.current)});n.save(t)}},n.onLoadDefaults=function(e){e.preventDefault(),n.loadDefaultPatches()},n.onLeftClick=function(e){e.preventDefault();var t=parseInt(n.state.current);t>0&&n.setState({current:t-1})},n.onRightClick=function(e){e.preventDefault();var t=parseInt(n.state.current);t<n.state.patches.length-1&&n.setState({current:t+1})},n.onUploadClick=function(e){e.preventDefault(),n.refs.file.click()},n.state={patches:[{name:"empty",params:d()}],current:0},n}r()(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=v.reactLocalStorage.getObject("patches",[]);0===e.length||0===Object.keys(e).length?this.loadDefaultPatches():this.setState({patches:e})},n.save=function(e){v.reactLocalStorage.setObject("patches",e),this.setState({patches:e})},n.loadDefaultPatches=function(){var e=this;this.save([]);var t=new XMLHttpRequest;t.onreadystatechange=function(n){if(4===t.readyState&&200===t.status){var a=function(){if(i){if(o>=r.length)return"break";s=r[o++]}else{if((o=r.next()).done)return"break";s=o.value}var t=s,n=new XMLHttpRequest;n.responseType="arraybuffer",n.onreadystatechange=function(a){if(4===n.readyState&&200===n.status){var r=new Int8Array(n.response);e.addDmpPatch(t,r)}},n.open("GET",encodeURI("/cv2612/instruments/"+t)),n.send(null)},r=t.responseText.split(/\r?\n/).filter(function(e){return e.length>1}),i=Array.isArray(r),o=0;for(r=i?r:r[Symbol.iterator]();;){var s;if("break"===a())break}}},t.open("GET","/cv2612/instruments/index.txt"),t.send(null)},n.componentDidUpdate=function(e,t){if(t.current!==this.state.current){var n=parseInt(this.state.current),a=this.state.patches[n];a&&this.context.updateParams(a.params)}if(t.patches.length!==this.state.patches.length){this.setState({current:0});var r=this.state.patches[0];r&&this.context.updateParams(r.params)}},n.render=function(){return o.a.createElement("nav",null,o.a.createElement("a",{href:"/",title:"Previous Patch",onClick:this.onLeftClick},o.a.createElement(x.c,null)),o.a.createElement("select",{value:this.state.current,onChange:this.onChange},this.state.patches.map(function(e,t){return o.a.createElement("option",{key:t,value:t},e.name)})),o.a.createElement("a",{href:"/",title:"Next Patch",onClick:this.onRightClick},o.a.createElement(x.d,null)),o.a.createElement("a",{href:"/",title:"Save this Patch",onClick:this.onSave},o.a.createElement(x.k,null)),o.a.createElement("a",{href:"/",title:"Create new Patch",onClick:this.onCreate},o.a.createElement(x.j,null)),o.a.createElement("a",{href:"/",title:"Upload Patches",onClick:this.onUploadClick},o.a.createElement(x.n,null)),o.a.createElement("a",{href:"/",title:"Delete this Patch",onClick:this.onDelete},o.a.createElement(x.a,null)),o.a.createElement("a",{href:"/",title:"Load default Patches",onClick:this.onLoadDefaults},o.a.createElement(x.b,null)),o.a.createElement("input",{style:{display:"none"},ref:"file",type:"file",accept:".dmp",multiple:!0,onChange:this.onChangeHandler}))},t}(o.a.Component));q.contextType=g;var A=q,T=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={},n.code=t.ch+"_"+t.op,n}return r()(t,e),t.prototype.render=function(){return o.a.createElement("div",{className:"envelope"},o.a.createElement("svg",{height:"100",width:"400",viewBox:"0 0 400 100",xmlns:"http://www.w3.org/2000/svg"},o.a.createElement("polyline",{points:this.context.envelopes[this.code]})))},t}(o.a.Component);T.contextType=g,T.defaultProps={ch:6,op:4};var N=T,L=function(e){function t(t){var n;return(n=e.call(this,t)||this).onChange=function(e){e.preventDefault(),n.context.updateParam(n.code,parseInt(e.target.value)),n.context.setActiveParameter(n.code)},n.onClick=function(e){e.preventDefault(),n.context.setActiveParameter(n.code)},n.code=t.ch+"_"+t.op+"_"+t.name,n.state={},n}r()(t,e);var n=t.prototype;return n.componentWillMount=function(){var e=this.context.mapping[this.code];this.max=Math.pow(2,e.bits)-1},n.render=function(){var e=this.context.mapping[this.code],t=null!==(e.ch&&e.cc),n="slider";return this.context.learning&&(n+=" learn"),this.context.activeParameter===this.code&&(n+=" active"),t&&(n+=" mapped"),o.a.createElement("div",{className:n,onClick:this.onClick,code:this.code},o.a.createElement("label",null,this.props.name),o.a.createElement("input",{type:"range",step:1,min:0,max:this.max,value:this.context.params[this.code],onChange:this.onChange}),o.a.createElement("span",null,this.context.params[this.code]+(this.context.learning?t?" - "+e.ch+":"+e.cc:" - n/a":"")))},t}(o.a.Component);L.contextType=g,L.defaultProps={env:!1,ch:6,op:4};var U=L,R=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){return o.a.createElement("div",{className:"operator"},o.a.createElement("h5",null,"Op ",this.props.op+1),o.a.createElement(U,{name:"ar",ch:this.props.ch,op:this.props.op}),o.a.createElement(U,{name:"d1",ch:this.props.ch,op:this.props.op}),o.a.createElement(U,{name:"sl",ch:this.props.ch,op:this.props.op}),o.a.createElement(U,{name:"d2",ch:this.props.ch,op:this.props.op}),o.a.createElement(U,{name:"rr",ch:this.props.ch,op:this.props.op}),o.a.createElement(U,{name:"tl",ch:this.props.ch,op:this.props.op}),o.a.createElement(N,{ch:this.props.ch,op:this.props.op}),o.a.createElement(U,{name:"mul",ch:this.props.ch,op:this.props.op}),o.a.createElement(U,{name:"det",ch:this.props.ch,op:this.props.op}),o.a.createElement(U,{name:"rs",ch:this.props.ch,op:this.props.op}),o.a.createElement(U,{name:"am",ch:this.props.ch,op:this.props.op}))},t}(o.a.Component);R.contextType=g,R.defaultProps={ch:6};var W=R;var F=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){return o.a.createElement("div",{className:"channel"},o.a.createElement("table",null,o.a.createElement("tbody",null,o.a.createElement("tr",null,o.a.createElement("td",null,o.a.createElement(U,{name:"lfo"})),o.a.createElement("td",null),o.a.createElement("td",null,o.a.createElement(U,{name:"al",ch:this.props.ch})),o.a.createElement("td",null,o.a.createElement("pre",{className:"algorithm"},function(e){switch(e){case 0:return"\n\n\n\n╔═╗ ╔═╗ ╔═╗ ╔═╗\n║1╠═╣2╠═╣3╠═╣4╠══\n╚═╝ ╚═╝ ╚═╝ ╚═╝\n\n\n\n";case 1:return"\n\n╔═╗\n║1╠═╗\n╚═╝ ║  ╔═╗  ╔═╗\n    ╠══╣3╠══╣4╠══\n╔═╗ ║  ╚═╝  ╚═╝\n║2╠═╝\n╚═╝\n\n";case 2:return"\n\n     ╔═╗\n     ║1╠═╗\n     ╚═╝ ║  ╔═╗\n         ╠══╣4╠══\n╔═╗  ╔═╗ ║  ╚═╝\n║2╠══╣3╠═╝\n╚═╝  ╚═╝\n\n";case 3:return"\n\n╔═╗  ╔═╗\n║1╠══╣2╠═╗\n╚═╝  ╚═╝ ║  ╔═╗\n         ╠══╣4╠══\n     ╔═╗ ║  ╚═╝\n     ║3╠═╝\n     ╚═╝\n\n";case 4:return"\n\n╔═╗  ╔═╗\n║1╠══╣2╠═╗\n╚═╝  ╚═╝ ║\n         ╠══\n╔═╗  ╔═╗ ║\n║3╠══╣4╠═╝\n╚═╝  ╚═╝\n\n";case 5:return"\n      ╔═╗\n    ╔═╣2╠══╗\n    ║ ╚═╝  ║\n╔═╗ ║ ╔═╗  ║\n║1╠═╬═╣3╠══╬══\n╚═╝ ║ ╚═╝  ║\n    ║ ╔═╗  ║\n    ╚═╣4╠══╝\n      ╚═╝\n";case 6:return"\n ╔═╗  ╔═╗\n ║1╠══╣2╠══╗\n ╚═╝  ╚═╝  ║\n      ╔═╗  ║\n      ║3╠══╬══\n      ╚═╝  ║\n      ╔═╗  ║\n      ║4╠══╝\n      ╚═╝\n";case 7:return"\n\n\n╔═╗ ╔═╗ ╔═╗ ╔═╗\n║1║ ║2║ ║3║ ║4║\n╚╦╝ ╚╦╝ ╚╦╝ ╚╦╝\n ╚═══╩═╦═╩═══╝\n       ║\n       ╚══\n\n";default:return"no algorithm"}}(this.context.params[this.props.ch+"_4_al"])))),o.a.createElement("tr",null,o.a.createElement("td",null,o.a.createElement(U,{name:"fb",ch:this.props.ch})),o.a.createElement("td",null,o.a.createElement(U,{name:"ams",ch:this.props.ch})),o.a.createElement("td",null,o.a.createElement(U,{name:"fms",ch:this.props.ch})),o.a.createElement("td",null,o.a.createElement(U,{name:"st",ch:this.props.ch})),o.a.createElement("td",null)),o.a.createElement("tr",null,o.a.createElement("td",null,o.a.createElement(W,{ch:this.props.ch,op:0})),o.a.createElement("td",null,o.a.createElement(W,{ch:this.props.ch,op:1})),o.a.createElement("td",null,o.a.createElement(W,{ch:this.props.ch,op:2})),o.a.createElement("td",null,o.a.createElement(W,{ch:this.props.ch,op:3}))))))},t}(o.a.Component);F.contextType=g,F.defaultProps={ch:6};var H=F,K=function(e){function t(){for(var t,n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))||this).onFilterChannel=function(e){e.preventDefault();var n=parseInt(e.target.attributes.ch.value);t.context.filterChannel(n)},t}return r()(t,e),t.prototype.render=function(){var e=this,t=this.context.filters;return o.a.createElement(o.a.Fragment,null,o.a.createElement("nav",null,o.a.createElement("a",{href:"/",className:6===t.ch?"active":"",ch:6,onClick:this.onFilterChannel,title:"Show only Omni channel"},"Omni Channel"),[0,1,2,3,4,5].map(function(n){return o.a.createElement("a",{href:"/",className:t.ch===n?"active":"",key:n,ch:n,onClick:e.onFilterChannel,title:"Show only channel "+(n+1)},n+1)})),[0,1,2,3,4,5,6].map(function(e){return t.ch===e&&o.a.createElement(H,{key:e,ch:e})}))},t}(o.a.Component);K.contextType=g;var J=K,z=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){return o.a.createElement(E,null,o.a.createElement(b,null),o.a.createElement(j,null),o.a.createElement(A,null),o.a.createElement(J,null))},t}(o.a.Component),B=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){return o.a.createElement(u,{location:this.props.location},o.a.createElement(h.a,{title:"cv2612"}),o.a.createElement(z,null))},t}(o.a.Component);t.default=B},160:function(e,t,n){"use strict";n.d(t,"b",function(){return u});var a=n(0),r=n.n(a),i=n(4),o=n.n(i),s=n(33),c=n.n(s);n.d(t,"a",function(){return c.a}),n.d(t,"c",function(){return s.navigate});n(161);var l=r.a.createContext({}),u=function(e){return r.a.createElement(l.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};u.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},161:function(e,t,n){var a;e.exports=(a=n(163))&&a.default||a},162:function(e,t,n){"use strict";var a=n(166),r=n(0),i=n.n(r),o=n(4),s=n.n(o),c=n(164),l=n.n(c),u=n(160);function h(e){var t=e.description,n=e.lang,r=e.meta,o=e.keywords,s=e.title;return i.a.createElement(u.b,{query:p,render:function(e){var a=t||e.site.siteMetadata.description;return i.a.createElement(l.a,{htmlAttributes:{lang:n},title:s,titleTemplate:"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:a},{property:"og:title",content:s},{property:"og:description",content:a},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:title",content:s},{name:"twitter:description",content:a}].concat(o.length>0?{name:"keywords",content:o.join(", ")}:[]).concat(r)})},data:a})}h.defaultProps={lang:"en",meta:[],keywords:[]},h.propTypes={description:s.a.string,lang:s.a.string,meta:s.a.array,keywords:s.a.arrayOf(s.a.string),title:s.a.string.isRequired},t.a=h;var p="1025518380"},163:function(e,t,n){"use strict";n.r(t);n(34);var a=n(0),r=n.n(a),i=n(4),o=n.n(i),s=n(56),c=n(2),l=function(e){var t=e.location,n=c.default.getResourcesForPathnameSync(t.pathname);return n?r.a.createElement(s.a,Object.assign({location:t,pageResources:n},n.json)):null};l.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=l},165:function(e,t,n){"use strict";n(35);var a=n(7),r=n.n(a),i=n(0),o=n.n(i),s=n(160),c=n(4),l=n.n(c),u=[["i","1"],["e","3"],["o","0"],["g","6"],["a","4"]],h=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={title:t.title},n}r()(t,e);var n=t.prototype;return n.getDiff=function(){for(var e=0,t=0;t<this.props.title.length;t++)e+=this.state.title[t]===this.props.title[t]?0:1;return e},n.timer=function(){var e=Math.floor(Math.random()*u.length),t=Math.round(Math.random());this.getDiff()>3&&(t=1);var n=t?0:1;Math.random()<.5&&this.setState({title:this.state.title.replace(u[e][t],u[e][n])})},n.componentDidMount=function(){this.intervalId=setInterval(this.timer.bind(this),100)},n.componentWillUnmount=function(){clearInterval(this.intervalId)},n.render=function(){return o.a.createElement("h1",null,o.a.createElement(s.a,{to:"/"},this.state.title))},t}(o.a.Component);h.propTypes={title:l.a.string.isRequired},t.a=h},166:function(e){e.exports={data:{site:{siteMetadata:{title:"diego dorado",description:"diego dorado portfolio.",author:"Diego Dorado"}}}}}}]);
//# sourceMappingURL=component---src-pages-cv-2612-js-0c5e7781297765a345c8.js.map