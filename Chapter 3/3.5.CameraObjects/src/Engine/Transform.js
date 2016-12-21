"use strict"; // Operate in Strict mode

function Transform() {
    this.mPosition = vec2.fromValues(0, 0); // Translation operator
    this.mScale = vec2.fromValues(1, 1);    // Scaling operator
    this.mRotationInRad = 0.0;              // Rotation in radians
}


// Position getters and setters

Transform.prototype.getPosition = function () {
    return this.mPosition;
};

Transform.prototype.setPosition = function (xPos, yPos) {
    this.setXPos(xPos);
    this.setYPos(yPos);
};

Transform.prototype.getXPos = function () {
    return this.mPosition[0];
};

Transform.prototype.setXPos = function (xPos) {
    this.mPosition[0] = xPos;
};

Transform.prototype.getYPos = function () {
    return this.mPosition[1];
};

Transform.prototype.setYPos = function (yPos) {
    this.mPosition[1] = yPos;
};


// Size getters and setters

Transform.prototype.getSize = function () {
    return this.mScale;
};

Transform.prototype.setSize = function (width, height) {
    this.setWidth(width);
    this.setHeight(height);
};

Transform.prototype.getWidth = function () {
    return this.mScale[0];
};

Transform.prototype.setWidth = function (width) {
    this.mScale[0] = width;
};

Transform.prototype.getHeight = function () {
    return this.mScale[1];
};

Transform.prototype.setHeight = function (height) {
    this.mScale[1] = height;
};


// Rotation getters and setters

Transform.prototype.getRotationInRad = function () {
    return this.mRotationInRad;
};

Transform.prototype.setRotationInRad = function (rotationInRad) {
    this.mRotationInRad = rotationInRad % Math.PI;
};

Transform.prototype.getRotationInDegree = function () {
    return this.mRotationInRad * 180.0 / Math.PI;
};

Transform.prototype.setRotationInDegree = function (rotationInDegree) {
    this.mRotationInRad = rotationInDegree * Math.PI / 180.0;
};


// Compute the transform matrix (TRS)
Transform.prototype.getXform = function () {
    // Creates a blank identity matrix
    var matrix = mat4.create();

    // Step 1: Compute translation for now z is always at 0.0
    mat4.translate(matrix, matrix, vec3.fromValues(this.getXPos(), this.getYPos(), 0.0));

    // Step 2: Concatenate with rotation.
    mat4.rotateZ(matrix, matrix, this.getRotationInRad());

    // Step 3: Concatenate with scaling
    mat4.scale(matrix, matrix, vec3.fromValues(this.getWidth(), this.getHeight(), 1.0));

    return matrix;
};