(window.webpackJsonp=window.webpackJsonp||[]).push([[18,3],{159:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(182),o=a.n(i),s=a(7),l=a.n(s),c=a(345),u=a.n(c),d=(a(154),function(e){function t(t){var a;return(a=e.call(this,t)||this).onMouseEnter=function(e){a.setState({paused:!0})},a.onMouseLeave=function(e){a.setState({paused:!1})},a.onMouseClick=function(e){e.preventDefault();var t=a.state.index;t++,t%=a.props.children.length,a.setState({index:t})},a.state={index:0,paused:!1},a}l()(t,e);var a=t.prototype;return a.componentWillMount=function(){var e=this,t=null,a=this.props,n=a.children,r=a.speed;!function a(i){if(!e.willUnmount){if(!t||i-t>r){var o=e.state,s=o.index;o.paused||(s++,s%=n.length,e.setState({index:s}),t=i)}u()(a)}}()},a.componentDidMount=function(){},a.componentWillUnmount=function(){this.willUnmount=!0},a.render=function(){var e=this.props.children,t=this.state.index;return r.a.createElement("div",{className:"cyclic-fade-container",onClick:this.onMouseClick,onMouseEnter:this.onMouseEnter,onMouseLeave:this.onMouseLeave},e.map(function(e,a){return r.a.createElement("div",{key:a,className:"cyclic-fade-child "+(a===t?"active":"")},e)}))},t}(n.Component)),m=a(171),f=a(166),h=a(163);a.d(t,"pageQuery",function(){return p});t.default=function(e){var t=e.data,a=e.location,n=Object(h.c)()[0],i=t.allFile.edges,s=t.allInstaNode.edges;return r.a.createElement(m.a,{location:a},r.a.createElement(f.a,{title:"pics"}),r.a.createElement("p",{className:"spacey"},r.a.createElement(h.a,{i18nKey:"Random Pics",components:[r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://www.facebook.com/nicolascroceph"},"Nicolás Croce")]})),r.a.createElement(d,{speed:2e3},i.map(function(e){var t=e.node;return r.a.createElement(o.a,{key:t.id,fluid:t.childImageSharp.fluid})})),r.a.createElement("p",{className:"spacey"},n("These are from Instagram."),r.a.createElement("br",null),n("Follow me there!")," ",r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"https://www.instagram.com/diegdorado/"},"@diegdorado")),r.a.createElement("section",{className:"posts ig"},s.map(function(e){var t=e.node;return r.a.createElement("article",{className:"post",key:t.id},r.a.createElement("div",{className:"card"},r.a.createElement("h3",null,r.a.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:"http://instagram.com/p/"+t.id},t.caption,t.mediaType))))})))};var p="2117378723"},162:function(e,t,a){"use strict";a.d(t,"b",function(){return u});var n=a(0),r=a.n(n),i=a(4),o=a.n(i),s=a(34),l=a.n(s);a.d(t,"a",function(){return l.a}),a.d(t,"c",function(){return s.navigate});a(164);var c=r.a.createContext({}),u=function(e){return r.a.createElement(c.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};u.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},164:function(e,t,a){var n;e.exports=(n=a(168))&&n.default||n},166:function(e,t,a){"use strict";var n=a(170),r=a(0),i=a.n(r),o=a(4),s=a.n(o),l=a(165),c=a.n(l),u=a(162);function d(e){var t=e.description,a=e.lang,r=e.meta,o=e.keywords,s=e.title;return i.a.createElement(u.b,{query:m,render:function(e){var n=t||e.site.siteMetadata.description;return i.a.createElement(c.a,{htmlAttributes:{lang:a},title:s,titleTemplate:"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:n},{property:"og:title",content:s},{property:"og:description",content:n},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:title",content:s},{name:"twitter:description",content:n}].concat(o.length>0?{name:"keywords",content:o.join(", ")}:[]).concat(r)})},data:n})}d.defaultProps={lang:"en",meta:[],keywords:[]},d.propTypes={description:s.a.string,lang:s.a.string,meta:s.a.array,keywords:s.a.arrayOf(s.a.string),title:s.a.string.isRequired},t.a=d;var m="1025518380"},167:function(e,t,a){"use strict";a(35);var n=a(74),r=a.n(n),i=a(0),o=a.n(i),s=a(162),l=a(163);t.a=function(e){var t=e.to,a=r()(e,["to"]),n=Object(l.c)()[1];return o.a.createElement(s.a,Object.assign({},a,{to:"/"+n.languages[0]+t}))}},168:function(e,t,a){"use strict";a.r(t);a(35);var n=a(0),r=a.n(n),i=a(4),o=a.n(i),s=a(55),l=a(2),c=function(e){var t=e.location,a=l.default.getResourcesForPathnameSync(t.pathname);return a?r.a.createElement(s.a,Object.assign({location:t,pageResources:a},a.json)):null};c.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},t.default=c},169:function(e,t,a){"use strict";a(25);var n=a(7),r=a.n(n),i=a(0),o=a.n(i),s=a(162),l=a(4),c=a.n(l),u=[["i","1"],["e","3"],["o","0"],["g","6"],["a","4"]],d=function(e){function t(t){var a;return(a=e.call(this,t)||this).state={title:t.title,swaps:t.swaps||u},a}r()(t,e);var a=t.prototype;return a.getDiff=function(){for(var e=0,t=0;t<this.props.title.length;t++)e+=this.state.title[t]===this.props.title[t]?0:1;return e},a.timer=function(){var e=this.state.swaps,t=Math.floor(Math.random()*e.length),a=Math.round(Math.random());this.getDiff()>3&&(a=1);var n=a?0:1;Math.random()<.5&&this.setState({title:this.state.title.replace(e[t][a],e[t][n])})},a.componentDidMount=function(){this.intervalId=setInterval(this.timer.bind(this),100)},a.componentWillUnmount=function(){clearInterval(this.intervalId)},a.render=function(){return o.a.createElement("h1",null,o.a.createElement(s.a,{to:"/"},this.state.title))},t}(o.a.Component);d.propTypes={title:c.a.string.isRequired,swaps:c.a.array},t.a=d},170:function(e){e.exports={data:{site:{siteMetadata:{title:"diego dorado",description:"diego dorado portfolio.",author:"Diego Dorado"}}}}},171:function(e,t,a){"use strict";var n=a(177),r=a(163),i=a(176),o=a.n(i),s=a(172),l=a(173),c=a(174);n.a.use(o.a).use(r.b).init({resources:{en:s,es:l},fallbackLng:"en",whitelist:["en","es"],debug:!1,saveMissing:!1,updateMissing:!1,load:"languageOnly",keySeparator:!1,interpolation:{escapeValue:!1}}),n.a.quotes=c;n.a;var u=a(0),d=a.n(u),m=function(){var e=Object(r.c)(),t=(e[0],e[1]),a=t.quotes[t.languages[0]],n=Object(u.useState)(a[0]),i=n[0],o=n[1];return Object(u.useEffect)(function(){var e=Math.random();o(a[Math.floor(e*a.length)])}),d.a.createElement("footer",null,d.a.createElement("table",null,d.a.createElement("tbody",null,d.a.createElement("tr",null,d.a.createElement("td",null,d.a.createElement("cite",null,i[1]))),d.a.createElement("tr",null,d.a.createElement("td",null,d.a.createElement("span",null,i[0]))))))},f=(a(35),a(74)),h=a.n(f),p=a(167),g=a(165),b=a.n(g),v=a(169),y=(a(25),a(162)),w=function(e){var t=e.location,a=Object(r.c)()[1],n=function(e){e.preventDefault();var n=a.languages[0];a.changeLanguage("es"===a.languages[0]?"en":"es");var r=t.pathname.replace("/"+n+"/","/"+a.languages[0]+"/");Object(y.c)(r)};return d.a.createElement(d.a.Fragment,null,d.a.createElement("a",{href:"/",onClick:n,className:"es"===a.languages[0]?"active":""},"es"),"/",d.a.createElement("a",{href:"/",onClick:n,className:"en"===a.languages[0]?"active":""},"en"))},E=a(175),S=function(){var e=Object(u.useState)("dark"),t=e[0],a=e[1];Object(u.useEffect)(function(){return a(E.reactLocalStorage.get("theme","dark"))},[]),Object(u.useEffect)(function(){E.reactLocalStorage.set("theme",t)},[t]);return d.a.createElement(d.a.Fragment,null,d.a.createElement(b.a,{bodyAttributes:{class:t}}),d.a.createElement("a",{title:"change theme color",href:"/",onClick:function(e){e.preventDefault(),a("dark"===t?"light":"dark")}},d.a.createElement("span",null,"◐")))},M=[{name:"viewport",content:"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"},{name:"theme-color",content:"#ff0000"},{name:"msapplication-navbutton-color",content:"#ff0000"},{name:"apple-mobile-web-app-status-bar-style",content:"#ff0000"}],k=function(e){return function(t){var a=t.isPartiallyCurrent;return{className:(e||"")+" "+(a?"active":"")}}},I=function(e){var t=e.location,a=Object(r.c)()[0],n=function(e){var t=e.className,a=h()(e,["className"]);return d.a.createElement(p.a,Object.assign({getProps:k(t)},a))};return d.a.createElement("header",null,d.a.createElement(b.a,{meta:M}),d.a.createElement(v.a,{title:"diego dorado"}),d.a.createElement("nav",null,d.a.createElement(w,{location:t}),d.a.createElement(S,null),d.a.createElement("br",null),d.a.createElement(n,{to:"/work"},a("Work")),"|",d.a.createElement(n,{to:"/music"},a("Music")),"|",d.a.createElement(n,{className:"labs",to:"/labs"},d.a.createElement("i",null,"L"),d.a.createElement("i",null,"a"),d.a.createElement("i",null,"b"),d.a.createElement("i",null,"s")),"|",d.a.createElement(n,{to:"/pics"},a("Pics")),"|",d.a.createElement(n,{to:"/bio"},a("Bio"))))};t.a=function(e){var t=e.children,a=e.location;return d.a.createElement("div",{id:"app"},d.a.createElement(I,{location:a}),d.a.createElement("main",null,t),d.a.createElement(m,null))}},172:function(e){e.exports={translation:{Work:"Work",Music:"Music",Pics:"Pics",Bio:"Bio",Intro:"I am Diego Dorado, live coder, programmer and electronic artist. I am passionate about research projects that combine technological innovation with artistic expressions.",Explore:"<0>Explore</0> the projects that I've been working on.",MusicIntro:"Hi there. These are some tracks I have produced in the past. They are all uploaded to <0>soundcloud</0>, but I like to see them here. =)","Random Pics":"Random pics, by <0>Nicolás Croce</0>.","These are from Instagram.":"These are from Instagram.","Follow me there!":"Follow me there!",liveCodingSessions:"Lucky you! There is an active channel.",liveCodingSessions_plural:"Never though this possible! There are {{count}} active channels.","":""}}},173:function(e){e.exports={translation:{Work:"Trabajo",Music:"Música",Pics:"Fotos",Bio:"Bio",Intro:"Soy Diego Dorado, live coder, programador y artista electrónico. Me apasionan los proyectos de investigación que combinan innovación tecnológica con expresiones artísticas.",Explore:"<0>Explora</0> los proyectos en los que estuve trabajando.",MusicIntro:"Hola!. Estos son algunos tracks que produje hace un tiempo. Están subidos a <0>soundcloud</0>, pero me gusta tenerlos acá. =)","Random Pics":"Imágenes random, por <0>Nicolás Croce</0>.","These are from Instagram.":"Estas son de Instagram.","Follow me there!":"Seguime! ","":""}}},174:function(e){e.exports={en:[["André Breton","Beauty will be convulsive or will not be at all."],["André Breton","All my life, my heart has yearned for a thing I cannot name."],["André Breton","It is living and ceasing to live that are imaginary solutions. Existence is elsewhere."],["André Breton","Words make love with one another."],["André Breton","Of all those arts in which the wise excel, Nature's chief masterpiece is writing well."],["Salvador Dali","Intelligence without ambition is a bird without wings."],["Salvador Dali","I don't do drugs. I am drugs."],["Salvador Dali","Surrealism is destructive, but it destroys only what it considers to be shackles limiting our vision."],["Salvador Dali","Drawing is the honesty of the art. There is no possibility of cheating. It is either good or bad."],["Salvador Dali","Have no fear of perfection - you'll never reach it."],["Francis Picabia","A free spirit takes liberties even with liberty itself."],["Francis Picabia","The world is divided into two categories: failures and unknowns."],["Francis Picabia","Only useless things are indispensable."],["Francis Picabia","Good taste is as tiring as good company."],["Jean Arp","Art is a fruit that grows in man, like a fruit on a plant, or a child in its mother's womb."],["Jean Arp","I wanted to create new appearances, to extract new forms from man."],["Jean Arp","As there is not the least trace of abstraction in this art, we will call it concrete art."],["Jean Arp","Artists should work together like the artists of the Middle Ages."],["Jean Arp","We do not wish to copy nature. We do not want to reproduce, we want to produce... directly and without meditation."],["Joan Miro","I try to apply colors like words that shape poems, like notes that shape music."],["Joan Miro","The works must be conceived with fire in the soul but executed with clinical coolness."],["Joan Miro","Throughout the time in which I am working on a canvas I can feel how I am beginning to love it, with that love which is born of slow comprehension."],["Joan Miro","The more ignoble I find life, the more strongly I react by contradiction, in humour and in an outburst of liberty and expansion."],["Joan Miro","The painting rises from the brushstrokes as a poem rises from the words. The meaning comes later. "],["Man Ray","A creator needs only one enthusiast to justify him."],["Man Ray","It has never been my object to record my dreams, just the determination to realize them."],["Man Ray","Don't put my name on it. These are simply documents I make."],["Man Ray","One of the satisfactions of a genius is his will-power and obstinacy."],["Max Ernst","All good ideas arrive by chance."],["Max Ernst","Painting is not for me either decorative amusement, or the plastic invention of felt reality; it must be every time: invention, discovery, revelation. "],["Max Ernst","Woman's nudity is wiser than the philosopher's teachings."],["Max Ernst","Art has nothing to do with taste. Art is not there to be tasted. "],["René Magritte","Everything we see hides another thing, we always want to see what is hidden by what we see."],["René Magritte","Art evokes the mystery without which the world would not exist.."],["René Magritte","The mind loves the unknown. It loves images whose meaning is unknown, since the meaning of the mind itself is unknown."]],es:[["André Breton","La belleza será convulsiva o no lo será en absoluto"],["André Breton","Toda mi vida, mi corazón ha anhelado algo que no puedo nombrar."],["André Breton","Es vivir y dejar de vivir lo que son soluciones imaginarias. La existencia está en otra parte."],["André Breton","Las palabras hacen el amor el uno con el otro."],["André Breton","De todas esas artes en las la sabiduría sobresale, la principal obra maestra de la naturaleza está escribiendo bien."],["Salvador Dali","La inteligencia sin ambición es un pájaro sin alas"],["Salvador Dali","No consumo droga. Soy droga"],["Salvador Dali","El surrealismo es destructivo, pero destruye solo lo que considera ser cadenas limitando nuestra visión."],["Salvador Dali","Dibujar es la honestidad del arte. No hay posibilidad de hacer trampa. Es bueno o es malo."],["Salvador Dali","No tengas miedo de la perfección, nunca la alcanzarás."],["Francis Picabia","Un espíritu libre se toma libertades incluso con la libertad misma."],["Francis Picabia","El mundo está dividido en dos categorías: fallos e incógnitas."],["Francis Picabia","Sólo las cosas inútiles son indispensables"],["Francis Picabia","El buen gusto es tan aburrido como la buena compañía."],["Jean Arp","El arte es una fruta que crece en el hombre, como una fruta en una planta, o un niño en el vientre de su madre."],["Jean Arp","Quería crear nuevas apariencias, extraer nuevas formas del hombre."],["Jean Arp","Como no hay el menor rastro de abstracción en este arte, lo llamaremos arte concreto."],["Jean Arp","Los artistas deben trabajar juntos como los artistas de la Edad Media."],["Jean Arp","No deseamos copiar la naturaleza. No queremos reproducir, queremos producir ... directamente y sin meditación."],["Joan Miro","Intento aplicar colores como palabras que dan forma a poemas, como notas que dan forma a la música."],["Joan Miro","Las obras deben concebirse con fuego en el alma, pero ejecutarse con frialdad clínica."],["Joan Miro","A lo largo del tiempo en el que estoy trabajando en un lienzo, puedo sentir cómo estoy empezando a amarlo, con ese amor que nace de la comprensión lenta."],["Joan Miro","Cuanto más innoble encuentro la vida, más fuertemente reacciono ante la contradicción, con humor y en un estallido de libertad y expansión."],["Joan Miro","La pintura surge de las pinceladas tal como un poema se eleva desde las palabras. El significado viene más tarde."],["Man Ray","Un creador solo necesita un entusiasta que lo justifique."],["Man Ray","Nunca ha sido mi objetivo registrar mis sueños, solo la determinación de realizarlos."],["Man Ray","No le pongas mi nombre. Estos son simplemente documentos que hago."],["Man Ray","Una de las satisfacciones de un genio es su fuerza de voluntad y obstinación."],["Max Ernst","Todas las buenas ideas llegan por casualidad."],["Max Ernst","Pintar no es para mí una diversión decorativa, ni la invención plástica de la realidad sentida; debe ser siempre: invención, descubrimiento, revelación."],["Max Ernst","La desnudez de la mujer es más sabia que las enseñanzas del filósofo."],["Max Ernst","El arte no tiene nada que ver con el gusto. El arte no está ahí para ser probado."],["René Magritte","Todo lo que vemos esconde otra cosa, siempre queremos ver lo que está oculto por lo que vemos."],["René Magritte","El arte evoca el misterio sin el cual el mundo no existiría ..."],["René Magritte","La mente ama lo desconocido. Ama las imágenes cuyo significado es desconocido, ya que el significado de la mente en sí es desconocido"]]}},182:function(e,t,a){"use strict";var n=a(8);t.__esModule=!0,t.default=void 0;var r,i=n(a(7)),o=n(a(43)),s=n(a(74)),l=n(a(94)),c=n(a(0)),u=n(a(4)),d=function(e){var t=(0,l.default)({},e);return t.resolutions&&(t.fixed=t.resolutions,delete t.resolutions),t.sizes&&(t.fluid=t.sizes,delete t.sizes),t},m={},f=function(e){var t=d(e),a=t.fluid?t.fluid.src:t.fixed.src;return m[a]||!1},h=[];var p=function(e,t){(void 0===r&&"undefined"!=typeof window&&window.IntersectionObserver&&(r=new window.IntersectionObserver(function(e){e.forEach(function(e){h.forEach(function(t){t[0]===e.target&&(e.isIntersecting||e.intersectionRatio>0)&&(r.unobserve(t[0]),t[1]())})})},{rootMargin:"200px"})),r).observe(e),h.push([e,t])},g=function(e){var t=e.src?'src="'+e.src+'" ':'src="" ',a=e.sizes?'sizes="'+e.sizes+'" ':"",n=e.srcSetWebp?"<source type='image/webp' srcset=\""+e.srcSetWebp+'" '+a+"/>":"",r=e.srcSet?'srcset="'+e.srcSet+'" ':"",i=e.title?'title="'+e.title+'" ':"",o=e.alt?'alt="'+e.alt+'" ':'alt="" ',s=e.width?'width="'+e.width+'" ':"",l=e.height?'height="'+e.height+'" ':"",c=e.opacity?e.opacity:"1";return"<picture>"+n+"<img "+s+l+a+r+t+o+i+'style="position:absolute;top:0;left:0;transition:opacity 0.5s;transition-delay:'+(e.transitionDelay?e.transitionDelay:"0.5s")+";opacity:"+c+';width:100%;height:100%;object-fit:cover;object-position:center"/></picture>'},b=c.default.forwardRef(function(e,t){var a=e.sizes,n=e.srcSet,r=e.src,i=e.style,o=e.onLoad,u=e.onError,d=(0,s.default)(e,["sizes","srcSet","src","style","onLoad","onError"]);return c.default.createElement("img",(0,l.default)({sizes:a,srcSet:n,src:r},d,{onLoad:o,onError:u,ref:t,style:(0,l.default)({position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center"},i)}))});b.propTypes={style:u.default.object,onError:u.default.func,onLoad:u.default.func};var v=function(e){function t(t){var a;a=e.call(this,t)||this;var n=!0,r=!1,i=t.fadeIn,s=f(t);!s&&"undefined"!=typeof window&&window.IntersectionObserver&&(n=!1,r=!0),"undefined"==typeof window&&(n=!1),t.critical&&(n=!0,r=!1);var l=!(a.props.critical&&!a.props.fadeIn);return a.state={isVisible:n,imgLoaded:!1,IOSupported:r,fadeIn:i,hasNoScript:l,seenBefore:s},a.imageRef=c.default.createRef(),a.handleImageLoaded=a.handleImageLoaded.bind((0,o.default)((0,o.default)(a))),a.handleRef=a.handleRef.bind((0,o.default)((0,o.default)(a))),a}(0,i.default)(t,e);var a=t.prototype;return a.componentDidMount=function(){if(this.state.isVisible&&"function"==typeof this.props.onStartLoad&&this.props.onStartLoad({wasCached:f(this.props)}),this.props.critical){var e=this.imageRef.current;e&&e.complete&&this.handleImageLoaded()}},a.handleRef=function(e){var t=this;this.state.IOSupported&&e&&p(e,function(){var e=f(t.props);t.state.isVisible||"function"!=typeof t.props.onStartLoad||t.props.onStartLoad({wasCached:e}),t.setState({isVisible:!0,imgLoaded:e})})},a.handleImageLoaded=function(){var e,t,a;e=this.props,t=d(e),a=t.fluid?t.fluid.src:t.fixed.src,m[a]=!0,this.setState({imgLoaded:!0}),this.state.seenBefore&&this.setState({fadeIn:!1}),this.props.onLoad&&this.props.onLoad()},a.render=function(){var e=d(this.props),t=e.title,a=e.alt,n=e.className,r=e.style,i=void 0===r?{}:r,o=e.imgStyle,s=void 0===o?{}:o,u=e.placeholderStyle,m=void 0===u?{}:u,f=e.placeholderClassName,h=e.fluid,p=e.fixed,v=e.backgroundColor,y=e.Tag,w=e.itemProp,E="boolean"==typeof v?"lightgray":v,S=(0,l.default)({opacity:this.state.imgLoaded?0:1,transition:"opacity 0.5s",transitionDelay:this.state.imgLoaded?"0.5s":"0.25s"},s,m),M=(0,l.default)({opacity:this.state.imgLoaded||!1===this.state.fadeIn?1:0,transition:!0===this.state.fadeIn?"opacity 0.5s":"none"},s),k={title:t,alt:this.state.isVisible?"":a,style:S,className:f};if(h){var I=h;return c.default.createElement(y,{className:(n||"")+" gatsby-image-wrapper",style:(0,l.default)({position:"relative",overflow:"hidden"},i),ref:this.handleRef,key:"fluid-"+JSON.stringify(I.srcSet)},c.default.createElement(y,{style:{width:"100%",paddingBottom:100/I.aspectRatio+"%"}}),I.base64&&c.default.createElement(b,(0,l.default)({src:I.base64},k)),I.tracedSVG&&c.default.createElement(b,(0,l.default)({src:I.tracedSVG},k)),E&&c.default.createElement(y,{title:t,style:{backgroundColor:E,position:"absolute",top:0,bottom:0,opacity:this.state.imgLoaded?0:1,transitionDelay:"0.35s",right:0,left:0}}),this.state.isVisible&&c.default.createElement("picture",null,I.srcSetWebp&&c.default.createElement("source",{type:"image/webp",srcSet:I.srcSetWebp,sizes:I.sizes}),c.default.createElement(b,{alt:a,title:t,sizes:I.sizes,src:I.src,srcSet:I.srcSet,style:M,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:w})),this.state.hasNoScript&&c.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:g((0,l.default)({alt:a,title:t},I))}}))}if(p){var T=p,x=(0,l.default)({position:"relative",overflow:"hidden",display:"inline-block",width:T.width,height:T.height},i);return"inherit"===i.display&&delete x.display,c.default.createElement(y,{className:(n||"")+" gatsby-image-wrapper",style:x,ref:this.handleRef,key:"fixed-"+JSON.stringify(T.srcSet)},T.base64&&c.default.createElement(b,(0,l.default)({src:T.base64},k)),T.tracedSVG&&c.default.createElement(b,(0,l.default)({src:T.tracedSVG},k)),E&&c.default.createElement(y,{title:t,style:{backgroundColor:E,width:T.width,opacity:this.state.imgLoaded?0:1,transitionDelay:"0.25s",height:T.height}}),this.state.isVisible&&c.default.createElement("picture",null,T.srcSetWebp&&c.default.createElement("source",{type:"image/webp",srcSet:T.srcSetWebp,sizes:T.sizes}),c.default.createElement(b,{alt:a,title:t,width:T.width,height:T.height,sizes:T.sizes,src:T.src,srcSet:T.srcSet,style:M,ref:this.imageRef,onLoad:this.handleImageLoaded,onError:this.props.onError,itemProp:w})),this.state.hasNoScript&&c.default.createElement("noscript",{dangerouslySetInnerHTML:{__html:g((0,l.default)({alt:a,title:t,width:T.width,height:T.height},T))}}))}return null},t}(c.default.Component);v.defaultProps={critical:!1,fadeIn:!0,alt:"",Tag:"div"};var y=u.default.shape({width:u.default.number.isRequired,height:u.default.number.isRequired,src:u.default.string.isRequired,srcSet:u.default.string.isRequired,base64:u.default.string,tracedSVG:u.default.string,srcWebp:u.default.string,srcSetWebp:u.default.string}),w=u.default.shape({aspectRatio:u.default.number.isRequired,src:u.default.string.isRequired,srcSet:u.default.string.isRequired,sizes:u.default.string.isRequired,base64:u.default.string,tracedSVG:u.default.string,srcWebp:u.default.string,srcSetWebp:u.default.string});v.propTypes={resolutions:y,sizes:w,fixed:y,fluid:w,fadeIn:u.default.bool,title:u.default.string,alt:u.default.string,className:u.default.oneOfType([u.default.string,u.default.object]),critical:u.default.bool,style:u.default.object,imgStyle:u.default.object,placeholderStyle:u.default.object,placeholderClassName:u.default.string,backgroundColor:u.default.oneOfType([u.default.string,u.default.bool]),onLoad:u.default.func,onError:u.default.func,onStartLoad:u.default.func,Tag:u.default.string,itemProp:u.default.string};var E=v;t.default=E},345:function(e,t,a){(function(t){for(var n=a(346),r="undefined"==typeof window?t:window,i=["moz","webkit"],o="AnimationFrame",s=r["request"+o],l=r["cancel"+o]||r["cancelRequest"+o],c=0;!s&&c<i.length;c++)s=r[i[c]+"Request"+o],l=r[i[c]+"Cancel"+o]||r[i[c]+"CancelRequest"+o];if(!s||!l){var u=0,d=0,m=[];s=function(e){if(0===m.length){var t=n(),a=Math.max(0,1e3/60-(t-u));u=a+t,setTimeout(function(){var e=m.slice(0);m.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(u)}catch(a){setTimeout(function(){throw a},0)}},Math.round(a))}return m.push({handle:++d,callback:e,cancelled:!1}),d},l=function(e){for(var t=0;t<m.length;t++)m[t].handle===e&&(m[t].cancelled=!0)}}e.exports=function(e){return s.call(r,e)},e.exports.cancel=function(){l.apply(r,arguments)},e.exports.polyfill=function(e){e||(e=r),e.requestAnimationFrame=s,e.cancelAnimationFrame=l}}).call(this,a(81))},346:function(e,t,a){(function(t){(function(){var a,n,r,i,o,s;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:null!=t&&t.hrtime?(e.exports=function(){return(a()-o)/1e6},n=t.hrtime,i=(a=function(){var e;return 1e9*(e=n())[0]+e[1]})(),s=1e9*t.uptime(),o=i-s):Date.now?(e.exports=function(){return Date.now()-r},r=Date.now()):(e.exports=function(){return(new Date).getTime()-r},r=(new Date).getTime())}).call(this)}).call(this,a(347))},347:function(e,t){var a,n,r=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function s(e){if(a===setTimeout)return setTimeout(e,0);if((a===i||!a)&&setTimeout)return a=setTimeout,setTimeout(e,0);try{return a(e,0)}catch(t){try{return a.call(null,e,0)}catch(t){return a.call(this,e,0)}}}!function(){try{a="function"==typeof setTimeout?setTimeout:i}catch(e){a=i}try{n="function"==typeof clearTimeout?clearTimeout:o}catch(e){n=o}}();var l,c=[],u=!1,d=-1;function m(){u&&l&&(u=!1,l.length?c=l.concat(c):d=-1,c.length&&f())}function f(){if(!u){var e=s(m);u=!0;for(var t=c.length;t;){for(l=c,c=[];++d<t;)l&&l[d].run();d=-1,t=c.length}l=null,u=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===o||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function p(){}r.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var a=1;a<arguments.length;a++)t[a-1]=arguments[a];c.push(new h(e,t)),1!==c.length||u||s(f)},h.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=p,r.addListener=p,r.once=p,r.off=p,r.removeListener=p,r.removeAllListeners=p,r.emit=p,r.prependListener=p,r.prependOnceListener=p,r.listeners=function(e){return[]},r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}}}]);
//# sourceMappingURL=component---src-pages-pics-js-a2801dd004c0e9d0003e.js.map