"use strict"; // Operate in Strict mode

function Scene() {
    // Constructor
}

Scene.prototype.loadScene = function () {
    // Called from EngineCore.startScene()
};

Scene.prototype.initialize = function () {
    // Called from GameLoop, after loading is done
};

Scene.prototype.update = function () {
    // Called from GameLoop, to update the scene state
};

Scene.prototype.draw = function () {
    // Called from GameLoop, to draw the scene
};

Scene.prototype.unloadScene = function () {
    // Called from GameLoop, when the loop ends
};
