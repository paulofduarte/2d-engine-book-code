"use strict"; // Operate in Strict mode

function MyGame(htmlCanvasID) {
    // Variable of the constant color shader
    this.mConstColorShader = null;

    // Variables for the squares
    this.mWhiteSq = null;           // these are the renderable objects
    this.mRedSq = null;

    // The camera to view the scene
    this.mCamera = null;

    // Initialize the webGL Context
    gEngine.Core.initializeEngineCore(htmlCanvasID);

    // Initialize the game
    this.initialize();
}

MyGame.prototype.initialize = function () {
    // Step A: Setup the cameras
    this.mCamera = new Camera(
        vec2.fromValues(20, 60),    // position of the camera
        20,                         // width of the camera
        [20, 40, 600, 300]          // viewport (orgX, orgY, width, height
    );

    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]); // Sets the background to dark gray

    // Step B: Create the shader
    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",    // Path to the VertexShader
        "src/GLSLShaders/SimpleFS.glsl"     // Path to the FragmentShader
    );

    // Step C: Create the renderable objects:
    this.mWhiteSq = new Renderable(this.mConstColorShader);
    this.mWhiteSq.setColor([1, 1, 1, 1]);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mRedSq.setColor([1, 0, 0, 1]);

    // Step D: Initialize the white renderable object: centered, 5x5, rotated
    this.mWhiteSq.getXform().setPosition(20, 60);
    this.mWhiteSq.getXform().setRotationInRad(0.2); // In Radian
    this.mWhiteSq.getXform().setSize(5, 5);

    // Step E: Initialize the red renderable object: centered 2x2
    this.mRedSq.getXform().setPosition(20, 60);
    this.mRedSq.getXform().setSize(2, 2);

    // Step F: Start the game loop running
    gEngine.GameLoop.start(this);
};

// The update function, updates the application state. Make sure to _NOT_ draw anything from this function
MyGame.prototype.update = function () {
    // For this very simple game, let's move the white square and pulse the red
    var whiteXform = this.mWhiteSq.getXform();

    // Step A: Test for white square movement
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        if (whiteXform.getXPos() > 30) { // this is the right-bound of the window
            whiteXform.setPosition(10, 60);
        }
        whiteXform.incXPosBy(0.05);
    }

    // Step B: Test for white square rotation
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
        whiteXform.incRotationInDegree(1);
    }

    var redXform = this.mRedSq.getXform();

    // Step C: Test for pulsing the red square
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if (redXform.getWidth() > 5) {
            redXform.setSize(2, 2);
        }
        redXform.incSizeBy(0.05, 0.05);
    }
};

// This is the draw function, make sure to setup proper drawing environment, and more importantly, make sure
// to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: Clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step B: Activate the drawing camera
    this.mCamera.setupViewProjection();

    // Step C: Draw the white square
    this.mWhiteSq.draw(this.mCamera.getVPMatrix());

    // Step D: Draw the red square
    this.mRedSq.draw(this.mCamera.getVPMatrix());
};