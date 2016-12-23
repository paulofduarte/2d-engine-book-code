precision mediump float;    // sets the precision for floating point computation

attribute vec3 aSquareVertexPosition;   // Expects one vertex position
uniform mat4 uModelTransform;           // Transform matrix from Model Space to World Coordinate
uniform mat4 uViewProjTransform;        // Transform matrix from World Coodinate to Normalized Device Coordinate

void main(void) {
    gl_Position = uViewProjTransform * uModelTransform * vec4(aSquareVertexPosition, 1.0);
}
