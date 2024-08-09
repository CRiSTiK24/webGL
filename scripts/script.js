"use strict";

import {
  createProgram,
  getAttributeLocations,
  getUniformLocations,
} from "./program.js";

import { initUI, resizeCanvasToDisplaySize } from "./UI/initUI";
import { initDrawScene, initScene, recalculateScene } from "./drawSceneAux";
import { drawCuboProva } from "./geometries/cuboProva";
import { initKeyboardControls } from "./controls/keyboardControls";
import { initMouseControls } from "./controls/mouseControls";

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
  var cubeType = {
    count: 6 * 6,
    indexedBool: true,
  };
  var fType = {
    count: 16 * 6,
    indexedBool: false,
  };

  var typesOfVAOs = [];
  var transformationsOfVAOs = [];
  VAOs.push(drawCuboProva(gl, attributeLocations));
  typesOfVAOs.push(cubeType);
  //VAOs.push(drawF(gl, attributeLocations));
  //typesOfVAOs.push(fType);
  var fRotationRadiansObj = { value: 0 };
  initUI(fRotationRadiansObj);

  var scene = initScene(gl);
  initKeyboardControls(scene, canvas);
  initMouseControls(scene, canvas);
  initDrawScene(gl, program);

  requestAnimationFrame(drawScene);
  var then = 0;
  function drawScene(now) {
    now *= 0.001;
    var deltaTime = now - then;
    then = now;

    var currentVao = 0;
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
      drawVAO(gl, typesOfVAOs[currentVao]);
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

    recalculateScene(scene);
    requestAnimationFrame(drawScene);
  }
}

main();
