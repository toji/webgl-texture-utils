webgl-texture-utils
===================

Utilities for working with WebGL textures with an emphasis on loading compressed formats.

dds.js
--------------------
Currently the only file in the library, contains functions for processing DDS texture files.

Simplest usage is as follows:

    var s3tcExt = gl.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc"); // Substitute MOZ_, etc depending on browser
    var ddsTexture = loadDDSTexture(gl, s3tcExt, "lena.dds", function(texture) {
        // Called when texture is finished loading
    });

loadDDSTexture returns a new WebGL texture and populates it with the DDS image data when it has loaded. For more advanced
loading see `uploadDDSLevels` in the source file.

Credits
--------------------
Thank you to [Rich Geldreich](https://plus.google.com/106462556644344774154) for developing the [Crunch texture compression library](http://code.google.com/p/crunch/) and [Evan Parker](https://plus.google.com/104261567553968048744) for porting it to Javscript via Emscripten