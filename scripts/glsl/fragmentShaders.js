export var directionalLightingFS = `#version 300 es
precision highp float;
precision mediump sampler2DArray;

in vec3 v_normal;
in vec2 v_texcoord;
in float v_depth;
in vec3 v_surfaceToView;

in vec3 v_surfaceToLightSun;
in vec3 v_surfaceToLightLightbulb;
in vec3 v_surfaceToLightLantern;


uniform vec4 u_color;
uniform sampler2DArray u_texture;

uniform float u_shininessSun;
uniform float u_shininessLightbulb;
uniform float u_shininessLantern;

uniform vec3 u_lightDirectionLantern;
uniform float u_limitLantern;


out vec4 outColor;

void main() {
  vec3 normal = normalize(v_normal);
  outColor = texture(u_texture, vec3(v_texcoord,v_depth));
  
  vec3 surfaceToLightDirectionSun = normalize(v_surfaceToLightSun);
  vec3 surfaceToViewDirectionSun = normalize(v_surfaceToView);
  vec3 halfVectorSun = normalize(surfaceToLightDirectionSun + surfaceToViewDirectionSun);
  float lightSun = dot(normal, surfaceToLightDirectionSun);
  float specularSun = 0.0;
  if (lightSun > 0.0) {
    specularSun = pow(dot(normal, halfVectorSun), u_shininessSun);
  }

  
  vec3 surfaceToLightDirectionLightbulb = normalize(v_surfaceToLightLightbulb);
  vec3 surfaceToViewDirectionLightbulb = normalize(v_surfaceToView);
  vec3 halfVectorLightbulb = normalize(surfaceToLightDirectionLightbulb + surfaceToViewDirectionLightbulb);
  float lightLightbulb = dot(normal, surfaceToLightDirectionLightbulb);
  float specularLightbulb = 0.0;
  if (lightLightbulb > 0.0) {
    specularLightbulb = pow(dot(normal, halfVectorLightbulb), u_shininessLightbulb);
  }
  
  vec3 surfaceToLightDirectionLantern = normalize(v_surfaceToLightLantern);
  vec3 surfaceToViewDirectionLantern = normalize(v_surfaceToView);
  vec3 halfVectorLantern = normalize(surfaceToLightDirectionLantern + surfaceToViewDirectionLantern);
  float lightLantern = 0.0;
  float specularLantern = 0.0;
  float dotFromDirectionLantern = dot(surfaceToLightDirectionLantern,
                               -u_lightDirectionLantern);
  if (dotFromDirectionLantern >= u_limitLantern) {
    lightLantern = dot(normal, surfaceToLightDirectionLantern);
    if (lightLantern > 0.0) {
      specularLantern = pow(dot(normal, halfVectorLantern), u_shininessLantern);
    }
  }

  outColor.rgb *= (lightSun+lightLightbulb+lightLantern);
  outColor.rgb += specularSun + specularLightbulb + specularLantern;
  outColor.rgb = clamp(outColor.rgb, 0.0, 1.0);
}
`;
