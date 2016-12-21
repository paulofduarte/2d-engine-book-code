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


    // Step E: Compute the white square transform
    var xform = mat4.create();          // Create a new identity transform
    mat4.translate(xform, xform, vec3.fromValues(-0.25, 0.25, 0.0));
    mat4.rotateZ(xform, xform, 0.2);    // rotation is in radian
    mat4.scale(xform, xform, vec3.fromValues(1.2, 1.2, 1.0));

    // Step F: Draw the white square with the computed transform
    this.mWhiteSq.draw(xform);

    // Step G: Compute the red square transform
    mat4.identity(xform);               // restart
    mat4.translate(xform, xform, vec3.fromValues(0.25, -0.25, 0.0));
    mat4.rotateZ(xform, xform, -0.785); // rotation of about -45-degrees
    mat4.scale(xform, xform, vec3.fromValues(0.4, 0.4, 1.0));

    // Step H: Draw the red square with the computed transform
    this.mRedSq.draw(xform);
}