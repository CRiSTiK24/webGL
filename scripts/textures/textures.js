import textureImage from "./vertical_atlas.png";

export function getTextures(gl, attributeLocations) {
  gl.enableVertexAttribArray(attributeLocations.depth);

  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D_ARRAY, texture);

  // Set texture parameters
  gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_T, gl.REPEAT);

  // Asynchronously load an image
  var image = new Image();
  image.src = textureImage;

  image.addEventListener("load", function () {
    gl.bindTexture(gl.TEXTURE_2D_ARRAY, texture);

    // Assuming each layer is 16x16 and you have 1024 layers
    gl.texImage3D(
      gl.TEXTURE_2D_ARRAY,
      0,
      gl.RGBA,
      16, // Width
      16, // Height
      1024, // Depth (number of layers)
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      image, // Provide the entire image assuming it's structured correctly
    );

    gl.generateMipmap(gl.TEXTURE_2D_ARRAY);
    gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_BASE_LEVEL, 0);
  });
  return texture;
}
