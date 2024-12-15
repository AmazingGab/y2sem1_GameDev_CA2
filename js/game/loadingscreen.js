import Game from '../engine/game.js';
import Button from './button.js';
import ImageTextUI from './imagetextui.js';
import {Images} from '../engine/resources.js';

class LoadingScreen extends Game {
    constructor(canvasId) {
        super(canvasId);
        const startBtn = new Button(this.canvas.width/2-125, this.canvas.height/2+200, 250, 100, 'green', "PLAY");  
        this.addGameObject(new ImageTextUI(this.canvas.width/2-350, this.canvas.height/2-50, 700, 300, Images.logo,""));
        this.addGameObject(startBtn);
        this.camera.target = startBtn;
    }
}

export default LoadingScreen;
