export function applyCameraRotations(rx, ry, rz, scene) {
  var distance = m4.distance(scene.camera, scene.target);

  var rotationMatrix = m4.identity();
  m4.xRotate(rotationMatrix, rx, rotationMatrix);
  m4.yRotate(rotationMatrix, ry, rotationMatrix);
  m4.zRotate(rotationMatrix, rz, rotationMatrix);
  var cameraToTargetVector = m4.subtractVectors(scene.target, scene.camera);
  var normalizedVector = m4.normalize(cameraToTargetVector);

  var unitVectorRotated = m4.transformPoint(rotationMatrix, normalizedVector);

  var newTargetVector = m4.scaleVector(unitVectorRotated, distance);
  scene.target = m4.addVectors(scene.camera, newTargetVector);
}
