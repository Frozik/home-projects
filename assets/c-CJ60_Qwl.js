import{U as T,g as h,S as y}from"./c-B0JJgYjM.js";import{bB as F,an as P,ak as X,bC as R,bD as m,bE as q,ao as S,bF as C,r as x,bG as N,bn as U,G as Q,s as K,aL as J}from"./e-lfq7BXF7.js";var Y="__lodash_hash_undefined__";function Z(e){return this.__data__.set(e,Y),this}function W(e){return this.__data__.has(e)}function $(e){var n=-1,s=e==null?0:e.length;for(this.__data__=new F;++n<s;)this.add(e[n])}$.prototype.add=$.prototype.push=Z;$.prototype.has=W;function z(e,n){for(var s=-1,a=e==null?0:e.length;++s<a;)if(n(e[s],s,e))return!0;return!1}function j(e,n){return e.has(n)}var V=1,k=2;function H(e,n,s,a,f,r){var i=s&V,t=e.length,u=n.length;if(t!=u&&!(i&&u>t))return!1;var c=r.get(e),o=r.get(n);if(c&&o)return c==n&&o==e;var d=-1,l=!0,v=s&k?new $:void 0;for(r.set(e,n),r.set(n,e);++d<t;){var g=e[d],p=n[d];if(a)var _=i?a(p,g,d,n,e,r):a(g,p,d,e,n,r);if(_!==void 0){if(_)continue;l=!1;break}if(v){if(!z(n,function(A,w){if(!j(v,w)&&(g===A||f(g,A,s,a,r)))return v.push(w)})){l=!1;break}}else if(!(g===p||f(g,p,s,a,r))){l=!1;break}}return r.delete(e),r.delete(n),l}function ee(e){var n=-1,s=Array(e.size);return e.forEach(function(a,f){s[++n]=[f,a]}),s}function ne(e){var n=-1,s=Array(e.size);return e.forEach(function(a){s[++n]=a}),s}var re=1,se=2,ae="[object Boolean]",te="[object Date]",ie="[object Error]",fe="[object Map]",ue="[object Number]",le="[object RegExp]",ce="[object Set]",oe="[object String]",de="[object Symbol]",ge="[object ArrayBuffer]",pe="[object DataView]",B=P?P.prototype:void 0,E=B?B.valueOf:void 0;function ve(e,n,s,a,f,r,i){switch(s){case pe:if(e.byteLength!=n.byteLength||e.byteOffset!=n.byteOffset)return!1;e=e.buffer,n=n.buffer;case ge:return!(e.byteLength!=n.byteLength||!r(new T(e),new T(n)));case ae:case te:case ue:return X(+e,+n);case ie:return e.name==n.name&&e.message==n.message;case le:case oe:return e==n+"";case fe:var t=ee;case ce:var u=a&re;if(t||(t=ne),e.size!=n.size&&!u)return!1;var c=i.get(e);if(c)return c==n;a|=se,i.set(e,n);var o=H(t(e),t(n),a,f,r,i);return i.delete(e),o;case de:if(E)return E.call(e)==E.call(n)}return!1}var _e=1,Ae=Object.prototype,we=Ae.hasOwnProperty;function xe(e,n,s,a,f,r){var i=s&_e,t=h(e),u=t.length,c=h(n),o=c.length;if(u!=o&&!i)return!1;for(var d=u;d--;){var l=t[d];if(!(i?l in n:we.call(n,l)))return!1}var v=r.get(e),g=r.get(n);if(v&&g)return v==n&&g==e;var p=!0;r.set(e,n),r.set(n,e);for(var _=i;++d<u;){l=t[d];var A=e[l],w=n[l];if(a)var M=i?a(w,A,l,n,e,r):a(A,w,l,e,n,r);if(!(M===void 0?A===w||f(A,w,s,a,r):M)){p=!1;break}_||(_=l=="constructor")}if(p&&!_){var O=e.constructor,b=n.constructor;O!=b&&"constructor"in e&&"constructor"in n&&!(typeof O=="function"&&O instanceof O&&typeof b=="function"&&b instanceof b)&&(p=!1)}return r.delete(e),r.delete(n),p}var Oe=1,D="[object Arguments]",G="[object Array]",L="[object Object]",be=Object.prototype,I=be.hasOwnProperty;function Le(e,n,s,a,f,r){var i=S(e),t=S(n),u=i?G:R(e),c=t?G:R(n);u=u==D?L:u,c=c==D?L:c;var o=u==L,d=c==L,l=u==c;if(l&&m(e)){if(!m(n))return!1;i=!0,o=!1}if(l&&!o)return r||(r=new y),i||q(e)?H(e,n,s,a,f,r):ve(e,n,u,s,a,f,r);if(!(s&Oe)){var v=o&&I.call(e,"__wrapped__"),g=d&&I.call(n,"__wrapped__");if(v||g){var p=v?e.value():e,_=g?n.value():n;return r||(r=new y),f(p,_,s,a,r)}}return l?(r||(r=new y),xe(e,n,s,a,f,r)):!1}function $e(e,n,s,a,f){return e===n?!0:e==null||n==null||!C(e)&&!C(n)?e!==e&&n!==n:Le(e,n,s,a,$e,f)}const me=(e,n)=>{const s=x.useContext(N),a=x.useMemo(()=>{var r;const i=n||U[e],t=(r=s==null?void 0:s[e])!==null&&r!==void 0?r:{};return Object.assign(Object.assign({},typeof i=="function"?i():i),t||{})},[e,n,s]),f=x.useMemo(()=>{const r=s==null?void 0:s.locale;return s!=null&&s.exist&&!r?U.locale:r},[s]);return[a,f]},ye=["xxl","xl","lg","md","sm","xs"],Ee=e=>({xs:`(max-width: ${e.screenXSMax}px)`,sm:`(min-width: ${e.screenSM}px)`,md:`(min-width: ${e.screenMD}px)`,lg:`(min-width: ${e.screenLG}px)`,xl:`(min-width: ${e.screenXL}px)`,xxl:`(min-width: ${e.screenXXL}px)`}),Me=e=>{const n=e,s=[].concat(ye).reverse();return s.forEach((a,f)=>{const r=a.toUpperCase(),i=`screen${r}Min`,t=`screen${r}`;if(!(n[i]<=n[t]))throw new Error(`${i}<=${t} fails : !(${n[i]}<=${n[t]})`);if(f<s.length-1){const u=`screen${r}Max`;if(!(n[t]<=n[u]))throw new Error(`${t}<=${u} fails : !(${n[t]}<=${n[u]})`);const o=`screen${s[f+1].toUpperCase()}Min`;if(!(n[u]<=n[o]))throw new Error(`${u}<=${o} fails : !(${n[u]}<=${n[o]})`)}}),e};function Te(){const[,e]=Q(),n=Ee(Me(e));return K.useMemo(()=>{const s=new Map;let a=-1,f={};return{matchHandlers:{},dispatch(r){return f=r,s.forEach(i=>i(f)),s.size>=1},subscribe(r){return s.size||this.register(),a+=1,s.set(a,r),r(f),a},unsubscribe(r){s.delete(r),s.size||this.unregister()},unregister(){Object.keys(n).forEach(r=>{const i=n[r],t=this.matchHandlers[i];t==null||t.mql.removeListener(t==null?void 0:t.listener)}),s.clear()},register(){Object.keys(n).forEach(r=>{const i=n[r],t=c=>{let{matches:o}=c;this.dispatch(Object.assign(Object.assign({},f),{[r]:o}))},u=window.matchMedia(i);u.addListener(t),this.matchHandlers[i]={mql:u,listener:t},t(u)})},responsiveMap:n}},[e])}function he(){const[,e]=x.useReducer(n=>n+1,0);return e}function Se(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!0;const n=x.useRef({}),s=he(),a=Te();return J(()=>{const f=a.subscribe(r=>{n.current=r,e&&s()});return()=>a.unsubscribe(f)},[]),n.current}export{me as a,$e as b,Te as c,he as d,ye as r,Se as u};
