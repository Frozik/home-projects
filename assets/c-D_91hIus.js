import{r as C,F as Ge,M as F}from"./e-Bikn-kL0.js";import{Q as De,P as re,V as T,O as le,S as we,a as O,M as U,T as V,R as qe,b as Be,u as Y,c as je,D as Qe,G as $e,C as Je,d as et}from"./c-DRfVzuQC.js";import{c as tt}from"./c-CCiIKx5L.js";var nt=Object.defineProperty,ot=(m,i,c)=>i in m?nt(m,i,{enumerable:!0,configurable:!0,writable:!0,value:c}):m[i]=c,at=(m,i,c)=>(ot(m,i+"",c),c);class it{constructor(){at(this,"_listeners")}addEventListener(i,c){this._listeners===void 0&&(this._listeners={});const e=this._listeners;e[i]===void 0&&(e[i]=[]),e[i].indexOf(c)===-1&&e[i].push(c)}hasEventListener(i,c){if(this._listeners===void 0)return!1;const e=this._listeners;return e[i]!==void 0&&e[i].indexOf(c)!==-1}removeEventListener(i,c){if(this._listeners===void 0)return;const P=this._listeners[i];if(P!==void 0){const g=P.indexOf(c);g!==-1&&P.splice(g,1)}}dispatchEvent(i){if(this._listeners===void 0)return;const e=this._listeners[i.type];if(e!==void 0){i.target=this;const P=e.slice(0);for(let g=0,R=P.length;g<R;g++)P[g].call(this,i);i.target=null}}}var st=Object.defineProperty,rt=(m,i,c)=>i in m?st(m,i,{enumerable:!0,configurable:!0,writable:!0,value:c}):m[i]=c,o=(m,i,c)=>(rt(m,typeof i!="symbol"?i+"":i,c),c);const J=new qe,_e=new Be,lt=Math.cos(70*(Math.PI/180)),Ae=(m,i)=>(m%i+i)%i;let ct=class extends it{constructor(i,c){super(),o(this,"object"),o(this,"domElement"),o(this,"enabled",!0),o(this,"target",new T),o(this,"minDistance",0),o(this,"maxDistance",1/0),o(this,"minZoom",0),o(this,"maxZoom",1/0),o(this,"minPolarAngle",0),o(this,"maxPolarAngle",Math.PI),o(this,"minAzimuthAngle",-1/0),o(this,"maxAzimuthAngle",1/0),o(this,"enableDamping",!1),o(this,"dampingFactor",.05),o(this,"enableZoom",!0),o(this,"zoomSpeed",1),o(this,"enableRotate",!0),o(this,"rotateSpeed",1),o(this,"enablePan",!0),o(this,"panSpeed",1),o(this,"screenSpacePanning",!0),o(this,"keyPanSpeed",7),o(this,"zoomToCursor",!1),o(this,"autoRotate",!1),o(this,"autoRotateSpeed",2),o(this,"reverseOrbit",!1),o(this,"reverseHorizontalOrbit",!1),o(this,"reverseVerticalOrbit",!1),o(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),o(this,"mouseButtons",{LEFT:U.ROTATE,MIDDLE:U.DOLLY,RIGHT:U.PAN}),o(this,"touches",{ONE:V.ROTATE,TWO:V.DOLLY_PAN}),o(this,"target0"),o(this,"position0"),o(this,"zoom0"),o(this,"_domElementKeyEvents",null),o(this,"getPolarAngle"),o(this,"getAzimuthalAngle"),o(this,"setPolarAngle"),o(this,"setAzimuthalAngle"),o(this,"getDistance"),o(this,"getZoomScale"),o(this,"listenToKeyEvents"),o(this,"stopListenToKeyEvents"),o(this,"saveState"),o(this,"reset"),o(this,"update"),o(this,"connect"),o(this,"dispose"),o(this,"dollyIn"),o(this,"dollyOut"),o(this,"getScale"),o(this,"setScale"),this.object=i,this.domElement=c,this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.getPolarAngle=()=>f.phi,this.getAzimuthalAngle=()=>f.theta,this.setPolarAngle=t=>{let n=Ae(t,2*Math.PI),a=f.phi;a<0&&(a+=2*Math.PI),n<0&&(n+=2*Math.PI);let r=Math.abs(n-a);2*Math.PI-r<r&&(n<a?n+=2*Math.PI:a+=2*Math.PI),b.phi=n-a,e.update()},this.setAzimuthalAngle=t=>{let n=Ae(t,2*Math.PI),a=f.theta;a<0&&(a+=2*Math.PI),n<0&&(n+=2*Math.PI);let r=Math.abs(n-a);2*Math.PI-r<r&&(n<a?n+=2*Math.PI:a+=2*Math.PI),b.theta=n-a,e.update()},this.getDistance=()=>e.object.position.distanceTo(e.target),this.listenToKeyEvents=t=>{t.addEventListener("keydown",ie),this._domElementKeyEvents=t},this.stopListenToKeyEvents=()=>{this._domElementKeyEvents.removeEventListener("keydown",ie),this._domElementKeyEvents=null},this.saveState=()=>{e.target0.copy(e.target),e.position0.copy(e.object.position),e.zoom0=e.object.zoom},this.reset=()=>{e.target.copy(e.target0),e.object.position.copy(e.position0),e.object.zoom=e.zoom0,e.object.updateProjectionMatrix(),e.dispatchEvent(P),e.update(),u=s.NONE},this.update=(()=>{const t=new T,n=new T(0,1,0),a=new De().setFromUnitVectors(i.up,n),r=a.clone().invert(),p=new T,I=new De,z=2*Math.PI;return function(){const xe=e.object.position;a.setFromUnitVectors(i.up,n),r.copy(a).invert(),t.copy(xe).sub(e.target),t.applyQuaternion(a),f.setFromVector3(t),e.autoRotate&&u===s.NONE&&ee(Ie()),e.enableDamping?(f.theta+=b.theta*e.dampingFactor,f.phi+=b.phi*e.dampingFactor):(f.theta+=b.theta,f.phi+=b.phi);let S=e.minAzimuthAngle,L=e.maxAzimuthAngle;isFinite(S)&&isFinite(L)&&(S<-Math.PI?S+=z:S>Math.PI&&(S-=z),L<-Math.PI?L+=z:L>Math.PI&&(L-=z),S<=L?f.theta=Math.max(S,Math.min(L,f.theta)):f.theta=f.theta>(S+L)/2?Math.max(S,f.theta):Math.min(L,f.theta)),f.phi=Math.max(e.minPolarAngle,Math.min(e.maxPolarAngle,f.phi)),f.makeSafe(),e.enableDamping===!0?e.target.addScaledVector(N,e.dampingFactor):e.target.add(N),e.zoomToCursor&&M||e.object.isOrthographicCamera?f.radius=oe(f.radius):f.radius=oe(f.radius*E),t.setFromSpherical(f),t.applyQuaternion(r),xe.copy(e.target).add(t),e.object.matrixAutoUpdate||e.object.updateMatrix(),e.object.lookAt(e.target),e.enableDamping===!0?(b.theta*=1-e.dampingFactor,b.phi*=1-e.dampingFactor,N.multiplyScalar(1-e.dampingFactor)):(b.set(0,0,0),N.set(0,0,0));let K=!1;if(e.zoomToCursor&&M){let W=null;if(e.object instanceof re&&e.object.isPerspectiveCamera){const G=t.length();W=oe(G*E);const $=G-W;e.object.position.addScaledVector(Z,$),e.object.updateMatrixWorld()}else if(e.object.isOrthographicCamera){const G=new T(y.x,y.y,0);G.unproject(e.object),e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/E)),e.object.updateProjectionMatrix(),K=!0;const $=new T(y.x,y.y,0);$.unproject(e.object),e.object.position.sub($).add(G),e.object.updateMatrixWorld(),W=t.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),e.zoomToCursor=!1;W!==null&&(e.screenSpacePanning?e.target.set(0,0,-1).transformDirection(e.object.matrix).multiplyScalar(W).add(e.object.position):(J.origin.copy(e.object.position),J.direction.set(0,0,-1).transformDirection(e.object.matrix),Math.abs(e.object.up.dot(J.direction))<lt?i.lookAt(e.target):(_e.setFromNormalAndCoplanarPoint(e.object.up,e.target),J.intersectPlane(_e,e.target))))}else e.object instanceof le&&e.object.isOrthographicCamera&&(K=E!==1,K&&(e.object.zoom=Math.max(e.minZoom,Math.min(e.maxZoom,e.object.zoom/E)),e.object.updateProjectionMatrix()));return E=1,M=!1,K||p.distanceToSquared(e.object.position)>q||8*(1-I.dot(e.object.quaternion))>q?(e.dispatchEvent(P),p.copy(e.object.position),I.copy(e.object.quaternion),K=!1,!0):!1}})(),this.connect=t=>{e.domElement=t,e.domElement.style.touchAction="none",e.domElement.addEventListener("contextmenu",ve),e.domElement.addEventListener("pointerdown",Te),e.domElement.addEventListener("pointercancel",X),e.domElement.addEventListener("wheel",Oe)},this.dispose=()=>{var t,n,a,r,p,I;e.domElement&&(e.domElement.style.touchAction="auto"),(t=e.domElement)==null||t.removeEventListener("contextmenu",ve),(n=e.domElement)==null||n.removeEventListener("pointerdown",Te),(a=e.domElement)==null||a.removeEventListener("pointercancel",X),(r=e.domElement)==null||r.removeEventListener("wheel",Oe),(p=e.domElement)==null||p.ownerDocument.removeEventListener("pointermove",ae),(I=e.domElement)==null||I.ownerDocument.removeEventListener("pointerup",X),e._domElementKeyEvents!==null&&e._domElementKeyEvents.removeEventListener("keydown",ie)};const e=this,P={type:"change"},g={type:"start"},R={type:"end"},s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let u=s.NONE;const q=1e-6,f=new we,b=new we;let E=1;const N=new T,x=new O,D=new O,w=new O,_=new O,A=new O,j=new O,v=new O,h=new O,d=new O,Z=new T,y=new O;let M=!1;const l=[],B={};function Ie(){return 2*Math.PI/60/60*e.autoRotateSpeed}function k(){return Math.pow(.95,e.zoomSpeed)}function ee(t){e.reverseOrbit||e.reverseHorizontalOrbit?b.theta+=t:b.theta-=t}function ce(t){e.reverseOrbit||e.reverseVerticalOrbit?b.phi+=t:b.phi-=t}const ue=(()=>{const t=new T;return function(a,r){t.setFromMatrixColumn(r,0),t.multiplyScalar(-a),N.add(t)}})(),de=(()=>{const t=new T;return function(a,r){e.screenSpacePanning===!0?t.setFromMatrixColumn(r,1):(t.setFromMatrixColumn(r,0),t.crossVectors(e.object.up,t)),t.multiplyScalar(a),N.add(t)}})(),H=(()=>{const t=new T;return function(a,r){const p=e.domElement;if(p&&e.object instanceof re&&e.object.isPerspectiveCamera){const I=e.object.position;t.copy(I).sub(e.target);let z=t.length();z*=Math.tan(e.object.fov/2*Math.PI/180),ue(2*a*z/p.clientHeight,e.object.matrix),de(2*r*z/p.clientHeight,e.object.matrix)}else p&&e.object instanceof le&&e.object.isOrthographicCamera?(ue(a*(e.object.right-e.object.left)/e.object.zoom/p.clientWidth,e.object.matrix),de(r*(e.object.top-e.object.bottom)/e.object.zoom/p.clientHeight,e.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),e.enablePan=!1)}})();function te(t){e.object instanceof re&&e.object.isPerspectiveCamera||e.object instanceof le&&e.object.isOrthographicCamera?E=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),e.enableZoom=!1)}function Q(t){te(E/t)}function ne(t){te(E*t)}function fe(t){if(!e.zoomToCursor||!e.domElement)return;M=!0;const n=e.domElement.getBoundingClientRect(),a=t.clientX-n.left,r=t.clientY-n.top,p=n.width,I=n.height;y.x=a/p*2-1,y.y=-(r/I)*2+1,Z.set(y.x,y.y,1).unproject(e.object).sub(e.object.position).normalize()}function oe(t){return Math.max(e.minDistance,Math.min(e.maxDistance,t))}function he(t){x.set(t.clientX,t.clientY)}function Se(t){fe(t),v.set(t.clientX,t.clientY)}function me(t){_.set(t.clientX,t.clientY)}function Le(t){D.set(t.clientX,t.clientY),w.subVectors(D,x).multiplyScalar(e.rotateSpeed);const n=e.domElement;n&&(ee(2*Math.PI*w.x/n.clientHeight),ce(2*Math.PI*w.y/n.clientHeight)),x.copy(D),e.update()}function Ce(t){h.set(t.clientX,t.clientY),d.subVectors(h,v),d.y>0?Q(k()):d.y<0&&ne(k()),v.copy(h),e.update()}function Re(t){A.set(t.clientX,t.clientY),j.subVectors(A,_).multiplyScalar(e.panSpeed),H(j.x,j.y),_.copy(A),e.update()}function Ne(t){fe(t),t.deltaY<0?ne(k()):t.deltaY>0&&Q(k()),e.update()}function ze(t){let n=!1;switch(t.code){case e.keys.UP:H(0,e.keyPanSpeed),n=!0;break;case e.keys.BOTTOM:H(0,-e.keyPanSpeed),n=!0;break;case e.keys.LEFT:H(e.keyPanSpeed,0),n=!0;break;case e.keys.RIGHT:H(-e.keyPanSpeed,0),n=!0;break}n&&(t.preventDefault(),e.update())}function pe(){if(l.length==1)x.set(l[0].pageX,l[0].pageY);else{const t=.5*(l[0].pageX+l[1].pageX),n=.5*(l[0].pageY+l[1].pageY);x.set(t,n)}}function be(){if(l.length==1)_.set(l[0].pageX,l[0].pageY);else{const t=.5*(l[0].pageX+l[1].pageX),n=.5*(l[0].pageY+l[1].pageY);_.set(t,n)}}function ge(){const t=l[0].pageX-l[1].pageX,n=l[0].pageY-l[1].pageY,a=Math.sqrt(t*t+n*n);v.set(0,a)}function Ye(){e.enableZoom&&ge(),e.enablePan&&be()}function ke(){e.enableZoom&&ge(),e.enableRotate&&pe()}function Ee(t){if(l.length==1)D.set(t.pageX,t.pageY);else{const a=se(t),r=.5*(t.pageX+a.x),p=.5*(t.pageY+a.y);D.set(r,p)}w.subVectors(D,x).multiplyScalar(e.rotateSpeed);const n=e.domElement;n&&(ee(2*Math.PI*w.x/n.clientHeight),ce(2*Math.PI*w.y/n.clientHeight)),x.copy(D)}function Pe(t){if(l.length==1)A.set(t.pageX,t.pageY);else{const n=se(t),a=.5*(t.pageX+n.x),r=.5*(t.pageY+n.y);A.set(a,r)}j.subVectors(A,_).multiplyScalar(e.panSpeed),H(j.x,j.y),_.copy(A)}function ye(t){const n=se(t),a=t.pageX-n.x,r=t.pageY-n.y,p=Math.sqrt(a*a+r*r);h.set(0,p),d.set(0,Math.pow(h.y/v.y,e.zoomSpeed)),Q(d.y),v.copy(h)}function Fe(t){e.enableZoom&&ye(t),e.enablePan&&Pe(t)}function He(t){e.enableZoom&&ye(t),e.enableRotate&&Ee(t)}function Te(t){var n,a;e.enabled!==!1&&(l.length===0&&((n=e.domElement)==null||n.ownerDocument.addEventListener("pointermove",ae),(a=e.domElement)==null||a.ownerDocument.addEventListener("pointerup",X)),Ke(t),t.pointerType==="touch"?Ze(t):Ue(t))}function ae(t){e.enabled!==!1&&(t.pointerType==="touch"?Xe(t):Ve(t))}function X(t){var n,a,r;We(t),l.length===0&&((n=e.domElement)==null||n.releasePointerCapture(t.pointerId),(a=e.domElement)==null||a.ownerDocument.removeEventListener("pointermove",ae),(r=e.domElement)==null||r.ownerDocument.removeEventListener("pointerup",X)),e.dispatchEvent(R),u=s.NONE}function Ue(t){let n;switch(t.button){case 0:n=e.mouseButtons.LEFT;break;case 1:n=e.mouseButtons.MIDDLE;break;case 2:n=e.mouseButtons.RIGHT;break;default:n=-1}switch(n){case U.DOLLY:if(e.enableZoom===!1)return;Se(t),u=s.DOLLY;break;case U.ROTATE:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enablePan===!1)return;me(t),u=s.PAN}else{if(e.enableRotate===!1)return;he(t),u=s.ROTATE}break;case U.PAN:if(t.ctrlKey||t.metaKey||t.shiftKey){if(e.enableRotate===!1)return;he(t),u=s.ROTATE}else{if(e.enablePan===!1)return;me(t),u=s.PAN}break;default:u=s.NONE}u!==s.NONE&&e.dispatchEvent(g)}function Ve(t){if(e.enabled!==!1)switch(u){case s.ROTATE:if(e.enableRotate===!1)return;Le(t);break;case s.DOLLY:if(e.enableZoom===!1)return;Ce(t);break;case s.PAN:if(e.enablePan===!1)return;Re(t);break}}function Oe(t){e.enabled===!1||e.enableZoom===!1||u!==s.NONE&&u!==s.ROTATE||(t.preventDefault(),e.dispatchEvent(g),Ne(t),e.dispatchEvent(R))}function ie(t){e.enabled===!1||e.enablePan===!1||ze(t)}function Ze(t){switch(Me(t),l.length){case 1:switch(e.touches.ONE){case V.ROTATE:if(e.enableRotate===!1)return;pe(),u=s.TOUCH_ROTATE;break;case V.PAN:if(e.enablePan===!1)return;be(),u=s.TOUCH_PAN;break;default:u=s.NONE}break;case 2:switch(e.touches.TWO){case V.DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Ye(),u=s.TOUCH_DOLLY_PAN;break;case V.DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;ke(),u=s.TOUCH_DOLLY_ROTATE;break;default:u=s.NONE}break;default:u=s.NONE}u!==s.NONE&&e.dispatchEvent(g)}function Xe(t){switch(Me(t),u){case s.TOUCH_ROTATE:if(e.enableRotate===!1)return;Ee(t),e.update();break;case s.TOUCH_PAN:if(e.enablePan===!1)return;Pe(t),e.update();break;case s.TOUCH_DOLLY_PAN:if(e.enableZoom===!1&&e.enablePan===!1)return;Fe(t),e.update();break;case s.TOUCH_DOLLY_ROTATE:if(e.enableZoom===!1&&e.enableRotate===!1)return;He(t),e.update();break;default:u=s.NONE}}function ve(t){e.enabled!==!1&&t.preventDefault()}function Ke(t){l.push(t)}function We(t){delete B[t.pointerId];for(let n=0;n<l.length;n++)if(l[n].pointerId==t.pointerId){l.splice(n,1);return}}function Me(t){let n=B[t.pointerId];n===void 0&&(n=new O,B[t.pointerId]=n),n.set(t.pageX,t.pageY)}function se(t){const n=t.pointerId===l[0].pointerId?l[1]:l[0];return B[n.pointerId]}this.dollyIn=(t=k())=>{ne(t),e.update()},this.dollyOut=(t=k())=>{Q(t),e.update()},this.getScale=()=>E,this.setScale=t=>{te(t),e.update()},this.getZoomScale=()=>k(),c!==void 0&&this.connect(c),this.update()}};const ut=C.forwardRef(({makeDefault:m,camera:i,regress:c,domElement:e,enableDamping:P=!0,keyEvents:g=!1,onChange:R,onStart:s,onEnd:u,...q},f)=>{const b=Y(d=>d.invalidate),E=Y(d=>d.camera),N=Y(d=>d.gl),x=Y(d=>d.events),D=Y(d=>d.setEvents),w=Y(d=>d.set),_=Y(d=>d.get),A=Y(d=>d.performance),j=i||E,v=e||x.connected||N.domElement,h=C.useMemo(()=>new ct(j),[j]);return je(()=>{h.enabled&&h.update()},-1),C.useEffect(()=>(g&&h.connect(g===!0?v:g),h.connect(v),()=>void h.dispose()),[g,v,c,h,b]),C.useEffect(()=>{const d=M=>{b(),c&&A.regress(),R&&R(M)},Z=M=>{s&&s(M)},y=M=>{u&&u(M)};return h.addEventListener("change",d),h.addEventListener("start",Z),h.addEventListener("end",y),()=>{h.removeEventListener("start",Z),h.removeEventListener("end",y),h.removeEventListener("change",d)}},[R,s,u,h,b,D]),C.useEffect(()=>{if(m){const d=_().controls;return w({controls:h}),()=>w({controls:d})}},[m,h]),C.createElement("primitive",Ge({ref:f,object:h,enableDamping:P},q))}),dt=`
  precision mediump float;
  
  in vec3 vCol;
  
  out vec4 fCol;
  
  void main(){
    fCol = vec4(vCol, 1);
  }
`,ft=`
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
`,ht=C.memo(()=>{const m=C.useMemo(()=>({uTime:{value:0},uCount:{value:1e5}}),[]);return je((i,c)=>{m.uTime.value+=c}),F.jsxs("mesh",{children:[F.jsx("instancedBufferGeometry",{instanceCount:m.uCount.value,drawRange:{start:0,count:3}}),F.jsx("shaderMaterial",{side:Qe,glslVersion:$e,uniforms:m,fragmentShader:dt,vertexShader:ft})]})}),Pt=C.memo(()=>F.jsx("div",{className:tt.fixedContainer,children:F.jsxs(Je,{camera:{position:[0,0,10]},scene:{background:new et("#262626")},children:[F.jsx(ht,{}),F.jsx(ut,{minDistance:5,maxDistance:20})]})}));export{Pt as Sun};
