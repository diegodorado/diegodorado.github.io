(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{162:function(e,t,a){"use strict";a.d(t,"b",function(){return u});var n=a(0),r=a.n(n),o=a(4),i=a.n(o),s=a(34),l=a.n(s);a.d(t,"a",function(){return l.a}),a.d(t,"c",function(){return s.navigate});a(163);var d=r.a.createContext({}),u=function(e){return r.a.createElement(d.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};u.propTypes={data:i.a.object,query:i.a.string.isRequired,render:i.a.func,children:i.a.func}},163:function(e,t,a){var n;e.exports=(n=a(166))&&n.default||n},165:function(e,t,a){"use strict";var n=a(169),r=a(0),o=a.n(r),i=a(4),s=a.n(i),l=a(164),d=a.n(l),u=a(162);function c(e){var t=e.description,a=e.lang,r=e.meta,i=e.keywords,s=e.title;return o.a.createElement(u.b,{query:h,render:function(e){var n=t||e.site.siteMetadata.description;return o.a.createElement(d.a,{htmlAttributes:{lang:a},title:s,titleTemplate:"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:n},{property:"og:title",content:s},{property:"og:description",content:n},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:title",content:s},{name:"twitter:description",content:n}].concat(i.length>0?{name:"keywords",content:i.join(", ")}:[]).concat(r)})},data:n})}c.defaultProps={lang:"en",meta:[],keywords:[]},c.propTypes={description:s.a.string,lang:s.a.string,meta:s.a.array,keywords:s.a.arrayOf(s.a.string),title:s.a.string.isRequired},t.a=c;var h="1025518380"},166:function(e,t,a){"use strict";a.r(t);a(35);var n=a(0),r=a.n(n),o=a(4),i=a.n(o),s=a(55),l=a(2),d=function(e){var t=e.location,a=l.default.getResourcesForPathnameSync(t.pathname);return a?r.a.createElement(s.a,Object.assign({location:t,pageResources:a},a.json)):null};d.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},t.default=d},167:function(e,t){t.reactLocalStorage={set:function(e,t){return localStorage[e]=t,localStorage[e]},get:function(e,t){return localStorage[e]||t},setObject:function(e,t){return localStorage[e]=JSON.stringify(t),localStorage[e]},getObject:function(e,t){return JSON.parse(localStorage[e]||"{}")},clear:function(){return localStorage.clear()},remove:function(e){return localStorage.removeItem(e)}}},168:function(e,t,a){"use strict";a(26);var n=a(7),r=a.n(n),o=a(0),i=a.n(o),s=a(162),l=a(4),d=a.n(l),u=[["i","1"],["e","3"],["o","0"],["g","6"],["a","4"]],c=function(e){function t(t){var a;return(a=e.call(this,t)||this).state={title:t.title,swaps:t.swaps||u},a}r()(t,e);var a=t.prototype;return a.getDiff=function(){for(var e=0,t=0;t<this.props.title.length;t++)e+=this.state.title[t]===this.props.title[t]?0:1;return e},a.timer=function(){var e=this.state.swaps,t=Math.floor(Math.random()*e.length),a=Math.round(Math.random());this.getDiff()>3&&(a=1);var n=a?0:1;Math.random()<.5&&this.setState({title:this.state.title.replace(e[t][a],e[t][n])})},a.componentDidMount=function(){this.intervalId=setInterval(this.timer.bind(this),100)},a.componentWillUnmount=function(){clearInterval(this.intervalId)},a.render=function(){return i.a.createElement("h1",null,i.a.createElement(s.a,{to:"/"},this.state.title))},t}(i.a.Component);c.propTypes={title:d.a.string.isRequired,swaps:d.a.array},t.a=c},169:function(e){e.exports={data:{site:{siteMetadata:{title:"diego dorado",description:"diego dorado portfolio.",author:"Diego Dorado"}}}}},170:function(e,t,a){"use strict";var n=a(7),r=a.n(n),o=a(0),i=a.n(o),s=a(171),l=function(){var e=s.data,t=Object(o.useState)(e.allQuotesJson.edges[0].node),a=t[0],n=t[1];return Object(o.useEffect)(function(){var t=Math.random(),a=e.allQuotesJson.edges;n(a[Math.floor(t*a.length)].node)}),i.a.createElement("footer",null,i.a.createElement("table",null,i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",null,i.a.createElement("cite",null,a.quote))),i.a.createElement("tr",null,i.a.createElement("td",null,i.a.createElement("span",null,a.author))))))},d=(a(35),a(76)),u=a.n(d),c=a(162),h=a(167),f=a(164),p=a.n(f),m=a(168),g=[{name:"viewport",content:"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"},{name:"theme-color",content:"#ff0000"},{name:"msapplication-navbutton-color",content:"#ff0000"},{name:"apple-mobile-web-app-status-bar-style",content:"#ff0000"}],y=function(e){return function(t){var a=t.isPartiallyCurrent;return{className:e+" "+(a?"active":"")}}},w=function(e){var t=e.className,a=u()(e,["className"]);return i.a.createElement(c.a,Object.assign({getProps:y(t)},a))},b=function(e){function t(t){var a;return(a=e.call(this,t)||this).onMouseClick=function(e){e.preventDefault();var t="dark"===h.reactLocalStorage.get("theme","dark")?"light":"dark";a.setState({theme:t}),h.reactLocalStorage.set("theme",t)},a.state={theme:"dark"},a}r()(t,e);var a=t.prototype;return a.componentDidMount=function(){var e=h.reactLocalStorage.get("theme","dark");this.setState({theme:e})},a.render=function(){return i.a.createElement("header",null,i.a.createElement(p.a,{bodyAttributes:{class:this.state.theme},meta:g}),i.a.createElement(m.a,{title:"diego dorado"}),i.a.createElement("nav",null,i.a.createElement("a",{title:"change theme color",href:"/",onClick:this.onMouseClick},i.a.createElement("span",null,"◐")),"|",i.a.createElement(w,{to:"/work"},"Work"),"|",i.a.createElement(w,{className:"labs",to:"/labs"},i.a.createElement("i",null,"L"),i.a.createElement("i",null,"a"),i.a.createElement("i",null,"b"),i.a.createElement("i",null,"s")),"|",i.a.createElement(w,{to:"/pics"},"Pics"),"|",i.a.createElement(w,{to:"/bio"},"Bio")))},t}(i.a.Component),v=function(e){function t(){return e.apply(this,arguments)||this}return r()(t,e),t.prototype.render=function(){var e=this.props.children;return i.a.createElement("div",{id:"app"},i.a.createElement(b,null),i.a.createElement("main",null,e),i.a.createElement(l,null))},t}(i.a.Component);t.a=v},171:function(e){e.exports={data:{allQuotesJson:{edges:[{node:{author:"André Breton",quote:"Beauty will be convulsive or will not be at all."}},{node:{author:"André Breton",quote:"All my life, my heart has yearned for a thing I cannot name."}},{node:{author:"André Breton",quote:"It is living and ceasing to live that are imaginary solutions. Existence is elsewhere."}},{node:{author:"André Breton",quote:"Words make love with one another."}},{node:{author:"André Breton",quote:"Of all those arts in which the wise excel, Nature's chief masterpiece is writing well."}},{node:{author:"Salvador Dali",quote:"Intelligence without ambition is a bird without wings."}},{node:{author:"Salvador Dali",quote:"I don't do drugs. I am drugs."}},{node:{author:"Salvador Dali",quote:"Surrealism is destructive, but it destroys only what it considers to be shackles limiting our vision."}},{node:{author:"Salvador Dali",quote:"Drawing is the honesty of the art. There is no possibility of cheating. It is either good or bad."}},{node:{author:"Salvador Dali",quote:"Have no fear of perfection - you'll never reach it."}},{node:{author:"Francis Picabia",quote:"A free spirit takes liberties even with liberty itself."}},{node:{author:"Francis Picabia",quote:"The world is divided into two categories: failures and unknowns."}},{node:{author:"Francis Picabia",quote:"Only useless things are indispensable."}},{node:{author:"Francis Picabia",quote:"Good taste is as tiring as good company."}},{node:{author:"Jean Arp",quote:"Art is a fruit that grows in man, like a fruit on a plant, or a child in its mother's womb."}},{node:{author:"Jean Arp",quote:"I wanted to create new appearances, to extract new forms from man."}},{node:{author:"Jean Arp",quote:"As there is not the least trace of abstraction in this art, we will call it concrete art."}},{node:{author:"Jean Arp",quote:"Artists should work together like the artists of the Middle Ages."}},{node:{author:"Jean Arp",quote:"We do not wish to copy nature. We do not want to reproduce, we want to produce... directly and without meditation."}},{node:{author:"Joan Miro",quote:"I try to apply colors like words that shape poems, like notes that shape music."}},{node:{author:"Joan Miro",quote:"The works must be conceived with fire in the soul but executed with clinical coolness."}},{node:{author:"Joan Miro",quote:"Throughout the time in which I am working on a canvas I can feel how I am beginning to love it, with that love which is born of slow comprehension."}},{node:{author:"Joan Miro",quote:"The more ignoble I find life, the more strongly I react by contradiction, in humour and in an outburst of liberty and expansion."}},{node:{author:"Joan Miro",quote:"The painting rises from the brushstrokes as a poem rises from the words. The meaning comes later. "}},{node:{author:"Man Ray",quote:"A creator needs only one enthusiast to justify him."}},{node:{author:"Man Ray",quote:"It has never been my object to record my dreams, just the determination to realize them."}},{node:{author:"Man Ray",quote:"Don't put my name on it. These are simply documents I make. \""}},{node:{author:"Man Ray",quote:"One of the satisfactions of a genius is his will-power and obstinacy."}},{node:{author:"Max Ernst",quote:"All good ideas arrive by chance."}},{node:{author:"Max Ernst",quote:"Painting is not for me either decorative amusement, or the plastic invention of felt reality; it must be every time: invention, discovery, revelation. "}},{node:{author:"Max Ernst",quote:"Woman's nudity is wiser than the philosopher's teachings."}},{node:{author:"Max Ernst",quote:"Art has nothing to do with taste. Art is not there to be tasted. "}},{node:{author:"René Magritte",quote:"Everything we see hides another thing, we always want to see what is hidden by what we see."}},{node:{author:"René Magritte",quote:"Art evokes the mystery without which the world would not exist.."}},{node:{author:"René Magritte",quote:"The mind loves the unknown. It loves images whose meaning is unknown, since the meaning of the mind itself is unknown."}}]}}}},181:function(e,t,a){"use strict";var n=a(8);t.__esModule=!0,t.default=void 0;var r,o=n(a(7)),i=n(a(44)),s=n(a(76)),l=n(a(102)),d=n(a(0)),u=n(a(4)),c=function(e){var t=(0,l.default)({},e);return t.resolutions&&(t.fixed=t.resolutions,delete t.resolutions),t.sizes&&(t.fluid=t.sizes,delete t.sizes),t},h={},f=function(e){var t=c(e),a=t.fluid?t.fluid.src:t.fixed.src;return h[a]||!1},p=[];var m=function(e,t){(void 0===r&&"undefined"!=typeof window&&window.IntersectionObserver&&(r=new window.IntersectionObserver(function(e){e.forEach(function(e){p.forEach(function(t){t[0]===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(r.unobserve(t[0]),t[1]())})})},{rootMargin:"200px"})),r).observe(e),p.push([e,t])},g=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",n=e.srcSetWebp?"<source type='image/webp' srcset=\""+e.srcSetWebp+'" '+a+"/>":"",r=e.srcSet?'srcset="'+e.srcSet+'" ':"",o=e.title?'title="'+e.title+'" ':"",i=e.alt?'alt="'+e.alt+'" ':'alt="" ',s=e.width?'width="'+e.width+'" ':"",l=e.height?'height="'+e.height+'" ':"",d=e.opacity?e.opacity:"1";return"<picture>"+n+"<img "+s+l+a+r+t+i+o+'style="position:absolute;top:0;left:0;transition:opacity 0.5s;transition-delay:'+(e.transitionDelay?e.transitionDelay:"0.5s")+";opacity:"+d+';width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},y=d.default.forwardRef(function(e,t){var a=e.sizes,n=e.srcSet,r=e.src,o=e.style,i=e.onLoad,u=e.onError,c=(0,s.default)(e,["sizes","srcSet","src","style","onLoad","onError"]);return d.default.createElement("img",(0,l.default)({sizes:a,srcSet:n,src:r},c,{onLoad:i,onError:u,ref:t,style:(0,l.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},o)}))});y.propTypes={style:u.default.object,onError:u.default.func,onLoad:u.default.func};var w=function(e){function t(t){var a;a=e.call(this,t)||this;var n=!0,r=!1,o=t.fadeIn,s=f(t);!s&&"undefined"!=typeof window&&window.IntersectionObserver&&(n=!1,r=!0),"undefined"==typeof window&&(n=!1),t.critical&&(n=!0,r=!1);var l=!(a.props.critical&&!a.props.fadeIn);return a.state={isVisible:n,imgLoaded:!1,IOSupported:r,fadeIn:o,hasNoScript:l,seenBefore:s},a.imageRef=d.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,i.default)((0,i.default)(a))),a.handleRef=a.handleRef.bind((0,i.default)((0,i.default)(a))),a}(0,o.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:f(this.props)}),this.props.critical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.handleRef=function(e){var t=this;this.state.IOSupported&&e&&m(e,function(){var e=f(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0,imgLoaded:e})})},a.handleImageLoaded=function(){var e,t,a;e=this.props,t=c(e),a=t.fluid?t.fluid.src:t.fixed.src,h[a]=!0,this.setState({imgLoaded:!0}),this.state.seenBefore&&this.setState({fadeIn:!1}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=c(this.props),t=e.title,a=e.alt,n=e.className,r=e.style,o=void 0===r?{}:r,i=e.imgStyle,s=void 0===i?{}:i,u=e.placeholderStyle,h=void 0===u?{}:u,f=e.placeholderClassName,p=e.fluid,m=e.fixed,w=e.backgroundColor,b=e.Tag,v=e.itemProp,S="boolean"==typeof w?"lightgray":w,E=(0,l.default)({opacity:this.state.imgLoaded?0:1,transition:"opacity 0.5s",transitionDelay:this.state.imgLoaded?"0.5s":"0.25s"},s,h),q=(0,l.default)({opacity:this.state.imgLoaded||!1===this.state.fadeIn?1:0,transition:!0===this.state.fadeIn?"opacity 0.5s":"none"},s),I={title:t,alt:this.state.isVisible?"":a,style:E,className:f};if(p){var k=p;return d.default.createElement(b,{className:(n||"")+" gatsby-image-wrapper",style:(0,l.default)({position:"relative",overflow:"hidden"},o),ref:this.handleRef,key:"fluid-"+JSON.stringify(k.srcSet)},d.default.createElement(b,{style:{width:"100%",paddingBottom:100/k.aspectRatio+"%"}}),k.base64&&d.default.createElement(y,(0,l.default)({src:k.base64},I)),k.tracedSVG&&d.default.createElement(y,(0,l.default)({src:k.tracedSVG},I)),S&&d.default.createElement(b,{title:t,style:{backgroundColor:S,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,transitionDelay:"0.35s",right:0,left:0}}),this.state.isVisible&&d.default.createElement("picture",null,k.srcSetWebp&&d.default.createElement("source",{type:"image/webp",srcSet:k.srcSetWebp,sizes:k.sizes}),d.default.createElement(y,{alt:a,title:t,sizes:k.sizes,src:k.src,srcSet:k.srcSet,style:q,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:v})),this.state.hasNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:g((0,l.default)({alt:a,title:t},k))}}))}if(m){var M=m,L=(0,l.default)({position:"relative",overflow:"hidden",display:"inline-block",width:M.width,height:M.height},o);return"inherit"===o.display&&delete L.display,d.default.createElement(b,{className:(n||"")+" gatsby-image-wrapper",style:L,ref:this.handleRef,key:"fixed-"+JSON.stringify(M.srcSet)},M.base64&&d.default.createElement(y,(0,l.default)({src:M.base64},I)),M.tracedSVG&&d.default.createElement(y,(0,l.default)({src:M.tracedSVG},I)),S&&d.default.createElement(b,{title:t,style:{backgroundColor:S,width:M.width,opacity:this.state.imgLoaded?0:1,transitionDelay:"0.25s",height:M.height}}),this.state.isVisible&&d.default.createElement("picture",null,M.srcSetWebp&&d.default.createElement("source",{type:"image/webp",srcSet:M.srcSetWebp,sizes:M.sizes}),d.default.createElement(y,{alt:a,title:t,width:M.width,height:M.height,sizes:M.sizes,src:M.src,srcSet:M.srcSet,style:q,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:v})),this.state.hasNoScript&&d.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:g((0,l.default)({alt:a,title:t,width:M.width,height:M.height},M))}}))}return null},t}(d.default.Component);w.defaultProps={critical:!1,fadeIn:!0,alt:"",Tag:"div"};var b=u.default.shape({width:u.default.number.isRequired,height:u.default.number.isRequired,src:u.default.string.isRequired,srcSet:u.default.string.isRequired,base64:u.default.string,tracedSVG:u.default.string,srcWebp:u.default.string,srcSetWebp:u.default.string}),v=u.default.shape({aspectRatio:u.default.number.isRequired,src:u.default.string.isRequired,srcSet:u.default.string.isRequired,sizes:u.default.string.isRequired,base64:u.default.string,tracedSVG:u.default.string,srcWebp:u.default.string,srcSetWebp:u.default.string});w.propTypes={resolutions:b,sizes:v,fixed:b,fluid:v,fadeIn:u.default.bool,title:u.default.string,alt:u.default.string,className:u.default.oneOfType([u.default.string,u.default.object]),critical:u.default.bool,style:u.default.object,imgStyle:u.default.object,placeholderStyle:u.default.object,placeholderClassName:u.default.string,backgroundColor:u.default.oneOfType([u.default.string,u.default.bool]),onLoad:u.default.func,onError:u.default.func,onStartLoad:u.default.func,Tag:u.default.string,itemProp:u.default.string};var S=w;t.default=S}}]);
//# sourceMappingURL=1-e572e6f451937450fb22.js.map