import{bz as o,r as n}from"./index-CBImY0kA.js";var R=typeof o=="object"&&o&&o.Object===Object&&o,x=typeof self=="object"&&self&&self.Object===Object&&self;R||x||Function("return this")();function p(e){const t=n.useRef(e);t.current=e,n.useEffect(()=>()=>{t.current()},[])}function g(){const e=n.useRef(!1);return n.useEffect(()=>(e.current=!0,()=>{e.current=!1}),[]),n.useCallback(()=>e.current,[])}var b={width:void 0,height:void 0};function m(e){const{ref:t,box:r="content-box"}=e,[{width:v,height:w},S]=n.useState(b),f=g(),i=n.useRef({...b}),c=n.useRef(void 0);return c.current=e.onResize,n.useEffect(()=>{if(!t.current||typeof window>"u"||!("ResizeObserver"in window))return;const d=new ResizeObserver(([h])=>{const a=r==="border-box"?"borderBoxSize":r==="device-pixel-content-box"?"devicePixelContentBoxSize":"contentBoxSize",s=z(h,a,"inlineSize"),u=z(h,a,"blockSize");if(i.current.width!==s||i.current.height!==u){const l={width:s,height:u};i.current.width=s,i.current.height=u,c.current?c.current(l):f()&&S(l)}});return d.observe(t.current,{box:r}),()=>{d.disconnect()}},[r,t,f]),{width:v,height:w}}function z(e,t,r){return e[t]?Array.isArray(e[t])?e[t][0][r]:e[t][r]:t==="contentBoxSize"?e.contentRect[r==="inlineSize"?"width":"height"]:void 0}export{p as a,m as u};
