webgl-texture-utils
===================

Utilities for working with WebGL textures with an emphasis on loading compressed formats.

Usage
--------------------
The quickest way to get up and running is to include texture-util.js from the build folder, which will add a TextureUtil
object to the global scope. Once included, construct a TextureLoader by passing the desired WebGL context to it.

    var textureLoader = new TextureUtil.TextureLoader(gl);

The texture loader can be used to easily load textures of many different formats with the `load` function.

    var texture = textureLoader.load("path/to/texture.png", function(texture) {
        // Optional callback
    });

Supported formats are those natively supported by the browser (JPG, PNG, BMP, GIF), TGA, DDS, and CRN (Crunch). Format is
typically determined by the file extension on the path provided, but can be overridden by passing in an explicit type.

    var texture = textureLoader.load("textureGenerator.php", callback, "DDS");

If you use require.js in your project you can use the un-minified source files directly. Copy the texture-util folder into
your project and include "texture-util/loader".

Further documentation is forthcoming, sorry for the brevity!

Credits
--------------------
Thank you to [Rich Geldreich](https://plus.google.com/106462556644344774154) for developing the [Crunch texture compression library](http://code.google.com/p/crunch/) and [Evan Parker](https://plus.google.com/104261567553968048744) for porting it to Javscript via Emscripten