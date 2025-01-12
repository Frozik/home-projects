import{i as u,V as m,W as g,X as U,Y as $,Z as l,$ as L,a0 as v,a1 as b,a2 as N,a3 as i,a4 as S,a5 as h,a6 as c,a7 as d,a8 as s,a9 as E,aa as M,ab as k,ac as I,ad as x,ae as G}from"./e-Bikn-kL0.js";import{M as Y,D as P,a as F,g as B,A as J}from"./c-BTgWJ08t.js";import{addCompetitionRun as j,loadCompetition as R,setCurrentCompetition as w,setCompetitionsList as q,updateLayout as K,openTab as C,setLayout as Q}from"./c-DqU0umk6.js";import{i as W}from"./c-BzqCxI9i.js";import"./c-B4xFDNc5.js";import"./c-R_QjQUJ6.js";import"./c-BRfum6Tg.js";import"./c-CRTA2yPx.js";import"./c-BWZmSN9N.js";function p(e){if(!u(e))try{return JSON.parse(e)}catch{return}}function X(e){return m(t=>{let a=!1;t(U);const o=e.subscribe({next:n=>{t($(n)?n:l(n)),a=!0},error:n=>t(L(v(n))),complete:()=>{a||t(b),t(N)}});return()=>{o.unsubscribe()}},g.sliding(1))}function D(e,t){return i(function*(){const a=yield i(X,e);try{for(;;){const o=yield S(a);if((yield i(t,o))===!1){a.close();break}}}finally{(yield h())&&a.close()}})}function*Z(e){const t=yield i(e,Y);yield c(te,t),yield d(j.type,H,t),yield d(R.type,ee,t)}function*H(e,{payload:{competitionStart:t,generation:a}}){try{yield i([e,"addGeneration$"],t,a)}catch(o){yield s(w(L(v(o))))}}function*ee(e,{payload:t}){yield D(yield i([e,"getGenerations$"],t),function*(a){return yield s(w(E(a,({value:o})=>l({competitionStart:t,generations:o})))),!M(a)&&!k(a)})}function*te(e){yield D(yield i([e,"getCompetitionsStarts$"]),function*(t){yield s(q(E(t,({value:a})=>a.length>0?l(a):b)))})}var O={};Object.defineProperty(O,"__esModule",{value:!0});var ae={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M888.3 693.2c-42.5-24.6-94.3-18-129.2 12.8l-53-30.7V523.6c0-15.7-8.4-30.3-22-38.1l-136-78.3v-67.1c44.2-15 76-56.8 76-106.1 0-61.9-50.1-112-112-112s-112 50.1-112 112c0 49.3 31.8 91.1 76 106.1v67.1l-136 78.3c-13.6 7.8-22 22.4-22 38.1v151.6l-53 30.7c-34.9-30.8-86.8-37.4-129.2-12.8-53.5 31-71.7 99.4-41 152.9 30.8 53.5 98.9 71.9 152.2 41 42.5-24.6 62.7-73 53.6-118.8l48.7-28.3 140.6 81c6.8 3.9 14.4 5.9 22 5.9s15.2-2 22-5.9L674.5 740l48.7 28.3c-9.1 45.7 11.2 94.2 53.6 118.8 53.3 30.9 121.5 12.6 152.2-41 30.8-53.6 12.6-122-40.7-152.9zm-673 138.4a47.6 47.6 0 01-65.2-17.6c-13.2-22.9-5.4-52.3 17.5-65.5a47.6 47.6 0 0165.2 17.6c13.2 22.9 5.4 52.3-17.5 65.5zM522 463.8zM464 234a48.01 48.01 0 0196 0 48.01 48.01 0 01-96 0zm170 446.2l-122 70.3-122-70.3V539.8l122-70.3 122 70.3v140.4zm239.9 133.9c-13.2 22.9-42.4 30.8-65.2 17.6-22.8-13.2-30.7-42.6-17.5-65.5s42.4-30.8 65.2-17.6c22.9 13.2 30.7 42.5 17.5 65.5z"}}]},name:"deployment-unit",theme:"outlined"},ne=O.default=ae,T={};Object.defineProperty(T,"__esModule",{value:!0});var ie={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"}}]},name:"eye",theme:"outlined"},oe=T.default=ie;const y="[settings] pendulum-layout";function*se(e){yield c(re),yield I(K.type,le),yield d(C.type,ce,e)}function*le({payload:e}){yield i([localStorage,"setItem"],y,JSON.stringify(e)),yield i(A,e)}function*re(){const e=m(t=>{const a=localStorage.getItem(y),o=p(a);t(l(u(o)?P:o));let n=o;function f({storageArea:V,key:_,newValue:z}){const r=p(z);V===localStorage&&_===y&&!u(r)&&!W(n,r)&&(n=r,t(l(r)))}return window.addEventListener("storage",f,!1),()=>window.removeEventListener("storage",f,!1)},g.sliding(1));try{for(;;){const t=yield S(e);yield s(Q(t)),M(t)&&(yield i(A,t.value))}}finally{(yield h())&&(e.close(),yield s(x()))}}function*ce(e,{payload:t}){const a=yield i(e,F);yield i([a,"openTab"],{...B(t),position:{direction:"below"}})}function*A(e){const t=yield i(ue,e);yield s(G(t))}function ue(e){const t=J.map(({id:n})=>n),a=new Set(Object.keys(e.panels));return t.filter(n=>!a.has(n)).map(n=>({icon:de(n),name:n,payloadAction:C(n),tooltip:n}))}function de(e){switch(e){case"Test Playground":return oe;case"Neural Network":return ne;default:return}}function*he(e){yield c(se,e),yield c(Z,e)}export{he as pendulumSaga};
