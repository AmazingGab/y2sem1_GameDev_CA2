import Game from '../engine/game.js';
import Renderer from '../engine/renderer.js';
import Confiner from '../engine/confiner.js';
import Player from './player.js';
import Floor from './floor.js'
import {Images} from '../engine/resources.js'

class Level extends Game {
    constructor(canvasId)
    {
        super(canvasId);
        const player = new Player(10, this.canvas.height - 100, 80, 70);
        this.addGameObject(player);
        this.camera.target = player;
        const floors = [
            new Floor(0, this.canvas.height, 192, 96, Images.environemnt),
            new Floor(200, this.canvas.height - 32, 192, 96, Images.environemnt),
            new Floor(400, this.canvas.height - 64, 192, 96, Images.environemnt)
        ];

        for (const floor of floors)
        {
            this.addGameObject(floor);
            
        }
        
        // map generation 
    }
} export default Level

