import{r as C,E as Ge,J as H}from"./e-Ccls8iNJ.js";import{Q as De,P as re,V as v,O as le,S as we,a as T,M as U,T as V,R as qe,b as Be,u as Y,c as je,D as Qe,G as $e,C as Je,d as et}from"./c-DrHKhySt.js";import{c as tt}from"./c-CCiIKx5L.js";var ot=Object.defineProperty,nt=(f,i,c)=>i in f?ot(f,i,{enumerable:!0,configurable:!0,writable:!0,value:c}):f[i]=c,at=(f,i,c)=>(nt(f,i+"",c),c);class it{constructor(){at(this,"_listeners")}addEventListener(i,c){this._listeners===void 0&&(this._listeners={});const e=this._listeners;e[i]===void 0&&(e[i]=[]),e[i].indexOf(c)===-1&&e[i].push(c)}hasEventListener(i,c){if(this._listeners===void 0)return!1;const e=this._listeners;return e[i]!==void 0&&e[i].indexOf(c)!==-1}removeEventListener(i,c){if(this._listeners===void 0)return;const P=this._listeners[i];if(P!==void 0){const g=P.indexOf(c);g!==-1&&P.splice(g,1)}}dispatchEvent(i){if(this._listeners===void 0)return;const e=this._listeners[i.type];if(e!==void 0){i.target=this;const P=e.slice(0);for(let g=0,R=P.length;g<R;g++)P[g].call(this,i);i.target=null}}}var st=Object.defineProperty,rt=(f,i,c)=>i in f?st(f,i,{enumerable:!0,configurable:!0,writable:!0,value:c}):f[i]=c,n=(f,i,c)=>(rt(f,typeof i!="symbol"?i+"":i,c),c);const J=new qe,_e=new Be,lt=Math.cos(70*(Math.PI/180)),Ae=(f,i)=>(f%i+i)%i;let ct=class extends it{constructor(i,c){super(),n(this,"object"),n(this,"domElement"),n(this,"enabled",!0),n(this,"target",new v),n(this,"minDistance",0),n(this,"maxDistance",1/0),n(this,"minZoom",0),n(this,"maxZoom",1/0),n(this,"minPolarAngle",0),n(this,"maxPolarAngle",Math.PI),n(this,"minAzimuthAngle",-1/0),n(this,"maxAzimuthAngle",1/0),n(this,"enableDamping",!1),n(this,"dampingFactor",.05),n(this,"enableZoom",!0),n(this,"zoomSpeed",1),n(this,"enableRotate",!0),n(this,"rotateSpeed",1),n(this,"enablePan",!0),n(this,"panSpeed",1),n(this,"screenSpacePanning",!0),n(this,"keyPanSpeed",7),n(this,"zoomToCursor",!1),n(this,"autoRotate",!1),n(this,"autoRotateSpeed",2),n(this,"reverseOrbit",!1),n(this,"reverseHorizontalOrbit",!1),n(this,"reverseVerticalOrbit",!1),n(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),n(this,"mouseButtons",{LEFT:U.ROTATE,MIDDLE:U.DOLLY,RIGHT:U.PAN}),n(this,"touches",{ONE:V.ROTATE,TWO:V.DOLLY_PAN}),n(this,"target0"),n(this,"position0"),n(this,"zoom0"),n(this,"_domElementKeyEvents",null),n(this,"getPolarAngle"),n(this,"getAzimuthalAngle"),n(this,"setPolarAngle"),n(this,"setAzimuthalAngle"),n(this,"getDistance"),n(this,"getZoomScale"),n(this,"listenToKeyEvents"),n(this,"stopListenToKeyEvents"),n(this,"saveState"),n(this,"reset"),n(this,"update"),n(this,"connect"),n(this,"dispose"),n(this,"dollyIn"),n(this,"dollyOut"),n(this,"getScale"),n(this,"setScale"),this.object=i,this.domElement=c,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>d.phi,this.getAzimuthalAngle=()=>d.theta,this.setPolarAngle=t=>{let o=Ae(t,2*Math.PI),a=d.phi;a<0&&(a+=2*Math.PI),o<0&&(o+=2*Math.PI);let r=Math.abs(o-a);2*Math.PI-r<r&&(o<a?o+=2*Math.PI:a+=2*Math.PI),b.phi=o-a,e.update()},this.setAzimuthalAngle=t=>{let o=Ae(t,2*Math.PI),a=d.theta;a<0&&(a+=2*Math.PI),o<0&&(o+=2*Math.PI);let r=Math.abs(o-a);2*Math.PI-r<r&&(o<a?o+=2*Math.PI:a+=2*Math.PI),b.theta=o-a,e.update()},this.getDistance=()=>e.object.position.distanceTo(e.target),this.listenToKeyEvents=t=>{t.addEventListener("keydown",ie),this._domElementKeyEvents=t},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",ie),this._domElementKeyEvents=null},this.saveState=()=>{e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=()=>{e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(P),e.update(),u=s.NONE},this.update=(()=>{const t=new v,o=new v(0,1,0),a=new De().setFromUnitVectors(i.up,o),r=a.clone().invert(),p=new v,I=new De,z=2*Math.PI;return function(){const xe=e.object.position;a.setFromUnitVectors(i.up,o),r.copy(a).invert(),t.copy(xe).sub(e.target),t.applyQuaternion(a),d.setFromVector3(t),e.autoRotate&&u===s.NONE&&ee(Ie()),e.enableDamping?(d.theta+=b.theta*e.dampingFactor,d.phi+=b.phi*e.dampingFactor):(d.theta+=b.theta,d.phi+=b.phi);let S=e.minAzimuthAngle,L=e.maxAzimuthAngle;isFinite(S)&&isFinite(L)&&(S<-Math.PI?S+=z:S>Math.PI&&(S-=z),L<-Math.PI?L+=z:L>Math.PI&&(L-=z),S<=L?d.theta=Math.max(S,Math.min(L,d.theta)):d.theta=d.theta>(S+L)/2?Math.max(S,d.theta):Math.min(L,d.theta)),d.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,d.phi)),d.makeSafe(),e.enableDamping===!0?e.target.addScaledVector(N,e.dampingFactor):e.target.add(N),e.zoomToCursor&&M||e.object.isOrthographicCamera?d.radius=ne(d.radius):d.radius=ne(d.radius*E),t.setFromSpherical(d),t.applyQuaternion(r),xe.copy(e.target).add(t),e.object.matrixAutoUpdate||e.object.updateMatrix(),e.object.lookAt(e.target),e.enableDamping===!0?(b.theta*=1-e.dampingFactor,b.phi*=1-e.dampingFactor,N.multiplyScalar(1-e.dampingFactor)):(b.set(0,0,0),N.set(0,0,0));let K=!1;if(e.zoomToCursor&&M){let W=null;if(e.object instanceof re&&e.object.isPerspectiveCamera){const G=t.length();W=ne(G*E);const $=G-W;e.object.position.addScaledVector(Z,$),e.object.updateMatrixWorld()}else if(e.object.isOrthographicCamera){const G=new v(y.x,y.y,0);G.unproject(e.object),e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/E)),e.object.updateProjectionMatrix(),K=!0;const $=new v(y.x,y.y,0);$.unproject(e.object),e.object.position.sub($).add(G),e.object.updateMatrixWorld(),W=t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),e.zoomToCursor=!1;W!==null&&(e.screenSpacePanning?e.target.set(0,0,-1).transformDirection(e.object.matrix).multiplyScalar(W).add(e.object.position):(J.origin.copy(e.object.position),J.direction.set(0,0,-1).transformDirection(e.object.matrix),Math.abs(e.object.up.dot(J.direction))<lt?i.lookAt(e.target):(_e.setFromNormalAndCoplanarPoint(e.object.up,e.target),J.intersectPlane(_e,e.target))))}else e.object instanceof le&&e.object.isOrthographicCamera&&(K=E!==1,K&&(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/E)),e.object.updateProjectionMatrix()));return E=1,M=!1,K||p.distanceToSquared(e.object.position)>q||8*(1-I.dot(e.object.quaternion))>q?(e.dispatchEvent(P),p.copy(e.object.position),I.copy(e.object.quaternion),K=!1,!0):!1}})(),this.connect=t=>{e.domElement=t,e.domElement.style.touchAction="none",e.domElement.addEventListener("contextmenu",Oe),e.domElement.addEventListener("pointerdown",ve),e.domElement.addEventListener("pointercancel",X),e.domElement.addEventListener("wheel",Te)},this.dispose=()=>{var t,o,a,r,p,I;e.domElement&&(e.domElement.style.touchAction="auto"),(t=e.domElement)==null||t.removeEventListener("contextmenu",Oe),(o=e.domElement)==null||o.removeEventListener("pointerdown",ve),(a=e.domElement)==null||a.removeEventListener("pointercancel",X),(r=e.domElement)==null||r.removeEventListener("wheel",Te),(p=e.domElement)==null||p.ownerDocument.removeEventListener("pointermove",ae),(I=e.domElement)==null||I.ownerDocument.removeEventListener("pointerup",X),e._domElementKeyEvents!==null&&e._domElementKeyEvents.removeEventListener("keydown",ie)};const e=this,P={type:"change"},g={type:"start"},R={type:"end"},s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let u=s.NONE;const q=1e-6,d=new we,b=new we;let E=1;const N=new v,x=new T,D=new T,w=new T,_=new T,A=new T,j=new T,O=new T,m=new T,h=new T,Z=new v,y=new T;let M=!1;const l=[],B={};function Ie(){return 2*Math.PI/60/60*e.autoRotateSpeed}function k(){return Math.pow(.95,e.zoomSpeed)}function ee(t){e.reverseOrbit||e.reverseHorizontalOrbit?b.theta+=t:b.theta-=t}function ce(t){e.reverseOrbit||e.reverseVerticalOrbit?b.phi+=t:b.phi-=t}const ue=(()=>{const t=new v;return function(a,r){t.setFromMatrixColumn(r,0),t.multiplyScalar(-a),N.add(t)}})(),he=(()=>{const t=new v;return function(a,r){e.screenSpacePanning===!0?t.setFromMatrixColumn(r,1):(t.setFromMatrixColumn(r,0),t.crossVectors(e.object.up,t)),t.multiplyScalar(a),N.add(t)}})(),F=(()=>{const t=new v;return function(a,r){const p=e.domElement;if(p&&e.object instanceof re&&e.object.isPerspectiveCamera){const I=e.object.position;t.copy(I).sub(e.target);let z=t.length();z*=Math.tan(e.object.fov/2*Math.PI/180),ue(2*a*z/p.clientHeight,e.object.matrix),he(2*r*z/p.clientHeight,e.object.matrix)}else p&&e.object instanceof le&&e.object.isOrthographicCamera?(ue(a*(e.object.right-e.object.left)/e.object.zoom/p.clientWidth,e.object.matrix),he(r*(e.object.top-e.object.bottom)/e.object.zoom/p.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}})();function te(t){e.object instanceof re&&e.object.isPerspectiveCamera||e.object instanceof le&&e.object.isOrthographicCamera?E=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function Q(t){te(E/t)}function oe(t){te(E*t)}function de(t){if(!e.zoomToCursor||!e.domElement)return;M=!0;const o=e.domElement.getBoundingClientRect(),a=t.clientX-o.left,r=t.clientY-o.top,p=o.width,I=o.height;y.x=a/p*2-1,y.y=-(r/I)*2+1,Z.set(y.x,y.y,1).unproject(e.object).sub(e.object.position).normalize()}function ne(t){return Math.max(e.minDistance,Math.min(e.maxDistance,t))}function me(t){x.set(t.clientX,t.clientY)}function Se(t){de(t),O.set(t.clientX,t.clientY)}function fe(t){_.set(t.clientX,t.clientY)}function Le(t){D.set(t.clientX,t.clientY),w.subVectors(D,x).multiplyScalar(e.rotateSpeed);const o=e.domElement;o&&(ee(2*Math.PI*w.x/o.clientHeight),ce(2*Math.PI*w.y/o.clientHeight)),x.copy(D),e.update()}function Ce(t){m.set(t.clientX,t.clientY),h.subVectors(m,O),h.y>0?Q(k()):h.y<0&&oe(k()),O.copy(m),e.update()}function Re(t){A.set(t.clientX,t.clientY),j.subVectors(A,_).multiplyScalar(e.panSpeed),F(j.x,j.y),_.copy(A),e.update()}function Ne(t){de(t),t.deltaY<0?oe(k()):t.deltaY>0&&Q(k()),e.update()}function ze(t){let o=!1;switch(t.code){case e.keys.UP:F(0,e.keyPanSpeed),o=!0;break;case e.keys.BOTTOM:F(0,-e.keyPanSpeed),o=!0;break;case e.keys.LEFT:F(e.keyPanSpeed,0),o=!0;break;case e.keys.RIGHT:F(-e.keyPanSpeed,0),o=!0;break}o&&(t.preventDefault(),e.update())}function pe(){if(l.length==1)x.set(l[0].pageX,l[0].pageY);else{const t=.5*(l[0].pageX+l[1].pageX),o=.5*(l[0].pageY+l[1].pageY);x.set(t,o)}}function be(){if(l.length==1)_.set(l[0].pageX,l[0].pageY);else{const t=.5*(l[0].pageX+l[1].pageX),o=.5*(l[0].pageY+l[1].pageY);_.set(t,o)}}function ge(){const t=l[0].pageX-l[1].pageX,o=l[0].pageY-l[1].pageY,a=Math.sqrt(t*t+o*o);O.set(0,a)}function Ye(){e.enableZoom&&ge(),e.enablePan&&be()}function ke(){e.enableZoom&&ge(),e.enableRotate&&pe()}function Ee(t){if(l.length==1)D.set(t.pageX,t.pageY);else{const a=se(t),r=.5*(t.pageX+a.x),p=.5*(t.pageY+a.y);D.set(r,p)}w.subVectors(D,x).multiplyScalar(e.rotateSpeed);const o=e.domElement;o&&(ee(2*Math.PI*w.x/o.clientHeight),ce(2*Math.PI*w.y/o.clientHeight)),x.copy(D)}function Pe(t){if(l.length==1)A.set(t.pageX,t.pageY);else{const o=se(t),a=.5*(t.pageX+o.x),r=.5*(t.pageY+o.y);A.set(a,r)}j.subVectors(A,_).multiplyScalar(e.panSpeed),F(j.x,j.y),_.copy(A)}function ye(t){const o=se(t),a=t.pageX-o.x,r=t.pageY-o.y,p=Math.sqrt(a*a+r*r);m.set(0,p),h.set(0,Math.pow(m.y/O.y,e.zoomSpeed)),Q(h.y),O.copy(m)}function He(t){e.enableZoom&&ye(t),e.enablePan&&Pe(t)}function Fe(t){e.enableZoom&&ye(t),e.enableRotate&&Ee(t)}function ve(t){var o,a;e.enabled!==!1&&(l.length===0&&((o=e.domElement)==null||o.ownerDocument.addEventListener("pointermove",ae),(a=e.domElement)==null||a.ownerDocument.addEventListener("pointerup",X)),Ke(t),t.pointerType==="touch"?Ze(t):Ue(t))}function ae(t){e.enabled!==!1&&(t.pointerType==="touch"?Xe(t):Ve(t))}function X(t){var o,a,r;We(t),l.length===0&&((o=e.domElement)==null||o.releasePointerCapture(t.pointerId),(a=e.domElement)==null||a.ownerDocument.removeEventListener("pointermove",ae),(r=e.domElement)==null||r.ownerDocument.removeEventListener("pointerup",X)),e.dispatchEvent(R),u=s.NONE}function Ue(t){let o;switch(t.button){case 0:o=e.mouseButtons.LEFT;break;case 1:o=e.mouseButtons.MIDDLE;break;case 2:o=e.mouseButtons.RIGHT;break;default:o=-1}switch(o){case U.DOLLY:if(e.enableZoom===!1)return;Se(t),u=s.DOLLY;break;case U.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enablePan===!1)return;fe(t),u=s.PAN}else{if(e.enableRotate===!1)return;me(t),u=s.ROTATE}break;case U.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enableRotate===!1)return;me(t),u=s.ROTATE}else{if(e.enablePan===!1)return;fe(t),u=s.PAN}break;default:u=s.NONE}u!==s.NONE&&e.dispatchEvent(g)}function Ve(t){if(e.enabled!==!1)switch(u){case s.ROTATE:if(e.enableRotate===!1)return;Le(t);break;case s.DOLLY:if(e.enableZoom===!1)return;Ce(t);break;case s.PAN:if(e.enablePan===!1)return;Re(t);break}}function Te(t){e.enabled===!1||e.enableZoom===!1||u!==s.NONE&&u!==s.ROTATE||(t.preventDefault(),e.dispatchEvent(g),Ne(t),e.dispatchEvent(R))}function ie(t){e.enabled===!1||e.enablePan===!1||ze(t)}function Ze(t){switch(Me(t),l.length){case 1:switch(e.touches.ONE){case V.ROTATE:if(e.enableRotate===!1)return;pe(),u=s.TOUCH_ROTATE;break;case V.PAN:if(e.enablePan===!1)return;be(),u=s.TOUCH_PAN;break;default:u=s.NONE}break;case 2:switch(e.touches.TWO){case V.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Ye(),u=s.TOUCH_DOLLY_PAN;break;case V.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;ke(),u=s.TOUCH_DOLLY_ROTATE;break;default:u=s.NONE}break;default:u=s.NONE}u!==s.NONE&&e.dispatchEvent(g)}function Xe(t){switch(Me(t),u){case s.TOUCH_ROTATE:if(e.enableRotate===!1)return;Ee(t),e.update();break;case s.TOUCH_PAN:if(e.enablePan===!1)return;Pe(t),e.update();break;case s.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;He(t),e.update();break;case s.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;Fe(t),e.update();break;default:u=s.NONE}}function Oe(t){e.enabled!==!1&&t.preventDefault()}function Ke(t){l.push(t)}function We(t){delete B[t.pointerId];for(let o=0;o<l.length;o++)if(l[o].pointerId==t.pointerId){l.splice(o,1);return}}function Me(t){let o=B[t.pointerId];o===void 0&&(o=new T,B[t.pointerId]=o),o.set(t.pageX,t.pageY)}function se(t){const o=t.pointerId===l[0].pointerId?l[1]:l[0];return B[o.pointerId]}this.dollyIn=(t=k())=>{oe(t),e.update()},this.dollyOut=(t=k())=>{Q(t),e.update()},this.getScale=()=>E,this.setScale=t=>{te(t),e.update()},this.getZoomScale=()=>k(),c!==void 0&&this.connect(c),this.update()}};const ut=C.forwardRef(({makeDefault:f,camera:i,regress:c,domElement:e,enableDamping:P=!0,keyEvents:g=!1,onChange:R,onStart:s,onEnd:u,...q},d)=>{const b=Y(h=>h.invalidate),E=Y(h=>h.camera),N=Y(h=>h.gl),x=Y(h=>h.events),D=Y(h=>h.setEvents),w=Y(h=>h.set),_=Y(h=>h.get),A=Y(h=>h.performance),j=i||E,O=e||x.connected||N.domElement,m=C.useMemo(()=>new ct(j),[j]);return je(()=>{m.enabled&&m.update()},-1),C.useEffect(()=>(g&&m.connect(g===!0?O:g),m.connect(O),()=>void m.dispose()),[g,O,c,m,b]),C.useEffect(()=>{const h=M=>{b(),c&&A.regress(),R&&R(M)},Z=M=>{s&&s(M)},y=M=>{u&&u(M)};return m.addEventListener("change",h),m.addEventListener("start",Z),m.addEventListener("end",y),()=>{m.removeEventListener("start",Z),m.removeEventListener("end",y),m.removeEventListener("change",h)}},[R,s,u,m,b,D]),C.useEffect(()=>{if(f){const h=_().controls;return w({controls:m}),()=>w({controls:h})}},[f,m]),C.createElement("primitive",Ge({ref:d,object:m,enableDamping:P},q))}),ht=`
  precision mediump float;
  
  in vec3 vCol;
  
  out vec4 fCol;
  
  void main(){
    fCol = vec4(vCol, 1);
  }
`,dt=`
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
`,mt=C.memo(()=>{const f=C.useMemo(()=>({uTime:{value:0},uCount:{value:1e5}}),[]);return je((i,c)=>{f.uTime.value+=c}),H.jsxs("mesh",{children:[H.jsx("instancedBufferGeometry",{instanceCount:f.uCount.value,drawRange:{start:0,count:3}}),H.jsx("shaderMaterial",{side:Qe,glslVersion:$e,uniforms:f,fragmentShader:ht,vertexShader:dt})]})}),Pt=C.memo(()=>H.jsx("div",{className:tt.fixedContainer,children:H.jsxs(Je,{camera:{position:[0,0,10]},scene:{background:new et("#262626")},children:[H.jsx(mt,{}),H.jsx(ut,{minDistance:5,maxDistance:20})]})}));export{Pt as Sun};
