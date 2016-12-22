"use strict"; // Operate in Strict mode

var gEngine = gEngine || {};

// The Game Loop object
gEngine.GameLoop = (function() {
    var kFPS = 60;          // Frames per second
    var kMPF = 1000 / kFPS; // Milliseconds per frame

    // Variables for timing game loop
    var mPreviousTime;
    var mLagTime;
    var mCurrentTime;
    var mElapsedTime;

    // The current loop state (running or should stop)
    var mIsLoopRunning = false;

    // Reference to game logic
    var mMyGame = null;

    // This function assumes it is sub-classed from MyGame
    var _runLoop = function () {
        if (mIsLoopRunning) {
            // Step A: Set yp for next call to _runLoop and update input!
            requestAnimationFrame(function () {
                _runLoop.call(mMyGame);
            });

            // Step B: Compute elapsed time since last RunLoop was executed
            mCurrentTime = Date.now();
            mElapsedTime = mCurrentTime - mPreviousTime;
            mPreviousTime = mCurrentTime;
            mLagTime += mElapsedTime;

            // Step C: Update the game the appropriate number of times.
            //         Update only every Milliseconds per frame.
            //         If lag larger then update frames, update until caught up.
            while ((mLagTime >= kMPF) && mIsLoopRunning) {
                gEngine.Input.update();
                this.update();  // call MyGame.update()
                mLagTime -= kMPF;
            }

            // Step D: Now let's draw
            this.draw();
        }
    };

    var start = function (myGame) {
        mMyGame = myGame;

        // Step A: reset frame time
        mPreviousTime = Date.now();
        mLagTime = 0.0;

        // Step B: Remember that loop is now running
        mIsLoopRunning = true;

        // Step C: request _runLoop to start when loading is done
        requestAnimationFrame(function () {
            _runLoop.call(myGame);
        });
    };

    return {
        start: start
    };
}());