precision mediump float;    // sets the precision for floating point computation

attribute vec3 aSquareVertexPosition;   // Expects one vertex position
uniform mat4 uModelTransform;           // To transform the vertex position

void main(void) {
    gl_Position = uModelTransform * vec4(aSquareVertexPosition, 1.0);
}
