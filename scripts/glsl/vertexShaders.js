export var directionalLightingVS = `#version 300 es

in vec4 a_position;
in vec3 a_normal;
in vec2 a_texcoord;
uniform mat4 u_worldViewProjection;
uniform mat4 u_worldInverseTranspose;

out vec3 v_normal;
out vec2 v_texcoord;



void main() {
  gl_Position = u_worldViewProjection * a_position;

  v_normal = mat3(u_worldInverseTranspose) * a_normal;
    v_texcoord = a_texcoord;
}
`;
