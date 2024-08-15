export var directionalLightingFS = `#version 300 es
precision highp float;
precision mediump sampler2DArray;

in vec3 v_normal;
in vec2 v_texcoord;
in float v_depth;
in vec3 v_surfaceToLight;
in vec3 v_surfaceToView;


uniform vec4 u_color;
uniform sampler2DArray u_texture;
uniform float u_shininess;


out vec4 outColor;

void main() {
  vec3 normal = normalize(v_normal);
  vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
  vec3 surfaceToViewDirection = normalize(v_surfaceToView);
  vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);
  float light = dot(normal, surfaceToLightDirection);
  float specular = 0.0;
  if (light > 0.0) {
    specular = pow(dot(normal, halfVector), u_shininess);
  }

  outColor = texture(u_texture, vec3(v_texcoord,v_depth));
  outColor.rgb *= light;
  outColor.rgb += specular;
}
`;
