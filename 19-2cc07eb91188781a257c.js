(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{180:function(t,e,n){"use strict";var r=n(26),i=n(79),o=n(14);t.exports=function(t){for(var e=r(this),n=o(e.length),s=arguments.length,u=i(s>1?arguments[1]:void 0,n),a=s>2?arguments[2]:void 0,f=void 0===a?n:i(a,n);f>u;)e[u++]=t;return e}},188:function(t,e,n){"use strict";var r=n(11),i=n(14),o=n(95),s="".endsWith;r(r.P+r.F*n(96)("endsWith"),"String",{endsWith:function(t){var e=o(this,t,"endsWith"),n=arguments.length>1?arguments[1]:void 0,r=i(e.length),u=void 0===n?r:Math.min(i(n),r),a=String(t);return s?s.call(e,a,u):e.slice(u-a.length,u)===a}})},190:function(t,e,n){"use strict";if(n(19)){var r=n(37),i=n(5),o=n(18),s=n(11),u=n(191),a=n(219),f=n(22),c=n(84),h=n(57),l=n(12),y=n(87),p=n(28),_=n(14),v=n(192),d=n(79),g=n(78),w=n(27),k=n(29),b=n(13),A=n(26),E=n(85),S=n(89),m=n(99),x=n(176).f,M=n(86),I=n(38),K=n(3),N=n(97),C=n(58),F=n(60),L=n(55),P=n(23),W=n(88),B=n(94),O=n(180),U=n(220),V=n(25),T=n(193),R=V.f,D=T.f,Y=i.RangeError,q=i.TypeError,j=i.Uint8Array,z=Array.prototype,J=a.ArrayBuffer,X=a.DataView,G=N(0),H=N(2),Q=N(3),Z=N(4),$=N(5),tt=N(6),et=C(!0),nt=C(!1),rt=L.values,it=L.keys,ot=L.entries,st=z.lastIndexOf,ut=z.reduce,at=z.reduceRight,ft=z.join,ct=z.sort,ht=z.slice,lt=z.toString,yt=z.toLocaleString,pt=K("iterator"),_t=K("toStringTag"),vt=I("typed_constructor"),dt=I("def_constructor"),gt=u.CONSTR,wt=u.TYPED,kt=u.VIEW,bt=N(1,function(t,e){return xt(F(t,t[dt]),e)}),At=o(function(){return 1===new j(new Uint16Array([1]).buffer)[0]}),Et=!!j&&!!j.prototype.set&&o(function(){new j(1).set({})}),St=function(t,e){var n=p(t);if(n<0||n%e)throw Y("Wrong offset!");return n},mt=function(t){if(b(t)&&wt in t)return t;throw q(t+" is not a typed array!")},xt=function(t,e){if(!(b(t)&&vt in t))throw q("It is not a typed array constructor!");return new t(e)},Mt=function(t,e){return It(F(t,t[dt]),e)},It=function(t,e){for(var n=0,r=e.length,i=xt(t,r);r>n;)i[n]=e[n++];return i},Kt=function(t,e,n){R(t,e,{get:function(){return this._d[n]}})},Nt=function(t){var e,n,r,i,o,s,u=A(t),a=arguments.length,c=a>1?arguments[1]:void 0,h=void 0!==c,l=M(u);if(null!=l&&!E(l)){for(s=l.call(u),r=[],e=0;!(o=s.next()).done;e++)r.push(o.value);u=r}for(h&&a>2&&(c=f(c,arguments[2],2)),e=0,n=_(u.length),i=xt(this,n);n>e;e++)i[e]=h?c(u[e],e):u[e];return i},Ct=function(){for(var t=0,e=arguments.length,n=xt(this,e);e>t;)n[t]=arguments[t++];return n},Ft=!!j&&o(function(){yt.call(new j(1))}),Lt=function(){return yt.apply(Ft?ht.call(mt(this)):mt(this),arguments)},Pt={copyWithin:function(t,e){return U.call(mt(this),t,e,arguments.length>2?arguments[2]:void 0)},every:function(t){return Z(mt(this),t,arguments.length>1?arguments[1]:void 0)},fill:function(t){return O.apply(mt(this),arguments)},filter:function(t){return Mt(this,H(mt(this),t,arguments.length>1?arguments[1]:void 0))},find:function(t){return $(mt(this),t,arguments.length>1?arguments[1]:void 0)},findIndex:function(t){return tt(mt(this),t,arguments.length>1?arguments[1]:void 0)},forEach:function(t){G(mt(this),t,arguments.length>1?arguments[1]:void 0)},indexOf:function(t){return nt(mt(this),t,arguments.length>1?arguments[1]:void 0)},includes:function(t){return et(mt(this),t,arguments.length>1?arguments[1]:void 0)},join:function(t){return ft.apply(mt(this),arguments)},lastIndexOf:function(t){return st.apply(mt(this),arguments)},map:function(t){return bt(mt(this),t,arguments.length>1?arguments[1]:void 0)},reduce:function(t){return ut.apply(mt(this),arguments)},reduceRight:function(t){return at.apply(mt(this),arguments)},reverse:function(){for(var t,e=mt(this).length,n=Math.floor(e/2),r=0;r<n;)t=this[r],this[r++]=this[--e],this[e]=t;return this},some:function(t){return Q(mt(this),t,arguments.length>1?arguments[1]:void 0)},sort:function(t){return ct.call(mt(this),t)},subarray:function(t,e){var n=mt(this),r=n.length,i=d(t,r);return new(F(n,n[dt]))(n.buffer,n.byteOffset+i*n.BYTES_PER_ELEMENT,_((void 0===e?r:d(e,r))-i))}},Wt=function(t,e){return Mt(this,ht.call(mt(this),t,e))},Bt=function(t){mt(this);var e=St(arguments[1],1),n=this.length,r=A(t),i=_(r.length),o=0;if(i+e>n)throw Y("Wrong length!");for(;o<i;)this[e+o]=r[o++]},Ot={entries:function(){return ot.call(mt(this))},keys:function(){return it.call(mt(this))},values:function(){return rt.call(mt(this))}},Ut=function(t,e){return b(t)&&t[wt]&&"symbol"!=typeof e&&e in t&&String(+e)==String(e)},Vt=function(t,e){return Ut(t,e=g(e,!0))?h(2,t[e]):D(t,e)},Tt=function(t,e,n){return!(Ut(t,e=g(e,!0))&&b(n)&&w(n,"value"))||w(n,"get")||w(n,"set")||n.configurable||w(n,"writable")&&!n.writable||w(n,"enumerable")&&!n.enumerable?R(t,e,n):(t[e]=n.value,t)};gt||(T.f=Vt,V.f=Tt),s(s.S+s.F*!gt,"Object",{getOwnPropertyDescriptor:Vt,defineProperty:Tt}),o(function(){lt.call({})})&&(lt=yt=function(){return ft.call(this)});var Rt=y({},Pt);y(Rt,Ot),l(Rt,pt,Ot.values),y(Rt,{slice:Wt,set:Bt,constructor:function(){},toString:lt,toLocaleString:Lt}),Kt(Rt,"buffer","b"),Kt(Rt,"byteOffset","o"),Kt(Rt,"byteLength","l"),Kt(Rt,"length","e"),R(Rt,_t,{get:function(){return this[wt]}}),t.exports=function(t,e,n,a){var f=t+((a=!!a)?"Clamped":"")+"Array",h="get"+t,y="set"+t,p=i[f],d=p||{},g=p&&m(p),w=!p||!u.ABV,A={},E=p&&p.prototype,M=function(t,n){R(t,n,{get:function(){return function(t,n){var r=t._d;return r.v[h](n*e+r.o,At)}(this,n)},set:function(t){return function(t,n,r){var i=t._d;a&&(r=(r=Math.round(r))<0?0:r>255?255:255&r),i.v[y](n*e+i.o,r,At)}(this,n,t)},enumerable:!0})};w?(p=n(function(t,n,r,i){c(t,p,f,"_d");var o,s,u,a,h=0,y=0;if(b(n)){if(!(n instanceof J||"ArrayBuffer"==(a=k(n))||"SharedArrayBuffer"==a))return wt in n?It(p,n):Nt.call(p,n);o=n,y=St(r,e);var d=n.byteLength;if(void 0===i){if(d%e)throw Y("Wrong length!");if((s=d-y)<0)throw Y("Wrong length!")}else if((s=_(i)*e)+y>d)throw Y("Wrong length!");u=s/e}else u=v(n),o=new J(s=u*e);for(l(t,"_d",{b:o,o:y,l:s,e:u,v:new X(o)});h<u;)M(t,h++)}),E=p.prototype=S(Rt),l(E,"constructor",p)):o(function(){p(1)})&&o(function(){new p(-1)})&&W(function(t){new p,new p(null),new p(1.5),new p(t)},!0)||(p=n(function(t,n,r,i){var o;return c(t,p,f),b(n)?n instanceof J||"ArrayBuffer"==(o=k(n))||"SharedArrayBuffer"==o?void 0!==i?new d(n,St(r,e),i):void 0!==r?new d(n,St(r,e)):new d(n):wt in n?It(p,n):Nt.call(p,n):new d(v(n))}),G(g!==Function.prototype?x(d).concat(x(g)):x(d),function(t){t in p||l(p,t,d[t])}),p.prototype=E,r||(E.constructor=p));var I=E[pt],K=!!I&&("values"==I.name||null==I.name),N=Ot.values;l(p,vt,!0),l(E,wt,f),l(E,kt,!0),l(E,dt,p),(a?new p(1)[_t]==f:_t in E)||R(E,_t,{get:function(){return f}}),A[f]=p,s(s.G+s.W+s.F*(p!=d),A),s(s.S,f,{BYTES_PER_ELEMENT:e}),s(s.S+s.F*o(function(){d.of.call(p,1)}),f,{from:Nt,of:Ct}),"BYTES_PER_ELEMENT"in E||l(E,"BYTES_PER_ELEMENT",e),s(s.P,f,Pt),B(f),s(s.P+s.F*Et,f,{set:Bt}),s(s.P+s.F*!K,f,Ot),r||E.toString==lt||(E.toString=lt),s(s.P+s.F*o(function(){new p(1).slice()}),f,{slice:Wt}),s(s.P+s.F*(o(function(){return[1,2].toLocaleString()!=new p([1,2]).toLocaleString()})||!o(function(){E.toLocaleString.call([1,2])})),f,{toLocaleString:Lt}),P[f]=K?I:N,r||K||l(E,pt,N)}}else t.exports=function(){}},191:function(t,e,n){for(var r,i=n(5),o=n(12),s=n(38),u=s("typed_array"),a=s("view"),f=!(!i.ArrayBuffer||!i.DataView),c=f,h=0,l="Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(",");h<9;)(r=i[l[h++]])?(o(r.prototype,u,!0),o(r.prototype,a,!0)):c=!1;t.exports={ABV:f,CONSTR:c,TYPED:u,VIEW:a}},192:function(t,e,n){var r=n(28),i=n(14);t.exports=function(t){if(void 0===t)return 0;var e=r(t),n=i(e);if(e!==n)throw RangeError("Wrong length!");return n}},215:function(t,e,n){var r=n(11),i=n(189)(!0);r(r.S,"Object",{entries:function(t){return i(t)}})},216:function(t,e,n){"use strict";var r=n(22),i=n(11),o=n(26),s=n(92),u=n(85),a=n(14),f=n(217),c=n(86);i(i.S+i.F*!n(88)(function(t){Array.from(t)}),"Array",{from:function(t){var e,n,i,h,l=o(t),y="function"==typeof this?this:Array,p=arguments.length,_=p>1?arguments[1]:void 0,v=void 0!==_,d=0,g=c(l);if(v&&(_=r(_,p>2?arguments[2]:void 0,2)),null==g||y==Array&&u(g))for(n=new y(e=a(l.length));e>d;d++)f(n,d,v?_(l[d],d):l[d]);else for(h=g.call(l),n=new y;!(i=h.next()).done;d++)f(n,d,v?s(h,_,[i.value,d],!0):i.value);return n.length=d,n}})},217:function(t,e,n){"use strict";var r=n(25),i=n(57);t.exports=function(t,e,n){e in t?r.f(t,e,i(0,n)):t[e]=n}},218:function(t,e,n){n(190)("Uint8",1,function(t){return function(e,n,r){return t(this,e,n,r)}})},219:function(t,e,n){"use strict";var r=n(5),i=n(19),o=n(37),s=n(191),u=n(12),a=n(87),f=n(18),c=n(84),h=n(28),l=n(14),y=n(192),p=n(176).f,_=n(25).f,v=n(180),d=n(41),g="prototype",w="Wrong index!",k=r.ArrayBuffer,b=r.DataView,A=r.Math,E=r.RangeError,S=r.Infinity,m=k,x=A.abs,M=A.pow,I=A.floor,K=A.log,N=A.LN2,C=i?"_b":"buffer",F=i?"_l":"byteLength",L=i?"_o":"byteOffset";function P(t,e,n){var r,i,o,s=new Array(n),u=8*n-e-1,a=(1<<u)-1,f=a>>1,c=23===e?M(2,-24)-M(2,-77):0,h=0,l=t<0||0===t&&1/t<0?1:0;for((t=x(t))!=t||t===S?(i=t!=t?1:0,r=a):(r=I(K(t)/N),t*(o=M(2,-r))<1&&(r--,o*=2),(t+=r+f>=1?c/o:c*M(2,1-f))*o>=2&&(r++,o/=2),r+f>=a?(i=0,r=a):r+f>=1?(i=(t*o-1)*M(2,e),r+=f):(i=t*M(2,f-1)*M(2,e),r=0));e>=8;s[h++]=255&i,i/=256,e-=8);for(r=r<<e|i,u+=e;u>0;s[h++]=255&r,r/=256,u-=8);return s[--h]|=128*l,s}function W(t,e,n){var r,i=8*n-e-1,o=(1<<i)-1,s=o>>1,u=i-7,a=n-1,f=t[a--],c=127&f;for(f>>=7;u>0;c=256*c+t[a],a--,u-=8);for(r=c&(1<<-u)-1,c>>=-u,u+=e;u>0;r=256*r+t[a],a--,u-=8);if(0===c)c=1-s;else{if(c===o)return r?NaN:f?-S:S;r+=M(2,e),c-=s}return(f?-1:1)*r*M(2,c-e)}function B(t){return t[3]<<24|t[2]<<16|t[1]<<8|t[0]}function O(t){return[255&t]}function U(t){return[255&t,t>>8&255]}function V(t){return[255&t,t>>8&255,t>>16&255,t>>24&255]}function T(t){return P(t,52,8)}function R(t){return P(t,23,4)}function D(t,e,n){_(t[g],e,{get:function(){return this[n]}})}function Y(t,e,n,r){var i=y(+n);if(i+e>t[F])throw E(w);var o=t[C]._b,s=i+t[L],u=o.slice(s,s+e);return r?u:u.reverse()}function q(t,e,n,r,i,o){var s=y(+n);if(s+e>t[F])throw E(w);for(var u=t[C]._b,a=s+t[L],f=r(+i),c=0;c<e;c++)u[a+c]=f[o?c:e-c-1]}if(s.ABV){if(!f(function(){k(1)})||!f(function(){new k(-1)})||f(function(){return new k,new k(1.5),new k(NaN),"ArrayBuffer"!=k.name})){for(var j,z=(k=function(t){return c(this,k),new m(y(t))})[g]=m[g],J=p(m),X=0;J.length>X;)(j=J[X++])in k||u(k,j,m[j]);o||(z.constructor=k)}var G=new b(new k(2)),H=b[g].setInt8;G.setInt8(0,2147483648),G.setInt8(1,2147483649),!G.getInt8(0)&&G.getInt8(1)||a(b[g],{setInt8:function(t,e){H.call(this,t,e<<24>>24)},setUint8:function(t,e){H.call(this,t,e<<24>>24)}},!0)}else k=function(t){c(this,k,"ArrayBuffer");var e=y(t);this._b=v.call(new Array(e),0),this[F]=e},b=function(t,e,n){c(this,b,"DataView"),c(t,k,"DataView");var r=t[F],i=h(e);if(i<0||i>r)throw E("Wrong offset!");if(i+(n=void 0===n?r-i:l(n))>r)throw E("Wrong length!");this[C]=t,this[L]=i,this[F]=n},i&&(D(k,"byteLength","_l"),D(b,"buffer","_b"),D(b,"byteLength","_l"),D(b,"byteOffset","_o")),a(b[g],{getInt8:function(t){return Y(this,1,t)[0]<<24>>24},getUint8:function(t){return Y(this,1,t)[0]},getInt16:function(t){var e=Y(this,2,t,arguments[1]);return(e[1]<<8|e[0])<<16>>16},getUint16:function(t){var e=Y(this,2,t,arguments[1]);return e[1]<<8|e[0]},getInt32:function(t){return B(Y(this,4,t,arguments[1]))},getUint32:function(t){return B(Y(this,4,t,arguments[1]))>>>0},getFloat32:function(t){return W(Y(this,4,t,arguments[1]),23,4)},getFloat64:function(t){return W(Y(this,8,t,arguments[1]),52,8)},setInt8:function(t,e){q(this,1,t,O,e)},setUint8:function(t,e){q(this,1,t,O,e)},setInt16:function(t,e){q(this,2,t,U,e,arguments[2])},setUint16:function(t,e){q(this,2,t,U,e,arguments[2])},setInt32:function(t,e){q(this,4,t,V,e,arguments[2])},setUint32:function(t,e){q(this,4,t,V,e,arguments[2])},setFloat32:function(t,e){q(this,4,t,R,e,arguments[2])},setFloat64:function(t,e){q(this,8,t,T,e,arguments[2])}});d(k,"ArrayBuffer"),d(b,"DataView"),u(b[g],s.VIEW,!0),e.ArrayBuffer=k,e.DataView=b},220:function(t,e,n){"use strict";var r=n(26),i=n(79),o=n(14);t.exports=[].copyWithin||function(t,e){var n=r(this),s=o(n.length),u=i(t,s),a=i(e,s),f=arguments.length>2?arguments[2]:void 0,c=Math.min((void 0===f?s:i(f,s))-a,s-u),h=1;for(a<u&&u<a+c&&(h=-1,a+=c-1,u+=c-1);c-- >0;)a in n?n[u]=n[a]:delete n[u],u+=h,a+=h;return n}},221:function(t,e,n){var r=n(11);r(r.P,"Array",{fill:n(180)}),n(43)("fill")},222:function(t,e,n){var r=n(223),i=n(224),o=n(225),s=n(226),u=n(227),a=n(228);function f(t){this._setState(t),this._listeners={},this._bind()}f.prototype._setState=r._setState,f.prototype._extendState=r._extendState,f.prototype.set=r.set,f.prototype.get=r.get,f.prototype.down=i.down,f.prototype.up=i.up,f.prototype._trigger=i._trigger,f.prototype._bind=i._bind,f.prototype._map=o._map,f.prototype._offset=o._offset,f.prototype._isNote=o._isNote,f.prototype._toFrequency=o._toFrequency,f.prototype._keyMap=o._keyMap,f.prototype._addKey=s._addKey,f.prototype._removeKey=s._removeKey,f.prototype._isPressed=s._isPressed,f.prototype._makeNote=s._makeNote,f.prototype.clear=s.clear,f.prototype._update=s._update,f.prototype._diff=s._diff,f.prototype._prioritize=u._prioritize,f.prototype._last=u._last,f.prototype._first=u._first,f.prototype._highest=u._highest,f.prototype._lowest=u._lowest,f.prototype._isSpecialKey=a._isSpecialKey,f.prototype._specialKey=a._specialKey,f.prototype._specialKeyMap=a._specialKeyMap,t.exports=f},223:function(t,e){t.exports={_setState:function(t){t||(t={}),this._state={},this._extendState({polyphony:4,rows:1,priority:"last",rootNote:60,octaveControls:!0,octave:0,velocityControls:!0,velocity:127,keys:[],buffer:[]}),this._extendState(t)},_extendState:function(t){for(var e in t)this._state[e]=t[e]},set:function(){return 1===arguments.length?this._extendState(arguments[0]):this._state[arguments[0]]=arguments[1],this},get:function(t){return this._state[t]}}},224:function(t,e){t.exports={down:function(t){this._listeners.down=(this._listeners.down||[]).concat(t)},up:function(t){this._listeners.up=(this._listeners.up||[]).concat(t)},_trigger:function(t){var e=this;if(e._listeners[t]&&e._listeners[t].length){var n=Array.prototype.slice.call(arguments);n.splice(0,1),e._listeners[t].forEach(function(t){t.apply(e,n)})}},_bind:function(){var t=this;if("undefined"!=typeof window&&window.document){window.document.addEventListener("keydown",function(e){t._addKey(e)}),window.document.addEventListener("keyup",function(e){t._removeKey(e)});var e=!0;setInterval(function(){window.document.hasFocus()!==e&&((e=!e)||t.clear())},100)}}}},225:function(t,e){t.exports={_map:function(t){return this._keyMap[this._state.rows][t]+this._offset()},_offset:function(){return this._state.rootNote-this._keyMap[this._state.rows].root+12*this._state.octave},_isNote:function(t){return!!this._keyMap[this._state.rows][t]},_toFrequency:function(t){return 440*Math.pow(2,(t-69)/12)},_keyMap:{1:{root:60,65:60,87:61,83:62,69:63,68:64,70:65,84:66,71:67,89:68,72:69,85:70,74:71,75:72,79:73,76:74,80:75,186:76,222:77},2:{root:60,90:60,83:61,88:62,68:63,67:64,86:65,71:66,66:67,72:68,78:69,74:70,77:71,188:72,76:73,190:74,186:75,191:76,81:72,50:73,87:74,51:75,69:76,82:77,53:78,84:79,54:80,89:81,55:82,85:83,73:84,57:85,79:86,48:87,80:88,219:89,187:90,221:91}}}},226:function(t,e){t.exports={_addKey:function(t){if(this._isNote(t.keyCode)&&!this._isPressed(t.keyCode)){var e=this._makeNote(t.keyCode);this._state.keys=(this._state.keys||[]).concat(e),this._update()}else this._isSpecialKey(t.keyCode)&&this._specialKey(t.keyCode)},_removeKey:function(t){if(this._isPressed(t.keyCode)){for(var e,n=0;n<this._state.keys.length;n++)if(this._state.keys[n].keyCode===t.keyCode){e=this._state.keys[n];break}this._state.keys.splice(this._state.keys.indexOf(e),1),this._update()}},_isPressed:function(t){if(!this._state.keys||!this._state.keys.length)return!1;for(var e=0;e<this._state.keys.length;e++)if(this._state.keys[e].keyCode===t)return!0;return!1},_makeNote:function(t){return{keyCode:t,note:this._map(t),frequency:this._toFrequency(this._map(t)),velocity:this._state.velocity}},clear:function(){var t=this;t._state.buffer.forEach(function(e){e.velocity=0,t._trigger("up",e)}),t._state.keys=[],t._state.buffer=[]},_update:function(){var t=this._state.buffer;this._prioritize(),this._diff(t)},_diff:function(t){var e=this,n=t.map(function(t){return t.keyCode}),r=e._state.buffer.map(function(t){return t.keyCode}),i=[];n.forEach(function(t){-1===r.indexOf(t)&&i.push(t)});var o=[];r.forEach(function(t){-1===n.indexOf(t)&&o.push(t)}),o.forEach(function(t){for(var n=0;n<e._state.buffer.length;n++)if(e._state.buffer[n].keyCode===t){e._trigger("down",e._state.buffer[n]);break}}),i.forEach(function(n){for(var r=0;r<t.length;r++)if(t[r].keyCode===n){t[r].velocity=0,e._trigger("up",t[r]);break}})}}},227:function(t,e){t.exports={_prioritize:function(){var t=this;t._state.keys.length?(t._state.polyphony>=t._state.keys.length?t._state.keys=t._state.keys.map(function(t){return t.isActive=!0,t}):(t._state.keys=t._state.keys.map(function(t){return t.isActive=!1,t}),t["_"+t._state.priority]()),t._state.buffer=[],t._state.keys.forEach(function(e){e.isActive&&t._state.buffer.push(e)})):t._state.buffer=[]},_last:function(){for(var t=this._state.keys.length-this._state.polyphony;t<this._state.keys.length;t++)this._state.keys[t].isActive=!0},_first:function(){for(var t=0;t<this._state.polyphony;t++)this._state.keys[t].isActive=!0},_highest:function(){var t=this._state.keys.map(function(t){return t.note});t.sort(function(t,e){return e===t?0:e<t?-1:1}),t.splice(this._state.polyphony,Number.MAX_VALUE),this._state.keys.forEach(function(e){-1!==t.indexOf(e.note)&&(e.isActive=!0)})},_lowest:function(){var t=this._state.keys.map(function(t){return t.note});t.sort(function(t,e){return t===e?0:t<e?-1:1}),t.splice(this._state.polyphony,Number.MAX_VALUE),this._state.keys.forEach(function(e){-1!==t.indexOf(e.note)&&(e.isActive=!0)})}}},228:function(t,e){t.exports={_isSpecialKey:function(t){return 1===this._state.rows&&this._specialKeyMap[t]},_specialKey:function(t){"octave"===this._specialKeyMap[t].type&&this._state.octaveControls?this._state.octave+=this._specialKeyMap[t].value:"velocity"===this._specialKeyMap[t].type&&this._state.velocityControls&&(this._state.velocity=this._specialKeyMap[t].value)},_specialKeyMap:{90:{type:"octave",value:-1},88:{type:"octave",value:1},49:{type:"velocity",value:1},50:{type:"velocity",value:14},51:{type:"velocity",value:28},52:{type:"velocity",value:42},53:{type:"velocity",value:56},54:{type:"velocity",value:70},55:{type:"velocity",value:84},56:{type:"velocity",value:98},57:{type:"velocity",value:112},48:{type:"velocity",value:127}}}},230:function(t,e,n){n(190)("Int8",1,function(t){return function(e,n,r){return t(this,e,n,r)}})}}]);
//# sourceMappingURL=19-2cc07eb91188781a257c.js.map