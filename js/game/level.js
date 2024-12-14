import Game from '../engine/game.js';
import Renderer from '../engine/renderer.js';
import Confiner from '../engine/confiner.js';
import Player from './player.js';
import Floor from './floor.js';
import {Images} from '../engine/resources.js';

class Level extends Game {
    constructor(canvasId)
    {
        super(canvasId);
        const player = new Player(10, this.canvas.height - 100, 64, 64);
        this.addGameObject(player);
        this.camera.confiner = new Confiner(-50, -5000, 11000, 9999999);
        this.camera.target = player;

        this.finalPlace = false;

        this.mapGen(0, this.canvas.height, true);
    }

    mapGen(x, y, start) {
        if (x <= 10000) {
            if (start) {
                this.startMap(x, y);
            } else {
                this.chosenMap(x, y, Math.floor(Math.random() * 7) + 1);
            }
        } else {
            if (!this.finalPlace) {
                this.finalPlace = true;
                this.chosenMap(x, y, 3);

            }
        }

    }

    startMap(x, y) {
        const floors = [
            //first platform
            new Floor(x, y, 32, 96, Images.smoothLeft, true),
            new Floor(x += 32, y, 32 * 10, 96, Images.smoothMiddle, true),
            new Floor(x += 320, y, 32, 96, Images.smoothRight, true),
            //second platform
            new Floor(x += (32 + 160), y, 32, 96, Images.smoothLeft, true),
            new Floor(x += 32, y, 32 * 10, 96, Images.smoothMiddle, true)
        ];

        this.addFloors(floors);
        this.mapGen(x + 320, y - 32, false);
    }

    chosenMap(x, y, id) {
        console.log(id);
        if (id === 1) {
            const floors = [//gradual step
                //first platform
                new Floor(x, y, 32, 96, Images.upFinish, true),
                new Floor(x += 32, y, 32 * 10, 96, Images.smoothMiddle, true),
                //secound but up platform
                new Floor(x += 320, y -= 32, 32, 96, Images.upFinish, true),
                new Floor(x += 32, y, 32 * 10, 96, Images.smoothMiddle, true)
            ];

            this.addFloors(floors);
            this.mapGen(x + 320, y - 32, false);
        } else if (id === 2) { //staircase
            const floors = [
                //first platform
                new Floor(x, y, 32, 96, Images.upFinish, true),
                new Floor(x += 32, y, 32 * 5, 96, Images.smoothMiddle, true),
                //secound but up platform
                new Floor(x += 160, y -= 32, 32, 96, Images.upFinish, true),
                new Floor(x += 32, y, 32 * 5, 96, Images.smoothMiddle, true),
                //third but up platform
                new Floor(x += 160, y -= 32, 32, 96, Images.upFinish, true),
                new Floor(x += 32, y, 32 * 5, 96, Images.smoothMiddle, true),
                // fifth
                new Floor(x += 160, y -= 32, 32, 96, Images.upFinish, true),
                new Floor(x += 32, y, 32 * 5, 96, Images.smoothMiddle, true),
                //sixth
                new Floor(x += 160, y -= 32, 32, 96, Images.upFinish, true),
                new Floor(x += 32, y, 32 * 5, 96, Images.smoothMiddle, true)
            ];

            this.addFloors(floors);
            this.mapGen(x + 160, y - 32, false);
        } else if (id === 3) { //plain
            const floors = [
                //first platform
                new Floor(x, y, 32, 96, Images.upFinish, true),
                new Floor(x += 32, y, 32 * 30, 96, Images.smoothMiddle, true)
            ];

            this.addFloors(floors);
            this.mapGen(x + (32 * 30), y - 32, false);
        } else if (id === 4) { //steps with gaps
            const floors = [
                //first platform
                new Floor(x, y, 32, 96, Images.upFinish, true),
                new Floor(x += 32, y, 32 * 8, 96, Images.smoothMiddle, true),
                new Floor(x += (32 * 8), y, 32, 96, Images.smoothRight, true),
                //second platform
                new Floor(x += (32 + 128), y -= 32, 32, 96, Images.smoothLeft, true),
                new Floor(x += 32, y, 32 * 8, 96, Images.smoothMiddle, true),
                new Floor(x += (32 * 8), y, 32, 96, Images.smoothRight, true),
                //third
                new Floor(x += (32 + 128), y -= 32, 32, 96, Images.smoothLeft, true),
                new Floor(x += 32, y, 32 * 8, 96, Images.smoothMiddle, true),
                new Floor(x += (32 * 8), y, 32, 96, Images.smoothRight, true),
                //fourth
                new Floor(x += 160, y -= 32, 32, 96, Images.smoothLeft, true),
                new Floor(x += 32, y, 32 * 8, 96, Images.smoothMiddle, true)
            ];

            this.addFloors(floors);
            this.mapGen(x + (32 * 8), y - 32, false);
        } else if (id === 5) { //plain w trap
            const floors = [
                //first platform
                new Floor(x, y, 32, 96, Images.upFinish, true),
                new Floor(x += 32, y, 32 * 30, 96, Images.smoothMiddle, true)
            ];

            this.addFloors(floors);
            this.mapGen(x + (32 * 30), y - 32, false);
        } else if (id === 6) { //plain w checkpoint
            const floors = [
                //first platform
                new Floor(x, y, 32, 96, Images.upFinish, true),
                new Floor(x += 32, y, 32 * 30, 96, Images.smoothMiddle, true)
            ];

            this.addFloors(floors);
            this.mapGen(x + (32 * 30), y - 32, false);
        } else if (id === 7) { //parkour
            let diffX = x;
            let diffY = y;

            const jumpFloors = [
                new Floor(diffX += 96, diffY -= 64, 96, 20, null, false),
                new Floor(diffX += 232, diffY -= 64, 96, 20, null, false),
                new Floor(diffX += 232, diffY -= 64, 96, 20, null, false),
                new Floor(diffX += 232, diffY -= 64, 96, 20, null, false)
            ];

            const floors = [
                //first platform
                new Floor(x, y, 32, 96, Images.upFinish, true),
                new Floor(x += 32, y, 32 * 30, 96, Images.smoothMiddle, true),
                //higher bit
                new Floor(x += (32 * 30) - 1, y -= 160, 32, 96, Images.smoothLeft, true),
                new Floor(x += 32, y, 32 * 5, 96, Images.smoothMiddle, true)
            ];

            this.addJumpFloors(jumpFloors);
            this.addFloors(floors);
            this.mapGen(x + (32 * 5), y - 32, false);
        }
    }

    addFloors(floors) {
        for (const floor of floors) {
            this.addGameObject(floor);
            //adding bottom to it
            let renderer = floor.getComponent(Renderer);
            let isStep = renderer.image === Images.upFinish;
            let isMiddleSection = renderer.width !== 32;
            if (isStep || isMiddleSection) {
                this.addGameObject(new Floor(floor.x - 1, floor.y + 95, renderer.width + 2, 400, null, false));
            } else {
                this.addGameObject(new Floor(floor.x, floor.y + 95, renderer.width, 400, null, false));
            }

        }
    }

    addJumpFloors(platforms) {
        for (const floor of platforms) {
            this.addGameObject(floor);
        }
    }

}
export default Level

