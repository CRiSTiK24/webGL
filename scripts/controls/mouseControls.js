import { degToRad } from "../math/trigonometry";
import { applyCameraRotations } from "../camera/applyCameraRotations";

export function initMouseControls(scene, canvas) {
  canvas.addEventListener("click", async () => {
    canvas.requestPointerLock(); // Standard pointer lock request
  });

  var lastMove = { x: 0, y: 0 };

  document.addEventListener(
    "mousemove",
    function (event) {
      if (document.pointerLockElement !== canvas) {
        return;
      }
      lastMove.x = event.movementX;
      lastMove.y = event.movementY;
      requestAnimationFrame(handleMouseMovement);
    },
    false,
  );
  var lastTimestamp = 0;
  var speed = 0.1;
  function handleMouseMovement(timestamp) {
    var dt = (timestamp - lastTimestamp) / 1000; // Convert to seconds
    if (dt < 0.001) {
      requestAnimationFrame(handleMouseMovement);
      return;
    }

    handleRotations();
    lastTimestamp = timestamp;
  }

  function handleRotations() {
    var pitch = -degToRad(Math.ceil(lastMove.y) * speed);

    var yaw = -degToRad(Math.ceil(lastMove.x) * speed);

    if (Math.abs(pitch) > 0.001 || Math.abs(yaw) > 0.001) {
      applyCameraRotations(pitch, yaw, 0, scene);
    }

    lastMove.x = 0;
    lastMove.y = 0;
  }
}
