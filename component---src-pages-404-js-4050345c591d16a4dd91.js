(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{148:function(t,e,n){"use strict";n.r(e),n.d(e,"pageQuery",function(){return l});var a=n(7),r=n.n(a),i=n(0),o=n.n(i),c=n(159),s=n(160),u=function(t){function e(){return t.apply(this,arguments)||this}return r()(e,t),e.prototype.render=function(){var t=this.props.data.site.siteMetadata.title;return o.a.createElement(c.a,{location:this.props.location,title:t},o.a.createElement(s.a,{title:"404: Not Found"}),o.a.createElement("h1",null,"Not Found"),o.a.createElement("p",null,"You just hit a route that doesn't exist... the sadness."))},e}(o.a.Component);e.default=u;var l="1097489062"},156:function(t,e,n){"use strict";n.d(e,"b",function(){return l});var a=n(0),r=n.n(a),i=n(4),o=n.n(i),c=n(32),s=n.n(c);n.d(e,"a",function(){return s.a}),n.d(e,"c",function(){return c.navigate});n(157);var u=r.a.createContext({}),l=function(t){return r.a.createElement(u.Consumer,null,function(e){return t.data||e[t.query]&&e[t.query].data?(t.render||t.children)(t.data?t.data.data:e[t.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};l.propTypes={data:o.a.object,query:o.a.string.isRequired,render:o.a.func,children:o.a.func}},157:function(t,e,n){var a;t.exports=(a=n(158))&&a.default||a},158:function(t,e,n){"use strict";n.r(e);n(33);var a=n(0),r=n.n(a),i=n(4),o=n.n(i),c=n(54),s=n(2),u=function(t){var e=t.location,n=s.default.getResourcesForPathnameSync(e.pathname);return r.a.createElement(c.a,Object.assign({location:e,pageResources:n},n.json))};u.propTypes={location:o.a.shape({pathname:o.a.string.isRequired}).isRequired},e.default=u},159:function(t,e,n){"use strict";n(34);var a=n(7),r=n.n(a),i=(n(33),n(0)),o=n.n(i),c=n(156),s=function(t){var e=Object.assign({},t);return o.a.createElement(c.a,Object.assign({getProps:function(t){return{className:t.isPartiallyCurrent?"active":""}}},e))},u=[["i","1"],["e","3"],["o","0"],["g","6"],["a","4"]],l="diego dorado",d=function(t){function e(e){var n;return(n=t.call(this,e)||this).state={title:l},n}r()(e,t);var n=e.prototype;return n.getDiff=function(){for(var t=0,e=0;e<l.length;e++)t+=this.state.title[e]===l[e]?0:1;return t},n.timer=function(){var t=Math.floor(Math.random()*u.length),e=Math.round(Math.random());this.getDiff()>3&&(e=1);var n=e?0:1;Math.random()<.51&&this.setState({title:this.state.title.replace(u[t][e],u[t][n])})},n.componentDidMount=function(){this.intervalId=setInterval(this.timer.bind(this),100)},n.componentWillUnmount=function(){clearInterval(this.intervalId)},n.render=function(){var t=this.props.children;return o.a.createElement("div",{id:"app"},o.a.createElement("header",null,o.a.createElement("h1",null,o.a.createElement(c.a,{to:"/"},this.state.title)),o.a.createElement("nav",null,o.a.createElement(s,{to:"/work"},"Work")," | ",o.a.createElement(s,{to:"/bio"},"Bio")," | ",o.a.createElement(s,{to:"/pics"},"Pics")," ")),o.a.createElement("main",null,t),o.a.createElement("footer",null,"© 2019 Diego Dorado"))},e}(o.a.Component);e.a=d},160:function(t,e,n){"use strict";var a=n(161),r=n(0),i=n.n(r),o=n(4),c=n.n(o),s=n(163),u=n.n(s),l=n(156);function d(t){var e=t.description,n=t.lang,r=t.meta,o=t.keywords,c=t.title;return i.a.createElement(l.b,{query:p,render:function(t){var a=e||t.site.siteMetadata.description;return i.a.createElement(u.a,{htmlAttributes:{lang:n},title:c,titleTemplate:"%s | "+t.site.siteMetadata.title,meta:[{name:"description",content:a},{property:"og:title",content:c},{property:"og:description",content:a},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:t.site.siteMetadata.author},{name:"twitter:title",content:c},{name:"twitter:description",content:a}].concat(o.length>0?{name:"keywords",content:o.join(", ")}:[]).concat(r)})},data:a})}d.defaultProps={lang:"en",meta:[],keywords:[]},d.propTypes={description:c.a.string,lang:c.a.string,meta:c.a.array,keywords:c.a.arrayOf(c.a.string),title:c.a.string.isRequired},e.a=d;var p="1025518380"},161:function(t){t.exports={data:{site:{siteMetadata:{title:"diego dorado",description:"diego dorado portfolio.",author:"Diego Dorado"}}}}}}]);
//# sourceMappingURL=component---src-pages-404-js-4050345c591d16a4dd91.js.map