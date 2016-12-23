"use strict"; // Operate in Strict mode

// Initialize the variable while ensuring it is not redefined
var gEngine = gEngine || {};

gEngine.Core = (function () {
    // Instance variable: the graphical context for drawing
    var mGL = null;

    // Accessor of the webgl context
    var getGL = function () {
        return mGL;
    };

    // Initialize the WebGL, the vertex buffer and compile the shaders
    var _initializeWebGL = function (htmlCanvasID) {
        var canvas = document.getElementById(htmlCanvasID);

        // Get the standard or experimental webgl and binds the Canvas area
        // store the results to the instance variable mGL
        mGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
        }
    };

    // Initialize all of the EngineCore components
    var initializeEngineCore = function (htmlCanvasID, myGame) {
        _initializeWebGL(htmlCanvasID);
        gEngine.VertexBuffer.initialize();
        gEngine.Input.initialize();
        gEngine.AudioClips.initAudioContext();

        // Init DefaultResources, when done, invoke startScene(myGame).
        gEngine.DefaultResources.initialize(function () {
            startScene(myGame);
        });
    };

    var startScene = function (myGame) {
        myGame.loadScene.call(myGame); // Called in this way to keep the correct context
        gEngine.GameLoop.start(myGame); // Start the game loop after the initialization
    };

    // Clears the draw area
    var clearCanvas = function (color) {
        mGL.clearColor(color[0], color[1], color[2], color[3]);
        mGL.clear(mGL.COLOR_BUFFER_BIT); // clear the color previously set
    };

    var inheritPrototype = function (subClass, superClass) {
        var prototype = Object.create(superClass.prototype);
        prototype.constructor = subClass;
        subClass.prototype = prototype;
    };

    // Returns the functions and variables that will be accessible
    return {
        getGL: getGL,
        initializeEngineCore: initializeEngineCore,
        startScene: startScene,
        clearCanvas: clearCanvas,
        inheritPrototype: inheritPrototype
    };
}());
