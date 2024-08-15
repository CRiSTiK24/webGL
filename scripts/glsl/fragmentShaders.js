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

uniform vec3 u_lightColorSun;
uniform float u_intensitySun;
uniform vec3 u_lightColorLightbulb;
uniform float u_intensityLightbulb;
uniform vec3 u_lightColorLantern;
uniform float u_intensityLantern;


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
  vec3 diffuseSun = u_lightColorSun * lightSun * u_intensitySun;
  vec3 specularSunColor = u_lightColorSun * specularSun * u_intensitySun;

  
  vec3 surfaceToLightDirectionLightbulb = normalize(v_surfaceToLightLightbulb);
  vec3 surfaceToViewDirectionLightbulb = normalize(v_surfaceToView);
  vec3 halfVectorLightbulb = normalize(surfaceToLightDirectionLightbulb + surfaceToViewDirectionLightbulb);
  float lightLightbulb = dot(normal, surfaceToLightDirectionLightbulb);
  float specularLightbulb = 0.0;
  if (lightLightbulb > 0.0) {
    specularLightbulb = pow(dot(normal, halfVectorLightbulb), u_shininessLightbulb);
  }
  vec3 diffuseLightbulb = u_lightColorLightbulb * lightLightbulb * u_intensityLightbulb;
  vec3 specularLightbulbColor = u_lightColorLightbulb * specularLightbulb * u_intensityLightbulb;

  
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
  vec3 diffuseLantern = u_lightColorLantern * lightLantern * u_intensityLantern;
  vec3 specularLanternColor = u_lightColorLantern * specularLantern * u_intensityLantern;


  vec3 finalDiffuse = diffuseSun + diffuseLightbulb + diffuseLantern;
  vec3 finalSpecular = specularSunColor + specularLightbulbColor + specularLanternColor;

  outColor.rgb *= finalDiffuse;
  outColor.rgb += finalSpecular;
  outColor.rgb = clamp(outColor.rgb, 0.0, 1.0);
}
`;
