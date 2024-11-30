import{r as n,L as t,i as f}from"./e-CIfyzysY.js";import{c as s,D as u,G as v,O as x,C as h,d as m}from"./c-C4G7OoPy.js";import{u as w}from"./c-CznU7xa-.js";import{c as B}from"./c-CCiIKx5L.js";const l=`
  #define PI 3.1415926535

  out vec4 vColor;
  out float fJoinWidth;
  out vec2 vJoinCenter;

  const vec2[6] rectVertexBasis = vec2[6](
      vec2(0.0, -0.5),
      vec2(1.0, -0.5),
      vec2(1.0, 0.5),
      vec2(0.0, -0.5),
      vec2(1.0, 0.5),
      vec2(0.0, 0.5)
  );

  vec2 computeRectVertexPosition(vec2 pointA, vec2 pointB, float widthA, float widthB, vec2 basis) {
      vec2 xBasis = pointB - pointA;
      vec2 yBasis = (basis.x == 0. ? widthA : widthB) * normalize(vec2(-xBasis.y, xBasis.x));

      return pointA + xBasis * basis.x + yBasis * basis.y;
  }
  
  const vec2[6] joinVertexBasis = vec2[6](
      vec2(-0.5, -0.5),
      vec2(0.5, 0.5),
      vec2(-0.5, 0.5),
      vec2(-0.5, -0.5),
      vec2(0.5, 0.5),
      vec2(0.5, -0.5)
  );
  
  void drawJoin(mat4 resultMatrix, vec2 point, float width, vec4 color, int offsetIndex) {
      vJoinCenter = joinVertexBasis[gl_VertexID - offsetIndex];
      fJoinWidth = width;
      vColor = color;
      
      vec2 offset = vJoinCenter * width;

      gl_Position = resultMatrix * vec4(point + offset, 0., 1.);
  }
  
  void drawLine(mat4 resultMatrix, vec2 pointA, vec2 pointB, float widthA, float widthB, vec4 colorA, vec4 colorB, int offsetIndex) {
    vec2 rectBasis = rectVertexBasis[gl_VertexID - offsetIndex];
    vec2 vertexPosition = computeRectVertexPosition(pointA, pointB, widthA, widthB, rectBasis);  

    vJoinCenter = vec2(0., 0.);
    fJoinWidth = 0.;
    vColor = rectBasis.x == 0. ? colorA : colorB;

    gl_Position = resultMatrix * vec4(vertexPosition, 0., 1.);
  }
  
  void drawLineWithJoins(mat4 resultMatrix, vec2 pointA, vec2 pointB, float widthA, float widthB, vec4 colorA, vec4 colorB) {
    if (gl_VertexID < 6) {
      drawJoin(resultMatrix, pointA, widthA, colorA, 0);
    } else if (gl_VertexID < 12) {
      drawJoin(resultMatrix, pointB, widthB, colorB, 6);
    } else if (gl_VertexID < 18) {
      drawLine(resultMatrix, pointA, pointB, widthA, widthB, colorA, colorB, 12);
    }
  }
`,d=`
  precision mediump float;
  
  in vec4 vColor;
  in float fJoinWidth;
  in vec2 vJoinCenter;
  in float fCenter;
  
  out vec4 fColor;

  void main() {
    if (fJoinWidth > 0. && dot(vJoinCenter, vJoinCenter) > 0.25) {
      discard;
    }

    fColor = vColor;
  }
`,A=`
  uniform float uTime;
  uniform float uCount;
  uniform vec2 uSize;
  uniform vec2 uPenSize;
  
  ${l}
  
  vec2 getUVPoint(int offset) {
    float index = float(gl_InstanceID + offset); 
  
    float x = (index / uCount - 0.5) * 2.;
    float y = sin(x * 0.5 * PI + uTime);
    
    return vec2(x, mod(index + 1., 4.) > 1. ? y : -y);
  }
  
  vec2 getPoint(vec2 uvPoint) {
    return vec2(uvPoint.x * uSize.x / 2., uvPoint.y * uSize.y / 2.);
  }
  
  vec4 getPointColor(vec2 uvPoint) {
    return vec4(0.5, (uvPoint.x + 1.) / 2., (uvPoint.y + 1.) / 2., 1.);
  }

  float getWidth(int offset) {
    float index = float(gl_InstanceID + offset);

    return uPenSize.x + (index / uCount) * uPenSize.y;
  }
  
  void main(){
    mat4 resultMatrix = projectionMatrix * modelViewMatrix;
    
    vec2 uvPointA = getUVPoint(0);
    vec2 uvPointB = getUVPoint(1);
    
    vec2 pointA = getPoint(uvPointA);
    vec2 pointB = getPoint(uvPointB);
    float widthA = getWidth(0);
    float widthB = getWidth(1);
    vec4 colorA = getPointColor(uvPointA);
    vec4 colorB = getPointColor(uvPointB);
    
    drawLineWithJoins(resultMatrix, pointA, pointB, widthA, widthB, colorA, colorB);
  }
`,P=`
  uniform vec2 uSize;
  
  ${l}

  vec3 getUVPoint(int offset) {
    int index = gl_InstanceID + offset;
    
    if (index == 0) {
      return vec3(-1., -1., 4.);
    }
    
    if (index == 1) {
      return vec3(1., -1., 16.);
    }
    
    if (index == 2) {
      return vec3(1., 1., 4.);
    }
    
    if (index == 3) {
      return vec3(-1., 1., 16.);
    }
    
    if (index == 4) {
      return vec3(-1., -1., 4.);
    }
  }
  
  vec4 getColor(int offset) {
    int index = gl_InstanceID + offset;
    
    if (index == 0) {
      return vec4(0., 0.5, 1., 1.);
    }
    
    if (index == 1) {
      return vec4(0.5, 1., 0., 1.);
    }
    
    if (index == 2) {
      return vec4(1., 0.5, 0., 1.);
    }
    
    if (index == 3) {
      return vec4(1., 0., 0.5, 1.);
    }
    
    if (index == 4) {
      return vec4(0., 0.5, 1., 1.);
    }
  }
  
  void main(){
    mat4 resultMatrix = projectionMatrix * modelViewMatrix;

    vec3 uvPointA = getUVPoint(0);
    vec3 uvPointB = getUVPoint(1);
    
    vec2 pointA = uvPointA.xy * (uSize / 2.);
    vec2 pointB = uvPointB.xy * (uSize / 2.);
    float widthA = uvPointA.z;
    float widthB = uvPointB.z;
    vec4 colorA = getColor(0);
    vec4 colorB = getColor(1);
    
    drawLineWithJoins(resultMatrix, pointA, pointB, widthA, widthB, colorA, colorB);
  }
`,p=n.memo(()=>{const e=n.useMemo(()=>({uCount:{value:4},uSize:{value:new Float32Array([window.innerWidth,window.innerHeight])}}),[]);return s(({viewport:i})=>{e.uSize.value[0]=Math.max(0,i.width-20),e.uSize.value[1]=Math.max(0,i.height-20)}),t.jsxs("mesh",{children:[t.jsx("instancedBufferGeometry",{instanceCount:e.uCount.value,drawRange:{start:0,count:6*3}}),t.jsx("shaderMaterial",{side:u,glslVersion:v,uniforms:e,fragmentShader:d,vertexShader:P})]})}),g=n.memo(()=>{const e=n.useMemo(()=>({uTime:{value:0},uCount:{value:1},uSize:{value:new Float32Array([window.innerWidth,window.innerHeight])},uPenSize:{value:new Float32Array([2,20])}}),[]),i=n.useRef(null);return s((r,o)=>{e.uTime.value+=o,e.uSize.value[0]=r.viewport.width-4*e.uPenSize.value[1],e.uSize.value[1]=r.viewport.height-4*e.uPenSize.value[1],e.uCount.value=Math.trunc(r.viewport.width/e.uPenSize.value[1]/4)*4+1,f(i.current)||(i.current.instanceCount=e.uCount.value)}),t.jsxs("mesh",{children:[t.jsx("instancedBufferGeometry",{ref:i,instanceCount:e.uCount.value,drawRange:{start:0,count:6*3}}),t.jsx("shaderMaterial",{side:u,glslVersion:v,uniforms:e,fragmentShader:d,vertexShader:A})]})}),z=n.memo(()=>{const e=n.useRef(null),{width:i=0,height:r=0}=w({ref:e,box:"border-box"}),o=n.useMemo(()=>new x(0,0,0,0,-1e3,1e3),[]);return n.useEffect(()=>{const a=i/2,c=r/2;o.left=-a,o.right=a,o.top=c,o.bottom=-c,o.updateProjectionMatrix()},[o,i,r]),t.jsx("div",{ref:e,className:B.fixedContainer,children:t.jsxs(h,{orthographic:!0,camera:o,scene:{background:new m("#262626")},children:[t.jsx(p,{}),t.jsx(g,{})]})})});export{z as Charts};
