(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{vBl1:function(e,t,a){"use strict";a.r(t);a("KKXr"),a("pIFo");var n=a("q1tI"),r=a.n(n),i=a("YPLI"),l=a("vrFN"),c=a("9kay"),o=function(e){var t=Math.floor(e/3600),a="0"+Math.floor(e%3600/60),n="0"+Math.floor(e%60);return a=a.substr(a.length-2),n=n.substr(n.length-2),isNaN(n)?"00:00":t?t+":"+a+":"+n:a+":"+n},s=a("ma3e");a.d(t,"pageQuery",(function(){return m}));var u=null,m=(t.default=function(e){var t=e.data,a=e.location,m=t.allSoundcloudtrack.edges.map((function(e){return e.node})),d=Object(n.useState)(!1),f=d[0],v=d[1],p=Object(n.useState)(0),E=p[0],g=p[1],k=Object(n.useState)(100),w=k[0],y=k[1],S=Object(n.useState)(!1),N=S[0],h=S[1],b=Object(n.useState)(0),j=b[0],C=b[1],A=function(){var e=u.play();void 0===e?v(!0):e.then((function(){return v(!0)})).catch((function(e){return console.log(e)}))},H=function(){u.pause(),v(!1)},L=function(){return g((function(e){return e>0?e-1:m.length-1}))},O=function(){return g((function(e){return e<m.length-1?e+1:0}))},x=function(e){if(f){if(u.readyState){var t=m[E].duration/1e3/10;u.currentTime+=t*e}}else A()},M=function(e){if(u.readyState){var t=!N;u.muted=t,h(t)}},_=function(e){return C(u.currentTime)};Object(n.useEffect)((function(){return(u=new Audio).addEventListener("ended",O),u.addEventListener("timeupdate",_),"mediaSession"in navigator&&(navigator.mediaSession.setActionHandler("previoustrack",L),navigator.mediaSession.setActionHandler("nexttrack",O),navigator.mediaSession.setActionHandler("play",A),navigator.mediaSession.setActionHandler("pause",H)),function(){"mediaSession"in navigator&&(navigator.mediaSession.setActionHandler("previoustrack",null),navigator.mediaSession.setActionHandler("nexttrack",null),navigator.mediaSession.setActionHandler("play",null),navigator.mediaSession.setActionHandler("pause",null)),u.pause(),u.removeEventListener("ended",O),u.removeEventListener("timeupdate",_),u=null}}),[]),Object(n.useEffect)((function(){var e=""===u.src;u.src=m[E].stream_url+"?client_id=802921cdc630a9a0d66f25c665703b8c","mediaSession"in navigator&&(navigator.mediaSession.metadata=new MediaMetadata({title:m[E].title,artist:"Diego Dorado",album:"Music",artwork:[{src:m[E].artwork_url.replace("large.jpg","t500x500.jpg")}]})),e||A()}),[E]),Object(n.useEffect)((function(){return window.addEventListener("keydown",I),function(){window.removeEventListener("keydown",I)}}),[E,f]);var I=function(e){var t=e.key.toLowerCase();if(" "===t||"enter"===t)f?H():A();else if("arrowleft"===t)x(-1);else if("arrowright"===t)x(1);else if("arrowup"===t)L();else{if("arrowdown"!==t)return;O()}e.preventDefault()};return r.a.createElement(i.a,{location:a},r.a.createElement(l.a,{title:"music"}),r.a.createElement("p",{className:"spacey"},r.a.createElement(c.a,{i18nKey:"MusicIntro",components:[r.a.createElement("a",{href:"https://soundcloud.com/diego-dorado/tracks",target:"_blank",rel:"noopener noreferrer"},"soundcloud")]})),r.a.createElement("pre",{className:"ascii-keyboard"},"\n                    ╔═╗    \n                    ║↑║    \n                    ╚═╝    \n╔═════════════╗  ╔═╗╔═╗╔═╗ \n║  SPACE BAR  ║  ║←║║↓║║→║ \n╚═════════════╝  ╚═╝╚═╝╚═╝ \n"),r.a.createElement("div",{className:"playlist-player"},r.a.createElement("div",{className:"track-details"},r.a.createElement("div",{className:"details",onClick:function(e){if(f){if(u.readyState){var t=(e.pageX-e.currentTarget.getBoundingClientRect().left)/e.currentTarget.offsetWidth*m[E].duration/1e3;u.currentTime=t}}else A()},"aria-hidden":"true"},r.a.createElement("div",{className:"text"},r.a.createElement("h3",null,r.a.createElement("span",null,m[E].title)),r.a.createElement("p",null,m[E].description.split("\r\n").map((function(e,t){return r.a.createElement("span",{key:t},e," ",r.a.createElement("br",null))})),r.a.createElement("em",null,m[E].genre),r.a.createElement("em",null,m[E].tag_list))),r.a.createElement("div",{className:"progress"},r.a.createElement("div",{className:"fill",style:{width:1e3*j*100/m[E].duration+"%"}}),r.a.createElement("div",{className:"waveform",style:{backgroundImage:"url("+m[E].waveform_url+")"}}))),r.a.createElement("div",{className:"image"},r.a.createElement("img",{alt:"artwork",src:m[E].artwork_url.replace("large.jpg","t500x500.jpg")}))),r.a.createElement("nav",null,r.a.createElement(s.s,{onClick:L}),f?r.a.createElement(s.l,{onClick:H}):r.a.createElement(s.m,{onClick:A}),r.a.createElement(s.t,{onClick:O}),N?r.a.createElement(s.y,{className:"mute",onClick:M}):r.a.createElement(s.x,{className:"mute",onClick:M}),r.a.createElement("div",{className:"volume-slider"},r.a.createElement("input",{type:"range",min:"0",max:"100",step:"1",value:N?0:w,onChange:function(e){if(u.readyState){var t=parseInt(e.target.value),a=0===t;u.volume=t/100,u.muted=a,y(t),h(a)}}})),r.a.createElement("span",{className:"timer"}," ",o(j))),r.a.createElement("ul",null,m.map((function(e,t){return r.a.createElement("li",{key:t,className:t===E?"active":"",onClick:function(){return g(t)},"aria-hidden":"true"},r.a.createElement("span",{className:"title"},e.title),r.a.createElement("span",{className:"time"},o(e.duration/1e3)))})))))},"2293618629")}}]);
//# sourceMappingURL=component---src-pages-music-js-44618b34a04543f41dce.js.map