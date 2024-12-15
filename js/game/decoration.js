import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';

class Decoration extends GameObject {

    constructor(x, y, w, h, image) {
        super(x, y);

        this.addComponent(new Renderer("green",w,h, image));
        this.addComponent(new Physics({x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}));

        this.tag = "decoration";
    }
}
export default Decoration