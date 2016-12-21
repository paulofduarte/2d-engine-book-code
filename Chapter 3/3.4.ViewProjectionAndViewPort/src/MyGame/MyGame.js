"use strict"; // Operate in Strict mode

function MyGame(htmlCanvasID) {
    // Step A: Initialize the webGL Context
    gEngine.Core.initializeWebGL(htmlCanvasID);
    var gl = gEngine.Core.getGL();

    // Step B: create the shader
    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",    // Path to the VertexShader
        "src/GLSLShaders/SimpleFS.glsl"     // Path to the FragmentShader
    );

    // Step C: Create the Renderable objects:
    this.mBlueSq = new Renderable(this.mConstColorShader);
    this.mBlueSq.setColor([0.25, 0.25, 0.95, 1.0]);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mRedSq.setColor([1, 0.25, 0.25, 1.0]);
    this.mTLSq = new Renderable(this.mConstColorShader);
    this.mTLSq.setColor([0.9, 0.1, 0.1, 1.0]);                // Top-Left shows red
    this.mTRSq = new Renderable(this.mConstColorShader);
    this.mTRSq.setColor([0.1, 0.9, 0.1, 1.0]);                // Top-Right shows green
    this.mBRSq = new Renderable(this.mConstColorShader);
    this.mBRSq.setColor([0.1, 0.1, 0.9, 1.0]);                // Bottom-Right shows blue
    this.mBLSq = new Renderable(this.mConstColorShader);
    this.mBLSq.setColor([0.1, 0.1, 0.1, 1.0]);                // Bottom-Left shows dark gray

    // Step D: Clear the entire canvas first
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);           // Clear the canvas

    // Step E: Setting the Viewport
    // Step E1: Set up the viewport: area on canvas to be drawn
    gl.viewport(
        20,     // x position of bottom-left corner of the area to be drawn
        40,     // y position of bottom-left corner of the area to be drawn
        600,    // width of the area to be drawn
        300     // height of the area to be drawn
    );

    // Step E2: set up the corresponding scissor area to limit clear area
    gl.scissor(
        20,     // x position of bottom-left corner of the area to be drawn
        40,     // y position of bottom-left corner of the area to be drawn
        600,    // width of the area to be drawn
        300     // height of the area to be drawn
    );

    // Step E3: enable the scissor area, clear, and then disable the scissor area
    gl.enable(gl.SCISSOR_TEST);
    gEngine.Core.clearCanvas([0.8, 0.8, 0.8, 1.0]);           // Clear the scissor area
    gl.disable(gl.SCISSOR_TEST);
    
    // Step F: Set up View and Projection matrices
    var viewMatrix = mat4.create();
    var projMatrix = mat4.create();
    
    // Step F1: Define the view matrix
    mat4.lookAt(viewMatrix,
        [20, 60, 10],     // camera position
        [20, 60,  0],     // look at position
        [ 0,  1,  0]      // orientation
    );

    // Step F2: Define the projection matrix
    mat4.ortho(projMatrix,
         -10,   // distance to the left of WC
          10,   // distance to the right of WC
          -5,   // distance to the bottom of WC
           5,   // distance to to the top of WC
           0,   // z-distance to the near plane
        1000    // z-distance to the far plane
    );

    // Step F3: Concatenate to form the View-Projection operator
    var vpMatrix = mat4.create();
    mat4.multiply(vpMatrix, projMatrix, viewMatrix);

    // Step G: Draw the blue square
    // Centre Blue, slightly rotated square
    this.mBlueSq.getXform().setPosition(20, 60);
    this.mBlueSq.getXform().setRotationInRad(0.2); // In Radians
    this.mBlueSq.getXform().setSize(5, 5);
    this.mBlueSq.draw(vpMatrix);

    // Step H: Draw the red square
    // Centre Blue square
    this.mRedSq.getXform().setPosition(20, 60);
    this.mRedSq.getXform().setSize(2, 2);
    this.mRedSq.draw(vpMatrix);

    // Step I: Draw the corner squares
    // Top-Left
    this.mTLSq.getXform().setPosition(10, 65);
    this.mTLSq.draw(vpMatrix);
    // Top-Right
    this.mTRSq.getXform().setPosition(30, 65);
    this.mTRSq.draw(vpMatrix);
    // Bottom-Right
    this.mBRSq.getXform().setPosition(30, 55);
    this.mBRSq.draw(vpMatrix);
    // Bottom-Left
    this.mBLSq.getXform().setPosition(10, 55);
    this.mBLSq.draw(vpMatrix);
}