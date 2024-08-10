import { cubeType, drawCuboProva } from "../geometries/cuboProva";
import { degToRad } from "../math/trigonometry";
import { drawWall, wallType } from "../geometries/wall";

export function getObjects(gl, attributeLocations, VAOstruct) {
  addObject(gl, attributeLocations, VAOstruct, "Wall");
  getTransformationsVAOs(VAOstruct, 0, 0, 0, 0, 90, 0, 1, 4, 4); //frontWall
  addObject(gl, attributeLocations, VAOstruct, "Wall");
  getTransformationsVAOs(VAOstruct, 0, 0, 20, 0, 90, 0, 1, 4, 4); //backWall
  addObject(gl, attributeLocations, VAOstruct, "Wall");
  getTransformationsVAOs(VAOstruct, 10, 0, 10, 0, 0, 0, 1, 4, 4); //rightWall
  addObject(gl, attributeLocations, VAOstruct, "Wall");
  getTransformationsVAOs(VAOstruct, -10, 0, 10, 0, 0, 0, 1, 4, 4); //leftWall
  addObject(gl, attributeLocations, VAOstruct, "Wall");
  getTransformationsVAOs(VAOstruct, 0, -4, 10, 0, 0, 90, 1, 10, 4); //floor
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
}

function addCube(gl, attributeLocations, VAOstruct) {
  VAOstruct.VAOs.push(drawCuboProva(gl, attributeLocations));
  VAOstruct.typesOfVAOs.push(cubeType);
}
function addWall(gl, attributeLocations, VAOstruct) {
  VAOstruct.VAOs.push(drawWall(gl, attributeLocations));
  VAOstruct.typesOfVAOs.push(wallType);
}
