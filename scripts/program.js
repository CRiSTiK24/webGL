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
  var worldViewProjectionLocation = gl.getUniformLocation(
    program,
    "u_worldViewProjection",
  );
  var worldInverseTransposeLocation = gl.getUniformLocation(
    program,
    "u_worldInverseTranspose",
  );
  var colorLocation = gl.getUniformLocation(program, "u_color");
  var lightWorldPositionLocation = gl.getUniformLocation(
    program,
    "u_lightWorldPosition",
  );
  var viewWorldPositionLocation = gl.getUniformLocation(
    program,
    "u_viewWorldPosition",
  );
  var shininessLocation = gl.getUniformLocation(program, "u_shininess");

  var worldLocation = gl.getUniformLocation(program, "u_world");
  const hashUniformLocations = {
    viewProjection: worldViewProjectionLocation,
    viewWorld: viewWorldPositionLocation,
    inverseTranspose: worldInverseTransposeLocation,
    color: colorLocation,
    lightPosition: lightWorldPositionLocation,
    world: worldLocation,
    shininess: shininessLocation,
  };
  return hashUniformLocations;
}
