import Game from '../engine/game.js';
import Button from './button.js';
import {Images} from '../engine/resources.js';

class LoadingScreen extends Game {
    constructor(canvasId) {
        super(canvasId);
        const startBtn = new Button(this.canvas.width/2-125, this.canvas.height/2+200, 250, 100, 'green', "PLAY");  
        this.addGameObject(startBtn);
        this.camera.target = startBtn;
    }
}

export default LoadingScreen;
