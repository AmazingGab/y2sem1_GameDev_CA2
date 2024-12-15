import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import {Images} from '../engine/resources.js';
import Player from './player.js';

class Trap extends GameObject {

    constructor(x, y, w, h) {
        super(x, y);

        this.addComponent(new Physics({x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}));
        this.addComponent(new Renderer("yellow",w,h, Images.trap));
        
        this.activated = false
    }

    update(deltaTime) {
        const physics = this.getComponent(Physics);
        const player = this.game.gameObjects.find((obj)=>obj instanceof Player);
        
        let distance = Math.abs(player.x - this.x)
        if (distance <= 150 && !this.activated) {
            this.activated = true;
            physics.velocity.y = -500;
            setTimeout(() => (physics.velocity.y = 0), 50);
        }

        super.update(deltaTime);
    }

}
export default Trap
