import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import {Images} from '../engine/resources.js';

class Checkpoint extends GameObject{
    constructor(x,y,w,h){
        super(x, y);
        
        this.addComponent(new Renderer("yellow",w,h, Images.checkpoint));
        this.addComponent(new Physics({x:0,y:0}, {x:0,y:0}, {x:0,y:0}));
        
        this.tag = "checkpoint";
    }
}

export default Checkpoint

