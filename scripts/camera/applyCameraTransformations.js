export function translateCamera(translationArray, scene) {
  var amountMoved = [0, 0, 0];

  var cameraToTargetVector = m4.subtractVectors(scene.target, scene.camera);
  var normalizedVector = m4.normalize(cameraToTargetVector);
  var normalizedVectorXaxis = m4.cross(normalizedVector, scene.up);

  var zAxisMoved = m4.scaleVector(normalizedVector, translationArray[2]);

  m4.addVectors(amountMoved, zAxisMoved, amountMoved);

  var xAxisMoved = m4.scaleVector(normalizedVectorXaxis, translationArray[0]);

  m4.addVectors(amountMoved, xAxisMoved, amountMoved);

  amountMoved[1] = 0;

  scene.camera = m4.addVectors(scene.camera, amountMoved);
  scene.target = m4.addVectors(scene.target, amountMoved);
}
