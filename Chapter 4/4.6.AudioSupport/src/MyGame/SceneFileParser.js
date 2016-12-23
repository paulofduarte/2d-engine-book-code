"use strict"; // Operate in Strict mode

function SceneFileParser(sceneFilePath) {
    this.mSceneXml = gEngine.ResourceMap.retrieveAsset(sceneFilePath);
}

SceneFileParser.prototype._getElm = function (tagElm) {
    var theElm = this.mSceneXml.getElementsByTagName(tagElm);

    if (theElm.length === 0) {
        console.error("Warning: Level element: [" + tagElm + "] was not found!");
    }

    return theElm;
};

SceneFileParser.prototype.parseCamera = function () {
    var camElm = this._getElm("Camera")[0];
    var cx = Number(camElm. getAttribute("CenterX"));
    var cy = Number(camElm. getAttribute("CenterY"));
    var w = Number(camElm. getAttribute("Width"));
    var viewport = camElm. getAttribute("Viewport").split(" ");
    var bgColor = camElm. getAttribute("BgColor").split(" ");

    // Make sure viewport and color arrays contain number
    for (var i = 0; i < 4; i++) {
        viewport[i] = Number(viewport[i]);
        bgColor[i] = Number(bgColor[i]);
    }

    var cam = new Camera(
        vec2.fromValues(cx, cy),    // position of the camera
        w,                          // width of the camere
        viewport                    // viewport (orgX, orgY, width, height)
    );

    cam.setBackgroundColor(bgColor);

    return cam;
};

SceneFileParser.prototype.parseSquares = function (sqSet) {
    var sqElms = this._getElm("Square");

    for (var i = 0; i < sqElms.length; i++) {
        var x = Number(sqElms[i].getAttribute("PosX"));
        var y = Number(sqElms[i].getAttribute("PosY"));
        var w = Number(sqElms[i].getAttribute("Width"));
        var h = Number(sqElms[i].getAttribute("Height"));
        var r = Number(sqElms[i].getAttribute("Rotation"));
        var c = sqElms[i].getAttribute("Color").split(" ");

        // make sure color array contains numbers
        for (var j = 0; j < 4; j++) {
            c[j] = Number(c[j]);
        }

        var sq = new Renderable(gEngine.DefaultResources.getConstColorShader());

        sq.getXform().setPosition(x, y);
        sq.getXform().setSize(w, h);
        sq.getXform().setRotationInDegree(r);
        sq.setColor(c);

        sqSet.push(sq);
    }
};