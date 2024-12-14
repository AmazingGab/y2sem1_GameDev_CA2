import Game from '../engine/game.js';
import Floor from './floor.js';
import {Images} from '../engine/resources.js';

class MapGenerator extends Game {
    constructor(x, y, start) {
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

            new Floor(x + 32 + 320 + 32, y, 32, 96, Images.smoothLeft, true),
            new Floor(x + 32 + 320 + 32 + 32, y, 32 * 10, 96, Images.smoothMiddle, true)
        ];

        for (const floor of floors) {
            let renderer = floor.getComponent(Renderer);
            this.addGameObject(floor);
            this.addGameObject(new Floor(renderer.x, renderer.y+96, renderer.width, 1000, null, false));
        }
    }
}
export default MapGenerator

//generates between 7 maps 
//within it calls its own 

