"use strict"; // Operate in Strict mode

function MyGame(htmlCanvasID) {
    // Step A: Initialize the webGL Context
    gEngine.Core.initializeWebGL(htmlCanvasID);

    // Step B: create the shader
    this.mShader = new SimpleShader("VertexShader", "FragmentShader");

    // Step C1: Clear the canvas
    gEngine.Core.clearCanvas([0, 0.8, 0, 1]);

    // Step C2: Activate the proper shader
    this.mShader.activateShader();

    // Step C3: Draw with the currently activated geometry and the activated shader
    var gl = gEngine.Core.getGL();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}