export var cuboProva = {
  vertices: [
    -7, 7, 0, 7, 7, 0, 7, -4, 0, -7, -4, 0, 7, 7, 0, 7, 7, 10, 7, -4, 10, 7, -4,
    0, 7, 7, 10, -7, 7, 10, -7, -4, 10, 7, -4, 10, -7, 7, 10, -7, 7, 0, -7, -4,
    0, -7, -4, 10, 7, 7, 0, -7, 7, 0, -7, 7, 10, 7, 7, 10, -7, -4, 0, 7, -4, 0,
    7, -4, 10, -7, -4, 10,
  ],
  normals: [
    0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
    0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0,
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0,
  ],
  texcoords: [
    0, 0.5, 0.4102998673915863, 0.5, 0.4102998673915863, 0.8223784565925598, 0,
    0.8223784565925598, 0.7058823704719543, 0, 0.99853515625, 0, 0.99853515625,
    0.3219180703163147, 0.7058823704719543, 0.3219180703163147, 0, 0,
    0.4102998673915863, 0, 0.4102998673915863, 0.3223784565925598, 0,
    0.3223784565925598, 0.4117647111415863, 0, 0.7044175267219543, 0,
    0.7044175267219543, 0.3219180703163147, 0.4117647111415863,
    0.3219180703163147, 0.7058823704719543, 0.849713921546936,
    0.7058823704719543, 0.4399999976158142, 0.99853515625, 0.4399999976158142,
    0.99853515625, 0.849713921546936, 0.7044175267219543, 0.4399999976158142,
    0.7044175267219543, 0.849713921546936, 0.4117647111415863,
    0.849713921546936, 0.4117647111415863, 0.4399999976158142,
  ],
  indices: [
    0, 1, 2, 2, 3, 0, 4, 5, 6, 6, 7, 4, 8, 9, 10, 10, 11, 8, 12, 13, 14, 14, 15,
    12, 16, 17, 18, 19, 16, 18, 20, 21, 22, 22, 23, 20,
  ],
};

export function drawCuboProva(gl, attributeLocations) {
  var idBufferVertices = gl.createBuffer();
  var vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.enableVertexAttribArray(attributeLocations.position);
  gl.bindBuffer(gl.ARRAY_BUFFER, idBufferVertices);

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(cuboProva.vertices),
    gl.STATIC_DRAW,
  );

  var size = 3; // 3 components per iteration
  var type = gl.FLOAT; // the data is 32bit floats
  var normalize = false; // don't normalize the data
  var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  var offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(
    attributeLocations.position,
    size,
    type,
    normalize,
    stride,
    offset,
  );

  var idBufferNormals = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, idBufferNormals);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(cuboProva.normals),
    gl.STATIC_DRAW,
  );

  gl.enableVertexAttribArray(attributeLocations.normal);

  size = 3; // 3 components per iteration
  type = gl.FLOAT; // the data is 32bit floats
  normalize = false; // don't normalize the data
  stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next color
  offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(
    attributeLocations.normal,
    size,
    type,
    normalize,
    stride,
    offset,
  );

  var idBufferIndices = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idBufferIndices);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(cuboProva.indices),
    gl.STATIC_DRAW,
  );

  return vao;
}

export var cubeType = {
  count: 6 * 6,
  indexedBool: true,
};
