"use strict"; // Operate in Strict mode

var gEngine = gEngine || {};

// The Audio Clips object
gEngine.AudioClips = (function () {
    var mAudioContext = null;
    var mBgAudioNode = null;

    var initAudioContext = function () {
        try {
            var AudioContext = window.AudioContext || window.webkitAudioContext;
            mAudioContext = new AudioContext();
        } catch (e) {
            alert("Web Audio Is not supported.");
        }
    };

    var loadAudio = function (clipName) {
        if (!gEngine.ResourceMap.isAssetLoaded(clipName)) {
            // Update resources in load counter.
            gEngine.ResourceMap.asyncLoadRequested(clipName);

            // Asynchronously request the data from server.
            var req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if ((req.readyState === 4) && (req.status !== 200)) {
                    alert(clipName + ": loading failed!\n\n" +
                        "[Hint: you cannot double click index.html to run this project. " +
                        "The index.html file must be loaded from a web server.]");
                }
            };

            req.open('GET', clipName, true);
            req.responseType = "arraybuffer";

            // Specify that the request retrieves binary data.
            req.onload = function () {
                // Asynchronouly decode, then call the function in parameter.
                mAudioContext.decodeAudioData(req.response, function (buffer) {
                    gEngine.ResourceMap.asyncLoadCompleted(clipName, buffer);
                });
            };

            req.send();
        } else {
            gEngine.ResourceMap.incAssetRefCount(clipName);
        }
    };

    var unloadAudio = function (clipName) {
        gEngine.ResourceMap.unloadAsset(clipName);
    };

    var playACue = function (clipName) {
        var clipInfo = gEngine.ResourceMap.retrieveAsset(clipName);

        if (clipInfo !== null) {
            // SourceNodes ar one use only.
            var sourceNode = mAudioContext.createBufferSource();
            sourceNode.buffer = clipInfo;
            sourceNode.connect(mAudioContext.destination);
            sourceNode.start(0);
        }
    };

    var playBackgroundAudio = function (clipName) {
        var clipInfo = gEngine.ResourceMap.retrieveAsset(clipName);

        if (clipInfo !== null) {
            // Stop audio if playing.
            stopBackgroundAudio();
            mBgAudioNode = mAudioContext.createBufferSource();
            mBgAudioNode.buffer = clipInfo;
            mBgAudioNode.connect(mAudioContext.destination);
            mBgAudioNode.start(0);
        }
    };

    var stopBackgroundAudio = function () {
        // Check if the audio is playing.
        if (mBgAudioNode !== null) {
            mBgAudioNode.stop(0);
            mBgAudioNode = null;
        }
    };

    var isBackgroundPlaying = function () {
        return (mBgAudioNode !== null);
    };

    return {
        initAudioContext: initAudioContext,
        loadAudio: loadAudio,
        unloadAudio: unloadAudio,
        playACue: playACue,
        playBackgroundAudio: playBackgroundAudio,
        stopBackgroundAudio: stopBackgroundAudio,
        isBackgroundAudioPlaying: isBackgroundPlaying
    };
}());