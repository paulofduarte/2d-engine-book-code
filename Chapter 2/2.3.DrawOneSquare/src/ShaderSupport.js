var gSimpleShader = null;
var gShaderVertexPositionAttribute = null;

function loadAndCompileShader(id, shaderType) {
    var shaderText, shaderSource, compiledShader;

    // Step A: Get the shader source form index.htm
    shaderText = document.getElementById(id);
    shaderSource = shaderText.firstChild.textContent;

    // Step B: Create the shader based on the source type: vertex or fragment
    compiledShader = gGL.createShader(shaderType);

    // Step C: Compile the created shader
    gGL.shaderSource(compiledShader, shaderSource);
    gGL.compileShader(compiledShader);

    // Step D: check for error and return result
    if (!gGL.getShaderParameter(compiledShader, gGL.COMPILE_STATUS)) {
        alert("A shader compiling error occurred: " + gGL.getShaderInfoLog(compiledShader));
    }

    return compiledShader;
}

function initSimpleShader(vertexShaderID, fragmentShaderID) {
    // Step A: load and compile the vertex and fragment shaders
    var vertexShader = loadAndCompileShader(vertexShaderID, gGL.VERTEX_SHADER);
    var fragmentShader = loadAndCompileShader(fragmentShaderID, gGL.FRAGMENT_SHADER);

    // Step B: Create and link the shader into a program
    gSimpleShader = gGL.createProgram();
    gGL.attachShader(gSimpleShader, vertexShader);
    gGL.attachShader(gSimpleShader, fragmentShader);
    gGL.linkProgram(gSimpleShader);

    // Step C: check for error
    if (!gGL.getProgramParameter(gSimpleShader, gGL.LINK_STATUS)) {
        alert("Error linking shader: " + gGL.getProgramInfoLog(gSimpleShader));
    }

    // Step D: Gets a reference to the aSquareVertexPosition attribute
    gShaderVertexPositionAttribute = gGL.getAttribLocation(gSimpleShader, "aSquareVertexPosition");

    //Step E: Describe the characteristic of the vertex position attribute
    gGL.vertexAttribPointer(gShaderVertexPositionAttribute,
        3,          // each vertex element is a 3-float (x, y, z)
        gGL.FLOAT,  // data type is FLOAT
        false,      // if the content is normalised vectors
        0,          // number of bytes to skip in between elements
        0           // offsets to the first element
    );
}