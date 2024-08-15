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
import { getTextures } from "./textures/textures";

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

  getTextures(gl, attributeLocations);

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
      var currentTexture = 32 * (currentVao + 4);
      gl.vertexAttrib1f(attributeLocations.depth, currentTexture);
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
      gl.uniform4fv(uniformLocations.color, [1, 1, 1, 1]); // white
      setLighting(gl, uniformLocations, worldMatrix, worldViewProjectionMatrix);
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
    function setLighting(
      gl,
      uniformLocations,
      worldMatrix,
      worldViewProjectionMatrix,
    ) {
      gl.uniformMatrix4fv(uniformLocations.world, false, worldMatrix);
      gl.uniformMatrix4fv(
        uniformLocations.viewProjection,
        false,
        worldViewProjectionMatrix,
      );
      // set the light position
      gl.uniform3fv(uniformLocations.lightPosition, [30, 120, 300]);
      gl.uniform3fv(uniformLocations.viewWorld, scene.camera);
      gl.uniform1f(uniformLocations.shininess, 1000);
    }

    recalculateScene(scene, uiScene);
    requestAnimationFrame(drawScene);
  }
}

main();
