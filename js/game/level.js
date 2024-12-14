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
        this.camera.target = player;
        this.mapGen(0, this.canvas.height, true);
//        const floors = [
//            new Floor(-32, this.canvas.height, 32, 96, Images.end1),
//            new Floor(0, this.canvas.height, 600, 96, Images.environemnt),
//            new Floor(600, this.canvas.height - 32, 32, 96, Images.end1),
//            new Floor(632, this.canvas.height - 32, 600, 96, Images.environemnt),
//            new Floor(1232, this.canvas.height - 64, 32, 96, Images.end1),
//            new Floor(1264, this.canvas.height - 64, 600, 96, Images.environemnt)
//        ];

//        for (const floor of floors)
//        {
//            this.addGameObject(floor);
//        }

        // map generation 
    }
    
    mapGen(x, y, start) {
        if (x <= 1000) {
            if (start) {
                this.startMap(x, y);
            } else {

            }
        } else {
            //do plain 
        }

    }

    startMap(x, y) {
        const floors = [
            new Floor(x, y, 32, 96, Images.smoothLeft, true),
            new Floor(x + 32, y, 32 * 10, 96, Images.smoothMiddle, true),
            new Floor(x + 32 + 320, y, 32, 96, Images.smoothRight, true),

            new Floor(x + 32 + 320 + 32 + 192, y, 32, 96, Images.smoothLeft, true),
            new Floor(x + 32 + 320 + 32 + 192 + 32, y, 32 * 10, 96, Images.smoothMiddle, true)
        ];
        
        for (const floor of floors) {
            this.addGameObject(floor);
            let renderer = floor.getComponent(Renderer);
            let isMiddleSection = renderer.width !== 32;
            this.addGameObject(new Floor(isMiddleSection ? floor.x-1 : floor.x, floor.y+95, isMiddleSection ? renderer.width+2 : renderer.width, 300, null, false));
        }
    }
    
}
export default Level

