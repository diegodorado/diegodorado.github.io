(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{147:function(e,a,t){"use strict";t.r(a),t.d(a,"pageQuery",function(){return l});var n=t(0),o=t.n(n),r=t(173),i=t(168),s=t(169);a.default=function(e){var a=e.data,t=e.pageContext,n=e.location,l=a.markdownRemark,c=a.site.siteMetadata.title,u=t.previous,d=t.next;u=u?o.a.createElement(s.a,{to:u},"=>"):o.a.createElement("span",null,"..."),d=d?o.a.createElement(s.a,{to:d},"<="):o.a.createElement("span",null,"...");var m=o.a.createElement("nav",{className:"pagination"},d," ",o.a.createElement(s.a,{to:"/work"},"all works")," ",u);return o.a.createElement(r.a,{location:n,title:c},o.a.createElement(i.a,{title:l.frontmatter.title,description:l.frontmatter.description||l.excerpt}),o.a.createElement("div",{className:"work-title"},o.a.createElement("h2",null,l.frontmatter.title),m),o.a.createElement("div",{className:(l.frontmatter.style?l.frontmatter.style:"")+" work-post",dangerouslySetInnerHTML:{__html:l.html}}),m)};var l="1354900218"},165:function(e,a,t){"use strict";t.d(a,"b",function(){return u});var n=t(0),o=t.n(n),r=t(4),i=t.n(r),s=t(34),l=t.n(s);t.d(a,"a",function(){return l.a}),t.d(a,"c",function(){return s.navigate});t(166);var c=o.a.createContext({}),u=function(e){return o.a.createElement(c.Consumer,null,function(a){return e.data||a[e.query]&&a[e.query].data?(e.render||e.children)(e.data?e.data.data:a[e.query].data):o.a.createElement("div",null,"Loading (StaticQuery)")})};u.propTypes={data:i.a.object,query:i.a.string.isRequired,render:i.a.func,children:i.a.func}},166:function(e,a,t){var n;e.exports=(n=t(170))&&n.default||n},168:function(e,a,t){"use strict";var n=t(172),o=t(0),r=t.n(o),i=t(4),s=t.n(i),l=t(167),c=t.n(l),u=t(165);function d(e){var a=e.description,t=e.lang,o=e.meta,i=e.keywords,s=e.title;return r.a.createElement(u.b,{query:m,render:function(e){var n=a||e.site.siteMetadata.description;return r.a.createElement(c.a,{htmlAttributes:{lang:t},title:s,titleTemplate:"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:n},{property:"og:title",content:s},{property:"og:description",content:n},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:e.site.siteMetadata.author},{name:"twitter:title",content:s},{name:"twitter:description",content:n}].concat(i.length>0?{name:"keywords",content:i.join(", ")}:[]).concat(o)})},data:n})}d.defaultProps={lang:"en",meta:[],keywords:[]},d.propTypes={description:s.a.string,lang:s.a.string,meta:s.a.array,keywords:s.a.arrayOf(s.a.string),title:s.a.string.isRequired},a.a=d;var m="1025518380"},169:function(e,a,t){"use strict";t(35);var n=t(74),o=t.n(n),r=t(0),i=t.n(r),s=t(165),l=t(164);a.a=function(e){var a=e.to,t=o()(e,["to"]),n=Object(l.c)(),r=(n[0],n[1]);return i.a.createElement(s.a,Object.assign({},t,{to:"/"+r.languages[0]+a}))}},170:function(e,a,t){"use strict";t.r(a);t(35);var n=t(0),o=t.n(n),r=t(4),i=t.n(r),s=t(55),l=t(2),c=function(e){var a=e.location,t=l.default.getResourcesForPathnameSync(a.pathname);return t?o.a.createElement(s.a,Object.assign({location:a,pageResources:t},t.json)):null};c.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},a.default=c},171:function(e,a,t){"use strict";t(25);var n=t(7),o=t.n(n),r=t(0),i=t.n(r),s=t(165),l=t(4),c=t.n(l),u=[["i","1"],["e","3"],["o","0"],["g","6"],["a","4"]],d=function(e){function a(a){var t;return(t=e.call(this,a)||this).state={title:a.title,swaps:a.swaps||u},t}o()(a,e);var t=a.prototype;return t.getDiff=function(){for(var e=0,a=0;a<this.props.title.length;a++)e+=this.state.title[a]===this.props.title[a]?0:1;return e},t.timer=function(){var e=this.state.swaps,a=Math.floor(Math.random()*e.length),t=Math.round(Math.random());this.getDiff()>3&&(t=1);var n=t?0:1;Math.random()<.5&&this.setState({title:this.state.title.replace(e[a][t],e[a][n])})},t.componentDidMount=function(){this.intervalId=setInterval(this.timer.bind(this),100)},t.componentWillUnmount=function(){clearInterval(this.intervalId)},t.render=function(){return i.a.createElement("h1",null,i.a.createElement(s.a,{to:"/"},this.state.title))},a}(i.a.Component);d.propTypes={title:c.a.string.isRequired,swaps:c.a.array},a.a=d},172:function(e){e.exports={data:{site:{siteMetadata:{title:"diego dorado",description:"diego dorado portfolio.",author:"Diego Dorado"}}}}},173:function(e,a,t){"use strict";var n=t(180),o=t(164),r=t(179),i=t.n(r),s=t(176),l=t(177),c=t(178);n.a.use(i.a).use(o.b).init({resources:{en:s,es:l},fallbackLng:"en",whitelist:["en","es"],debug:!1,saveMissing:!1,updateMissing:!1,load:"languageOnly",keySeparator:!1,interpolation:{escapeValue:!1}}),n.a.quotes=c;n.a;var u=t(0),d=t.n(u),m=function(){var e=Object(o.c)(),a=(e[0],e[1]),t=a.quotes[a.languages[0]],n=Object(u.useState)(t[0]),r=n[0],i=n[1];return Object(u.useEffect)(function(){var e=Math.random();i(t[Math.floor(e*t.length)])}),d.a.createElement("footer",null,d.a.createElement("table",null,d.a.createElement("tbody",null,d.a.createElement("tr",null,d.a.createElement("td",null,d.a.createElement("cite",null,r[1]))),d.a.createElement("tr",null,d.a.createElement("td",null,d.a.createElement("span",null,r[0]))))))},h=(t(35),t(74)),p=t.n(h),g=t(169),f=t(167),v=t.n(f),b=t(171),y=t(174),w=t(175),E=function(){var e=Object(u.useState)("dark"),a=e[0],t=e[1];Object(u.useEffect)(function(){return t(w.reactLocalStorage.get("theme","dark"))},[]),Object(u.useEffect)(function(){w.reactLocalStorage.set("theme",a)},[a]);var n=Object(o.c)();n[0],n[1];return d.a.createElement(d.a.Fragment,null,d.a.createElement(v.a,{bodyAttributes:{class:a}}),d.a.createElement("a",{title:"change theme color",href:"/",onClick:function(e){e.preventDefault(),t("dark"===a?"light":"dark")}},d.a.createElement("span",null,"◐")))},M=[{name:"viewport",content:'width=device-width, initial-scale=1.0\nclass LELayout extends React.Component {\n\n  render() {\n    const { children } = this.props\n\n    return (\n      <div id="app">\n        <header>\n          <Helmet bodyAttributes={{class:\'dark live-emojing\'}} />\n          <Brand title="live emojing"/>\n          <LanguagesLinks location={location}/>\n        </header>\n        <main>{children}</main>\n      </div>\n    )\n  }\n}\n, maximum-scale=1.0, user-scalable=no'},{name:"theme-color",content:"#ff0000"},{name:"msapplication-navbutton-color",content:"#ff0000"},{name:"apple-mobile-web-app-status-bar-style",content:"#ff0000"}],k=function(e){return function(a){var t=a.isPartiallyCurrent;return{className:(e||"")+" "+(t?"active":"")}}},j=function(e){var a=e.location,t=Object(o.c)(),n=t[0],r=(t[1],function(e){var a=e.className,t=p()(e,["className"]);return d.a.createElement(g.a,Object.assign({getProps:k(a)},t))});return d.a.createElement("header",null,d.a.createElement(v.a,{meta:M}),d.a.createElement(b.a,{title:"diego dorado"}),d.a.createElement("nav",null,d.a.createElement(y.a,{location:a}),d.a.createElement(E,null),d.a.createElement("br",null),d.a.createElement(r,{to:"/work"},n("Work")),"|",d.a.createElement(r,{to:"/music"},n("Music")),"|",d.a.createElement(r,{className:"labs",to:"/labs"},d.a.createElement("i",null,"L"),d.a.createElement("i",null,"a"),d.a.createElement("i",null,"b"),d.a.createElement("i",null,"s")),"|",d.a.createElement(r,{to:"/pics"},n("Pics")),"|",d.a.createElement(r,{to:"/bio"},n("Bio"))))};a.a=function(e){var a=e.children,t=e.location;return d.a.createElement("div",{id:"app"},d.a.createElement(j,{location:t}),d.a.createElement("main",null,a),d.a.createElement(m,null))}},174:function(e,a,t){"use strict";t(25);var n=t(0),o=t.n(n),r=t(165),i=t(164);a.a=function(e){var a=e.location,t=Object(i.c)(),n=(t[0],t[1]),s=function(e){e.preventDefault();var t=n.languages[0];n.changeLanguage("es"===n.languages[0]?"en":"es");var o=a.pathname.replace("/"+t+"/","/"+n.languages[0]+"/");Object(r.c)(o)};return o.a.createElement(o.a.Fragment,null,o.a.createElement("a",{href:"/",onClick:s,className:"es"===n.languages[0]?"active":""},"es"),"/",o.a.createElement("a",{href:"/",onClick:s,className:"en"===n.languages[0]?"active":""},"en"))}},176:function(e){e.exports={translation:{Work:"Work",Music:"Music",Pics:"Pics",Bio:"Bio",Intro:"I am Diego Dorado, live coder, programmer and electronic artist. I am passionate about research projects that combine technological innovation with artistic expressions.",Explore:"<0>Explore</0> the projects that I've been working on.",MusicIntro:"Hi there. These are some tracks I have produced in the past. They are all uploaded to <0>soundcloud</0>, but I like to see them here. =)","Random Pics":"Random pics, by <0>Nicolás Croce</0>.","These are from Instagram.":"These are from Instagram.","Follow me there!":"Follow me there!",liveCodingSessions:"Lucky you! There is an active channel.",liveCodingSessions_plural:"Never though this possible! There are {{count}} active channels.","":""}}},177:function(e){e.exports={translation:{Work:"Trabajo",Music:"Música",Pics:"Fotos",Bio:"Bio",Intro:"Soy Diego Dorado, live coder, programador y artista electrónico. Me apasionan los proyectos de investigación que combinan innovación tecnológica con expresiones artísticas.",Explore:"<0>Explora</0> los proyectos en los que estuve trabajando.",MusicIntro:"Hola!. Estos son algunos tracks que produje hace un tiempo. Están subidos a <0>soundcloud</0>, pero me gusta tenerlos acá. =)","Random Pics":"Imágenes random, por <0>Nicolás Croce</0>.","These are from Instagram.":"Estas son de Instagram.","Follow me there!":"Seguime! ","":""}}},178:function(e){e.exports={en:[["André Breton","Beauty will be convulsive or will not be at all."],["André Breton","All my life, my heart has yearned for a thing I cannot name."],["André Breton","It is living and ceasing to live that are imaginary solutions. Existence is elsewhere."],["André Breton","Words make love with one another."],["André Breton","Of all those arts in which the wise excel, Nature's chief masterpiece is writing well."],["Salvador Dali","Intelligence without ambition is a bird without wings."],["Salvador Dali","I don't do drugs. I am drugs."],["Salvador Dali","Surrealism is destructive, but it destroys only what it considers to be shackles limiting our vision."],["Salvador Dali","Drawing is the honesty of the art. There is no possibility of cheating. It is either good or bad."],["Salvador Dali","Have no fear of perfection - you'll never reach it."],["Francis Picabia","A free spirit takes liberties even with liberty itself."],["Francis Picabia","The world is divided into two categories: failures and unknowns."],["Francis Picabia","Only useless things are indispensable."],["Francis Picabia","Good taste is as tiring as good company."],["Jean Arp","Art is a fruit that grows in man, like a fruit on a plant, or a child in its mother's womb."],["Jean Arp","I wanted to create new appearances, to extract new forms from man."],["Jean Arp","As there is not the least trace of abstraction in this art, we will call it concrete art."],["Jean Arp","Artists should work together like the artists of the Middle Ages."],["Jean Arp","We do not wish to copy nature. We do not want to reproduce, we want to produce... directly and without meditation."],["Joan Miro","I try to apply colors like words that shape poems, like notes that shape music."],["Joan Miro","The works must be conceived with fire in the soul but executed with clinical coolness."],["Joan Miro","Throughout the time in which I am working on a canvas I can feel how I am beginning to love it, with that love which is born of slow comprehension."],["Joan Miro","The more ignoble I find life, the more strongly I react by contradiction, in humour and in an outburst of liberty and expansion."],["Joan Miro","The painting rises from the brushstrokes as a poem rises from the words. The meaning comes later. "],["Man Ray","A creator needs only one enthusiast to justify him."],["Man Ray","It has never been my object to record my dreams, just the determination to realize them."],["Man Ray","Don't put my name on it. These are simply documents I make."],["Man Ray","One of the satisfactions of a genius is his will-power and obstinacy."],["Max Ernst","All good ideas arrive by chance."],["Max Ernst","Painting is not for me either decorative amusement, or the plastic invention of felt reality; it must be every time: invention, discovery, revelation. "],["Max Ernst","Woman's nudity is wiser than the philosopher's teachings."],["Max Ernst","Art has nothing to do with taste. Art is not there to be tasted. "],["René Magritte","Everything we see hides another thing, we always want to see what is hidden by what we see."],["René Magritte","Art evokes the mystery without which the world would not exist.."],["René Magritte","The mind loves the unknown. It loves images whose meaning is unknown, since the meaning of the mind itself is unknown."]],es:[["André Breton","La belleza será convulsiva o no lo será en absoluto"],["André Breton","Toda mi vida, mi corazón ha anhelado algo que no puedo nombrar."],["André Breton","Es vivir y dejar de vivir lo que son soluciones imaginarias. La existencia está en otra parte."],["André Breton","Las palabras hacen el amor el uno con el otro."],["André Breton","De todas esas artes en las la sabiduría sobresale, la principal obra maestra de la naturaleza está escribiendo bien."],["Salvador Dali","La inteligencia sin ambición es un pájaro sin alas"],["Salvador Dali","No consumo droga. Soy droga"],["Salvador Dali","El surrealismo es destructivo, pero destruye solo lo que considera ser cadenas limitando nuestra visión."],["Salvador Dali","Dibujar es la honestidad del arte. No hay posibilidad de hacer trampa. Es bueno o es malo."],["Salvador Dali","No tengas miedo de la perfección, nunca la alcanzarás."],["Francis Picabia","Un espíritu libre se toma libertades incluso con la libertad misma."],["Francis Picabia","El mundo está dividido en dos categorías: fallos e incógnitas."],["Francis Picabia","Sólo las cosas inútiles son indispensables"],["Francis Picabia","El buen gusto es tan aburrido como la buena compañía."],["Jean Arp","El arte es una fruta que crece en el hombre, como una fruta en una planta, o un niño en el vientre de su madre."],["Jean Arp","Quería crear nuevas apariencias, extraer nuevas formas del hombre."],["Jean Arp","Como no hay el menor rastro de abstracción en este arte, lo llamaremos arte concreto."],["Jean Arp","Los artistas deben trabajar juntos como los artistas de la Edad Media."],["Jean Arp","No deseamos copiar la naturaleza. No queremos reproducir, queremos producir ... directamente y sin meditación."],["Joan Miro","Intento aplicar colores como palabras que dan forma a poemas, como notas que dan forma a la música."],["Joan Miro","Las obras deben concebirse con fuego en el alma, pero ejecutarse con frialdad clínica."],["Joan Miro","A lo largo del tiempo en el que estoy trabajando en un lienzo, puedo sentir cómo estoy empezando a amarlo, con ese amor que nace de la comprensión lenta."],["Joan Miro","Cuanto más innoble encuentro la vida, más fuertemente reacciono ante la contradicción, con humor y en un estallido de libertad y expansión."],["Joan Miro","La pintura surge de las pinceladas tal como un poema se eleva desde las palabras. El significado viene más tarde."],["Man Ray","Un creador solo necesita un entusiasta que lo justifique."],["Man Ray","Nunca ha sido mi objetivo registrar mis sueños, solo la determinación de realizarlos."],["Man Ray","No le pongas mi nombre. Estos son simplemente documentos que hago."],["Man Ray","Una de las satisfacciones de un genio es su fuerza de voluntad y obstinación."],["Max Ernst","Todas las buenas ideas llegan por casualidad."],["Max Ernst","Pintar no es para mí una diversión decorativa, ni la invención plástica de la realidad sentida; debe ser siempre: invención, descubrimiento, revelación."],["Max Ernst","La desnudez de la mujer es más sabia que las enseñanzas del filósofo."],["Max Ernst","El arte no tiene nada que ver con el gusto. El arte no está ahí para ser probado."],["René Magritte","Todo lo que vemos esconde otra cosa, siempre queremos ver lo que está oculto por lo que vemos."],["René Magritte","El arte evoca el misterio sin el cual el mundo no existiría ..."],["René Magritte","La mente ama lo desconocido. Ama las imágenes cuyo significado es desconocido, ya que el significado de la mente en sí es desconocido"]]}}}]);
//# sourceMappingURL=component---src-templates-work-post-js-fcbeb38aa376dedfbcc9.js.map