import GameObject from '../engine/gameobject.js';
import HorizontalTileRenderer from '../engine/horizontalTileRenderer.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';


class Floor extends GameObject {
    constructor(x, y, w, h,img, color="brown")
    {
        super(x, y);
        this.addComponent(new HorizontalTileRenderer("brown", w, h, img));
        
        this.addComponent(new Physics({x:0, y:0},{x:0, y:0},{x:0, y:0}));
        
        this.tag = "floor";
    }
} export default Floor

