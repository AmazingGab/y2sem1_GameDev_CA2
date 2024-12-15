import Game from '../engine/game.js';
import Button from './button.js';
import ImageTextUI from './imagetextui.js';
import TextUI from './textui.js';
import {Images} from '../engine/resources.js';

class LoadingScreen extends Game {
    constructor(canvasId) {
        super(canvasId);
        const startBtn = new Button(this.canvas.width/2-125, this.canvas.height/2+200, 250, 100, 'green', "PLAY");  
        this.addGameObject(new ImageTextUI(this.canvas.width/2-350, this.canvas.height/2-50, 700, 300, Images.logo,""));
        this.addGameObject(new TextUI(200, 450, 300, 50, "MOVEMENT",20));
        this.addGameObject(new TextUI(200, 500, 300, 50, "UP ARROW = JUMP",20));
        this.addGameObject(new TextUI(200, 550, 300, 50, "LEFT ARROW = MOVE LEFT",20));
        this.addGameObject(new TextUI(200, 600, 300, 50, "RIGHT ARROW = MOVE RIGHT",20));
        this.addGameObject(new TextUI(1300, 550, 300, 50, "JUST KEEP GOING RIGHT",20));
        this.addGameObject(new TextUI(1300, 600, 300, 50, "YOU MIGHT FIND SOMETHING",20));
        this.addGameObject(startBtn);
        this.camera.target = startBtn;
    }
}

export default LoadingScreen;
