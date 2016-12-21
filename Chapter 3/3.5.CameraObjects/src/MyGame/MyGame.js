"use strict"; // Operate in Strict mode

function MyGame(htmlCanvasID) {
    // Step A: Initialize the webGL Context
    gEngine.Core.initializeWebGL(htmlCanvasID);
    var gl = gEngine.Core.getGL();

    // Step B: Setup the camera
    this.mCamera = new Camera(
        vec2.fromValues(20, 60),    // center of the WC
        20,                         // width of WC
        [20, 40, 600, 300]          // viewport (orgX, orgY, width, height)
    );

    // Step C: create the shader
    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",    // Path to the VertexShader
        "src/GLSLShaders/SimpleFS.glsl"     // Path to the FragmentShader
    );

    // Step D: Create the Renderable objects:
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

    // Step E: Clear the entire canvas first
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);           // Clear the canvas

    // Step F: Starts the drawing by activating the camera
    this.mCamera.setupViewProjection();
    var vpMatrix = this.mCamera.getVPMatrix();

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