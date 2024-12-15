import GameObject from '../engine/gameobject.js';
import Animation from '../engine/Animation.js';
import Renderer from '../engine/renderer.js';
import Animator from '../engine/Animator.js';
import Physics from '../engine/physics.js';
import Input from "../engine/input.js";
import Floor from './floor.js';
import Barrel from './barrel.js';
import {Images, AudioFiles} from '../engine/resources.js';

class Player extends GameObject {

    constructor(x, y, w, h) {
        super(x, y);
        this.addComponent(new Physics({x: 0, y: 0}, {x: 0, y: 0}));
        this.addComponent(new Input());

        this.animator = new Animator('red', w, h);
        this.addComponent(this.animator);
        let walk = new Animation('red', w, h, this.getImages("./resources/images/player/walk", "walk", 6), 9);
        let idle = new Animation('red', w, h, this.getImages("./resources/images/player/idle", "idle", 6), 4);
        let stun = new Animation('red', w, h, this.getImages("./resources/images/player/dizzy", "stun", 3), 6);

        this.animator.addAnimation("walk", walk);
        this.animator.addAnimation("idle", idle);
        this.animator.addAnimation("stun", stun);
        this.animator.setAnimation("idle");
        this.tag = "player";
        this.isOnPlatform = false;
        this.direction = 1;
        this.score = 0;
        this.defaultSpeed = 150;
        this.speed = this.defaultSpeed;
        this.isOnPlatform = false;
        this.isJumping = false;
        this.jumpForce = 200;
        this.jumpTime = 10;
        this.jumpTimer = 0;
        this.lives = 3;
        this.spawnPoint = {x: x, y: y};
        this.checkPoint = null;
        this.hasCheckPoint = false;
        this.isStunned = false;
    }

    update(deltaTime)
    {

        const physics = this.getComponent(Physics);
        const input = this.getComponent(Input);
        const renderer = this.getComponent(Renderer);
        if (!this.isStunned) {
            if (input.isKeyDown("ArrowRight")) {
                physics.velocity.x = this.speed;
                this.direction = 1;
                this.animator.setAnimation("walk");
                //AudioFiles.walk.play();
            } else if (input.isKeyDown("ArrowLeft")) {
                physics.velocity.x = -this.speed;
                this.direction = -1;
                this.animator.setAnimation("walk");
                //AudioFiles.walk.play();
            } else {
                physics.velocity.x = 0;
                this.animator.setAnimation("idle");
                //AudioFiles.walk.pause();
            }

            if (input.isKeyDown("ArrowUp") && this.isOnPlatform) {
                this.startJump();
            }
        }
        if (input.isKeyDown("KeyP")) {
                // this.game.setPause();
        }

        if (this.isJumping) {
            this.updateJump(deltaTime);
        }
        const floors = this.game.gameObjects.filter((obj) => obj instanceof Floor);
        for (const floor of floors) {

            if (physics.isColliding(floor.getComponent(Physics))) {
                if (!this.isJumping) {
                    physics.acceleration.y = 0;
                    physics.velocity.y = 0;
                    this.y = floor.y - this.getComponent(Renderer).height;
                    this.isOnPlatform = true;
                }
            }

        }

        if (this.y >= 800) {
            if (this.checkPoint === null) {
                this.x = this.spawnPoint.x;
                this.x = this.spawnPoint.x;
            } else {
                this.x = this.checkPoint.x;
                this.x = this.checkPoint.x;
            }
        }

        const barrels = this.game.gameObjects.filter(obj => obj instanceof Barrel);
        for (const b of barrels) {
            if (this.getComponent(Physics).isColliding(b.getComponent(Physics))) {
                this.game.removeGameObject(b);
                if (!this.isStunned) {
                    this.stunPlayer();
                }
            }
        }

        super.update(deltaTime);
    }

    stunPlayer() {
        const physics = this.getComponent(Physics);
        this.isStunned = true;
        
        this.direction = 1;
        this.animator.setAnimation("stun");
        
        physics.velocity.y = -200;
        physics.velocity.x = -50;
        
        setTimeout(() => (this.isStunned = false, this.animator.setAnimation("idle"), physics.velocity.x = 0), 2000);
    }

    startJump() {
        if (this.isOnPlatform) {
            this.isJumping = true;
            this.jumpTimer = this.jumpTime;
            this.getComponent(Physics).velocity.y = -this.jumpForce;
            this.isOnPlatform = false;
        }
    }

    updateJump(deltaTime) {
        this.jumpTimer -= deltaTime;
        if (this.jumpTimer <= 0 || this.getComponent(Physics).velocity.y > 0) {
            this.isJumping = false;
        }
    }

    getImages(path, baseName, numImages) {
        let images = [];
        for (let i = 1; i <= numImages; i++) {
            let img = new Image();
            img.src = path + "/" + baseName + " (" + i + ").png";
            images.push(img);
        }
        return images;
    }

}
export default Player
