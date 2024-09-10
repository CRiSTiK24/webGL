# webGL
## How to run
You need node installed of which Node8 and Node22 have been tested that work without issues.
With that you can use the following command to install the packages needed:
```bash
npm install
```
After that, you can use the following command to run locally the server with the website:
```bash
npm run start
```
## Controls
You'll be able to control your character with the `mouse and keyboard` once
you click at the canvas. It follows the standard fps movement of moving on the ground
towards where you are pointing with `WASD`.

If you press `ESC`, you can interact with the different selectors on top, allowing to
change different light intensities and colors of 3 main light sources. The first is the `Sun`,
which is a point lightsource from the celestial body behind of the character spawn in the sky.
The second one is the `Lightbulb`, which is another point lightsource from the lightbulb object
in the room where you spawn. Finally the `Lantern` is a spotlight that illuminates where the player (You)
is looking at.
