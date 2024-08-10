var obj = {
  vertices: [
    -0.059048, 1, -2.523694, 0.059048, 1, 2.523694, 0.059048, 1, -2.523694,
    0.059048, 1, 2.523694, -0.059048, -1, 2.523694, 0.059048, -1, 2.523694,
    -0.059048, 1, 2.523694, -0.059048, -1, -2.523694, -0.059048, -1, 2.523694,
    0.059048, -1, -2.523694, -0.059048, -1, 2.523694, -0.059048, -1, -2.523694,
    0.059048, 1, -2.523694, 0.059048, -1, 2.523694, 0.059048, -1, -2.523694,
    -0.059048, 1, -2.523694, 0.059048, -1, -2.523694, -0.059048, -1, -2.523694,
    -0.059048, 1, 2.523694, -0.059048, 1, 2.523694, -0.059048, 1, -2.523694,
    0.059048, -1, 2.523694, 0.059048, 1, 2.523694, 0.059048, 1, -2.523694,
  ],
  normals: [
    0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, -1, 0, 0, -1, 0, 0,
    -1, 0, 0, 0, -1, 0, 0, -1, 0, 0, -1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, -1,
    0, 0, -1, 0, 0, -1, 0, 1, 0, 0, 0, 1, -1, 0, 0, 0, -1, 0, 1, 0, 0, 0, 0, -1,
  ],
  texcoords: [
    0.875, 0.5, 0.625, 0.75, 0.625, 0.5, 0.625, 0.75, 0.375, 1, 0.375, 0.75,
    0.625, 0, 0.375, 0.25, 0.375, 0, 0.375, 0.5, 0.125, 0.75, 0.125, 0.5, 0.625,
    0.5, 0.375, 0.75, 0.375, 0.5, 0.625, 0.25, 0.375, 0.5, 0.375, 0.25, 0.875,
    0.75, 0.625, 1, 0.625, 0.25, 0.375, 0.75, 0.625, 0.75, 0.625, 0.5,
  ],
  indices: [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0, 18, 1, 3,
    19, 4, 6, 20, 7, 9, 21, 10, 12, 22, 13, 15, 23, 16,
  ],
};

export function drawWall(gl, attributeLocations) {
  var idBufferVertices = gl.createBuffer();
  var vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.enableVertexAttribArray(attributeLocations.position);
  gl.bindBuffer(gl.ARRAY_BUFFER, idBufferVertices);

  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(obj.vertices),
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
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(obj.normals), gl.STATIC_DRAW);

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
    new Uint16Array(obj.indices),
    gl.STATIC_DRAW,
  );

  var texcoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(obj.texcoords),
    gl.STATIC_DRAW,
  );

  // Turn on the attribute
  gl.enableVertexAttribArray(attributeLocations.texcoord);

  // Tell the attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
  size = 2; // 2 components per iteration
  type = gl.FLOAT; // the data is 32bit floating point values
  normalize = true; // convert from 0-255 to 0.0-1.0
  stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next texcoord
  offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(
    attributeLocations.texcoord,
    size,
    type,
    normalize,
    stride,
    offset,
  );

  return vao;
}

export var wallType = {
  count: 12 * 3, //12 triangle faces * 3 vertex per face
  indexedBool: true,
};
