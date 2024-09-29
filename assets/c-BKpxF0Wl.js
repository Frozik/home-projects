import{U as E,g as h,S as M}from"./c-BypINRgN.js";import{bI as H,an as m,ak as F,bJ as P,bK as R,bL as X,ao as S,bM as U,r as x,bN as q,bu as C,G as J,s as K,aJ as Q}from"./e-DQ3AfMkX.js";var Y="__lodash_hash_undefined__";function Z(e){return this.__data__.set(e,Y),this}function W(e){return this.__data__.has(e)}function y(e){var n=-1,s=e==null?0:e.length;for(this.__data__=new H;++n<s;)this.add(e[n])}y.prototype.add=y.prototype.push=Z;y.prototype.has=W;function z(e,n){for(var s=-1,a=e==null?0:e.length;++s<a;)if(n(e[s],s,e))return!0;return!1}function j(e,n){return e.has(n)}var V=1,k=2;function N(e,n,s,a,f,r){var i=s&V,t=e.length,u=n.length;if(t!=u&&!(i&&u>t))return!1;var c=r.get(e),d=r.get(n);if(c&&d)return c==n&&d==e;var o=-1,l=!0,v=s&k?new y:void 0;for(r.set(e,n),r.set(n,e);++o<t;){var g=e[o],p=n[o];if(a)var _=i?a(p,g,o,n,e,r):a(g,p,o,e,n,r);if(_!==void 0){if(_)continue;l=!1;break}if(v){if(!z(n,function(A,w){if(!j(v,w)&&(g===A||f(g,A,s,a,r)))return v.push(w)})){l=!1;break}}else if(!(g===p||f(g,p,s,a,r))){l=!1;break}}return r.delete(e),r.delete(n),l}function ee(e){var n=-1,s=Array(e.size);return e.forEach(function(a,f){s[++n]=[f,a]}),s}function ne(e){var n=-1,s=Array(e.size);return e.forEach(function(a){s[++n]=a}),s}var re=1,se=2,ae="[object Boolean]",te="[object Date]",ie="[object Error]",fe="[object Map]",ue="[object Number]",le="[object RegExp]",ce="[object Set]",de="[object String]",oe="[object Symbol]",ge="[object ArrayBuffer]",pe="[object DataView]",B=m?m.prototype:void 0,$=B?B.valueOf:void 0;function ve(e,n,s,a,f,r,i){switch(s){case pe:if(e.byteLength!=n.byteLength||e.byteOffset!=n.byteOffset)return!1;e=e.buffer,n=n.buffer;case ge:return!(e.byteLength!=n.byteLength||!r(new E(e),new E(n)));case ae:case te:case ue:return F(+e,+n);case ie:return e.name==n.name&&e.message==n.message;case le:case de:return e==n+"";case fe:var t=ee;case ce:var u=a&re;if(t||(t=ne),e.size!=n.size&&!u)return!1;var c=i.get(e);if(c)return c==n;a|=se,i.set(e,n);var d=N(t(e),t(n),a,f,r,i);return i.delete(e),d;case oe:if($)return $.call(e)==$.call(n)}return!1}var _e=1,Ae=Object.prototype,we=Ae.hasOwnProperty;function xe(e,n,s,a,f,r){var i=s&_e,t=h(e),u=t.length,c=h(n),d=c.length;if(u!=d&&!i)return!1;for(var o=u;o--;){var l=t[o];if(!(i?l in n:we.call(n,l)))return!1}var v=r.get(e),g=r.get(n);if(v&&g)return v==n&&g==e;var p=!0;r.set(e,n),r.set(n,e);for(var _=i;++o<u;){l=t[o];var A=e[l],w=n[l];if(a)var T=i?a(w,A,l,n,e,r):a(A,w,l,e,n,r);if(!(T===void 0?A===w||f(A,w,s,a,r):T)){p=!1;break}_||(_=l=="constructor")}if(p&&!_){var b=e.constructor,O=n.constructor;b!=O&&"constructor"in e&&"constructor"in n&&!(typeof b=="function"&&b instanceof b&&typeof O=="function"&&O instanceof O)&&(p=!1)}return r.delete(e),r.delete(n),p}var be=1,D="[object Arguments]",G="[object Array]",L="[object Object]",Oe=Object.prototype,I=Oe.hasOwnProperty;function Le(e,n,s,a,f,r){var i=S(e),t=S(n),u=i?G:P(e),c=t?G:P(n);u=u==D?L:u,c=c==D?L:c;var d=u==L,o=c==L,l=u==c;if(l&&R(e)){if(!R(n))return!1;i=!0,d=!1}if(l&&!d)return r||(r=new M),i||X(e)?N(e,n,s,a,f,r):ve(e,n,u,s,a,f,r);if(!(s&be)){var v=d&&I.call(e,"__wrapped__"),g=o&&I.call(n,"__wrapped__");if(v||g){var p=v?e.value():e,_=g?n.value():n;return r||(r=new M),f(p,_,s,a,r)}}return l?(r||(r=new M),xe(e,n,s,a,f,r)):!1}function ye(e,n,s,a,f){return e===n?!0:e==null||n==null||!U(e)&&!U(n)?e!==e&&n!==n:Le(e,n,s,a,ye,f)}const Re=(e,n)=>{const s=x.useContext(q),a=x.useMemo(()=>{var r;const i=n||C[e],t=(r=s==null?void 0:s[e])!==null&&r!==void 0?r:{};return Object.assign(Object.assign({},typeof i=="function"?i():i),t||{})},[e,n,s]),f=x.useMemo(()=>{const r=s==null?void 0:s.locale;return s!=null&&s.exist&&!r?C.locale:r},[s]);return[a,f]},Me=["xxl","xl","lg","md","sm","xs"],$e=e=>({xs:`(max-width: ${e.screenXSMax}px)`,sm:`(min-width: ${e.screenSM}px)`,md:`(min-width: ${e.screenMD}px)`,lg:`(min-width: ${e.screenLG}px)`,xl:`(min-width: ${e.screenXL}px)`,xxl:`(min-width: ${e.screenXXL}px)`}),Te=e=>{const n=e,s=[].concat(Me).reverse();return s.forEach((a,f)=>{const r=a.toUpperCase(),i=`screen${r}Min`,t=`screen${r}`;if(!(n[i]<=n[t]))throw new Error(`${i}<=${t} fails : !(${n[i]}<=${n[t]})`);if(f<s.length-1){const u=`screen${r}Max`;if(!(n[t]<=n[u]))throw new Error(`${t}<=${u} fails : !(${n[t]}<=${n[u]})`);const d=`screen${s[f+1].toUpperCase()}Min`;if(!(n[u]<=n[d]))throw new Error(`${u}<=${d} fails : !(${n[u]}<=${n[d]})`)}}),e};function Ee(){const[,e]=J(),n=$e(Te(e));return K.useMemo(()=>{const s=new Map;let a=-1,f={};return{matchHandlers:{},dispatch(r){return f=r,s.forEach(i=>i(f)),s.size>=1},subscribe(r){return s.size||this.register(),a+=1,s.set(a,r),r(f),a},unsubscribe(r){s.delete(r),s.size||this.unregister()},unregister(){Object.keys(n).forEach(r=>{const i=n[r],t=this.matchHandlers[i];t==null||t.mql.removeListener(t==null?void 0:t.listener)}),s.clear()},register(){Object.keys(n).forEach(r=>{const i=n[r],t=c=>{let{matches:d}=c;this.dispatch(Object.assign(Object.assign({},f),{[r]:d}))},u=window.matchMedia(i);u.addListener(t),this.matchHandlers[i]={mql:u,listener:t},t(u)})},responsiveMap:n}},[e])}function he(){const[,e]=x.useReducer(n=>n+1,0);return e}function Se(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;const n=x.useRef({}),s=he(),a=Ee();return Q(()=>{const f=a.subscribe(r=>{n.current=r,e&&s()});return()=>a.unsubscribe(f)},[]),n.current}function Ue(e){return["small","middle","large"].includes(e)}function Ce(e){return e?typeof e=="number"&&!Number.isNaN(e):!1}export{Re as a,ye as b,Ee as c,Ce as d,he as e,Ue as i,Me as r,Se as u};
