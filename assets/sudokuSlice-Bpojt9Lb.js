import{a5 as S,a8 as le,bQ as k,a6 as fe,bR as ge,ae as pe,ab as M,bM as q,bJ as O,bS as w,aj as Q,bK as ye,ac as be,i as v,G as z,bD as C,bE as U,F as T,H as de,J as X,bN as ve,W as N}from"./index-CBImY0kA.js";import{b as me,k as Z,c as ee,s as Te,a as he,d as we,U as L,S as Ae,g as je}from"./_Uint8Array-mGUL61qe.js";import{d as G,c as ze}from"./_defineProperty-D8oyham1.js";var B=Object.create,Se=function(){function e(){}return function(r){if(!S(r))return{};if(B)return B(r);e.prototype=r;var n=new e;return e.prototype=void 0,n}}();function Oe(e,r){for(var n=-1,t=e==null?0:e.length;++n<t&&r(e[n],n,e)!==!1;);return e}function re(e,r,n){r=="__proto__"&&G?G(e,r,{configurable:!0,enumerable:!0,value:n,writable:!0}):e[r]=n}var xe=Object.prototype,Fe=xe.hasOwnProperty;function ne(e,r,n){var t=e[r];(!(Fe.call(e,r)&&le(t,n))||n===void 0&&!(r in e))&&re(e,r,n)}function j(e,r,n,t){var u=!n;n||(n={});for(var a=-1,s=r.length;++a<s;){var o=r[a],c=void 0;c===void 0&&(c=e[o]),u?re(n,o,c):ne(n,o,c)}return n}function Pe(e){var r=[];if(e!=null)for(var n in Object(e))r.push(n);return r}var $e=Object.prototype,Ie=$e.hasOwnProperty;function Ee(e){if(!S(e))return Pe(e);var r=k(e),n=[];for(var t in e)t=="constructor"&&(r||!Ie.call(e,t))||n.push(t);return n}function x(e){return fe(e)?me(e,!0):Ee(e)}var te=ge(Object.getPrototypeOf,Object);function _e(e,r){return e&&j(r,Z(r),e)}function Me(e,r){return e&&j(r,x(r),e)}var oe=typeof exports=="object"&&exports&&!exports.nodeType&&exports,D=oe&&typeof module=="object"&&module&&!module.nodeType&&module,Ce=D&&D.exports===oe,R=Ce?pe.Buffer:void 0,K=R?R.allocUnsafe:void 0;function Ue(e,r){if(r)return e.slice();var n=e.length,t=K?K(n):new e.constructor(n);return e.copy(t),t}function Ne(e,r){return j(e,ee(e),r)}var Le=Object.getOwnPropertySymbols,se=Le?function(e){for(var r=[];e;)he(r,ee(e)),e=te(e);return r}:Te;function Ge(e,r){return j(e,se(e),r)}function Be(e){return we(e,x,se)}var De=Object.prototype,Re=De.hasOwnProperty;function Ke(e){var r=e.length,n=new e.constructor(r);return r&&typeof e[0]=="string"&&Re.call(e,"index")&&(n.index=e.index,n.input=e.input),n}function F(e){var r=new e.constructor(e.byteLength);return new L(r).set(new L(e)),r}function We(e,r){var n=r?F(e.buffer):e.buffer;return new e.constructor(n,e.byteOffset,e.byteLength)}var He=/\w*$/;function Ve(e){var r=new e.constructor(e.source,He.exec(e));return r.lastIndex=e.lastIndex,r}var W=M?M.prototype:void 0,H=W?W.valueOf:void 0;function Ye(e){return H?Object(H.call(e)):{}}function Je(e,r){var n=r?F(e.buffer):e.buffer;return new e.constructor(n,e.byteOffset,e.length)}var ke="[object Boolean]",qe="[object Date]",Qe="[object Map]",Xe="[object Number]",Ze="[object RegExp]",er="[object Set]",rr="[object String]",nr="[object Symbol]",tr="[object ArrayBuffer]",or="[object DataView]",sr="[object Float32Array]",ar="[object Float64Array]",cr="[object Int8Array]",ir="[object Int16Array]",ur="[object Int32Array]",lr="[object Uint8Array]",fr="[object Uint8ClampedArray]",gr="[object Uint16Array]",pr="[object Uint32Array]";function yr(e,r,n){var t=e.constructor;switch(r){case tr:return F(e);case ke:case qe:return new t(+e);case or:return We(e,n);case sr:case ar:case cr:case ir:case ur:case lr:case fr:case gr:case pr:return Je(e,n);case Qe:return new t;case Xe:case rr:return new t(e);case Ze:return Ve(e);case er:return new t;case nr:return Ye(e)}}function br(e){return typeof e.constructor=="function"&&!k(e)?Se(te(e)):{}}var dr="[object Map]";function vr(e){return q(e)&&O(e)==dr}var V=w&&w.isMap,mr=V?Q(V):vr,Tr="[object Set]";function hr(e){return q(e)&&O(e)==Tr}var Y=w&&w.isSet,wr=Y?Q(Y):hr,Ar=1,jr=2,zr=4,ae="[object Arguments]",Sr="[object Array]",Or="[object Boolean]",xr="[object Date]",Fr="[object Error]",ce="[object Function]",Pr="[object GeneratorFunction]",$r="[object Map]",Ir="[object Number]",ie="[object Object]",Er="[object RegExp]",_r="[object Set]",Mr="[object String]",Cr="[object Symbol]",Ur="[object WeakMap]",Nr="[object ArrayBuffer]",Lr="[object DataView]",Gr="[object Float32Array]",Br="[object Float64Array]",Dr="[object Int8Array]",Rr="[object Int16Array]",Kr="[object Int32Array]",Wr="[object Uint8Array]",Hr="[object Uint8ClampedArray]",Vr="[object Uint16Array]",Yr="[object Uint32Array]",i={};i[ae]=i[Sr]=i[Nr]=i[Lr]=i[Or]=i[xr]=i[Gr]=i[Br]=i[Dr]=i[Rr]=i[Kr]=i[$r]=i[Ir]=i[ie]=i[Er]=i[_r]=i[Mr]=i[Cr]=i[Wr]=i[Hr]=i[Vr]=i[Yr]=!0;i[Fr]=i[ce]=i[Ur]=!1;function h(e,r,n,t,u,a){var s,o=r&Ar,c=r&jr,l=r&zr;if(s!==void 0)return s;if(!S(e))return e;var f=be(e);if(f){if(s=Ke(e),!o)return ze(e,s)}else{var g=O(e),I=g==ce||g==Pr;if(ye(e))return Ue(e,o);if(g==ie||g==ae||I&&!u){if(s=c||I?{}:br(e),!o)return c?Ge(e,Me(s,e)):Ne(e,_e(s,e))}else{if(!i[g])return u?e:{};s=yr(e,g,o)}}a||(a=new Ae);var E=a.get(e);if(E)return E;a.set(e,s),wr(e)?e.forEach(function(p){s.add(h(p,r,n,p,e,a))}):mr(e)&&e.forEach(function(p,b){s.set(b,h(p,r,n,b,e,a))});var ue=l?c?Be:je:c?x:Z,_=f?void 0:ue(e);return Oe(_||e,function(p,b){_&&(b=p,p=e[b]),ne(s,b,h(p,r,n,b,e,a))}),s}var Jr=1,kr=4;function J(e){return h(e,Jr|kr)}var A=(e=>(e.Fixed="fixed",e.Guess="guess",e))(A||{}),m=(e=>(e.Unknown="unknown",e.Wrong="wrong",e))(m||{}),d=(e=>(e.None="none",e.Pen="pen",e.Notes="notes",e))(d||{});function qr(e){const r=Math.round(Math.pow(e.length,.25));if(r===0)return z(C(U.OUT_OF_RANGE,{message:"Field size is empty"}));if(r**4!==e.length)return z(C(U.OUT_OF_RANGE,{message:"Field size is invalid"}));try{const n=Array.from(e).map(t=>{const u=parseInt(t.replace(/[.\-*]/g,"0"),Math.max(10,r));return u===0?{type:A.Guess,value:void 0,notes:[],status:m.Unknown}:{type:A.Fixed,value:u,notes:[],status:m.Unknown}});return T({size:r,cells:n})}catch(n){return z(de(n))}}function bn(e){const r=[];for(let n=0;n<e;n++)for(let t=0;t<e;t++)r.push([n,t]);return r}function Qr(e,r,n,t){if(r.type===d.None)return e;const u=y(n,t,e.size),a=e.cells[u];if(a.type===A.Fixed)return e;const s=[...e.cells],o={...a};return r.type===d.Pen?o.value!==r.value?(o.value=r.value,P(e,n,t).forEach(({row:c,column:l,cell:f})=>{s[y(c,l,e.size)]={...f,notes:f.notes.filter(g=>g!==r.value)}})):o.value=void 0:r.type===d.Notes&&(o.value=void 0,o.notes.includes(r.value)?o.notes=o.notes.filter(c=>c!==r.value):o.notes.push(r.value)),s[u]=o,Xr({...e,cells:s})}function y(e,r,n){return e*n**2+r}function P(e,r,n,t=["row","column","group"]){const u=new Map,a=Math.floor(r/e.size)*e.size,s=Math.floor(n/e.size)*e.size;for(let o=0;o<e.size**2;o++){if(t.includes("row")){const c=y(r,o,e.size);u.set(c,{row:r,column:o,cell:e.cells[c]})}if(t.includes("column")){const c=y(o,n,e.size);u.set(c,{row:o,column:n,cell:e.cells[c]})}if(t.includes("group")){const c=Math.floor(o/e.size),l=o%e.size,f=y(a+c,s+l,e.size);u.set(f,{row:a+c,column:s+l,cell:e.cells[f]})}}return Array.from(u.values())}function Xr(e){const r=[...e.cells];for(let n=0;n<e.size**2;n++)for(let t=0;t<e.size**2;t++){const u=y(n,t,e.size),a=e.cells[u],s=!v(a.value)&&P(e,n,t).some(({row:o,column:c,cell:{value:l}})=>(o!==n||c!==t)&&l===a.value);r[u]={...a,status:s?m.Wrong:m.Unknown}}return{...e,cells:r}}function dn(e){const r=new Map;for(let n=0;n<e.size;n++)for(let t=0;t<e.size;t++){const u=new Set;for(let a=0;a<e.size;a++)for(let s=0;s<e.size;s++){const o=y(n*e.size+a,t*e.size+s,e.size),c=e.cells[o];v(c.value)||u.add(c.value)}u.forEach(a=>r.set(a,(r.get(a)??0)+1))}return r}function Zr(e){return Array(e).fill(0).map((r,n)=>n)}function en(e){const r=[...e.cells];for(let n=0;n<e.size**2;n++)for(let t=0;t<e.size**2;t++){const u=y(n,t,e.size),a=e.cells[u],s=new Set(P(e,n,t).filter(({row:o,column:c,cell:{value:l}})=>(o!==n||c!==t)&&!v(l)).map(({cell:{value:o}})=>o));r[u]={...a,notes:Zr(e.size**2).map(o=>o+1).filter(o=>!s.has(o))}}return{...e,cells:r}}function vn(e){for(let r=0;r<e.size**4;r++){const n=e.cells[r];if(n.status===m.Wrong||v(n.value))return!1}return!0}const rn={field:X,tool:{type:d.None,value:void 0},history:[]},$=ve({name:"sudoku",initialState:rn,reducers:e=>({resetPuzzle:e.reducer(r=>{r.field=X,r.history=[]}),loadPuzzle:e.reducer((r,{payload:n})=>{r.field=qr(n),r.history=[]}),setTool:e.reducer((r,{payload:n})=>{if(!v(r.tool.value)&&r.tool.value===n.value&&r.tool.type===n.type){r.tool={type:d.None,value:void 0};return}r.tool=n}),applyTool:e.reducer((r,{payload:{row:n,column:t}})=>{!N(r.field)||r.field.value.size===0||(r.history=[...r.history,J(r.field.value)],r.field=T(Qr(r.field.value,r.tool,n,t)))}),markField:e.reducer(r=>{!N(r.field)||r.field.value.size===0||(r.history=[...r.history,J(r.field.value)],r.field=T(en(r.field.value)))}),restorePreviousState:e.reducer(r=>{const n=r.history.pop();v(n)||(r.field=T(n))})}),selectors:{selectField:({field:e})=>e,selectTool:({tool:e})=>e,selectHasHistory:({history:e})=>e.length>0}}),{resetPuzzle:nn,loadPuzzle:tn,setTool:on,applyTool:sn,markField:an,restorePreviousState:cn}=$.actions,{selectField:un,selectTool:ln,selectHasHistory:fn}=$.selectors,mn=Object.freeze(Object.defineProperty({__proto__:null,applyTool:sn,loadPuzzle:tn,markField:an,resetPuzzle:nn,restorePreviousState:cn,selectField:un,selectHasHistory:fn,selectTool:ln,setTool:on,sudokuSlice:$},Symbol.toStringTag,{value:"Module"}));export{d as E,Zr as a,bn as b,A as c,m as d,ln as e,fn as f,dn as g,sn as h,on as i,cn as j,mn as k,tn as l,an as m,vn as p,nn as r,un as s};
