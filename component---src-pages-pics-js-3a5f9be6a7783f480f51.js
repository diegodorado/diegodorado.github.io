(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{160:function(e,t,n){"use strict";n.r(t);n(178);var r=n(7),o=n.n(r),a=n(0),i=n.n(a),c=n(181),u=n.n(c),l=n(294),s=n.n(l),f=(n(155),function(e){function t(t){var n;return(n=e.call(this,t)||this).onMouseEnter=function(e){n.setState({paused:!0})},n.onMouseLeave=function(e){n.setState({paused:!1})},n.onMouseClick=function(e){e.preventDefault();var t=n.state.index;t++,t%=n.props.children.length,n.setState({index:t})},n.state={index:0,paused:!1},n}o()(t,e);var n=t.prototype;return n.componentWillMount=function(){var e=this,t=null,n=this.props,r=n.children,o=n.speed;!function n(a){if(!e.willUnmount){if(!t||a-t>o){var i=e.state,c=i.index;i.paused||(c++,c%=r.length,e.setState({index:c}),t=a)}s()(n)}}()},n.componentDidMount=function(){},n.componentWillUnmount=function(){this.willUnmount=!0},n.render=function(){var e=this.props.children,t=this.state.index;return i.a.createElement("div",{className:"cyclic-fade-container",onClick:this.onMouseClick,onMouseEnter:this.onMouseEnter,onMouseLeave:this.onMouseLeave},e.map(function(e,n){return i.a.createElement("div",{key:n,className:"cyclic-fade-child",style:{opacity:n===t?"1":"0"}},e)}))},t}(a.Component)),p=n(170),m=n(165);n.d(t,"pageQuery",function(){return d});var h=function(e){function t(){return e.apply(this,arguments)||this}return o()(t,e),t.prototype.render=function(){var e=this.props.data,t=e.allFile.edges,n=e.allInstaNode.edges;return i.a.createElement(p.a,{location:this.props.location},i.a.createElement(m.a,{title:"pics"}),i.a.createElement("p",{className:"spacey"},"Random pics ","I've"," collected, mostly taken by ",i.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://www.facebook.com/nicolascroceph"},"Nicolás Croce"),"."),i.a.createElement(f,{speed:2e3},t.map(function(e){var t=e.node;return i.a.createElement(u.a,{key:t.id,fluid:t.childImageSharp.fluid})})),i.a.createElement("p",{className:"spacey"},"These are from Instagram.",i.a.createElement("br",null)," Follow me there! ",i.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://www.instagram.com/diegdorado/"},"@diegdorado")),i.a.createElement("section",{className:"posts ig"},n.map(function(e){var t=e.node;return i.a.createElement("article",{className:"post",key:t.id},i.a.createElement(u.a,{fixed:t.localFile.childImageSharp.fixed}),i.a.createElement("div",{className:"card"},i.a.createElement("h3",null,i.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"http://instagram.com/p/"+t.id},t.caption))))})))},t}(i.a.Component),d=(t.default=h,"1792189750")},178:function(e,t,n){"use strict";n(179)("fixed",function(e){return function(){return e(this,"tt","","")}})},179:function(e,t,n){var r=n(11),o=n(18),a=n(20),i=/"/g,c=function(e,t,n,r){var o=String(a(e)),c="<"+t;return""!==n&&(c+=" "+n+'="'+String(r).replace(i,"&quot;")+'"'),c+">"+o+"</"+t+">"};e.exports=function(e,t){var n={};n[e]=t(c),r(r.P+r.F*o(function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3}),"String",n)}},294:function(e,t,n){(function(t){for(var r=n(295),o="undefined"==typeof window?t:window,a=["moz","webkit"],i="AnimationFrame",c=o["request"+i],u=o["cancel"+i]||o["cancelRequest"+i],l=0;!c&&l<a.length;l++)c=o[a[l]+"Request"+i],u=o[a[l]+"Cancel"+i]||o[a[l]+"CancelRequest"+i];if(!c||!u){var s=0,f=0,p=[];c=function(e){if(0===p.length){var t=r(),n=Math.max(0,1e3/60-(t-s));s=n+t,setTimeout(function(){var e=p.slice(0);p.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(s)}catch(n){setTimeout(function(){throw n},0)}},Math.round(n))}return p.push({handle:++f,callback:e,cancelled:!1}),f},u=function(e){for(var t=0;t<p.length;t++)p[t].handle===e&&(p[t].cancelled=!0)}}e.exports=function(e){return c.call(o,e)},e.exports.cancel=function(){u.apply(o,arguments)},e.exports.polyfill=function(e){e||(e=o),e.requestAnimationFrame=c,e.cancelAnimationFrame=u}}).call(this,n(81))},295:function(e,t,n){(function(t){(function(){var n,r,o,a,i,c;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:null!=t&&t.hrtime?(e.exports=function(){return(n()-i)/1e6},r=t.hrtime,a=(n=function(){var e;return 1e9*(e=r())[0]+e[1]})(),c=1e9*t.uptime(),i=a-c):Date.now?(e.exports=function(){return Date.now()-o},o=Date.now()):(e.exports=function(){return(new Date).getTime()-o},o=(new Date).getTime())}).call(this)}).call(this,n(296))},296:function(e,t){var n,r,o=e.exports={};function a(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function c(e){if(n===setTimeout)return setTimeout(e,0);if((n===a||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:a}catch(e){n=a}try{r="function"==typeof clearTimeout?clearTimeout:i}catch(e){r=i}}();var u,l=[],s=!1,f=-1;function p(){s&&u&&(s=!1,u.length?l=u.concat(l):f=-1,l.length&&m())}function m(){if(!s){var e=c(p);s=!0;for(var t=l.length;t;){for(u=l,l=[];++f<t;)u&&u[f].run();f=-1,t=l.length}u=null,s=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===i||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function d(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];l.push(new h(e,t)),1!==l.length||s||c(m)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=d,o.addListener=d,o.once=d,o.off=d,o.removeListener=d,o.removeAllListeners=d,o.emit=d,o.prependListener=d,o.prependOnceListener=d,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}}}]);
//# sourceMappingURL=component---src-pages-pics-js-3a5f9be6a7783f480f51.js.map