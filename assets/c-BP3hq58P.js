import{r as L,_ as We,w as z}from"./e-C3ktzW1v.js";import{E as Ge,Q as je,P as $,V as E,O as J,S as xe,a as P,M as H,T as U,R as qe,b as Be,u as N,c as Ae,D as Qe,G as $e,C as Je,d as et}from"./c-BifeIMKo.js";var tt=Object.defineProperty,ot=(f,p,b)=>p in f?tt(f,p,{enumerable:!0,configurable:!0,writable:!0,value:b}):f[p]=b,n=(f,p,b)=>(ot(f,typeof p!="symbol"?p+"":p,b),b);const ee=new qe,we=new Be,nt=Math.cos(70*(Math.PI/180)),De=(f,p)=>(f%p+p)%p;let at=class extends Ge{constructor(p,b){super(),n(this,"object"),n(this,"domElement"),n(this,"enabled",!0),n(this,"target",new E),n(this,"minDistance",0),n(this,"maxDistance",1/0),n(this,"minZoom",0),n(this,"maxZoom",1/0),n(this,"minPolarAngle",0),n(this,"maxPolarAngle",Math.PI),n(this,"minAzimuthAngle",-1/0),n(this,"maxAzimuthAngle",1/0),n(this,"enableDamping",!1),n(this,"dampingFactor",.05),n(this,"enableZoom",!0),n(this,"zoomSpeed",1),n(this,"enableRotate",!0),n(this,"rotateSpeed",1),n(this,"enablePan",!0),n(this,"panSpeed",1),n(this,"screenSpacePanning",!0),n(this,"keyPanSpeed",7),n(this,"zoomToCursor",!1),n(this,"autoRotate",!1),n(this,"autoRotateSpeed",2),n(this,"reverseOrbit",!1),n(this,"reverseHorizontalOrbit",!1),n(this,"reverseVerticalOrbit",!1),n(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),n(this,"mouseButtons",{LEFT:H.ROTATE,MIDDLE:H.DOLLY,RIGHT:H.PAN}),n(this,"touches",{ONE:U.ROTATE,TWO:U.DOLLY_PAN}),n(this,"target0"),n(this,"position0"),n(this,"zoom0"),n(this,"_domElementKeyEvents",null),n(this,"getPolarAngle"),n(this,"getAzimuthalAngle"),n(this,"setPolarAngle"),n(this,"setAzimuthalAngle"),n(this,"getDistance"),n(this,"listenToKeyEvents"),n(this,"stopListenToKeyEvents"),n(this,"saveState"),n(this,"reset"),n(this,"update"),n(this,"connect"),n(this,"dispose"),this.object=p,this.domElement=b,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>u.phi,this.getAzimuthalAngle=()=>u.theta,this.setPolarAngle=t=>{let o=De(t,2*Math.PI),a=u.phi;a<0&&(a+=2*Math.PI),o<0&&(o+=2*Math.PI);let s=Math.abs(o-a);2*Math.PI-s<s&&(o<a?o+=2*Math.PI:a+=2*Math.PI),d.phi=o-a,e.update()},this.setAzimuthalAngle=t=>{let o=De(t,2*Math.PI),a=u.theta;a<0&&(a+=2*Math.PI),o<0&&(o+=2*Math.PI);let s=Math.abs(o-a);2*Math.PI-s<s&&(o<a?o+=2*Math.PI:a+=2*Math.PI),d.theta=o-a,e.update()},this.getDistance=()=>e.object.position.distanceTo(e.target),this.listenToKeyEvents=t=>{t.addEventListener("keydown",ie),this._domElementKeyEvents=t},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",ie),this._domElementKeyEvents=null},this.saveState=()=>{e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=()=>{e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(W),e.update(),l=i.NONE},this.update=(()=>{const t=new E,o=new E(0,1,0),a=new je().setFromUnitVectors(p.up,o),s=a.clone().invert(),h=new E,A=new je,R=2*Math.PI;return function(){const Oe=e.object.position;a.setFromUnitVectors(p.up,o),s.copy(a).invert(),t.copy(Oe).sub(e.target),t.applyQuaternion(a),u.setFromVector3(t),e.autoRotate&&l===i.NONE&&te(Ie()),e.enableDamping?(u.theta+=d.theta*e.dampingFactor,u.phi+=d.phi*e.dampingFactor):(u.theta+=d.theta,u.phi+=d.phi);let I=e.minAzimuthAngle,_=e.maxAzimuthAngle;isFinite(I)&&isFinite(_)&&(I<-Math.PI?I+=R:I>Math.PI&&(I-=R),_<-Math.PI?_+=R:_>Math.PI&&(_-=R),I<=_?u.theta=Math.max(I,Math.min(_,u.theta)):u.theta=u.theta>(I+_)/2?Math.max(I,u.theta):Math.min(_,u.theta)),u.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,u.phi)),u.makeSafe(),e.enableDamping===!0?e.target.addScaledVector(C,e.dampingFactor):e.target.add(C),e.zoomToCursor&&T||e.object.isOrthographicCamera?u.radius=ne(u.radius):u.radius=ne(u.radius*y),t.setFromSpherical(u),t.applyQuaternion(s),Oe.copy(e.target).add(t),e.object.matrixAutoUpdate||e.object.updateMatrix(),e.object.lookAt(e.target),e.enableDamping===!0?(d.theta*=1-e.dampingFactor,d.phi*=1-e.dampingFactor,C.multiplyScalar(1-e.dampingFactor)):(d.set(0,0,0),C.set(0,0,0));let Z=!1;if(e.zoomToCursor&&T){let X=null;if(e.object instanceof $&&e.object.isPerspectiveCamera){const K=t.length();X=ne(K*y);const Q=K-X;e.object.position.addScaledVector(V,Q),e.object.updateMatrixWorld()}else if(e.object.isOrthographicCamera){const K=new E(g.x,g.y,0);K.unproject(e.object),e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/y)),e.object.updateProjectionMatrix(),Z=!0;const Q=new E(g.x,g.y,0);Q.unproject(e.object),e.object.position.sub(Q).add(K),e.object.updateMatrixWorld(),X=t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),e.zoomToCursor=!1;X!==null&&(e.screenSpacePanning?e.target.set(0,0,-1).transformDirection(e.object.matrix).multiplyScalar(X).add(e.object.position):(ee.origin.copy(e.object.position),ee.direction.set(0,0,-1).transformDirection(e.object.matrix),Math.abs(e.object.up.dot(ee.direction))<nt?p.lookAt(e.target):(we.setFromNormalAndCoplanarPoint(e.object.up,e.target),ee.intersectPlane(we,e.target))))}else e.object instanceof J&&e.object.isOrthographicCamera&&(Z=y!==1,Z&&(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/y)),e.object.updateProjectionMatrix()));return y=1,T=!1,Z||h.distanceToSquared(e.object.position)>G||8*(1-A.dot(e.object.quaternion))>G?(e.dispatchEvent(W),h.copy(e.object.position),A.copy(e.object.quaternion),Z=!1,!0):!1}})(),this.connect=t=>{e.domElement=t,e.domElement.style.touchAction="none",e.domElement.addEventListener("contextmenu",Te),e.domElement.addEventListener("pointerdown",ye),e.domElement.addEventListener("pointercancel",F),e.domElement.addEventListener("wheel",ve)},this.dispose=()=>{var t,o,a,s,h,A;e.domElement&&(e.domElement.style.touchAction="auto"),(t=e.domElement)==null||t.removeEventListener("contextmenu",Te),(o=e.domElement)==null||o.removeEventListener("pointerdown",ye),(a=e.domElement)==null||a.removeEventListener("pointercancel",F),(s=e.domElement)==null||s.removeEventListener("wheel",ve),(h=e.domElement)==null||h.ownerDocument.removeEventListener("pointermove",ae),(A=e.domElement)==null||A.ownerDocument.removeEventListener("pointerup",F),e._domElementKeyEvents!==null&&e._domElementKeyEvents.removeEventListener("keydown",ie)};const e=this,W={type:"change"},S={type:"start"},k={type:"end"},i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let l=i.NONE;const G=1e-6,u=new xe,d=new xe;let y=1;const C=new E,M=new P,O=new P,j=new P,x=new P,w=new P,D=new P,v=new P,m=new P,c=new P,V=new E,g=new P;let T=!1;const r=[],q={};function Ie(){return 2*Math.PI/60/60*e.autoRotateSpeed}function B(){return Math.pow(.95,e.zoomSpeed)}function te(t){e.reverseOrbit||e.reverseHorizontalOrbit?d.theta+=t:d.theta-=t}function re(t){e.reverseOrbit||e.reverseVerticalOrbit?d.phi+=t:d.phi-=t}const le=(()=>{const t=new E;return function(a,s){t.setFromMatrixColumn(s,0),t.multiplyScalar(-a),C.add(t)}})(),ce=(()=>{const t=new E;return function(a,s){e.screenSpacePanning===!0?t.setFromMatrixColumn(s,1):(t.setFromMatrixColumn(s,0),t.crossVectors(e.object.up,t)),t.multiplyScalar(a),C.add(t)}})(),Y=(()=>{const t=new E;return function(a,s){const h=e.domElement;if(h&&e.object instanceof $&&e.object.isPerspectiveCamera){const A=e.object.position;t.copy(A).sub(e.target);let R=t.length();R*=Math.tan(e.object.fov/2*Math.PI/180),le(2*a*R/h.clientHeight,e.object.matrix),ce(2*s*R/h.clientHeight,e.object.matrix)}else h&&e.object instanceof J&&e.object.isOrthographicCamera?(le(a*(e.object.right-e.object.left)/e.object.zoom/h.clientWidth,e.object.matrix),ce(s*(e.object.top-e.object.bottom)/e.object.zoom/h.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}})();function oe(t){e.object instanceof $&&e.object.isPerspectiveCamera||e.object instanceof J&&e.object.isOrthographicCamera?y/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function ue(t){e.object instanceof $&&e.object.isPerspectiveCamera||e.object instanceof J&&e.object.isOrthographicCamera?y*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function me(t){if(!e.zoomToCursor||!e.domElement)return;T=!0;const o=e.domElement.getBoundingClientRect(),a=t.clientX-o.left,s=t.clientY-o.top,h=o.width,A=o.height;g.x=a/h*2-1,g.y=-(s/A)*2+1,V.set(g.x,g.y,1).unproject(e.object).sub(e.object.position).normalize()}function ne(t){return Math.max(e.minDistance,Math.min(e.maxDistance,t))}function pe(t){M.set(t.clientX,t.clientY)}function _e(t){me(t),v.set(t.clientX,t.clientY)}function he(t){x.set(t.clientX,t.clientY)}function Le(t){O.set(t.clientX,t.clientY),j.subVectors(O,M).multiplyScalar(e.rotateSpeed);const o=e.domElement;o&&(te(2*Math.PI*j.x/o.clientHeight),re(2*Math.PI*j.y/o.clientHeight)),M.copy(O),e.update()}function Se(t){m.set(t.clientX,t.clientY),c.subVectors(m,v),c.y>0?oe(B()):c.y<0&&ue(B()),v.copy(m),e.update()}function Ce(t){w.set(t.clientX,t.clientY),D.subVectors(w,x).multiplyScalar(e.panSpeed),Y(D.x,D.y),x.copy(w),e.update()}function Re(t){me(t),t.deltaY<0?ue(B()):t.deltaY>0&&oe(B()),e.update()}function Ne(t){let o=!1;switch(t.code){case e.keys.UP:Y(0,e.keyPanSpeed),o=!0;break;case e.keys.BOTTOM:Y(0,-e.keyPanSpeed),o=!0;break;case e.keys.LEFT:Y(e.keyPanSpeed,0),o=!0;break;case e.keys.RIGHT:Y(-e.keyPanSpeed,0),o=!0;break}o&&(t.preventDefault(),e.update())}function de(){if(r.length==1)M.set(r[0].pageX,r[0].pageY);else{const t=.5*(r[0].pageX+r[1].pageX),o=.5*(r[0].pageY+r[1].pageY);M.set(t,o)}}function fe(){if(r.length==1)x.set(r[0].pageX,r[0].pageY);else{const t=.5*(r[0].pageX+r[1].pageX),o=.5*(r[0].pageY+r[1].pageY);x.set(t,o)}}function be(){const t=r[0].pageX-r[1].pageX,o=r[0].pageY-r[1].pageY,a=Math.sqrt(t*t+o*o);v.set(0,a)}function ze(){e.enableZoom&&be(),e.enablePan&&fe()}function ke(){e.enableZoom&&be(),e.enableRotate&&de()}function ge(t){if(r.length==1)O.set(t.pageX,t.pageY);else{const a=se(t),s=.5*(t.pageX+a.x),h=.5*(t.pageY+a.y);O.set(s,h)}j.subVectors(O,M).multiplyScalar(e.rotateSpeed);const o=e.domElement;o&&(te(2*Math.PI*j.x/o.clientHeight),re(2*Math.PI*j.y/o.clientHeight)),M.copy(O)}function Ee(t){if(r.length==1)w.set(t.pageX,t.pageY);else{const o=se(t),a=.5*(t.pageX+o.x),s=.5*(t.pageY+o.y);w.set(a,s)}D.subVectors(w,x).multiplyScalar(e.panSpeed),Y(D.x,D.y),x.copy(w)}function Pe(t){const o=se(t),a=t.pageX-o.x,s=t.pageY-o.y,h=Math.sqrt(a*a+s*s);m.set(0,h),c.set(0,Math.pow(m.y/v.y,e.zoomSpeed)),oe(c.y),v.copy(m)}function Ye(t){e.enableZoom&&Pe(t),e.enablePan&&Ee(t)}function He(t){e.enableZoom&&Pe(t),e.enableRotate&&ge(t)}function ye(t){var o,a;e.enabled!==!1&&(r.length===0&&((o=e.domElement)==null||o.ownerDocument.addEventListener("pointermove",ae),(a=e.domElement)==null||a.ownerDocument.addEventListener("pointerup",F)),Xe(t),t.pointerType==="touch"?Fe(t):Ue(t))}function ae(t){e.enabled!==!1&&(t.pointerType==="touch"?Ze(t):Ve(t))}function F(t){var o,a,s;Ke(t),r.length===0&&((o=e.domElement)==null||o.releasePointerCapture(t.pointerId),(a=e.domElement)==null||a.ownerDocument.removeEventListener("pointermove",ae),(s=e.domElement)==null||s.ownerDocument.removeEventListener("pointerup",F)),e.dispatchEvent(k),l=i.NONE}function Ue(t){let o;switch(t.button){case 0:o=e.mouseButtons.LEFT;break;case 1:o=e.mouseButtons.MIDDLE;break;case 2:o=e.mouseButtons.RIGHT;break;default:o=-1}switch(o){case H.DOLLY:if(e.enableZoom===!1)return;_e(t),l=i.DOLLY;break;case H.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enablePan===!1)return;he(t),l=i.PAN}else{if(e.enableRotate===!1)return;pe(t),l=i.ROTATE}break;case H.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enableRotate===!1)return;pe(t),l=i.ROTATE}else{if(e.enablePan===!1)return;he(t),l=i.PAN}break;default:l=i.NONE}l!==i.NONE&&e.dispatchEvent(S)}function Ve(t){if(e.enabled!==!1)switch(l){case i.ROTATE:if(e.enableRotate===!1)return;Le(t);break;case i.DOLLY:if(e.enableZoom===!1)return;Se(t);break;case i.PAN:if(e.enablePan===!1)return;Ce(t);break}}function ve(t){e.enabled===!1||e.enableZoom===!1||l!==i.NONE&&l!==i.ROTATE||(t.preventDefault(),e.dispatchEvent(S),Re(t),e.dispatchEvent(k))}function ie(t){e.enabled===!1||e.enablePan===!1||Ne(t)}function Fe(t){switch(Me(t),r.length){case 1:switch(e.touches.ONE){case U.ROTATE:if(e.enableRotate===!1)return;de(),l=i.TOUCH_ROTATE;break;case U.PAN:if(e.enablePan===!1)return;fe(),l=i.TOUCH_PAN;break;default:l=i.NONE}break;case 2:switch(e.touches.TWO){case U.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;ze(),l=i.TOUCH_DOLLY_PAN;break;case U.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;ke(),l=i.TOUCH_DOLLY_ROTATE;break;default:l=i.NONE}break;default:l=i.NONE}l!==i.NONE&&e.dispatchEvent(S)}function Ze(t){switch(Me(t),l){case i.TOUCH_ROTATE:if(e.enableRotate===!1)return;ge(t),e.update();break;case i.TOUCH_PAN:if(e.enablePan===!1)return;Ee(t),e.update();break;case i.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Ye(t),e.update();break;case i.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;He(t),e.update();break;default:l=i.NONE}}function Te(t){e.enabled!==!1&&t.preventDefault()}function Xe(t){r.push(t)}function Ke(t){delete q[t.pointerId];for(let o=0;o<r.length;o++)if(r[o].pointerId==t.pointerId){r.splice(o,1);return}}function Me(t){let o=q[t.pointerId];o===void 0&&(o=new P,q[t.pointerId]=o),o.set(t.pageX,t.pageY)}function se(t){const o=t.pointerId===r[0].pointerId?r[1]:r[0];return q[o.pointerId]}b!==void 0&&this.connect(b),this.update()}};const it=L.forwardRef(({makeDefault:f,camera:p,regress:b,domElement:e,enableDamping:W=!0,keyEvents:S=!1,onChange:k,onStart:i,onEnd:l,...G},u)=>{const d=N(c=>c.invalidate),y=N(c=>c.camera),C=N(c=>c.gl),M=N(c=>c.events),O=N(c=>c.setEvents),j=N(c=>c.set),x=N(c=>c.get),w=N(c=>c.performance),D=p||y,v=e||M.connected||C.domElement,m=L.useMemo(()=>new at(D),[D]);return Ae(()=>{m.enabled&&m.update()},-1),L.useEffect(()=>(S&&m.connect(S===!0?v:S),m.connect(v),()=>void m.dispose()),[S,v,b,m,d]),L.useEffect(()=>{const c=T=>{d(),b&&w.regress(),k&&k(T)},V=T=>{i&&i(T)},g=T=>{l&&l(T)};return m.addEventListener("change",c),m.addEventListener("start",V),m.addEventListener("end",g),()=>{m.removeEventListener("start",V),m.removeEventListener("end",g),m.removeEventListener("change",c)}},[k,i,l,m,d,O]),L.useEffect(()=>{if(f){const c=x().controls;return j({controls:m}),()=>j({controls:c})}},[f,m]),L.createElement("primitive",We({ref:u,object:m,enableDamping:W},G))}),st=`
  precision mediump float;
  
  in vec3 vCol;
  
  out vec4 fCol;
  
  void main(){
    fCol = vec4(vCol, 1);
  }
`,rt=`
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
`,lt=L.memo(()=>{const f=L.useMemo(()=>({uTime:{value:0},uCount:{value:1e5}}),[]);return Ae((p,b)=>{f.uTime.value+=b}),z.jsxs("mesh",{children:[z.jsx("instancedBufferGeometry",{instanceCount:f.uCount.value,drawRange:{start:0,count:3}}),z.jsx("shaderMaterial",{side:Qe,glslVersion:$e,uniforms:f,fragmentShader:st,vertexShader:rt})]})}),ct="_container_ufavl_1",ut={container:ct},ft=L.memo(()=>z.jsx("div",{className:ut.container,children:z.jsxs(Je,{camera:{position:[0,0,10]},scene:{background:new et("#262626")},children:[z.jsx(lt,{}),z.jsx(it,{})]})}));export{ft as Sun};
