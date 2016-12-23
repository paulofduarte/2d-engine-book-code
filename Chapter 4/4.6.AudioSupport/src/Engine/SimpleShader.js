"use strict"; // Operate in Strict mode

function SimpleShader(vertexShaderPath, fragmentShaderPath) {
    // Instance variables (Convention: all instance variables: mVariables)
    this.mCompiledShader = null;                    // reference to the compiled shaded in webgl context
    this.mShaderVertexPositionAttribute = null;     // reference to SquareVertexPosition in shader
    this.mPixelColor = null;                        // reference to the pixelColor uniform in the fragment shader
    this.mModelTransform = null;                    // reference to the modelTransform uniform in the vertex shader
    this.mViewProjTransform = null;                 // reference to the viewProjTransform uniform in the vertex shader

    var gl = gEngine.Core.getGL();

    // Returns a compiled shader from a shader in the DOM
    // The id is the id of the script in the html file
    var _compileShader = function (filePath, shaderType) {
        var shaderSource = null, compiledShader = null;

        // Step A: Access the shader text file
        shaderSource = gEngine.ResourceMap.retrieveAsset(filePath);

        // Step B: Create the shader based on the shader type: vertex or fragment
        compiledShader = gl.createShader(shaderType);

        // Step C: Compile the created shader
        gl.shaderSource(compiledShader, shaderSource);
        gl.compileShader(compiledShader);

        // Step D: check for errors and return results (null if error)
        // The log info is how shader compilation errors are typically displayed.
        // This is useful for debugging the shaders.
        if (!gl.getShaderParameter(compiledShader, gl.COMPILE_STATUS)) {
            alert("A shader compiling error occurred: " + gl.getShaderInfoLog(compiledShader));
        }

        return compiledShader;
    };

    // Start of constructor code

    // Step A: Load and compile vertex and fragment shaders
    var vertexShader = _compileShader(vertexShaderPath, gl.VERTEX_SHADER);
    var fragmentShader = _compileShader(fragmentShaderPath, gl.FRAGMENT_SHADER);

    // Step B: Create and link the shader into a program
    this.mCompiledShader = gl.createProgram();
    gl.attachShader(this.mCompiledShader, vertexShader);
    gl.attachShader(this.mCompiledShader, fragmentShader);
    gl.linkProgram(this.mCompiledShader);

    // Step C: Check for error
    if (!gl.getProgramParameter(this.mCompiledShader, gl.LINK_STATUS)) {
        alert("Error linking shader: " + gl.getProgramInfoLog(this.mCompiledShader));
        return;
    }

    // Step D: Gets a reference to the aSquareVertexPosition attribute
    this.mShaderVertexPositionAttribute = gl.getAttribLocation(this.mCompiledShader, "aSquareVertexPosition");

    //Step E: Describe the characteristic of the vertex position attribute
    gl.vertexAttribPointer(this.mShaderVertexPositionAttribute,
        3,          // each vertex element is a 3-float (x, y, z)
        gl.FLOAT,   // data type is FLOAT
        false,      // if the content is normalised vectors
        0,          // number of bytes to skip in between elements
        0           // offsets to the first element
    );

    // Step F: Gets a reference to the uniform variables uPixelColor, uModelTransform and uViewProjTransform
    this.mPixelColor = gl.getUniformLocation(this.mCompiledShader, "uPixelColor");
    this.mModelTransform = gl.getUniformLocation(this.mCompiledShader, "uModelTransform");
    this.mViewProjTransform = gl.getUniformLocation(this.mCompiledShader, "uViewProjTransform");
}

SimpleShader.prototype.activateShader = function (pixelColor, vpMatrix) {
    var gl = gEngine.Core.getGL();
    gl.useProgram(this.mCompiledShader);
    gl.uniformMatrix4fv(this.mViewProjTransform, false, vpMatrix);
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
    gl.uniform4fv(this.mPixelColor, pixelColor);
};

SimpleShader.prototype.getShader = function () {
  return this.mCompiledShader;
};

// Loads per-object model transform to the vertex shader
SimpleShader.prototype.loadObjectTransform = function (modelTransform) {
    var gl = gEngine.Core.getGL();
    gl.uniformMatrix4fv(this.mModelTransform, false, modelTransform);
};