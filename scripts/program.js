import { directionalLightingFS } from "./glsl/fragmentShaders.js";
import { directionalLightingVS } from "./glsl/vertexShaders";

export function createProgram(gl) {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, directionalLightingVS);
  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(vertexShader));
  }
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, directionalLightingFS);
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(fragmentShader));
  }
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program));
  }
  return program;
}

export function getAttributeLocations(gl, program) {
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  var normalAttributeLocation = gl.getAttribLocation(program, "a_normal");
  var texcoordAttributeLocation = gl.getAttribLocation(program, "a_texcoord");
  var depthAttributeLocation = gl.getAttribLocation(program, "a_depth");
  const hashAttribtuteLocations = {
    position: positionAttributeLocation,
    normal: normalAttributeLocation,
    texcoord: texcoordAttributeLocation,
    depth: depthAttributeLocation,
  };

  return hashAttribtuteLocations;
}

export function getUniformLocations(gl, program) {
  var worldLocation = gl.getUniformLocation(program, "u_world");
  var worldViewProjectionLocation = gl.getUniformLocation(
    program,
    "u_worldViewProjection",
  );
  var worldInverseTransposeLocation = gl.getUniformLocation(
    program,
    "u_worldInverseTranspose",
  );
  var colorLocation = gl.getUniformLocation(program, "u_color");
  var viewWorldPositionLocation = gl.getUniformLocation(
    program,
    "u_viewWorldPosition",
  );
  var shininessSunLocation = gl.getUniformLocation(program, "u_shininessSun");
  var sunlightWorldPositionLocation = gl.getUniformLocation(
    program,
    "u_lightWorldPositionSun",
  );
  var shininessLightbulbLocation = gl.getUniformLocation(
    program,
    "u_shininessLightbulb",
  );
  var lightbulbWorldPositionLocation = gl.getUniformLocation(
    program,
    "u_lightWorldPositionLightbulb",
  );
  var shininessLanternLocation = gl.getUniformLocation(
    program,
    "u_shininessLantern",
  );
  var lanternWorldPositionLocation = gl.getUniformLocation(
    program,
    "u_lightWorldPositionLantern",
  );
  var limitLantern = gl.getUniformLocation(program, "u_limitLantern");
  var directionLantern = gl.getUniformLocation(
    program,
    "u_lightDirectionLantern",
  );
  var sunLight = gl.getUniformLocation(program, "u_lightColorSun");
  var sunIntensity = gl.getUniformLocation(program, "u_intensitySun");
  var lightbulbLight = gl.getUniformLocation(program, "u_lightColorLightbulb");
  var lightbulbIntensity = gl.getUniformLocation(
    program,
    "u_intensityLightbulb",
  );
  var lanternLight = gl.getUniformLocation(program, "u_lightColorLantern");
  var lanternIntensity = gl.getUniformLocation(program, "u_intensityLantern");

  const hashUniformLocations = {
    viewProjection: worldViewProjectionLocation,
    viewWorld: viewWorldPositionLocation,
    inverseTranspose: worldInverseTransposeLocation,
    color: colorLocation,
    sunlightPosition: sunlightWorldPositionLocation,
    world: worldLocation,
    shininessSun: shininessSunLocation,
    lightbulbPosition: lightbulbWorldPositionLocation,
    shininessLightbulb: shininessLightbulbLocation,
    lanternPosition: lanternWorldPositionLocation,
    shininessLantern: shininessLanternLocation,
    limitLantern: limitLantern,
    directionLantern: directionLantern,
    sunLight: sunLight,
    sunIntensity: sunIntensity,
    lightbulbLight: lightbulbLight,
    lightbulbIntensity: lightbulbIntensity,
    lanternLight: lanternLight,
    lanternIntensity: lanternIntensity,
  };
  return hashUniformLocations;
}
