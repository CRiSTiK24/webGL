export var directionalLightingFS = `#version 300 es
precision highp float;
precision mediump sampler2DArray;

in vec3 v_normal;
in vec2 v_texcoord;
in float v_depth;


uniform vec3 u_reverseLightDirection;
uniform vec4 u_color;
uniform sampler2DArray u_texture;


out vec4 outColor;

void main() {
  vec3 normal = normalize(v_normal);
  float light = dot(normal, u_reverseLightDirection);
  outColor = texture(u_texture, vec3(v_texcoord,v_depth));
  outColor.rgb *= light;
}
`;
