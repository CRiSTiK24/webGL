import { translateCamera } from "../camera/applyCameraTransformations";

export function initKeyboardControls(scene) {
  document.addEventListener("keydown", function (event) {
    keysPressed[event.key] = true;
    requestAnimationFrame(handleKeyEvents);
  });

  document.addEventListener("keyup", (event) => {
    keysPressed[event.key] = false;
  });
  var lastTimestamp = 0;
  var keysPressed = {};

  function handleKeyEvents(timestamp) {
    var dt = (timestamp - lastTimestamp) / 1000; // Convert to seconds
    if (dt < 0.001) {
      requestAnimationFrame(handleKeyEvents);
      return;
    }
    handleTranslations();
    lastTimestamp = timestamp;
  }

  function handleTranslations() {
    var direction = 0;
    var speed = 1;
    var translation = [0, 0, 0];
    if (keysPressed["w"]) {
      direction += speed;
    }
    if (keysPressed["s"]) {
      direction += -speed;
    }
    translation[2] += direction;
    direction = 0;

    if (keysPressed["a"]) {
      direction += -speed;
    }
    if (keysPressed["d"]) {
      direction += speed;
    }
    translation[0] += direction;

    translateCamera(translation, scene);
  }
}
