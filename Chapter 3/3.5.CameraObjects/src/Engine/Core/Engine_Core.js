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
    var initializeWebGL = function (htmlCanvasID) {
        var canvas = document.getElementById(htmlCanvasID);

        // Get the standard or experimental webgl and binds the Canvas area
        // store the results to the instance variable mGL
        mGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
        }

        // Now initialize the VertexBuffer
        gEngine.VertexBuffer.initialize();
    };

    // Clears the draw area
    var clearCanvas = function (color) {
        mGL.clearColor(color[0], color[1], color[2], color[3]);
        mGL.clear(mGL.COLOR_BUFFER_BIT); // clear the color previously set
    };

    // Returns the functions and variables that will be accessible
    return {
        getGL: getGL,
        initializeWebGL: initializeWebGL,
        clearCanvas: clearCanvas
    };
}());
