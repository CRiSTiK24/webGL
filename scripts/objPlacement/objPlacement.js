import { cubeType, drawCuboProva } from "../geometries/cuboProva";
import { degToRad } from "../math/trigonometry";
import { drawWall, wallType } from "../geometries/wall";
import { drawWoodTable, woodTableType } from "../geometries/woodTable";
import { bedType, drawBed } from "../geometries/bed";
import { drawLightBulb, lightbulbType } from "../geometries/lightbulb";
import { drawSun, sunType } from "../geometries/sun";

export function getObjects(gl, attributeLocations, VAOstruct) {
  addObject(gl, attributeLocations, VAOstruct, "Wall");
  getTransformationsVAOs(VAOstruct, 0, 0, 0, 0, 90, 0, 1, 6, 4); //frontWall
  addObject(gl, attributeLocations, VAOstruct, "Wall");
  getTransformationsVAOs(VAOstruct, 0, 0, 20, 0, 90, 0, 1, 6, 4); //backWall
  addObject(gl, attributeLocations, VAOstruct, "Wall");
  getTransformationsVAOs(VAOstruct, 10, 0, 10, 0, 0, 0, 1, 6, 4); //rightWall
  addObject(gl, attributeLocations, VAOstruct, "Wall");
  getTransformationsVAOs(VAOstruct, -10, 0, 10, 0, 0, 0, 1, 6, 4); //leftWall
  addObject(gl, attributeLocations, VAOstruct, "Wall");
  getTransformationsVAOs(VAOstruct, 0, -6, 10, 0, 0, 90, 1, 10, 4); //floor

  addObject(gl, attributeLocations, VAOstruct, "WoodTable");
  getTransformationsVAOs(VAOstruct, -5, -8, 5, 0, 0, 0, 10, 10, 10);

  addObject(gl, attributeLocations, VAOstruct, "Bed");
  getTransformationsVAOs(VAOstruct, 6.9, -5, 2, 0, 270, 0, 3, 3, 3);

  addObject(gl, attributeLocations, VAOstruct, "Lightbulb");
  getTransformationsVAOs(VAOstruct, 0, 4, 0, 0, 0, 0, 10, 10, 10);

  addObject(gl, attributeLocations, VAOstruct, "Sun");
  getTransformationsVAOs(VAOstruct, 40, 160, 400, 0, 0, 0, 10, 10, 10);
}

function getTransformationsVAOs(VAOstruct, tx, ty, tz, rx, ry, rz, sx, sy, sz) {
  var positionMatrix = m4.translation(tx, ty, tz);
  m4.xRotate(positionMatrix, degToRad(rx), positionMatrix);
  m4.yRotate(positionMatrix, degToRad(ry), positionMatrix);
  m4.zRotate(positionMatrix, degToRad(rz), positionMatrix);
  m4.scale(positionMatrix, sx, sy, sz, positionMatrix);
  VAOstruct.tranformationsOfVAOs.push(positionMatrix);
}

function addObject(gl, attributeLocations, VAOstruct, objType) {
  if (objType === "Cube") {
    addCube(gl, attributeLocations, VAOstruct);
  }
  if (objType === "Wall") {
    addWall(gl, attributeLocations, VAOstruct);
  }
  if (objType === "WoodTable") {
    addWoodTable(gl, attributeLocations, VAOstruct);
  }
  if (objType === "Bed") {
    addBed(gl, attributeLocations, VAOstruct);
  }
  if (objType === "Lightbulb") {
    addLightbulb(gl, attributeLocations, VAOstruct);
  }
  if (objType === "Sun") {
    addSun(gl, attributeLocations, VAOstruct);
  }
}

function addCube(gl, attributeLocations, VAOstruct) {
  VAOstruct.VAOs.push(drawCuboProva(gl, attributeLocations));
  VAOstruct.typesOfVAOs.push(cubeType);
}
function addWall(gl, attributeLocations, VAOstruct) {
  VAOstruct.VAOs.push(drawWall(gl, attributeLocations));
  VAOstruct.typesOfVAOs.push(wallType);
}
function addWoodTable(gl, attributeLocations, VAOstruct) {
  VAOstruct.VAOs.push(drawWoodTable(gl, attributeLocations));
  VAOstruct.typesOfVAOs.push(woodTableType);
}
function addBed(gl, attributeLocations, VAOstruct) {
  VAOstruct.VAOs.push(drawBed(gl, attributeLocations));
  VAOstruct.typesOfVAOs.push(bedType);
}
function addLightbulb(gl, attributeLocations, VAOstruct) {
  VAOstruct.VAOs.push(drawLightBulb(gl, attributeLocations));
  VAOstruct.typesOfVAOs.push(lightbulbType);
}
function addSun(gl, attributeLocations, VAOstruct) {
  VAOstruct.VAOs.push(drawSun(gl, attributeLocations));
  VAOstruct.typesOfVAOs.push(sunType);
}
