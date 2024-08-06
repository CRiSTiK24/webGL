"use strict";

function main() {
  var canvas = document.querySelector("#canvas");
  var gl = canvas.getContext("webgl2");
  if (!gl) {
    return;
  }
  twgl.setAttributePrefix("a_");
  var programInfo = twgl.createProgramInfo(gl, [noLightingVS, noLightingFS]);


}

main();
