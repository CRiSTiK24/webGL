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
import { degToRad } from "./math/trigonometry";

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

  initUI(uniformLocations, gl, program);

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
      setLighting(
        gl,
        uniformLocations,
        scene,
        worldMatrix,
        worldViewProjectionMatrix,
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
    function setLighting(
      gl,
      uniformLocations,
      scene,
      worldMatrix,
      worldViewProjectionMatrix,
    ) {
      gl.uniformMatrix4fv(uniformLocations.world, false, worldMatrix);
      gl.uniformMatrix4fv(
        uniformLocations.viewProjection,
        false,
        worldViewProjectionMatrix,
      );
      gl.uniform3fv(uniformLocations.viewWorld, scene.camera);

      gl.uniform3fv(uniformLocations.sunlightPosition, [30, 120, 300]);
      gl.uniform1f(uniformLocations.shininessSun, 10);

      gl.uniform3fv(uniformLocations.lightbulbPosition, [0, 4, 0]);
      gl.uniform1f(uniformLocations.shininessLightbulb, 1000);

      var limit = degToRad(10);
      gl.uniform3fv(uniformLocations.lanternPosition, scene.camera);
      gl.uniform1f(uniformLocations.shininessLantern, 10000);
      gl.uniform3fv(
        uniformLocations.directionLantern,
        m4.subtractVectors(scene.target, scene.camera),
      );
      gl.uniform1f(uniformLocations.limitLantern, Math.cos(limit));
    }

    recalculateScene(scene);
    requestAnimationFrame(drawScene);
  }
}

main();
