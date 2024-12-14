import GameObject from '../engine/gameobject.js';
import HorizontalTileRenderer from '../engine/horizontalTileRenderer.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';


class Floor extends GameObject {
    constructor(x, y, w, h, img, textured, color = "#3A2411")
    {
        super(x, y);
        if (textured) {
            this.addComponent(new HorizontalTileRenderer(color, w, h, img));
        }
        else {
            this.addComponent(new Renderer(color, w, h));
        }
        this.addComponent(new Physics({x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}));

        this.tag = "floor";
    }
}
export default Floor

