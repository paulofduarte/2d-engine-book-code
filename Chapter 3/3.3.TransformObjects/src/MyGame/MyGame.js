"use strict"; // Operate in Strict mode

function MyGame(htmlCanvasID) {
    // Step A: Initialize the webGL Context
    gEngine.Core.initializeWebGL(htmlCanvasID);

    // Step B: create the shader
    this.mConstColorShader = new SimpleShader(
        "src/GLSLShaders/SimpleVS.glsl",    // Path to the VertexShader
        "src/GLSLShaders/SimpleFS.glsl"     // Path to the FragmentShader
    );

    // Step C: Create the Renderable objects:
    this.mWhiteSq = new Renderable(this.mConstColorShader);
    this.mWhiteSq.setColor([1, 1, 1, 1]);
    this.mRedSq = new Renderable(this.mConstColorShader);
    this.mRedSq.setColor([1, 0, 0, 1]);

    // Step D: Clear canvas!
    gEngine.Core.clearCanvas([0, 0.8, 0, 1]);


    // Step E: Sets the white Renderable object's transform
    this.mWhiteSq.getXform().setPosition(-0.25, 0.25);
    this.mWhiteSq.getXform().setRotationInRad(0.2); // In Radians
    this.mWhiteSq.getXform().setSize(1.2, 1.2);

    // Step F: Draw the white square (transform behavior in the object)
    this.mWhiteSq.draw();

    // Step G: Sets the red square transform
    this.mRedSq.getXform().setXPos(0.25);           // to show alternative to setPosition
    this.mRedSq.getXform().setYPos(-0.25);          // it is possible to set x/y separately
    this.mRedSq.getXform().setRotationInDegree(45); // this is in Degree
    this.mRedSq.getXform().setWidth(0.4);           // to show alternative to setSize
    this.mRedSq.getXform().setHeight(0.4);          // it is possible to set width/height separately

    // Step H: Draw the red square with the computed transform
    this.mRedSq.draw();
}