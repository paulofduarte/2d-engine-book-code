"use strict"; // Operate in Strict mode

function Renderable(shader) {
    this.mShader = shader;          // The shader for shading this object
    this.mColor = [1, 1, 1, 1];     // Color for the fragment shader
    this.mXform = new Transform();  // Transform operator for the object
}

Renderable.prototype.draw = function () {
    var gl = gEngine.Core.getGL();
    this.mShader.activateShader(this.mColor);
    this.mShader.loadObjectTransform(this.mXform.getXform());
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

Renderable.prototype.getColor = function () {
    return this.mColor;
};

Renderable.prototype.setColor = function (color) {
    this.mColor = color;
};

Renderable.prototype.getXform = function () {
    return this.mXform;
};