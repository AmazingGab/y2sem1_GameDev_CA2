import GameObject from '../engine/gameobject.js';
import Animation from '../engine/Animation.js';
import Animator from '../engine/Animator.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import Floor from './floor.js';

class Barrel extends GameObject {

    constructor(x, y, w, h) {
        super(x, y);

        this.addComponent(new Physics({x: -150, y: 0}, {x: 0, y: 500}));
        this.animator = new Animator('brown', w, h);
        this.addComponent(this.animator);
        let roll = new Animation('brown', w, h, this.getImages("./resources/images/barrel/rolling", "roll", 8), 16);

        this.animator.addAnimation("roll", roll);
        this.animator.setAnimation("roll");
    }

    update(deltaTime) {
        const physics = this.getComponent(Physics);
        
        if (this.x <= 20 || this.y >= 3000) {
            this.game.removeGameObject(this);
        }

        const floors = this.game.gameObjects.filter((obj) => obj instanceof Floor);
        for (const floor of floors)
        {

            if (physics.isColliding(floor.getComponent(Physics)))
            {
                physics.acceleration.y = 0;
                physics.velocity.y = 0;
                this.y = floor.y - this.getComponent(Renderer).height;
            }

        }

        super.update(deltaTime);
    }

    getImages(path, baseName, numImages)
    {
        let images = [];
        for (let i = 1; i <= numImages; i++)
        {
            let img = new Image();
            img.src = path + "/" + baseName + " (" + i + ").png";
            images.push(img);
        }
        return images;
    }

}
export default Barrel
