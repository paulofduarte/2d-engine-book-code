"use strict"; // Operate in Strict mode

function Camera(wcCenter, wcWidth, viewportArray) {
    // WC and viewport position and size
    this.mWCCenter = wcCenter;
    this.mWCWidth = wcWidth;
    this.mViewport = viewportArray; // [x, y, width, height]
    this.mNearPlane = 0;
    this.mFarPlane = 1000;
    
    // Transformation matrices
    this.mViewMatrix = mat4.create();
    this.mProjMatrix = mat4.create();
    this.mVPMatrix = mat4.create();
    this.mBgColor = [0.8, 0.8, 0.8, 1]; // RGB and Alpha
}


// Getter/setter of the WC, viewport and background color

Camera.prototype.getWCCenter = function () {
    return this.mWCCenter;
};

Camera.prototype.setWCCenter = function (xPos, yPos) {
    this.mWCCenter[0] = xPos;
    this.mWCCenter[1] = yPos;
};

Camera.prototype.getWCWidth = function () {
    return this.mWCWidth;
};

Camera.prototype.setWCWidth = function (width) {
    this.mWCWidth = width;
};

Camera.prototype.getViewport = function () {
    return this.mViewport;
};

Camera.prototype.setViewport = function (viewportArray) {
    this.mViewMatrix = viewportArray;
};

Camera.prototype.getBackgroundColor = function () {
    return this.mBgColor;
};

Camera.prototype.setBackgroundColor = function (newColor) {
    this.mBgColor = newColor;
};


// Getter for the View-Projection transform operator
Camera.prototype.getVPMatrix = function() {
    return this.mVPMatrix;
};


// Initializes the camera to begin drawing
Camera.prototype.setupViewProjection = function () {
    var gl = gEngine.Core.getGL();

    // Step A: Configure the viewport
    // Step A1: Set up the viewport: area on canvas to be drawn
    gl.viewport(
        this.mViewport[0],  // x position of bottom-left corner
        this.mViewport[1],  // y position of bottom-left corner
        this.mViewport[2],  // width of the area to be drawn
        this.mViewport[3]   // height of the area to be drawn
    );

    // Step A2: Set up the corresponding scissor area to limit clear area
    gl.scissor(
        this.mViewport[0],  // x position of bottom-left corner
        this.mViewport[1],  // y position of bottom-left corner
        this.mViewport[2],  // width of the area to be drawn
        this.mViewport[3]   // height of the area to be drawn
    );

    // Step A3: Set the color to clear the background
    gl.clearColor(this.mBgColor[0], this.mBgColor[1], this.mBgColor[2], this.mBgColor[3]);

    // Step A4: Enable and clear the scissor area
    gl.enable(gl.SCISSOR_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.disable(gl.SCISSOR_TEST);


    // Step B : Define the View-Projection matrix
    // Step B1: define the view matrix
    mat4.lookAt(this.mViewMatrix,
        [this.mWCCenter[0], this.mWCCenter[1], 10],     // Camera position
        [this.mWCCenter[0], this.mWCCenter[1], 0],      // WC center
        [0, 1, 0]                                       // Orientation
    );

    // Step B2: define the projection matrix
    var halfWCWidth = 0.5 * this.mWCWidth;
    // WCHeight = WCWidth * viewPortHeight / viewportWidth
    var halfWCHeight = halfWCWidth * this.mViewport[3] / this.mViewport[2];
    mat4.ortho(this.mProjMatrix,
        -halfWCWidth,       // distance to left of WC
         halfWCWidth,       // distance to right of WC
        -halfWCHeight,      // distance to bottom of WC
         halfWCHeight,      // distance to top of WC
         this.mNearPlane,   // z-distance to near plane
         this.mFarPlane     // z-distance to far plane
    );

    //Step B3: Concatenate view and project matrices
    mat4.multiply(this.mVPMatrix, this.mProjMatrix, this.mViewMatrix);
};