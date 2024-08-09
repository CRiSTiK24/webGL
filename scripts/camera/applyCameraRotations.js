import {
  create as quatCreate,
  setAxisAngle,
} from "../lib/quarternions/quat.js";
import { create as vecCreate, transformQuat } from "../lib/quarternions/vec3";

export function applyCameraRotations(rx, ry, rz, scene) {
  applyCameraRotationsQuat(rx, ry, rz, scene);
}

export function applyCameraRotationsQuat(rx, ry, rz, scene) {
  var distance = m4.distance(scene.camera, scene.target);

  var axisZ = m4.normalize(m4.subtractVectors(scene.target, scene.camera));
  var axisX = m4.normalize(m4.cross(scene.up, axisZ));
  var xRotationQuat = quatCreate();
  setAxisAngle(xRotationQuat, axisX, rx);
  var yRotationQuat = quatCreate();
  setAxisAngle(yRotationQuat, scene.up, ry);

  var targetVector = axisZ;
  var xRotated = vecCreate();
  var xyRotated = vecCreate();
  transformQuat(xRotated, targetVector, xRotationQuat);
  m4.normalize(xRotated);
  transformQuat(xyRotated, xRotated, yRotationQuat);
  m4.normalize(xyRotated);
  scene.target = m4.addVectors(
    m4.scaleVector(xyRotated, distance),
    scene.camera,
  );
}
