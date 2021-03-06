"use strict"; // Operate in Strict mode

function SimpleShader(vertexShaderID, fragmentShaderID) {
    // Instance variables (Convention: all instance variables: mVariables)
    this.mCompiledShader = null;                    // reference to the compiled shaded in webgl context
    this.mShaderVertexPositionAttribute = null;     // reference to SquareVertexPosition in shader

    var gl = gEngine.Core.getGL();

    // Returns a compiled shader from a shader in the DOM
    // The id is the id of the script in the html file
    var _loadAndCompileShader = function (id, shaderType) {
        var shaderText, shaderSource, compiledShader = null;

        // Step A: Get the shader source from index.html
        shaderText = document.getElementById(id);
        shaderSource = shaderText.firstChild.textContent;

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
    var vertexShader = _loadAndCompileShader(vertexShaderID, gl.VERTEX_SHADER);
    var fragmentShader = _loadAndCompileShader(fragmentShaderID, gl.FRAGMENT_SHADER);

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
}

SimpleShader.prototype.activateShader = function () {
    var gl = gEngine.Core.getGL();
    gl.useProgram(this.mCompiledShader);
    gl.enableVertexAttribArray(this.mShaderVertexPositionAttribute);
};

SimpleShader.prototype.getShader = function () {
  return this.mCompiledShader;
};