"use strict"; // Operate in Strict mode

var gEngine = gEngine || {};

// The Input Object
gEngine.Input = (function () {
    //Key code constants
    var kKeys = {
        // Arrows
        Left:           37,
        Up:             38,
        Right:          39,
        Down:           40,

        // Space bar
        Space:          32,

        // Numbers
        Zero:           48,
        One:            49,
        Two:            50,
        Three:          51,
        Four:           52,
        Five:           53,
        Six:            54,
        Seven:          55,
        Eight:          56,
        Nine:           57,

        // Alphabet
        A:              65,
        B:              66,
        C:              67,
        D:              68,
        E:              69,
        F:              70,
        G:              71,
        H:              72,
        I:              73,
        J:              74,
        K:              75,
        L:              76,
        M:              77,
        N:              78,
        O:              79,
        P:              80,
        Q:              81,
        R:              82,
        S:              83,
        T:              84,
        U:              85,
        V:              86,
        W:              87,
        X:              88,
        Y:              89,
        Z:              90,

        LastKeyCode:    222
    };

    // Previous key state
    var mKeyPreviousState = [];

    // The pressed keys
    var mIsKeyPressed = [];

    // Click events: ina an event is set it will remain there until polled
    var mIsKeyClicked = [];

    // Event service functions
    var _onKeyDown = function (event) {
        mIsKeyPressed[event.keyCode] = true;
    };

    var _onKeyUp = function (event) {
        mIsKeyPressed[event.keyCode] = false;
    };

    var initialize = function () {
        for (var i = 0; i < kKeys.LastKeyCode; i++) {
            mKeyPreviousState[i] = false;
            mIsKeyPressed[i] = false;
            mIsKeyClicked[i] = false;
        }

        // Register handlers
        window.addEventListener('keydown', _onKeyDown);
        window.addEventListener('keyup', _onKeyUp);
    };

    var update = function () {
        for (var i = 0; i < kKeys.LastKeyCode; i++) {
            mIsKeyClicked[i] = !mKeyPreviousState[i] && mIsKeyPressed[i];
            mKeyPreviousState[i] = mIsKeyPressed[i];
        }
    };

    // Function for GameEngine programmer to test if a key is pressed down
    var isKeyPressed = function (keyCode) {
        return mIsKeyPressed[keyCode];
    };

    var isKeyClicked = function (keyCode) {
        return mIsKeyClicked[keyCode];
    };

    return {
        initialize: initialize,
        update: update,
        isKeyPressed: isKeyPressed,
        isKeyClicked: isKeyClicked,
        keys: kKeys
    };
}());