export var directionalLightingVS = `#version 300 es

in vec4 a_position;
in vec3 a_normal;
in vec2 a_texcoord;
in float a_depth;


uniform vec3 u_viewWorldPosition;
uniform mat4 u_world;
uniform mat4 u_worldViewProjection;
uniform mat4 u_worldInverseTranspose;

uniform vec3 u_lightWorldPositionSun;
uniform vec3 u_lightWorldPositionLightbulb;
uniform vec3 u_lightWorldPositionLantern;
out vec3 v_surfaceToLightSun;
out vec3 v_surfaceToLightLightbulb;
out vec3 v_surfaceToLightLantern;
out vec3 v_surfaceToView;

out vec3 v_normal;
out vec2 v_texcoord;
out float v_depth;




void main() {
  gl_Position = u_worldViewProjection * a_position;
  v_normal = mat3(u_worldInverseTranspose) * a_normal;
  v_texcoord = a_texcoord;
  v_depth = a_depth;
  
  vec3 surfaceWorldPosition = (u_world * a_position).xyz;
  
  v_surfaceToLightLightbulb = u_lightWorldPositionLightbulb - surfaceWorldPosition;
  v_surfaceToLightSun = u_lightWorldPositionSun - surfaceWorldPosition;
  v_surfaceToLightLantern = u_lightWorldPositionLantern - surfaceWorldPosition;
  v_surfaceToView = u_viewWorldPosition - surfaceWorldPosition;
}
`;
