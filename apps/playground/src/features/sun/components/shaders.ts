export const SUN_FRAGMENT_SHADER = `
  precision mediump float;
  
  in vec3 vCol;
  
  out vec4 fCol;
  
  void main(){
    fCol = vec4(vCol, 1);
  }
`;

export const SUN_VERTEX_SHADER = `
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

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    
    vCol = neonGradient(0.6 + sinVal * 0.4);
  }
`;
