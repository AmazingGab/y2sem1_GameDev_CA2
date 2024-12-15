import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import {Images} from '../engine/resources.js';
import Collectible from './collectible.js';

class Hammer extends Collectible{
    constructor(x,y,w,h, color="yellow") {
        super(x,y);
        
        this.getComponent(Renderer).image = Images.hammer;
        this.tag = "hammer";
        
    }   
}

export default Hammer