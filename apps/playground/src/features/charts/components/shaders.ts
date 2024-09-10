export const CHARTS_FRAGMENT_SHADER = `
  precision mediump float;
  
  in vec4 vColor;
  in float fJoinWidth;
  in vec2 vJoinCenter;
  
  out vec4 fColor;

  // https://webgl2fundamentals.org/webgl/lessons/webgl-qna-the-fastest-way-to-draw-many-circles.html
  float circle(vec2 dist) {
      return 1.0 - smoothstep(0.99, 1.01, dot(dist, dist) * 4.0);
  }
  
  void main() {
    if (fJoinWidth > 0. && circle(vJoinCenter) < 0.5) {
      discard;
    }

    fColor = vColor;
  }
`;

export const SUN_VERTEX_SHADER = `
  uniform float uTime;
  uniform float uCount;
  uniform vec2 uSize;
  uniform float uScale;
  uniform vec2 uPenSize;
  
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
      // what happen here - https://wwwtyro.net/2019/11/18/instanced-lines.html
      vec2 xBasis = pointB - pointA;
      vec2 yBasis = (widthA * (1.0 - basis.x) + widthB * basis.x) * normalize(vec2(-xBasis.y, xBasis.x));

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
  
  void drawJoin(mat4 resultMatrix, vec2 point, float width, vec3 color, int offsetIndex) {
      vJoinCenter = joinVertexBasis[gl_VertexID - offsetIndex];
      fJoinWidth = width;
      vColor = vec4(color, 1.);
      
      vec2 offset = vJoinCenter * width;

      gl_Position = resultMatrix * vec4(point + offset, 0., 1.);
  }
  
  void drawLine(mat4 resultMatrix, vec2 pointA, vec2 pointB, float widthA, float widthB, vec3 colorA, vec3 colorB, int offsetIndex) {
    vec2 rectBasis = rectVertexBasis[gl_VertexID - offsetIndex];
    vec2 vertexPosition = computeRectVertexPosition(pointA, pointB, widthA, widthB, rectBasis);  

    vJoinCenter = vec2(0., 0.);
    fJoinWidth = 0.;
    vColor = vec4((colorA * (1.0 - rectBasis.x) + colorB * rectBasis.x), 1.);

    gl_Position = resultMatrix * vec4(vertexPosition, 0., 1.);
  }
  
  void drawLineWithJoins(mat4 resultMatrix, vec2 pointA, vec2 pointB, float widthA, float widthB, vec3 colorA, vec3 colorB, bool hasConnectedJoin) {
    if (gl_VertexID < 6) {
      drawJoin(resultMatrix, pointA, widthA, colorA, 0);
    } else if (gl_VertexID < 12) {
      drawJoin(resultMatrix, pointB, widthB, colorB, 6);
    } else if (gl_VertexID < 18) {
      drawLine(resultMatrix, pointA, pointB, widthA, widthB, colorA, colorB, 12);
    }
  }
  
  vec2 getPoint(int offset) {
    float index = float(gl_InstanceID + offset);
    
    return vec2((uSize.x / uCount) * index - uSize.x / 2., sin(index * 10. * PI / uCount) * uSize.y / 2.);
  }
  
  vec3 getPointColor(vec2 point) {
    return vec3(0., (point.y / uSize.y) + 0.5, (point.x + uSize.x / 2.) / uSize.x);
  }

  float getWidth(int offset) {
    float index = float(gl_InstanceID + offset);

    return uPenSize.x + (index / uCount) * uPenSize.y;
  }
  
  void main(){
    mat4 resultMatrix = projectionMatrix * modelViewMatrix;
    
    float scale = 1. + abs(sin(uTime) * (uScale - 1.));
    
    vec2 originalPointA = getPoint(0);
    vec2 originalPointB = getPoint(1);
    
    vec2 pointA = originalPointA * scale;
    vec2 pointB = originalPointB * scale;
    float widthA = getWidth(0);
    float widthB = getWidth(1);
    vec3 colorA = getPointColor(originalPointA);
    vec3 colorB = getPointColor(originalPointB);
    
    drawLineWithJoins(resultMatrix, pointA, pointB, widthA, widthB, colorA, colorB, gl_InstanceID == 0);
  }
`;
