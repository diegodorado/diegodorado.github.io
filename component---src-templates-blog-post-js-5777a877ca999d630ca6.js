(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{148:function(e,t,a){"use strict";a.r(t),a.d(t,"pageQuery",function(){return c});var n=a(7),o=a.n(n),r=a(0),i=a.n(r),s=a(171),l=a(166),u=function(e){function t(){return e.apply(this,arguments)||this}return o()(t,e),t.prototype.render=function(){var e=this.props.data.markdownRemark,t=this.props.data.site.siteMetadata.title;return i.a.createElement(s.a,{location:this.props.location,title:t},i.a.createElement(l.a,{title:e.frontmatter.title,description:e.frontmatter.description||e.excerpt}),i.a.createElement("h1",null,e.frontmatter.title),i.a.createElement("p",null,e.frontmatter.date),i.a.createElement("div",{dangerouslySetInnerHTML:{__html:e.html}}))},t}(i.a.Component);t.default=u;var c="3654438753"},163:function(e,t,a){"use strict";a.d(t,"b",function(){return c});var n=a(0),o=a.n(n),r=a(4),i=a.n(r),s=a(34),l=a.n(s);a.d(t,"a",function(){return l.a}),a.d(t,"c",function(){return s.navigate});a(164);var u=o.a.createContext({}),c=function(e){return o.a.createElement(u.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):o.a.createElement("div",null,"Loading (StaticQuery)")})};c.propTypes={data:i.a.object,query:i.a.string.isRequired,render:i.a.func,children:i.a.func}},164:function(e,t,a){var n;e.exports=(n=a(167))&&n.default||n},166:function(e,t,a){"use strict";var n=a(170),o=a(0),r=a.n(o),i=a(4),s=a.n(i),l=a(165),u=a.n(l),c=a(163);function d(e){var t=e.description,a=e.lang,o=e.meta,i=e.keywords,s=e.title;return r.a.createElement(c.b,{query:h,render:function(e){var n=t||e.site.siteMetadata.description;return r.a.createElement(u.a,{htmlAttributes:{lang:a},title:s,titleTemplate:"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:n},{property:"og:title",content:s},{property:"og:description",content:n},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:title",content:s},{name:"twitter:description",content:n}].concat(i.length>0?{name:"keywords",content:i.join(", ")}:[]).concat(o)})},data:n})}d.defaultProps={lang:"en",meta:[],keywords:[]},d.propTypes={description:s.a.string,lang:s.a.string,meta:s.a.array,keywords:s.a.arrayOf(s.a.string),title:s.a.string.isRequired},t.a=d;var h="1025518380"},167:function(e,t,a){"use strict";a.r(t);a(35);var n=a(0),o=a.n(n),r=a(4),i=a.n(r),s=a(55),l=a(2),u=function(e){var t=e.location,a=l.default.getResourcesForPathnameSync(t.pathname);return a?o.a.createElement(s.a,Object.assign({location:t,pageResources:a},a.json)):null};u.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},t.default=u},168:function(e,t){t.reactLocalStorage={set:function(e,t){return localStorage[e]=t,localStorage[e]},get:function(e,t){return localStorage[e]||t},setObject:function(e,t){return localStorage[e]=JSON.stringify(t),localStorage[e]},getObject:function(e,t){return JSON.parse(localStorage[e]||"{}")},clear:function(){return localStorage.clear()},remove:function(e){return localStorage.removeItem(e)}}},169:function(e,t,a){"use strict";a(25);var n=a(7),o=a.n(n),r=a(0),i=a.n(r),s=a(163),l=a(4),u=a.n(l),c=[["i","1"],["e","3"],["o","0"],["g","6"],["a","4"]],d=function(e){function t(t){var a;return(a=e.call(this,t)||this).state={title:t.title,swaps:t.swaps||c},a}o()(t,e);var a=t.prototype;return a.getDiff=function(){for(var e=0,t=0;t<this.props.title.length;t++)e+=this.state.title[t]===this.props.title[t]?0:1;return e},a.timer=function(){var e=this.state.swaps,t=Math.floor(Math.random()*e.length),a=Math.round(Math.random());this.getDiff()>3&&(a=1);var n=a?0:1;Math.random()<.5&&this.setState({title:this.state.title.replace(e[t][a],e[t][n])})},a.componentDidMount=function(){},a.componentWillUnmount=function(){},a.render=function(){return i.a.createElement("h1",null,i.a.createElement(s.a,{to:"/"},this.state.title))},t}(i.a.Component);d.propTypes={title:u.a.string.isRequired,swaps:u.a.array},t.a=d},170:function(e){e.exports={data:{site:{siteMetadata:{title:"diego dorado",description:"diego dorado portfolio.",author:"Diego Dorado"}}}}},171:function(e,t,a){"use strict";var n=a(7),o=a.n(n),r=a(0),i=a.n(r),s=a(172),l=function(){var e=s.data,t=Object(r.useState)(e.allQuotesJson.edges[0].node),a=t[0],n=t[1];return Object(r.useEffect)(function(){var t=Math.random(),a=e.allQuotesJson.edges;n(a[Math.floor(t*a.length)].node)}),i.a.createElement("footer",null,i.a.createElement("table",null,i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",null,i.a.createElement("cite",null,a.quote))),i.a.createElement("tr",null,i.a.createElement("td",null,i.a.createElement("span",null,a.author))))))},u=(a(35),a(75)),c=a.n(u),d=a(163),h=a(168),m=a(165),p=a.n(m),f=a(169),g=[{name:"viewport",content:"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"},{name:"theme-color",content:"#ff0000"},{name:"msapplication-navbutton-color",content:"#ff0000"},{name:"apple-mobile-web-app-status-bar-style",content:"#ff0000"}],w=function(e){return function(t){var a=t.isPartiallyCurrent;return{className:(e||"")+" "+(a?"active":"")}}},y=function(e){var t=e.className,a=c()(e,["className"]);return i.a.createElement(d.a,Object.assign({getProps:w(t)},a))},v=function(e){function t(t){var a;return(a=e.call(this,t)||this).onMouseClick=function(e){e.preventDefault();var t="dark"===h.reactLocalStorage.get("theme","dark")?"light":"dark";a.setState({theme:t}),h.reactLocalStorage.set("theme",t)},a.state={theme:"dark"},a}o()(t,e);var a=t.prototype;return a.componentDidMount=function(){var e=h.reactLocalStorage.get("theme","dark");this.setState({theme:e})},a.render=function(){return i.a.createElement("header",null,i.a.createElement(p.a,{bodyAttributes:{class:this.state.theme},meta:g}),i.a.createElement(f.a,{title:"diego dorado"}),i.a.createElement("nav",null,i.a.createElement("a",{title:"change theme color",href:"/",onClick:this.onMouseClick},i.a.createElement("span",null,"◐")),"|",i.a.createElement(y,{to:"/work"},"Work"),"|",i.a.createElement(y,{to:"/music"},"Music"),"|",i.a.createElement(y,{className:"labs",to:"/labs"},i.a.createElement("i",null,"L"),i.a.createElement("i",null,"a"),i.a.createElement("i",null,"b"),i.a.createElement("i",null,"s")),"|",i.a.createElement(y,{to:"/pics"},"Pics"),"|",i.a.createElement(y,{to:"/bio"},"Bio")))},t}(i.a.Component),b=function(e){function t(){return e.apply(this,arguments)||this}return o()(t,e),t.prototype.render=function(){var e=this.props.children;return i.a.createElement("div",{id:"app"},i.a.createElement(v,null),i.a.createElement("main",null,e),i.a.createElement(l,null))},t}(i.a.Component);t.a=b},172:function(e){e.exports={data:{allQuotesJson:{edges:[{node:{author:"André Breton",quote:"Beauty will be convulsive or will not be at all."}},{node:{author:"André Breton",quote:"All my life, my heart has yearned for a thing I cannot name."}},{node:{author:"André Breton",quote:"It is living and ceasing to live that are imaginary solutions. Existence is elsewhere."}},{node:{author:"André Breton",quote:"Words make love with one another."}},{node:{author:"André Breton",quote:"Of all those arts in which the wise excel, Nature's chief masterpiece is writing well."}},{node:{author:"Salvador Dali",quote:"Intelligence without ambition is a bird without wings."}},{node:{author:"Salvador Dali",quote:"I don't do drugs. I am drugs."}},{node:{author:"Salvador Dali",quote:"Surrealism is destructive, but it destroys only what it considers to be shackles limiting our vision."}},{node:{author:"Salvador Dali",quote:"Drawing is the honesty of the art. There is no possibility of cheating. It is either good or bad."}},{node:{author:"Salvador Dali",quote:"Have no fear of perfection - you'll never reach it."}},{node:{author:"Francis Picabia",quote:"A free spirit takes liberties even with liberty itself."}},{node:{author:"Francis Picabia",quote:"The world is divided into two categories: failures and unknowns."}},{node:{author:"Francis Picabia",quote:"Only useless things are indispensable."}},{node:{author:"Francis Picabia",quote:"Good taste is as tiring as good company."}},{node:{author:"Jean Arp",quote:"Art is a fruit that grows in man, like a fruit on a plant, or a child in its mother's womb."}},{node:{author:"Jean Arp",quote:"I wanted to create new appearances, to extract new forms from man."}},{node:{author:"Jean Arp",quote:"As there is not the least trace of abstraction in this art, we will call it concrete art."}},{node:{author:"Jean Arp",quote:"Artists should work together like the artists of the Middle Ages."}},{node:{author:"Jean Arp",quote:"We do not wish to copy nature. We do not want to reproduce, we want to produce... directly and without meditation."}},{node:{author:"Joan Miro",quote:"I try to apply colors like words that shape poems, like notes that shape music."}},{node:{author:"Joan Miro",quote:"The works must be conceived with fire in the soul but executed with clinical coolness."}},{node:{author:"Joan Miro",quote:"Throughout the time in which I am working on a canvas I can feel how I am beginning to love it, with that love which is born of slow comprehension."}},{node:{author:"Joan Miro",quote:"The more ignoble I find life, the more strongly I react by contradiction, in humour and in an outburst of liberty and expansion."}},{node:{author:"Joan Miro",quote:"The painting rises from the brushstrokes as a poem rises from the words. The meaning comes later. "}},{node:{author:"Man Ray",quote:"A creator needs only one enthusiast to justify him."}},{node:{author:"Man Ray",quote:"It has never been my object to record my dreams, just the determination to realize them."}},{node:{author:"Man Ray",quote:"Don't put my name on it. These are simply documents I make. \""}},{node:{author:"Man Ray",quote:"One of the satisfactions of a genius is his will-power and obstinacy."}},{node:{author:"Max Ernst",quote:"All good ideas arrive by chance."}},{node:{author:"Max Ernst",quote:"Painting is not for me either decorative amusement, or the plastic invention of felt reality; it must be every time: invention, discovery, revelation. "}},{node:{author:"Max Ernst",quote:"Woman's nudity is wiser than the philosopher's teachings."}},{node:{author:"Max Ernst",quote:"Art has nothing to do with taste. Art is not there to be tasted. "}},{node:{author:"René Magritte",quote:"Everything we see hides another thing, we always want to see what is hidden by what we see."}},{node:{author:"René Magritte",quote:"Art evokes the mystery without which the world would not exist.."}},{node:{author:"René Magritte",quote:"The mind loves the unknown. It loves images whose meaning is unknown, since the meaning of the mind itself is unknown."}}]}}}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-5777a877ca999d630ca6.js.map