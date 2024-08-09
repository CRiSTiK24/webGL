import { resizeCanvasToDisplaySize } from "./UI/initUI";
import { degToRad } from "./math/trigonometry";

export function initDrawScene(gl, program) {
  resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.useProgram(program);
}
export function initScene(gl) {
  var fieldOfViewRadians = degToRad(60);
  var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  var zNear = 1;
  var zFar = 2000;
  var projectionMatrix = m4.perspective(
    fieldOfViewRadians,
    aspect,
    zNear,
    zFar,
  );
  var camera = [0, 0, 100];
  var target = [0, 0, 0];
  var up = [0, 1, 0];
  var cameraMatrix = m4.lookAt(camera, target, up);
  var viewMatrix = m4.inverse(cameraMatrix);
  var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
  const hashScene = {
    aspect: aspect,
    zNear: zNear,
    zFar: zFar,
    projectionMatrix: projectionMatrix,
    camera: camera,
    target: target,
    up: up,
    cameraMatrix: cameraMatrix,
    viewMatrix: viewMatrix,
    viewProjectionMatrix: viewProjectionMatrix,
  };
  return hashScene;
}

export function recalculateScene(hashScene) {
  hashScene.cameraMatrix = m4.lookAt(
    hashScene.camera,
    hashScene.target,
    hashScene.up,
  );
  hashScene.viewMatrix = m4.inverse(hashScene.cameraMatrix);
  hashScene.viewProjectionMatrix = m4.multiply(
    hashScene.projectionMatrix,
    hashScene.viewMatrix,
  );
}
