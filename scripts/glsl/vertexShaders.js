export var directionalLightingVS = `#version 300 es

in vec4 a_position;
in vec3 a_normal;
in vec2 a_texcoord;
in float a_depth;

uniform vec3 u_lightWorldPosition;
uniform vec3 u_viewWorldPosition;

uniform mat4 u_world;
uniform mat4 u_worldViewProjection;
uniform mat4 u_worldInverseTranspose;

out vec3 v_normal;
out vec2 v_texcoord;
out float v_depth;
out vec3 v_surfaceToLight;
out vec3 v_surfaceToView;



void main() {
  gl_Position = u_worldViewProjection * a_position;
  v_normal = mat3(u_worldInverseTranspose) * a_normal;
  v_texcoord = a_texcoord;
  v_depth = a_depth;
  vec3 surfaceWorldPosition = (u_world * a_position).xyz;
  v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;
  v_surfaceToView = u_viewWorldPosition - surfaceWorldPosition;
}
`;
