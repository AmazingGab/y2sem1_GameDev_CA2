import Game from '../engine/game.js';
import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Confiner from '../engine/confiner.js';
import Player from './player.js';
import Floor from './floor.js';
import Barrel from './barrel.js';
import Checkpoint from './checkpoint.js';
import Hammer from './hammer.js';
import HealthPack from './healthpack.js';
import Decoration from './decoration.js';
import ImageTextUI from './imagetextui.js';
import Trap from './trap.js';
import {Images, AudioFiles} from '../engine/resources.js';

class Level extends Game {
    constructor(canvasId)
    {
        super(canvasId);
        //generates a level
        this.decorationArray = [Images.tree1, Images.tree2, Images.flowers, Images.bush1, Images.bush2];
        this.mapGen(0, this.canvas.height, true);
        //player
        
        let hammerUI = new ImageTextUI(20, 220, 100, 100, Images.hammer, 0);
        let shieldUI = new ImageTextUI(130, 220, 100, 100, Images.shield, 0);        
        let healthUI = new ImageTextUI(240, 220, 100, 100, Images.heart, 0);
        let levelUI = new ImageTextUI(350, 220, 100, 100, Images.star, 0);
        this.addGameObject(shieldUI);
        this.addGameObject(hammerUI);
        this.addGameObject(healthUI);
        this.addGameObject(levelUI);
        const player = new Player(10, this.canvas.height+100, 64, 64, shieldUI, hammerUI, healthUI, levelUI);
        this.addGameObject(player);
        this.plr = player;
        //camera confiner
        this.camera.confiner = new Confiner(-50, -5000, 11000, 9999999);
        this.camera.target = player;
        AudioFiles.music.play();
        this.finalPlace = false;
        this.time = 5000;
        this.canSpawn = true;  
    }
    
    update(deltaTime) {
        //spawns barrels x time
        if (this.canSpawn) {
            this.canSpawn = false;
            this.addGameObject(new Barrel(12500, this.canvas.height - 10000,25,25));
            setTimeout(() => (this.canSpawn = true), this.time);
        }
        
        //checking if player won a round then decrease time
        if (this.plr.x >= 9999.99) {
            this.time-=200;
        }
        
        super.update(deltaTime);
    }

    //generates map until it reaches nearly 9500 and then places end bit
    mapGen(x, y, start) {
        if (x <= 9500) {
            if (start) {
                this.startMap(x, y);
            } else {
                this.chosenMap(x, y, Math.floor(Math.random() * 7) + 1);
            }
        } else {
            if (!this.finalPlace) {
                this.finalPlace = true;
                this.chosenMap(x, y, 8);
            }
        }

    }

