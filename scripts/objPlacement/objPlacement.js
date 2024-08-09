import { cubeType, drawCuboProva } from "../geometries/cuboProva";
import { degToRad } from "../math/trigonometry";

export function getObjects(gl, attributeLocations, VAOstruct) {
  addObject(gl, attributeLocations, VAOstruct, "Cube");
  getTransformationsVAOs(VAOstruct, 0, 0, 0, 0, 0, 0);
}

function getTransformationsVAOs(VAOstruct, tx, ty, tz, rx, ry, rz) {
  var positionMatrix = m4.translation(tx, ty, tz);
  m4.xRotate(positionMatrix, degToRad(rx), positionMatrix);
  m4.yRotate(positionMatrix, degToRad(ry), positionMatrix);
  m4.zRotate(positionMatrix, degToRad(rz), positionMatrix);
  VAOstruct.tranformationsOfVAOs.push(positionMatrix);
}

function addObject(gl, attributeLocations, VAOstruct, objType) {
  if (objType === "Cube") {
    addCube(gl, attributeLocations, VAOstruct);
  }
}

function addCube(gl, attributeLocations, VAOstruct) {
  VAOstruct.VAOs.push(drawCuboProva(gl, attributeLocations));
  VAOstruct.typesOfVAOs.push(cubeType);
}
