import { hslToRgb } from "../math/color";
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

export function initUI(uniformLocations, gl, program) {
  gl.useProgram(program);
  gl.uniform1f(uniformLocations.sunIntensity, 1);
  gl.uniform1f(uniformLocations.lightbulbIntensity, 1);
  gl.uniform1f(uniformLocations.lanternIntensity, 1);
  gl.uniform3fv(uniformLocations.sunLight, [1, 1, 1]);
  gl.uniform3fv(uniformLocations.lightbulbLight, [1, 1, 1]);
  gl.uniform3fv(uniformLocations.lanternLight, [1, 1, 1]);

  const sunIntensity = {
    name: "Sun Light Intensity",
    min: 0,
    max: 5,
    step: 0.1,
    value: 1,
    slide: (event, ui) => {
      updateSunIntensity(ui.value, gl, uniformLocations);
    },
  };
  const lightbulbIntensity = {
    name: "Lightbulb Light Intensity",
    min: 0,
    max: 5,
    step: 0.1,
    value: 1,
    slide: (event, ui) => {
      updateLightbumbIntensity(ui.value, gl, uniformLocations);
    },
  };
  const LanternIntensity = {
    name: "Lantern Light Intensity",
    min: 0,
    max: 5,
    step: 0.1,
    value: 1,
    slide: (event, ui) => {
      updateLanternIntensity(ui.value, gl, uniformLocations);
    },
  };

  var sliderSunIntensity = webglLessonsUI.makeSlider(sunIntensity);
  var sliderLightbulbIntensity = webglLessonsUI.makeSlider(lightbulbIntensity);
  var sliderLanternIntensity = webglLessonsUI.makeSlider(LanternIntensity);

  document
    .getElementById("slider-container")
    .appendChild(sliderSunIntensity.elem);
  document
    .getElementById("slider-container")
    .appendChild(sliderLightbulbIntensity.elem);
  document
    .getElementById("slider-container")
    .appendChild(sliderLanternIntensity.elem);

  const sunColor = {
    name: "Sun Light Color",
    min: 0,
    max: 360,
    step: 1,
    value: 0,
    slide: (event, ui) => {
      updateSunColor(ui.value, gl, uniformLocations);
    },
  };
  const lanternColor = {
    name: "Lantern Light Color",
    min: 0,
    max: 360,
    step: 1,
    value: 0,
    slide: (event, ui) => {
      updateLanternColor(ui.value, gl, uniformLocations);
    },
  };
  const lightbulbColor = {
    name: "Lightbulb Light Color",
    min: 0,
    max: 360,
    step: 1,
    value: 0,
    slide: (event, ui) => {
      updateLightbulbColor(ui.value, gl, uniformLocations);
    },
  };
  var sliderSunColor = webglLessonsUI.makeSlider(sunColor);
  var sliderLanternColor = webglLessonsUI.makeSlider(lanternColor);
  var sliderLightbulbColor = webglLessonsUI.makeSlider(lightbulbColor);

  document.getElementById("slider-container").appendChild(sliderSunColor.elem);
  document
    .getElementById("slider-container")
    .appendChild(sliderLightbulbColor.elem);
  document
    .getElementById("slider-container")
    .appendChild(sliderLanternColor.elem);
}

function updateSunIntensity(value, gl, uniformLocations) {
  gl.uniform1f(uniformLocations.sunIntensity, value);
}
function updateLightbumbIntensity(value, gl, uniformLocations) {
  gl.uniform1f(uniformLocations.lightbulbIntensity, value);
}
function updateLanternIntensity(value, gl, uniformLocations) {
  gl.uniform1f(uniformLocations.lanternIntensity, value);
}

function updateSunColor(hue, gl, uniformLocations) {
  var RGBarray = hslToRgb(hue, 100, 50);
  m4.scaleVector(RGBarray, 1 / 256, RGBarray);
  gl.uniform3fv(uniformLocations.sunLight, RGBarray);
}
function updateLightbulbColor(hue, gl, uniformLocations) {
  var RGBarray = hslToRgb(hue, 100, 50);
  m4.scaleVector(RGBarray, 1 / 256, RGBarray);
  gl.uniform3fv(uniformLocations.lightbulbLight, RGBarray);
}
function updateLanternColor(hue, gl, uniformLocations) {
  var RGBarray = hslToRgb(hue, 100, 50);
  m4.scaleVector(RGBarray, 1 / 256, RGBarray);
  gl.uniform3fv(uniformLocations.lanternLight, RGBarray);
}
