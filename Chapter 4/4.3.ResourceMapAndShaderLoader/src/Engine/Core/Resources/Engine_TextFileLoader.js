"use strict"; // Operate in Strict mode

var gEngine = gEngine || {};

// The Text File Loader object
gEngine.TextFileLoader = (function () {
    var eTextFileType = Object.freeze({
        eXMLFile: 0,
        eTextFile: 1
    });

    var loadTextFile = function (fileName, fileType, callbackFunction) {
        if (!gEngine.ResourceMap.isAssetLoaded(fileName)) {
            // Update resources in load counter.
            gEngine.ResourceMap.asyncLoadRequested(fileName);

            // Asynchronously request the data from the server
            var req = new XMLHttpRequest();

            req.onreadystatechange = function () {
                if ((req.readyState === 4) && (req.status !== 200)) {
                    alert(fileName + ": loading failed!\n\n" +
                        "[Hint: you cannot double click index.html to run this project. " +
                        "The index.html file must be loaded from a web server.]");
                }
            };

            req.open('GET', fileName, true);

            req.onload = function () {
                var fileContent = null;

                if (fileType === eTextFileType.eXMLFile) {
                    var parser = new DOMParser();
                    fileContent = parser.parseFromString(req.responseText, "text/xml");
                } else {
                    fileContent = req.responseText;
                }

                gEngine.ResourceMap.asyncLoadCompleted(fileName, fileContent);

                if ((callbackFunction !== null) && (callbackFunction !== undefined)) {
                    callbackFunction(fileName)
                }
            };

            req.send();
        } else {
            if ((callbackFunction !== null) && (callbackFunction !== undefined)) {
                callbackFunction(fileName)
            }
        }
    };

    var unloadTextFile = function (fileName) {
        gEngine.ResourceMap.unloadAsset(fileName);
    };

    // Public interface for this object.
    return {
        eTextFileType: eTextFileType,
        loadTextFile: loadTextFile,
        unloadTextFile: unloadTextFile
    };
}());
