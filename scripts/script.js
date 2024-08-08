"use strict";

import {
  createProgram,
  getAttributeLocations,
  getUniformLocations,
} from "./program.js";

import { degToRad, radToDeg } from "./math/trigonometry";
import { drawF } from "./geometries/F.js";
import { initUI, resizeCanvasToDisplaySize } from "./UI/initUI";
import { initDrawScene, initScene } from "./drawSceneAux";
import { cuboProva, drawCuboProva } from "./geometries/cuboProva";

function main() {
  var canvas = document.querySelector("#canvas");
  var gl = canvas.getContext("webgl2");
  if (!gl) {
    return;
  }

  var program = createProgram(gl);
  var attributeLocations = getAttributeLocations(gl, program);
  var uniformLocations = getUniformLocations(gl, program);
  var VAOs = [];
  VAOs.push(drawCuboProva(gl, attributeLocations));
  var fRotationRadiansObj = { value: 0 };
  initUI(fRotationRadiansObj);
  requestAnimationFrame(drawScene);
  var then = 0;
  function drawScene(now) {
    now *= 0.001;
    var deltaTime = now - then;
    then = now;

    initDrawScene(gl, program);

    var scene = initScene(gl);

    VAOs.forEach((vao) => {
      gl.bindVertexArray(vao);
      var worldMatrix = m4.yRotation(fRotationRadiansObj.value);
      var worldViewProjectionMatrix = m4.multiply(
        scene.viewProjectionMatrix,
        worldMatrix,
      );
      var worldInverseMatrix = m4.inverse(worldMatrix);
      var worldInverseTransposeMatrix = m4.transpose(worldInverseMatrix);
      gl.uniformMatrix4fv(
        uniformLocations.viewProjection,
        false,
        worldViewProjectionMatrix,
      );
      gl.uniformMatrix4fv(
        uniformLocations.inverseTranspose,
        false,
        worldInverseTransposeMatrix,
      );
      gl.uniform4fv(uniformLocations.color, [0.2, 1, 0.2, 1]); // green
      gl.uniform3fv(
        uniformLocations.reverseLightDirection,
        m4.normalize([0.5, 0.7, 1]),
      );
      var primitiveType = gl.TRIANGLES;
      var offset = 0;
      var count = 6 * 6;
      var indexType = gl.UNSIGNED_SHORT;
      gl.drawElements(primitiveType, count, indexType, offset);
    });

    requestAnimationFrame(drawScene);
  }
}

main();
