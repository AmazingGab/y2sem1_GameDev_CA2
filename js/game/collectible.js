import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import {Images} from '../engine/resources.js';


class Collectible extends GameObject{
    constructor(x,y,w,h, color="yellow") {
        super(x,y);
        
        this.addComponent(new Renderer(color,w,h, Images.collectible));
        this.addComponent(new Physics({x:0,y:0}, {x:0,y:0}, {x:0,y:0}));
        
        this.tag = "star";
        
        this.floatTime = 1.0;
        this.timeFloating = this.floatTime;
        this.vDirection = 1;
        
        this.maxWidth = 30;
        this.hDirection = .5;
    }
    
    update(deltaTime) {
        let physics = this.getComponent(Physics);
        let renderer = this.getComponent(Renderer);
        
        if (this.vDirection === 1) {
            physics.velocity.y = -25;
        } else {
            physics.velocity.y = 25;
        }
        
        this.timeFloating -= deltaTime;
        if(this.timeFloating < 0) {
            this.timeFloating = this.floatTime;
            this.vDirection *= -1;
            physics.velocity.y = 0;
        }
        
        this.x += this.hDirection/2*-1;
        renderer.width += this.hDirection;
        if (renderer.width > 30 || renderer.width < 0)   
            this.hDirection *= -1;
        
        super.update(deltaTime);   
    }
}

export default Collectible