    //sets up start area
    startMap(x, y) {
        let diffX = x;
        
        const floors = [
            //first platform
            new Floor(x, y, 32, 96, Images.smoothLeft, true),
            new Floor(x += 32, y, 32 * 10, 96, Images.smoothMiddle, true),
            new Floor(x += 320, y, 32, 96, Images.smoothRight, true),
            //second platform
            new Floor(x += (32 + 160), y, 32, 96, Images.smoothLeft, true),
            new Floor(x += 32, y, 32 * 10, 96, Images.smoothMiddle, true)
        ];
        
        this.addGameObject(new Decoration(diffX, y-200, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
        this.addGameObject(new Decoration(diffX+64+(32*5), y-200, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
        this.addGameObject(new Decoration(diffX+64+(32*15), y-200, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
        this.addGameObject(new Checkpoint(diffX+32+(32*2), y-100, 160, 100));
        this.addFloors(floors);
        this.mapGen(x + 320, y - 32, false);
    }
    
    //loads up a specific type of location to spawn
    chosenMap(x, y, id) {
        let diffX = x;
        let diffY = y;
        if (id === 1) {
            const floors = [//gradual step
                //first platform
                new Floor(x, y, 32, 96, Images.upFinish, true),
                new Floor(x += 32, y, 32 * 10, 96, Images.smoothMiddle, true),
                //secound but up platform
                new Floor(x += 320, y -= 32, 32, 96, Images.upFinish, true),
                new Floor(x += 32, y, 32 * 10, 96, Images.smoothMiddle, true)
            ];
            
            //decorations
            this.addGameObject(new Decoration(diffX, y-200+32, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            this.addGameObject(new Decoration(diffX+64+(32*5), y-200+32, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            this.addGameObject(new Decoration(diffX+64+(32*15), y-200, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            //adds floors as objects
            this.addFloors(floors);
            //generates a new location after 1 is created
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
            
            this.addGameObject(new Decoration(diffX, y-200+128, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            this.addGameObject(new Decoration(diffX+64+(32*10), y-200+64, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            this.addGameObject(new Decoration(diffX+64+(32*21), y-200, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            this.addFloors(floors);
            this.mapGen(x + 160, y - 32, false);
        } else if (id === 3) { //plain
            const floors = [
                //first platform
                new Floor(x, y, 32, 96, Images.upFinish, true),
                new Floor(x += 32, y, 32 * 30, 96, Images.smoothMiddle, true)
            ];
            
            this.addGameObject(new Decoration(diffX, y-200, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            this.addGameObject(new Decoration(diffX+64+(32*8), y-200, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            this.addGameObject(new Decoration(diffX+64+(32*20), y-200, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            //random collectible to spawn
            this.randomCollectible(diffX+32+(32*15), y);
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
            
            
            this.addGameObject(new Decoration(diffX, y-200+96, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            this.addGameObject(new Decoration(diffX+64+(32*13), y-200+64, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            this.addGameObject(new Decoration(diffX+64+(32*28), y-200+32, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            this.addGameObject(new Decoration(diffX+64+(32*40), y-200, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            this.addFloors(floors);
            this.mapGen(x + (32 * 8), y - 32, false);
        } else if (id === 5) { //plain w trap
            const floors = [
                //first platform
                new Floor(x, y, 32, 96, Images.upFinish, true),
                new Floor(x += 32, y, 32 * 30, 96, Images.smoothMiddle, true)
            ];

            this.addGameObject(new Decoration(diffX, y-200, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            this.addGameObject(new Decoration(diffX+64+(32*8), y-200, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            this.addGameObject(new Decoration(diffX+64+(32*20), y-200, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            this.addGameObject(new Trap(diffX+64+(32*14), y-5, 100, 50));
            console.log("here");
            this.addFloors(floors);
            this.mapGen(x + (32 * 30), y - 32, false);
        } else if (id === 6) { //plain w checkpoint
            
            const floors = [
                //first platform
                new Floor(x, y, 32, 96, Images.upFinish, true),
                new Floor(x += 32, y, 32 * 30, 96, Images.smoothMiddle, true)
            ];
            
            this.addGameObject(new Decoration(diffX, y-200, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            this.addGameObject(new Decoration(diffX+64+(32*8), y-200, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            this.addGameObject(new Decoration(diffX+64+(32*20), y-200, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            this.addGameObject(new Checkpoint(diffX+32+(32*15), y-100, 160, 100));
            this.addFloors(floors);
            this.mapGen(x + (32 * 30), y - 32, false);
        } else if (id === 7) { //parkour
            
            this.addGameObject(new Decoration(diffX, y-200, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            this.addGameObject(new Decoration(diffX+64+(32*8), y-200, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            this.addGameObject(new Decoration(diffX+64+(32*20), y-200, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            
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
        } else if (id === 8) { //end
            const floors = [
                //first platform
                new Floor(x, y, 32, 96, Images.upFinish, true),
                new Floor(x += 32, y, 32 * 200, 96, Images.smoothMiddle, true)
            ];
            
            this.addGameObject(new Decoration(diffX, y-200, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            this.addGameObject(new Decoration(diffX+64+(32*8), y-200, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            this.addGameObject(new Decoration(diffX+64+(32*20), y-200, 200, 200, this.decorationArray[Math.floor(Math.random() * 5)]));
            this.addFloors(floors);
        }
    }

    //adds the floors as objects in the game
    addFloors(floors) {
        for (const floor of floors) {
            this.addGameObject(floor);
            //adding bottom to it so its not the bare top
            let renderer = floor.getComponent(Renderer);
            let isStep = renderer.image === Images.upFinish;
            let isMiddleSection = renderer.width !== 32;
            //fixes weird glitch were there would be 1 pixel gaps so my fix is to overlap it
            if (isStep || isMiddleSection) {
                this.addGameObject(new Floor(floor.x - 1, floor.y + 95, renderer.width + 2, 400, null, false));
            } else {
                this.addGameObject(new Floor(floor.x, floor.y + 95, renderer.width, 400, null, false));
            }

        }
    }

    //this is for the parkour location to add it as an object
    addJumpFloors(platforms) {
        for (const floor of platforms) {
            this.addGameObject(floor);
        }
    }
    
    //decides whether a collectible should spawn
    randomCollectible(x, y) {
        if (Math.floor(Math.random() * 50) + 1 >= 40) {
            if (Math.floor(Math.random() * 10) + 1 >= 8) {
                this.addGameObject(new Hammer(x, y-50));
            }
            else {
                this.addGameObject(new HealthPack(x, y-50));
            }
        }
                
    }

}
export default Level

