(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{162:function(e,n,t){"use strict";t.r(n);t(192);var r=t(0),o=t.n(r),a=t(187),i=t.n(a),c=t(7),u=t.n(c),l=t(316),s=t.n(l),f=(t(156),function(e){function n(n){var t;return(t=e.call(this,n)||this).onMouseEnter=function(e){t.setState({paused:!0})},t.onMouseLeave=function(e){t.setState({paused:!1})},t.onMouseClick=function(e){e.preventDefault();var n=t.state.index;n++,n%=t.props.children.length,t.setState({index:n})},t.state={index:0,paused:!1},t}u()(n,e);var t=n.prototype;return t.componentWillMount=function(){var e=this,n=null,t=this.props,r=t.children,o=t.speed;!function t(a){if(!e.willUnmount){if(!n||a-n>o){var i=e.state,c=i.index;i.paused||(c++,c%=r.length,e.setState({index:c}),n=a)}s()(t)}}()},t.componentDidMount=function(){},t.componentWillUnmount=function(){this.willUnmount=!0},t.render=function(){var e=this.props.children,n=this.state.index;return o.a.createElement("div",{className:"cyclic-fade-container",onClick:this.onMouseClick,onMouseEnter:this.onMouseEnter,onMouseLeave:this.onMouseLeave},e.map(function(e,t){return o.a.createElement("div",{key:t,className:"cyclic-fade-child "+(t===n?"active":"")},e)}))},n}(r.Component)),m=t(173),p=t(168),d=t(165);t.d(n,"pageQuery",function(){return h});n.default=function(e){var n=e.data,t=e.location,r=Object(d.c)(),a=r[0],c=(r[1],n.allFile.edges),u=n.allInstaNode.edges;return o.a.createElement(m.a,{location:t},o.a.createElement(p.a,{title:"pics"}),o.a.createElement("p",{className:"spacey"},o.a.createElement(d.a,{i18nKey:"Random Pics",components:[o.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://www.facebook.com/nicolascroceph"},"Nicolás Croce")]})),o.a.createElement(f,{speed:2e3},c.map(function(e){var n=e.node;return o.a.createElement(i.a,{key:n.id,fluid:n.childImageSharp.fluid})})),o.a.createElement("p",{className:"spacey"},a("These are from Instagram."),o.a.createElement("br",null),a("Follow me there!")," ",o.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://www.instagram.com/diegdorado/"},"@diegdorado")),o.a.createElement("section",{className:"posts ig"},u.map(function(e){var n=e.node;return o.a.createElement("article",{className:"post",key:n.id},o.a.createElement(i.a,{fixed:n.localFile.childImageSharp.fixed}),o.a.createElement("div",{className:"card"},o.a.createElement("h3",null,o.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"http://instagram.com/p/"+n.id},n.caption,n.mediaType))))})))};var h="2117378723"},192:function(e,n,t){"use strict";t(193)("fixed",function(e){return function(){return e(this,"tt","","")}})},193:function(e,n,t){var r=t(11),o=t(18),a=t(20),i=/"/g,c=function(e,n,t,r){var o=String(a(e)),c="<"+n;return""!==t&&(c+=" "+t+'="'+String(r).replace(i,"&quot;")+'"'),c+">"+o+"</"+n+">"};e.exports=function(e,n){var t={};t[e]=n(c),r(r.P+r.F*o(function(){var n=""[e]('"');return n!==n.toLowerCase()||n.split('"').length>3}),"String",t)}},316:function(e,n,t){(function(n){for(var r=t(317),o="undefined"==typeof window?n:window,a=["moz","webkit"],i="AnimationFrame",c=o["request"+i],u=o["cancel"+i]||o["cancelRequest"+i],l=0;!c&&l<a.length;l++)c=o[a[l]+"Request"+i],u=o[a[l]+"Cancel"+i]||o[a[l]+"CancelRequest"+i];if(!c||!u){var s=0,f=0,m=[];c=function(e){if(0===m.length){var n=r(),t=Math.max(0,1e3/60-(n-s));s=t+n,setTimeout(function(){var e=m.slice(0);m.length=0;for(var n=0;n<e.length;n++)if(!e[n].cancelled)try{e[n].callback(s)}catch(t){setTimeout(function(){throw t},0)}},Math.round(t))}return m.push({handle:++f,callback:e,cancelled:!1}),f},u=function(e){for(var n=0;n<m.length;n++)m[n].handle===e&&(m[n].cancelled=!0)}}e.exports=function(e){return c.call(o,e)},e.exports.cancel=function(){u.apply(o,arguments)},e.exports.polyfill=function(e){e||(e=o),e.requestAnimationFrame=c,e.cancelAnimationFrame=u}}).call(this,t(93))},317:function(e,n,t){(function(n){(function(){var t,r,o,a,i,c;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:null!=n&&n.hrtime?(e.exports=function(){return(t()-i)/1e6},r=n.hrtime,a=(t=function(){var e;return 1e9*(e=r())[0]+e[1]})(),c=1e9*n.uptime(),i=a-c):Date.now?(e.exports=function(){return Date.now()-o},o=Date.now()):(e.exports=function(){return(new Date).getTime()-o},o=(new Date).getTime())}).call(this)}).call(this,t(318))},318:function(e,n){var t,r,o=e.exports={};function a(){throw new Error("setTimeout has not been defined")}function i(){throw new Error("clearTimeout has not been defined")}function c(e){if(t===setTimeout)return setTimeout(e,0);if((t===a||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:a}catch(e){t=a}try{r="function"==typeof clearTimeout?clearTimeout:i}catch(e){r=i}}();var u,l=[],s=!1,f=-1;function m(){s&&u&&(s=!1,u.length?l=u.concat(l):f=-1,l.length&&p())}function p(){if(!s){var e=c(m);s=!0;for(var n=l.length;n;){for(u=l,l=[];++f<n;)u&&u[f].run();f=-1,n=l.length}u=null,s=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===i||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(n){try{return r.call(null,e)}catch(n){return r.call(this,e)}}}(e)}}function d(e,n){this.fun=e,this.array=n}function h(){}o.nextTick=function(e){var n=new Array(arguments.length-1);if(arguments.length>1)for(var t=1;t<arguments.length;t++)n[t-1]=arguments[t];l.push(new d(e,n)),1!==l.length||s||c(p)},d.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=h,o.addListener=h,o.once=h,o.off=h,o.removeListener=h,o.removeAllListeners=h,o.emit=h,o.prependListener=h,o.prependOnceListener=h,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}}}]);
//# sourceMappingURL=component---src-pages-pics-js-6064317f3074fad37f39.js.map