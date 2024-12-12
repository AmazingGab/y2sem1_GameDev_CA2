import GameObject from '../engine/gameobject.js';
import Animation from '../engine/Animation.js';
import Renderer from '../engine/renderer.js';
import Animator from '../engine/Animator.js';
import Physics from '../engine/physics.js';
import Input from "../engine/input.js";
import Floor from './floor.js';
import {Images, AudioFiles} from '../engine/resources.js';

class Player extends GameObject {
    
    constructor(x, y, w, h) {
        super(x,y);
        this.addComponent(new Physics({x:0, y:0}, {x:0, y:0}) );
        this.addComponent(new Input());
        
        this.animator = new Animator('red',w,h);
        this.addComponent(this.animator);
        let walk = new Animation('red',w,h, this.getImages("./resources/images/player/walk", "walk", 6), 10);
        let idle = new Animation('red', w, h, this.getImages("./resources/images/player/idle", "idle", 6), 5);
        
        this.animator.addAnimation("walk", walk);
        this.animator.addAnimation("idle", idle);
        this.animator.setAnimation("idle");
        this.speed = 100;
        this.tag = "player";
    }
    
    update(deltaTime)
    {
        
        const physics = this.getComponent(Physics);
        const input = this.getComponent(Input);
        const renderer = this.getComponent(Renderer);
        if(input.isKeyDown("ArrowRight"))
        {
            
            physics.velocity.x = this.speed;
            this.direction = 1;
            this.animator.setAnimation("walk");
            //AudioFiles.walk.play();
        }
        else if(input.isKeyDown("ArrowLeft"))
        {
            physics.velocity.x = -this.speed;
            this.direction = -1;
            this.animator.setAnimation("walk");
            //AudioFiles.walk.play();
        }
        else
        {
            physics.velocity.x = 0;
            this.animator.setAnimation("idle");
            //AudioFiles.walk.pause();
        }
        
        if(input.isKeyDown("KeyP"))
        {
           // this.game.setPause();
        }
        
        const floors = this.game.gameObjects.filter((obj) => obj instanceof Floor);
        for(const floor of floors)
        {
          
            if(physics.isColliding(floor.getComponent(Physics)))
            {
                if (!this.isJumping) 
                {
                    physics.acceleration.y = 0;
                    physics.velocity.y = 0;
                    this.y = floor.y - this.getComponent(Renderer).height;
                    this.isOnPlatform = true;
                }
            }
            
        }
        
        
        super.update(deltaTime);
    }
    
    getImages(path, baseName, numImages)
    {
        let images = [];
        for(let i = 1; i <= numImages;i++)
        {
            let img = new Image();
            img.src = path + "/"+baseName+" ("+i+").png";
            images.push(img);
        }
        return images;
    }
    
} export default Player
