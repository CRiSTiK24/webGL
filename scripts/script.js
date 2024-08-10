"use strict";

import {
  createProgram,
  getAttributeLocations,
  getUniformLocations,
} from "./program.js";

import { initUI } from "./UI/initUI";
import { initDrawScene, initScene, recalculateScene } from "./drawSceneAux";
import { initKeyboardControls } from "./controls/keyboardControls";
import { initMouseControls } from "./controls/mouseControls";
import { getObjects } from "./objPlacement/objPlacement";

function main() {
  var canvas = document.querySelector("#canvas");
  var gl = canvas.getContext("webgl2");
  if (!gl) {
    return;
  }

  var program = createProgram(gl);
  var attributeLocations = getAttributeLocations(gl, program);
  var uniformLocations = getUniformLocations(gl, program);

  var VAOstruct = {
    VAOs: [],
    typesOfVAOs: [],
    tranformationsOfVAOs: [],
  };

  getObjects(gl, attributeLocations, VAOstruct);

  var uiScene = initUI();

  var scene = initScene(gl);
  initKeyboardControls(scene, canvas);
  initMouseControls(scene, canvas);
  initDrawScene(gl, program);

  requestAnimationFrame(drawScene);
  var then = 0;
  function drawScene(now) {
    now *= 0.001;
    //var deltaTime = now - then;
    then = now;

    var currentVao = 0;
    VAOstruct.VAOs.forEach((vao) => {
      gl.bindVertexArray(vao);
      var worldMatrix = VAOstruct.tranformationsOfVAOs[currentVao];
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
        m4.normalize([1, 4, 10]),
      );
      drawVAO(gl, VAOstruct.typesOfVAOs[currentVao]);
    });

    function drawVAO(gl, currentVaoType) {
      var primitiveType = gl.TRIANGLES;
      var offset = 0;
      if (currentVaoType.indexedBool) {
        var indexType = gl.UNSIGNED_SHORT;
        gl.drawElements(primitiveType, currentVaoType.count, indexType, offset);
      } else {
        gl.drawArrays(primitiveType, offset, currentVaoType.count);
      }
      currentVao += 1;
    }

    recalculateScene(scene, uiScene);
    requestAnimationFrame(drawScene);
  }
}

main();
