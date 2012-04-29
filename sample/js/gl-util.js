/*
 * Copyright (c) 2011 Brandon Jones
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */

"use strict";

var vendorPrefixes = ["", "WEBKIT_", "MOZ_"];

var ShaderWrapper = function(gl, program) {
    var i, attrib, uniform, count;

    this.program = program;
    this.attribute = {};
    this.uniform = {};

    count = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
    for (i = 0; i < count; i++) {
        attrib = gl.getActiveAttrib(program, i);
        this.attribute[attrib.name] = gl.getAttribLocation(program, attrib.name);
    }

    count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (i = 0; i < count; i++) {
        uniform = gl.getActiveUniform(program, i);
        this.uniform[uniform.name] = gl.getUniformLocation(program, uniform.name);
    }
};

function getGLContext(canvas) {
    var context;

    if (canvas.getContext) {
        try {
            context = canvas.getContext('webgl');
            if(context) { return context; }
        } catch(ex) {}
    
        try {
            context = canvas.getContext('experimental-webgl');
            if(context) { return context; }
        } catch(ex) {}
    }

    return null;
}

function compileGLShader(gl, source, type) {
    var shaderHeader = "\n";

    var shader = gl.createShader(type);

    gl.shaderSource(shader, shaderHeader + source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }

    return shader;
}

function createGLProgram(gl, vertexShaderSource, fragmentShaderSource) {
    var shaderProgram = gl.createProgram(),
        vs = compileGLShader(gl, vertexShaderSource, gl.VERTEX_SHADER),
        fs = compileGLShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);

    gl.attachShader(shaderProgram, vs);
    gl.attachShader(shaderProgram, fs);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error("Shader program failed to link");
        gl.deleteProgram(shaderProgram);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        return null;
    }

    return new ShaderWrapper(gl, shaderProgram);
}

