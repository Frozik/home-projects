const LINE_DRAWING_VERTEX_SHADER = `
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
  
  void drawLineWithJoins(mat4 resultMatrix, vec2 pointA, vec2 pointB, float widthA, float widthB, vec4 colorA, vec4 colorB, bool hasConnectedJoin) {
    if (gl_VertexID < 6) {
      drawJoin(resultMatrix, pointA, widthA, colorA, 0);
    } else if (gl_VertexID < 12) {
      drawJoin(resultMatrix, pointB, widthB, colorB, 6);
    } else if (gl_VertexID < 18) {
      drawLine(resultMatrix, pointA, pointB, widthA, widthB, colorA, colorB, 12);
    }
  }
`;

export const CHARTS_FRAGMENT_SHADER = `
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
`;

export const SIN_VERTEX_SHADER = `
  uniform float uTime;
  uniform float uCount;
  uniform vec2 uSize;
  uniform vec2 uPenSize;
  
  ${LINE_DRAWING_VERTEX_SHADER}
  
  vec2 getUVPoint(int offset) {
    float x = (float(gl_InstanceID + offset) / uCount - 0.5) * 2.;
  
    return vec2(x, sin(x * 10. * PI + uTime));
  }
  
  vec2 getPoint(vec2 uvPoint) {
    return vec2(uvPoint.x * uSize.x / 2., uvPoint.y * uSize.y / 2.);
  }
  
  vec4 getPointColor(vec2 uvPoint) {
    return vec4(0., (uvPoint.x + 1.) / 2., (uvPoint.y + 1.) / 2., 1.);
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
    
    drawLineWithJoins(resultMatrix, pointA, pointB, widthA, widthB, colorA, colorB, gl_InstanceID == 0);
  }
`;

export const SEGMENT_VERTEX_SHADER = `
  uniform vec2 uSize;
  uniform vec2 uPenSize;
  uniform float uOpacity;
  
  ${LINE_DRAWING_VERTEX_SHADER}
  
  void main(){
    mat4 resultMatrix = projectionMatrix * modelViewMatrix;
    
    vec2 pointA = vec2(-uSize.x / 2., uSize.y / 2.);
    vec2 pointB = vec2(uSize.x / 2., -uSize.y / 2.);
    float widthA = uPenSize.x;
    float widthB = uPenSize.y;
    vec4 colorA = vec4(0., 1., 0., uOpacity);
    vec4 colorB = vec4(1., 0., 0., uOpacity);
    
    drawLineWithJoins(resultMatrix, pointA, pointB, widthA, widthB, colorA, colorB, gl_InstanceID == 0);
  }
`;
