import { degToRad, radToDeg } from "../math/trigonometry";

export function resizeCanvasToDisplaySize(canvas) {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  // Check if the canvas is not the same size.
  const needResize =
    canvas.width !== displayWidth || canvas.height !== displayHeight;

  if (needResize) {
    // Make the canvas the same size
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }

  return needResize;
}

export function initUI(fRotationRadiansObj) {
  webglLessonsUI.setupSlider("#fRotation", {
    value: radToDeg(fRotationRadiansObj.value),
    slide: updateRotation,
    min: -360,
    max: 360,
  });

  function updateRotation(event, ui) {
    fRotationRadiansObj.value = degToRad(ui.value);
  }
}
