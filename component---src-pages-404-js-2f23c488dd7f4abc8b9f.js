(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{148:function(e,t,n){"use strict";n.r(t),n.d(t,"pageQuery",function(){return c});var a=n(7),o=n.n(a),r=n(0),i=n.n(r),s=n(162),u=n(160),l=function(e){function t(){return e.apply(this,arguments)||this}return o()(t,e),t.prototype.render=function(){var e=this.props.data.site.siteMetadata.title;return i.a.createElement(s.a,{location:this.props.location,title:e},i.a.createElement(u.a,{title:"404: Not Found"}),i.a.createElement("h1",null,"Not Found"),i.a.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))},t}(i.a.Component);t.default=l;var c="1097489062"},158:function(e,t,n){"use strict";n.d(t,"b",function(){return c});var a=n(0),o=n.n(a),r=n(4),i=n.n(r),s=n(32),u=n.n(s);n.d(t,"a",function(){return u.a}),n.d(t,"c",function(){return s.navigate});n(159);var l=o.a.createContext({}),c=function(e){return o.a.createElement(l.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):o.a.createElement("div",null,"Loading (StaticQuery)")})};c.propTypes={data:i.a.object,query:i.a.string.isRequired,render:i.a.func,children:i.a.func}},159:function(e,t,n){var a;e.exports=(a=n(161))&&a.default||a},160:function(e,t,n){"use strict";var a=n(165),o=n(0),r=n.n(o),i=n(4),s=n.n(i),u=n(163),l=n.n(u),c=n(158);function d(e){var t=e.description,n=e.lang,o=e.meta,i=e.keywords,s=e.title;return r.a.createElement(c.b,{query:h,render:function(e){var a=t||e.site.siteMetadata.description;return r.a.createElement(l.a,{htmlAttributes:{lang:n},title:s,titleTemplate:"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:a},{property:"og:title",content:s},{property:"og:description",content:a},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:title",content:s},{name:"twitter:description",content:a}].concat(i.length>0?{name:"keywords",content:i.join(", ")}:[]).concat(o)})},data:a})}d.defaultProps={lang:"en",meta:[],keywords:[]},d.propTypes={description:s.a.string,lang:s.a.string,meta:s.a.array,keywords:s.a.arrayOf(s.a.string),title:s.a.string.isRequired},t.a=d;var h="1025518380"},161:function(e,t,n){"use strict";n.r(t);n(33);var a=n(0),o=n.n(a),r=n(4),i=n.n(r),s=n(54),u=n(2),l=function(e){var t=e.location,n=u.default.getResourcesForPathnameSync(t.pathname);return o.a.createElement(s.a,Object.assign({location:t,pageResources:n},n.json))};l.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},t.default=l},162:function(e,t,n){"use strict";var a=n(7),o=n.n(a),r=n(0),i=n.n(r),s=n(168),u=function(){var e=s.data,t=Object(r.useState)(e.allQuotesJson.edges[0].node),n=t[0],a=t[1];return Object(r.useEffect)(function(){var t=Math.random(),n=e.allQuotesJson.edges;a(n[Math.floor(t*n.length)].node)}),i.a.createElement("footer",null,i.a.createElement("table",null,i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",null,i.a.createElement("cite",null,n.quote))),i.a.createElement("tr",null,i.a.createElement("td",null,i.a.createElement("span",null,n.author))))))},l=(n(33),n(158)),c=n(166),d=n(163),h=n.n(d),m=n(164),p=[{name:"viewport",content:"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"},{name:"theme-color",content:"#ff0000"},{name:"msapplication-navbutton-color",content:"#ff0000"},{name:"apple-mobile-web-app-status-bar-style",content:"#ff0000"}],f=function(e){var t=Object.assign({},e);return i.a.createElement(l.a,Object.assign({getProps:function(e){return{className:e.isPartiallyCurrent?"active":""}}},t))},g=function(e){function t(t){var n;return(n=e.call(this,t)||this).onMouseClick=function(e){e.preventDefault();var t="dark"===c.reactLocalStorage.get("theme","dark")?"light":"dark";n.setState({theme:t}),c.reactLocalStorage.set("theme",t)},n.state={theme:"dark"},n}o()(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=c.reactLocalStorage.get("theme","dark");this.setState({theme:e})},n.render=function(){return i.a.createElement("header",null,i.a.createElement(h.a,{bodyAttributes:{class:this.state.theme},meta:p}),i.a.createElement(m.a,{title:"diego dorado"}),i.a.createElement("nav",null,i.a.createElement("a",{title:"change theme color",href:"/",onClick:this.onMouseClick},i.a.createElement("span",null,"◐")),"|",i.a.createElement(f,{to:"/work"},"Work"),"|",i.a.createElement(f,{to:"/bio"},"Bio"),"|",i.a.createElement(f,{to:"/pics"},"Pics")," "))},t}(i.a.Component),w=function(e){function t(){return e.apply(this,arguments)||this}return o()(t,e),t.prototype.render=function(){var e=this.props.children;return i.a.createElement("div",{id:"app"},i.a.createElement(g,null),i.a.createElement("main",null,e),i.a.createElement(u,null))},t}(i.a.Component);t.a=w},164:function(e,t,n){"use strict";n(34);var a=n(7),o=n.n(a),r=n(0),i=n.n(r),s=n(158),u=n(4),l=n.n(u),c=[["i","1"],["e","3"],["o","0"],["g","6"],["a","4"]],d=function(e){function t(t){var n;return(n=e.call(this,t)||this).state={title:t.title},n}o()(t,e);var n=t.prototype;return n.getDiff=function(){for(var e=0,t=0;t<this.props.title.length;t++)e+=this.state.title[t]===this.props.title[t]?0:1;return e},n.timer=function(){var e=Math.floor(Math.random()*c.length),t=Math.round(Math.random());this.getDiff()>3&&(t=1);var n=t?0:1;Math.random()<.5&&this.setState({title:this.state.title.replace(c[e][t],c[e][n])})},n.componentDidMount=function(){this.intervalId=setInterval(this.timer.bind(this),100)},n.componentWillUnmount=function(){clearInterval(this.intervalId)},n.render=function(){return i.a.createElement("h1",null,i.a.createElement(s.a,{to:"/"},this.state.title))},t}(i.a.Component);d.propTypes={title:l.a.string.isRequired},t.a=d},165:function(e){e.exports={data:{site:{siteMetadata:{title:"diego dorado",description:"diego dorado portfolio.",author:"Diego Dorado"}}}}},168:function(e){e.exports={data:{allQuotesJson:{edges:[{node:{author:"André Breton",quote:"Beauty will be convulsive or will not be at all."}},{node:{author:"André Breton",quote:"All my life, my heart has yearned for a thing I cannot name."}},{node:{author:"André Breton",quote:"It is living and ceasing to live that are imaginary solutions. Existence is elsewhere."}},{node:{author:"André Breton",quote:"Words make love with one another."}},{node:{author:"André Breton",quote:"Of all those arts in which the wise excel, Nature's chief masterpiece is writing well."}},{node:{author:"Salvador Dali",quote:"Intelligence without ambition is a bird without wings."}},{node:{author:"Salvador Dali",quote:"I don't do drugs. I am drugs."}},{node:{author:"Salvador Dali",quote:"Surrealism is destructive, but it destroys only what it considers to be shackles limiting our vision."}},{node:{author:"Salvador Dali",quote:"Drawing is the honesty of the art. There is no possibility of cheating. It is either good or bad."}},{node:{author:"Salvador Dali",quote:"Have no fear of perfection - you'll never reach it."}},{node:{author:"Francis Picabia",quote:"A free spirit takes liberties even with liberty itself."}},{node:{author:"Francis Picabia",quote:"The world is divided into two categories: failures and unknowns."}},{node:{author:"Francis Picabia",quote:"Only useless things are indispensable."}},{node:{author:"Francis Picabia",quote:"Good taste is as tiring as good company."}},{node:{author:"Jean Arp",quote:"Art is a fruit that grows in man, like a fruit on a plant, or a child in its mother's womb."}},{node:{author:"Jean Arp",quote:"I wanted to create new appearances, to extract new forms from man."}},{node:{author:"Jean Arp",quote:"As there is not the least trace of abstraction in this art, we will call it concrete art."}},{node:{author:"Jean Arp",quote:"Artists should work together like the artists of the Middle Ages."}},{node:{author:"Jean Arp",quote:"We do not wish to copy nature. We do not want to reproduce, we want to produce... directly and without meditation."}},{node:{author:"Joan Miro",quote:"I try to apply colors like words that shape poems, like notes that shape music."}},{node:{author:"Joan Miro",quote:"The works must be conceived with fire in the soul but executed with clinical coolness."}},{node:{author:"Joan Miro",quote:"Throughout the time in which I am working on a canvas I can feel how I am beginning to love it, with that love which is born of slow comprehension."}},{node:{author:"Joan Miro",quote:"The more ignoble I find life, the more strongly I react by contradiction, in humour and in an outburst of liberty and expansion."}},{node:{author:"Joan Miro",quote:"The painting rises from the brushstrokes as a poem rises from the words. The meaning comes later. "}},{node:{author:"Man Ray",quote:"A creator needs only one enthusiast to justify him."}},{node:{author:"Man Ray",quote:"It has never been my object to record my dreams, just the determination to realize them."}},{node:{author:"Man Ray",quote:"Don't put my name on it. These are simply documents I make. \""}},{node:{author:"Man Ray",quote:"One of the satisfactions of a genius is his will-power and obstinacy."}},{node:{author:"Max Ernst",quote:"All good ideas arrive by chance."}},{node:{author:"Max Ernst",quote:"Painting is not for me either decorative amusement, or the plastic invention of felt reality; it must be every time: invention, discovery, revelation. "}},{node:{author:"Max Ernst",quote:"Woman's nudity is wiser than the philosopher's teachings."}},{node:{author:"Max Ernst",quote:"Art has nothing to do with taste. Art is not there to be tasted. "}},{node:{author:"René Magritte",quote:"Everything we see hides another thing, we always want to see what is hidden by what we see."}},{node:{author:"René Magritte",quote:"Art evokes the mystery without which the world would not exist.."}},{node:{author:"René Magritte",quote:"The mind loves the unknown. It loves images whose meaning is unknown, since the meaning of the mind itself is unknown."}}]}}}}}]);
//# sourceMappingURL=component---src-pages-404-js-2f23c488dd7f4abc8b9f.js.map