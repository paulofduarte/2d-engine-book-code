"use strict"; // Operate in Strict mode

function MyGame() {
    // Scene file name
    this.kSceneFile = "assets/MyGame.xml";

    // Audio clips: supports both mp3 and wav formats
    this.kBgClip = "assets/sounds/BGClip.mp3";
    this.kCue = "assets/sounds/MyGame_cue.wav";

    // The camera to view the scene
    this.mCamera = null;

    // All squares
    this.mSqSet = []; // These are the renderable objects
}

gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    // Load the scene file
    gEngine.TextFileLoader.loadTextFile(this.kSceneFile,
        gEngine.TextFileLoader.eTextFileType.eXMLFile);

    // Load the audios
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCue);
};

MyGame.prototype.initialize = function () {
    var sceneParser = new SceneFileParser(this.kSceneFile);

    // Step A: Parse the camera
    this.mCamera = sceneParser.parseCamera();

    // Step B: Parse all the squares
    sceneParser.parseSquares(this.mSqSet);

    // Step C: Play background music
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
};


// The update function, updates the application state. Make sure to _NOT_ draw anything from this function
MyGame.prototype.update = function () {
    // For this very simple game, let's move the white square and pulse the red
    var xform = this.mSqSet[0].getXform();

    // Step A: Test for the first square movement
    var deltaX = 0.05;
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        gEngine.AudioClips.playACue(this.kCue);

        if (xform.getXPos() > 30) { // this is the right-bound of the window
            xform.setPosition(10, 60);
        }
        xform.incXPosBy(deltaX);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Left)) {
        gEngine.AudioClips.playACue(this.kCue);
        xform.incXPosBy(-deltaX);

        if (xform.getXPos() < 11) { // this is the left-boundary
            gEngine.GameLoop.stop();
        }
    }

    // Step B: Test for the first square rotation
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Up)) {
        xform.incRotationInDegree(1);
    }

    xform = this.mSqSet[1].getXform();

    // Step C: Test for pulsing the second square
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

MyGame.prototype.unloadScene = function () {
    // Stop the background audio
    gEngine.AudioClips.stopBackgroundAudio();

    // Unload the scene file and loaded Resources
    gEngine.TextFileLoader.unloadTextFile(this.kSceneFile);
    //gEngine.AudioClips.unloadAudio(this.kBgClip);
    // The above line is comment out on purpose because
    // you know this clip will be used elsewhere in the game
    // so you decide to not unload this clip!!

    gEngine.AudioClips.unloadAudio(this.kCue);

    // Start the next level
    var nextLevel = new BlueLevel(); // the next level
    gEngine.Core.startScene(nextLevel);
};