export var directionalLightingFS = `#version 300 es
precision highp float;

in vec3 v_normal;
in vec2 v_texcoord;


uniform vec3 u_reverseLightDirection;
uniform vec4 u_color;
uniform sampler2D u_texture;


out vec4 outColor;

void main() {
  vec3 normal = normalize(v_normal);
  float light = dot(normal, u_reverseLightDirection);
  outColor = texture(u_texture, v_texcoord);
  outColor.rgb *= light;
}
`;
