"use strict"; // Operate in Strict mode

function MyGame() {
    // Scene file name
    this.kSceneFile = "assets/MyGame.xml";

    // The camera to view the scene
    this.mCamera = null;

    // All squares
    this.mSqSet = new Array(); // These are the renderable objects
}

MyGame.prototype.initialize = function () {
    var sceneParser = new SceneFileParser(this.kSceneFile);

    // Step A: Parse the camera
    this.mCamera = sceneParser.parseCamera();

    // Step B: Parse all the squares
    sceneParser.parseSquares(this.mSqSet);
};

// The update function, updates the application state. Make sure to _NOT_ draw anything from this function
MyGame.prototype.update = function () {
    // For this very simple game, let's move the white square and pulse the red
    var xform = this.mSqSet[0].getXform();

    // Step A: Test for white square movement
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        if (xform.getXPos() > 30) { // this is the right-bound of the window
            xform.setPosition(10, 60);
        }
        xform.incXPosBy(0.05);
    }

    // Step B: Test for white square rotation
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
        xform.incRotationInDegree(1);
    }

    xform = this.mSqSet[1].getXform();

    // Step C: Test for pulsing the red square
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Down)) {
        if (xform.getWidth() > 5) {
            xform.setSize(2, 2);
        }
        xform.incSizeBy(0.05, 0.05);
    }
};

// This is the draw function, make sure to setup proper drawing environment, and more importantly, make sure
// to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: Clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step B: Activate the drawing camera
    this.mCamera.setupViewProjection();

    // Step C: Draw all the squares
    for (var i = 0; i < this.mSqSet.length; i++) {
        this.mSqSet[i].draw(this.mCamera.getVPMatrix());
    }
};

MyGame.prototype.loadScene = function () {
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile,
        gEngine.TextFileLoader.eTextFileType.eXMLFile);
};

MyGame.unloadScene = function () {
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);

};