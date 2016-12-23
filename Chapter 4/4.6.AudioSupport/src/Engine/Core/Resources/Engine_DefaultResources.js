"use strict"; // Operate in Strict mode

var gEngine = gEngine || {};

// The Default Resources object
gEngine.DefaultResources = (function () {
    // Simple Shader GLSL Shader file paths
    var kSimpleVS = "src/GLSLShaders/SimpleVS.glsl"; // Path to the simple VertexShader
    var kSimpleFS = "src/GLSLShaders/SimpleFS.glsl"; // Path to the simple FragmentShader

    var mConstColorShader = null; // Variable for the SimpleShader object

    var _getConstColorShader = function () {
        return mConstColorShader;
    };

    // Callback function after loading are done
    var _createShaders = function (callbackFunction) {
        mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
        callbackFunction();
    };

    // Initiate asynchronous loading of GLSL Shader files
    var _initialize = function (callbackFunction) {
        // Constant color shader: SimpleVS and SimpleFS
        gEngine.TextFileLoader.loadTextFile(kSimpleVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kSimpleFS, gEngine.TextFileLoader.eTextFileType.eTextFile);

        gEngine.ResourceMap.setLoadCompleteCallback(function () {
            _createShaders(callbackFunction);
        });
    };

    return {
        initialize: _initialize,
        getConstColorShader: _getConstColorShader
    };
}());