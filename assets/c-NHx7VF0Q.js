import{r as L,D as Ge,J as k}from"./e-2cnBJs5Z.js";import{E as qe,Q as De,P as re,V as P,O as le,S as je,a as y,M as U,T as V,R as Be,b as Qe,u as N,c as Ie,D as Je,G as $e,C as et,d as tt}from"./c-COrrt0nK.js";import{c as ot}from"./c-CCiIKx5L.js";var nt=Object.defineProperty,at=(f,m,b)=>m in f?nt(f,m,{enumerable:!0,configurable:!0,writable:!0,value:b}):f[m]=b,n=(f,m,b)=>(at(f,typeof m!="symbol"?m+"":m,b),b);const $=new Be,we=new Qe,it=Math.cos(70*(Math.PI/180)),Ae=(f,m)=>(f%m+m)%m;let st=class extends qe{constructor(m,b){super(),n(this,"object"),n(this,"domElement"),n(this,"enabled",!0),n(this,"target",new P),n(this,"minDistance",0),n(this,"maxDistance",1/0),n(this,"minZoom",0),n(this,"maxZoom",1/0),n(this,"minPolarAngle",0),n(this,"maxPolarAngle",Math.PI),n(this,"minAzimuthAngle",-1/0),n(this,"maxAzimuthAngle",1/0),n(this,"enableDamping",!1),n(this,"dampingFactor",.05),n(this,"enableZoom",!0),n(this,"zoomSpeed",1),n(this,"enableRotate",!0),n(this,"rotateSpeed",1),n(this,"enablePan",!0),n(this,"panSpeed",1),n(this,"screenSpacePanning",!0),n(this,"keyPanSpeed",7),n(this,"zoomToCursor",!1),n(this,"autoRotate",!1),n(this,"autoRotateSpeed",2),n(this,"reverseOrbit",!1),n(this,"reverseHorizontalOrbit",!1),n(this,"reverseVerticalOrbit",!1),n(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),n(this,"mouseButtons",{LEFT:U.ROTATE,MIDDLE:U.DOLLY,RIGHT:U.PAN}),n(this,"touches",{ONE:V.ROTATE,TWO:V.DOLLY_PAN}),n(this,"target0"),n(this,"position0"),n(this,"zoom0"),n(this,"_domElementKeyEvents",null),n(this,"getPolarAngle"),n(this,"getAzimuthalAngle"),n(this,"setPolarAngle"),n(this,"setAzimuthalAngle"),n(this,"getDistance"),n(this,"getZoomScale"),n(this,"listenToKeyEvents"),n(this,"stopListenToKeyEvents"),n(this,"saveState"),n(this,"reset"),n(this,"update"),n(this,"connect"),n(this,"dispose"),n(this,"dollyIn"),n(this,"dollyOut"),n(this,"getScale"),n(this,"setScale"),this.object=m,this.domElement=b,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>u.phi,this.getAzimuthalAngle=()=>u.theta,this.setPolarAngle=t=>{let o=Ae(t,2*Math.PI),a=u.phi;a<0&&(a+=2*Math.PI),o<0&&(o+=2*Math.PI);let s=Math.abs(o-a);2*Math.PI-s<s&&(o<a?o+=2*Math.PI:a+=2*Math.PI),d.phi=o-a,e.update()},this.setAzimuthalAngle=t=>{let o=Ae(t,2*Math.PI),a=u.theta;a<0&&(a+=2*Math.PI),o<0&&(o+=2*Math.PI);let s=Math.abs(o-a);2*Math.PI-s<s&&(o<a?o+=2*Math.PI:a+=2*Math.PI),d.theta=o-a,e.update()},this.getDistance=()=>e.object.position.distanceTo(e.target),this.listenToKeyEvents=t=>{t.addEventListener("keydown",ie),this._domElementKeyEvents=t},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",ie),this._domElementKeyEvents=null},this.saveState=()=>{e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=()=>{e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(G),e.update(),l=i.NONE},this.update=(()=>{const t=new P,o=new P(0,1,0),a=new De().setFromUnitVectors(m.up,o),s=a.clone().invert(),p=new P,A=new De,R=2*Math.PI;return function(){const xe=e.object.position;a.setFromUnitVectors(m.up,o),s.copy(a).invert(),t.copy(xe).sub(e.target),t.applyQuaternion(a),u.setFromVector3(t),e.autoRotate&&l===i.NONE&&ee(Se()),e.enableDamping?(u.theta+=d.theta*e.dampingFactor,u.phi+=d.phi*e.dampingFactor):(u.theta+=d.theta,u.phi+=d.phi);let I=e.minAzimuthAngle,S=e.maxAzimuthAngle;isFinite(I)&&isFinite(S)&&(I<-Math.PI?I+=R:I>Math.PI&&(I-=R),S<-Math.PI?S+=R:S>Math.PI&&(S-=R),I<=S?u.theta=Math.max(I,Math.min(S,u.theta)):u.theta=u.theta>(I+S)/2?Math.max(I,u.theta):Math.min(S,u.theta)),u.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,u.phi)),u.makeSafe(),e.enableDamping===!0?e.target.addScaledVector(C,e.dampingFactor):e.target.add(C),e.zoomToCursor&&T||e.object.isOrthographicCamera?u.radius=ne(u.radius):u.radius=ne(u.radius*g),t.setFromSpherical(u),t.applyQuaternion(s),xe.copy(e.target).add(t),e.object.matrixAutoUpdate||e.object.updateMatrix(),e.object.lookAt(e.target),e.enableDamping===!0?(d.theta*=1-e.dampingFactor,d.phi*=1-e.dampingFactor,C.multiplyScalar(1-e.dampingFactor)):(d.set(0,0,0),C.set(0,0,0));let X=!1;if(e.zoomToCursor&&T){let K=null;if(e.object instanceof re&&e.object.isPerspectiveCamera){const W=t.length();K=ne(W*g);const J=W-K;e.object.position.addScaledVector(F,J),e.object.updateMatrixWorld()}else if(e.object.isOrthographicCamera){const W=new P(E.x,E.y,0);W.unproject(e.object),e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/g)),e.object.updateProjectionMatrix(),X=!0;const J=new P(E.x,E.y,0);J.unproject(e.object),e.object.position.sub(J).add(W),e.object.updateMatrixWorld(),K=t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),e.zoomToCursor=!1;K!==null&&(e.screenSpacePanning?e.target.set(0,0,-1).transformDirection(e.object.matrix).multiplyScalar(K).add(e.object.position):($.origin.copy(e.object.position),$.direction.set(0,0,-1).transformDirection(e.object.matrix),Math.abs(e.object.up.dot($.direction))<it?m.lookAt(e.target):(we.setFromNormalAndCoplanarPoint(e.object.up,e.target),$.intersectPlane(we,e.target))))}else e.object instanceof le&&e.object.isOrthographicCamera&&(X=g!==1,X&&(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/g)),e.object.updateProjectionMatrix()));return g=1,T=!1,X||p.distanceToSquared(e.object.position)>q||8*(1-A.dot(e.object.quaternion))>q?(e.dispatchEvent(G),p.copy(e.object.position),A.copy(e.object.quaternion),X=!1,!0):!1}})(),this.connect=t=>{e.domElement=t,e.domElement.style.touchAction="none",e.domElement.addEventListener("contextmenu",Me),e.domElement.addEventListener("pointerdown",ve),e.domElement.addEventListener("pointercancel",Z),e.domElement.addEventListener("wheel",Te)},this.dispose=()=>{var t,o,a,s,p,A;e.domElement&&(e.domElement.style.touchAction="auto"),(t=e.domElement)==null||t.removeEventListener("contextmenu",Me),(o=e.domElement)==null||o.removeEventListener("pointerdown",ve),(a=e.domElement)==null||a.removeEventListener("pointercancel",Z),(s=e.domElement)==null||s.removeEventListener("wheel",Te),(p=e.domElement)==null||p.ownerDocument.removeEventListener("pointermove",ae),(A=e.domElement)==null||A.ownerDocument.removeEventListener("pointerup",Z),e._domElementKeyEvents!==null&&e._domElementKeyEvents.removeEventListener("keydown",ie)};const e=this,G={type:"change"},_={type:"start"},Y={type:"end"},i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let l=i.NONE;const q=1e-6,u=new je,d=new je;let g=1;const C=new P,M=new y,O=new y,x=new y,D=new y,j=new y,w=new y,v=new y,h=new y,c=new y,F=new P,E=new y;let T=!1;const r=[],B={};function Se(){return 2*Math.PI/60/60*e.autoRotateSpeed}function z(){return Math.pow(.95,e.zoomSpeed)}function ee(t){e.reverseOrbit||e.reverseHorizontalOrbit?d.theta+=t:d.theta-=t}function ce(t){e.reverseOrbit||e.reverseVerticalOrbit?d.phi+=t:d.phi-=t}const ue=(()=>{const t=new P;return function(a,s){t.setFromMatrixColumn(s,0),t.multiplyScalar(-a),C.add(t)}})(),he=(()=>{const t=new P;return function(a,s){e.screenSpacePanning===!0?t.setFromMatrixColumn(s,1):(t.setFromMatrixColumn(s,0),t.crossVectors(e.object.up,t)),t.multiplyScalar(a),C.add(t)}})(),H=(()=>{const t=new P;return function(a,s){const p=e.domElement;if(p&&e.object instanceof re&&e.object.isPerspectiveCamera){const A=e.object.position;t.copy(A).sub(e.target);let R=t.length();R*=Math.tan(e.object.fov/2*Math.PI/180),ue(2*a*R/p.clientHeight,e.object.matrix),he(2*s*R/p.clientHeight,e.object.matrix)}else p&&e.object instanceof le&&e.object.isOrthographicCamera?(ue(a*(e.object.right-e.object.left)/e.object.zoom/p.clientWidth,e.object.matrix),he(s*(e.object.top-e.object.bottom)/e.object.zoom/p.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}})();function te(t){e.object instanceof re&&e.object.isPerspectiveCamera||e.object instanceof le&&e.object.isOrthographicCamera?g=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function Q(t){te(g/t)}function oe(t){te(g*t)}function me(t){if(!e.zoomToCursor||!e.domElement)return;T=!0;const o=e.domElement.getBoundingClientRect(),a=t.clientX-o.left,s=t.clientY-o.top,p=o.width,A=o.height;E.x=a/p*2-1,E.y=-(s/A)*2+1,F.set(E.x,E.y,1).unproject(e.object).sub(e.object.position).normalize()}function ne(t){return Math.max(e.minDistance,Math.min(e.maxDistance,t))}function pe(t){M.set(t.clientX,t.clientY)}function Le(t){me(t),v.set(t.clientX,t.clientY)}function de(t){D.set(t.clientX,t.clientY)}function _e(t){O.set(t.clientX,t.clientY),x.subVectors(O,M).multiplyScalar(e.rotateSpeed);const o=e.domElement;o&&(ee(2*Math.PI*x.x/o.clientHeight),ce(2*Math.PI*x.y/o.clientHeight)),M.copy(O),e.update()}function Ce(t){h.set(t.clientX,t.clientY),c.subVectors(h,v),c.y>0?Q(z()):c.y<0&&oe(z()),v.copy(h),e.update()}function Re(t){j.set(t.clientX,t.clientY),w.subVectors(j,D).multiplyScalar(e.panSpeed),H(w.x,w.y),D.copy(j),e.update()}function Ne(t){me(t),t.deltaY<0?oe(z()):t.deltaY>0&&Q(z()),e.update()}function ze(t){let o=!1;switch(t.code){case e.keys.UP:H(0,e.keyPanSpeed),o=!0;break;case e.keys.BOTTOM:H(0,-e.keyPanSpeed),o=!0;break;case e.keys.LEFT:H(e.keyPanSpeed,0),o=!0;break;case e.keys.RIGHT:H(-e.keyPanSpeed,0),o=!0;break}o&&(t.preventDefault(),e.update())}function fe(){if(r.length==1)M.set(r[0].pageX,r[0].pageY);else{const t=.5*(r[0].pageX+r[1].pageX),o=.5*(r[0].pageY+r[1].pageY);M.set(t,o)}}function be(){if(r.length==1)D.set(r[0].pageX,r[0].pageY);else{const t=.5*(r[0].pageX+r[1].pageX),o=.5*(r[0].pageY+r[1].pageY);D.set(t,o)}}function ge(){const t=r[0].pageX-r[1].pageX,o=r[0].pageY-r[1].pageY,a=Math.sqrt(t*t+o*o);v.set(0,a)}function ke(){e.enableZoom&&ge(),e.enablePan&&be()}function Ye(){e.enableZoom&&ge(),e.enableRotate&&fe()}function Ee(t){if(r.length==1)O.set(t.pageX,t.pageY);else{const a=se(t),s=.5*(t.pageX+a.x),p=.5*(t.pageY+a.y);O.set(s,p)}x.subVectors(O,M).multiplyScalar(e.rotateSpeed);const o=e.domElement;o&&(ee(2*Math.PI*x.x/o.clientHeight),ce(2*Math.PI*x.y/o.clientHeight)),M.copy(O)}function Pe(t){if(r.length==1)j.set(t.pageX,t.pageY);else{const o=se(t),a=.5*(t.pageX+o.x),s=.5*(t.pageY+o.y);j.set(a,s)}w.subVectors(j,D).multiplyScalar(e.panSpeed),H(w.x,w.y),D.copy(j)}function ye(t){const o=se(t),a=t.pageX-o.x,s=t.pageY-o.y,p=Math.sqrt(a*a+s*s);h.set(0,p),c.set(0,Math.pow(h.y/v.y,e.zoomSpeed)),Q(c.y),v.copy(h)}function He(t){e.enableZoom&&ye(t),e.enablePan&&Pe(t)}function Ue(t){e.enableZoom&&ye(t),e.enableRotate&&Ee(t)}function ve(t){var o,a;e.enabled!==!1&&(r.length===0&&((o=e.domElement)==null||o.ownerDocument.addEventListener("pointermove",ae),(a=e.domElement)==null||a.ownerDocument.addEventListener("pointerup",Z)),Ke(t),t.pointerType==="touch"?Ze(t):Ve(t))}function ae(t){e.enabled!==!1&&(t.pointerType==="touch"?Xe(t):Fe(t))}function Z(t){var o,a,s;We(t),r.length===0&&((o=e.domElement)==null||o.releasePointerCapture(t.pointerId),(a=e.domElement)==null||a.ownerDocument.removeEventListener("pointermove",ae),(s=e.domElement)==null||s.ownerDocument.removeEventListener("pointerup",Z)),e.dispatchEvent(Y),l=i.NONE}function Ve(t){let o;switch(t.button){case 0:o=e.mouseButtons.LEFT;break;case 1:o=e.mouseButtons.MIDDLE;break;case 2:o=e.mouseButtons.RIGHT;break;default:o=-1}switch(o){case U.DOLLY:if(e.enableZoom===!1)return;Le(t),l=i.DOLLY;break;case U.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enablePan===!1)return;de(t),l=i.PAN}else{if(e.enableRotate===!1)return;pe(t),l=i.ROTATE}break;case U.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enableRotate===!1)return;pe(t),l=i.ROTATE}else{if(e.enablePan===!1)return;de(t),l=i.PAN}break;default:l=i.NONE}l!==i.NONE&&e.dispatchEvent(_)}function Fe(t){if(e.enabled!==!1)switch(l){case i.ROTATE:if(e.enableRotate===!1)return;_e(t);break;case i.DOLLY:if(e.enableZoom===!1)return;Ce(t);break;case i.PAN:if(e.enablePan===!1)return;Re(t);break}}function Te(t){e.enabled===!1||e.enableZoom===!1||l!==i.NONE&&l!==i.ROTATE||(t.preventDefault(),e.dispatchEvent(_),Ne(t),e.dispatchEvent(Y))}function ie(t){e.enabled===!1||e.enablePan===!1||ze(t)}function Ze(t){switch(Oe(t),r.length){case 1:switch(e.touches.ONE){case V.ROTATE:if(e.enableRotate===!1)return;fe(),l=i.TOUCH_ROTATE;break;case V.PAN:if(e.enablePan===!1)return;be(),l=i.TOUCH_PAN;break;default:l=i.NONE}break;case 2:switch(e.touches.TWO){case V.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;ke(),l=i.TOUCH_DOLLY_PAN;break;case V.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Ye(),l=i.TOUCH_DOLLY_ROTATE;break;default:l=i.NONE}break;default:l=i.NONE}l!==i.NONE&&e.dispatchEvent(_)}function Xe(t){switch(Oe(t),l){case i.TOUCH_ROTATE:if(e.enableRotate===!1)return;Ee(t),e.update();break;case i.TOUCH_PAN:if(e.enablePan===!1)return;Pe(t),e.update();break;case i.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;He(t),e.update();break;case i.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Ue(t),e.update();break;default:l=i.NONE}}function Me(t){e.enabled!==!1&&t.preventDefault()}function Ke(t){r.push(t)}function We(t){delete B[t.pointerId];for(let o=0;o<r.length;o++)if(r[o].pointerId==t.pointerId){r.splice(o,1);return}}function Oe(t){let o=B[t.pointerId];o===void 0&&(o=new y,B[t.pointerId]=o),o.set(t.pageX,t.pageY)}function se(t){const o=t.pointerId===r[0].pointerId?r[1]:r[0];return B[o.pointerId]}this.dollyIn=(t=z())=>{oe(t),e.update()},this.dollyOut=(t=z())=>{Q(t),e.update()},this.getScale=()=>g,this.setScale=t=>{te(t),e.update()},this.getZoomScale=()=>z(),b!==void 0&&this.connect(b),this.update()}};const rt=L.forwardRef(({makeDefault:f,camera:m,regress:b,domElement:e,enableDamping:G=!0,keyEvents:_=!1,onChange:Y,onStart:i,onEnd:l,...q},u)=>{const d=N(c=>c.invalidate),g=N(c=>c.camera),C=N(c=>c.gl),M=N(c=>c.events),O=N(c=>c.setEvents),x=N(c=>c.set),D=N(c=>c.get),j=N(c=>c.performance),w=m||g,v=e||M.connected||C.domElement,h=L.useMemo(()=>new st(w),[w]);return Ie(()=>{h.enabled&&h.update()},-1),L.useEffect(()=>(_&&h.connect(_===!0?v:_),h.connect(v),()=>void h.dispose()),[_,v,b,h,d]),L.useEffect(()=>{const c=T=>{d(),b&&j.regress(),Y&&Y(T)},F=T=>{i&&i(T)},E=T=>{l&&l(T)};return h.addEventListener("change",c),h.addEventListener("start",F),h.addEventListener("end",E),()=>{h.removeEventListener("start",F),h.removeEventListener("end",E),h.removeEventListener("change",c)}},[Y,i,l,h,d,O]),L.useEffect(()=>{if(f){const c=D().controls;return x({controls:h}),()=>x({controls:c})}},[f,h]),L.createElement("primitive",Ge({ref:u,object:h,enableDamping:G},q))}),lt=`
  precision mediump float;
  
  in vec3 vCol;
  
  out vec4 fCol;
  
  void main(){
    fCol = vec4(vCol, 1);
  }
`,ct=`
  uniform float uTime;
  uniform float uCount;
  
  #define PI 3.1415926535
  #define TWO_PI PI * 2.
  
  struct spherical{
    float radius;
    float theta;
    float phi;
  };
  
  float random(vec3 v3) {
      return fract(sin(dot(v3, vec3(12.9898,78.233,34.258))) * 43758.5453123);
  }
  
  spherical setFromVec3(vec3 v3){
    return spherical(length(v3), atan(v3.x, v3.z), acos(clamp(v3.y / length(v3), -1., 1.)));
  }
  
  mat2 rot(float a){
    float c = cos(a);
    float s = sin(a);
    return mat2(c, s, -s, c);
  }
  
  // By Morgan McGuire @morgan3d, http://graphicscodex.com
  // Reuse permitted under the BSD license.
  float square(float s) { return s * s; }
  
  vec3 neonGradient(float val) {
    return clamp(vec3(val * 1.3 + 0.1, square(abs(0.43 - val) * 1.7), (1.0 - val) * 1.7), 0.0, 1.0);
  }

  vec3 instPos(float instID) {
    float rad = 5.;
    float phi = PI * (3. - sqrt(5.));
    
    float y = 1. - (instID / (uCount - 1.)) * 2.;
    float radius = sqrt(1. - square(y));

    float theta = mod(phi * instID, TWO_PI);

    float x = cos(theta) * radius;
    float z = sin(theta) * radius;
    
    return vec3(x, y, z) * rad;
  }
  
  out vec3 vCol;
  
  void main(){
    float time = uTime * 0.1;
    
    vec3 pos = vec3(0., 0.25, 0.);
    float angle = float(gl_VertexID) * TWO_PI / 3.;
    pos.xy = rot(angle) * pos.xy;
    
    vec3 iPos = instPos(float(gl_InstanceID));
    
    spherical iPosSpherical = setFromVec3(iPos);
    
    float shift = random(iPos) * 2. - 1.;
    float sinVal = abs(sin(TWO_PI * (shift + time)));
    pos *= (1. - sinVal) * 0.99 + 0.01;
    pos.xy *= rot(TWO_PI * (shift + time * shift));
    
    pos.yz *= rot(PI * 0.5 - iPosSpherical.phi);
    pos.xz *= rot(iPosSpherical.theta);
    
    pos += iPos + normalize(iPos) * sinVal;
    
    mat4 resultMatrix = projectionMatrix * modelViewMatrix;
    
    if (gl_VertexID == 0 &&mod(float(gl_InstanceID), 50.) == 0.) {
      gl_Position = resultMatrix * vec4(0., 0., 0. , 1.);
    } else {
      gl_Position = resultMatrix * vec4(pos, 1.);
    }
    
    vCol = neonGradient(0.6 + sinVal * 0.4);
  }
`,ut=L.memo(()=>{const f=L.useMemo(()=>({uTime:{value:0},uCount:{value:1e5}}),[]);return Ie((m,b)=>{f.uTime.value+=b}),k.jsxs("mesh",{children:[k.jsx("instancedBufferGeometry",{instanceCount:f.uCount.value,drawRange:{start:0,count:3}}),k.jsx("shaderMaterial",{side:Je,glslVersion:$e,uniforms:f,fragmentShader:lt,vertexShader:ct})]})}),bt=L.memo(()=>k.jsx("div",{className:ot.fixedContainer,children:k.jsxs(et,{camera:{position:[0,0,10]},scene:{background:new tt("#262626")},children:[k.jsx(ut,{}),k.jsx(rt,{})]})}));export{bt as Sun};
