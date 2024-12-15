import GameObject from '../engine/gameobject.js';
import Animation from '../engine/Animation.js';
import Renderer from '../engine/renderer.js';
import Animator from '../engine/Animator.js';
import Physics from '../engine/physics.js';
import Input from "../engine/input.js";
import Floor from './floor.js';
import Barrel from './barrel.js';
import Checkpoint from './checkpoint.js';
import Collectible from './collectible.js';
import Hammer from './hammer.js';
import HealthPack from './healthpack.js';
import ParticleSystem from '../engine/particleSystem.js';
import Level from './level.js';
import TextUI from './textui.js';
import Button from './button.js';
import Trap from './trap.js';
import {Images, AudioFiles} from '../engine/resources.js';

class Player extends GameObject {

    constructor(x, y, w, h, shieldUI, hammerUI, healthUI, levelUI) {
        super(x, y);
        this.addComponent(new Physics({x: 0, y: 0}, {x: 0, y: 0}));
        this.addComponent(new Input());

        this.animator = new Animator('red', w, h);
        this.addComponent(this.animator);
        let walk = new Animation('red', w, h, this.getImages("./resources/images/player/walk", "walk", 6), 9);
        let idle = new Animation('red', w, h, this.getImages("./resources/images/player/idle", "idle", 6), 4);
        let stun = new Animation('red', w, h, this.getImages("./resources/images/player/dizzy", "stun", 3), 6);

        //animations
        this.animator.addAnimation("walk", walk);
        this.animator.addAnimation("idle", idle);
        this.animator.addAnimation("stun", stun);
        this.animator.setAnimation("idle");
        
        this.tag = "player";
        this.isOnPlatform = false;
        this.direction = 1;
        this.defaultSpeed = 150;
        this.speed = this.defaultSpeed;
        this.isOnPlatform = false;
        this.isJumping = false;
        this.jumpForce = 200;
        this.jumpTime = 10;
        this.jumpTimer = 0;
        this.spawnPoint = {x: x, y: y};
        this.checkPoint = null;
        this.hasCheckPoint = false;
        this.isStunned = false;
        //player stats
        this.shield = 100;
        this.shieldUI = shieldUI
        this.shieldUI.setText(this.shield);
        this.hammerAbility = 0;
        this.hammerUI = hammerUI
        this.hammerUI.setText(this.hammerAbility);
        this.lives = 3;
        this.healthUI = healthUI
        this.healthUI.setText(this.lives);
        this.level = 1;
        this.levelUI = levelUI;
        this.levelUI.setText(this.level);
        this.score = 0;
        
    }

    update(deltaTime)
    {

        const physics = this.getComponent(Physics);
        const input = this.getComponent(Input);
        const renderer = this.getComponent(Renderer);
        
        this.shieldUI.setText(this.shield+"");
        this.hammerUI.setText(this.hammerAbility+"");
        this.healthUI.setText(this.lives+"");
        this.levelUI.setText(this.level+"");
        //stopping movement if stunned
        if (!this.isStunned) {
            if (input.isKeyDown("ArrowRight")) {
                physics.velocity.x = this.speed;
                this.direction = 1;
                this.animator.setAnimation("walk");
            } else if (input.isKeyDown("ArrowLeft")) {
                physics.velocity.x = -this.speed;
                this.direction = -1;
                this.animator.setAnimation("walk");
            } else {
                physics.velocity.x = 0;
                this.animator.setAnimation("idle");
            }

            if (input.isKeyDown("ArrowUp") && this.isOnPlatform) {
                AudioFiles.jump.play();
                this.startJump();
            }
        }

        if (this.isJumping) {
            this.updateJump(deltaTime);
        }
        
        //collisions with floor
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

        //checking if player is out of bounds
        if (this.y >= 900) {
            AudioFiles.ouch.play();
            if (this.lives-1 < 1) {
                this.spawnPlayer();
                this.resetGame();
            }
            else {
                this.score-=1000;
                this.shield = 100;
                this.lives-=1;
                this.spawnPlayer();
            }
        }
        
        //checking if player won round
        if (this.x >= 10000) {
            this.score+=2000;
            this.level+=1;
            AudioFiles.success.play();
            this.checkPoint = null;
            this.spawnPlayer();
        }

        //checking for barrel collision
        const barrels = this.game.gameObjects.filter(obj => obj instanceof Barrel);
        for (const b of barrels) {
            if (this.getComponent(Physics).isColliding(b.getComponent(Physics))) {
                this.game.removeGameObject(b);
                AudioFiles.barrelbreak.play();
                
                //using hammer ability
                if (this.hammerAbility > 0) {
                    this.score+=200;
                    this.hammerAbility--;
                    this.emitParticles(this, "blue");
                }
                //get stunned
                else {
                    AudioFiles.ouch.play();
                    //if there are no shields respawn player
                    if (this.shield-25 < 0 ) {
                        //if there are no lives reset
                        if (this.lives-1 < 1) {
                           this.resetGame();
                        }
                        else {
                            this.score-=1000;
                            this.shield = 100;
                            this.lives-=1;
                            this.spawnPlayer();
                        }
                    }
                    //stun player if they still have shields
                    else {
                        if (!this.isStunned) {
                            this.score-=100;
                            this.stunPlayer();
                            this.emitParticles(this, "red");
                            this.shield -= 25;
                        }
                    }
                }
                //break effect
                this.emitParticles(b, "brown");
            }
        }
        
        //checking for trap collision
        const traps = this.game.gameObjects.filter(obj => obj instanceof Trap);
        for (const t of traps) {
            if (this.getComponent(Physics).isColliding(t.getComponent(Physics))) {
                const trapPhysics = t.getComponent(Physics);
                trapPhysics.velocity.y = 500;
                setTimeout(() => (physics.velocity.y = 0), 80);
                AudioFiles.ouch.play();
                //if there are no shields respawn player
                if (this.shield-25 < 0 ) {
                    //if there are no lives reset
                    if (this.lives-1 < 1) {
                       this.resetGame();
                    }
                    else {
                        this.score-=1000;
                        this.shield = 100;
                        this.lives-=1;
                        this.spawnPlayer();
                    }
                }
                //stun player if they still have shields
                else {
                    if (!this.isStunned) {
                        this.score-=100;
                        this.stunPlayer();
                        this.emitParticles(this, "red");
                        this.shield -= 25;
                    }
                }
            }
        }
        
        //checking for checkpoint and setting it
        const checkpoints = this.game.gameObjects.filter(obj => obj instanceof Checkpoint);
        for (const c of checkpoints) {
            if (this.getComponent(Physics).isColliding(c.getComponent(Physics))) {
                this.checkPoint = {x:c.x, y:c.y-100};
            }
        }
        
        //checking collectibles
        const collectibles = this.game.gameObjects.filter(obj => obj instanceof Collectible);
        for (const c of collectibles) {
            if (this.getComponent(Physics).isColliding(c.getComponent(Physics))) {
                this.game.removeGameObject(c);
                AudioFiles.pickup.play();
                this.score+=100;
                if (c instanceof Hammer) {
                    this.hammerAbility+=1;
                    this.emitParticles(c, "grey");
                }
                else if (c instanceof HealthPack) {
                    this.lives+=1;
                    this.emitParticles(c, "green");
                }
            }
        }

        super.update(deltaTime);
    }
    
    resetGame() {
        AudioFiles.fail.play();
        this.game.addGameObject(new TextUI(this.game.canvas.width/2, 120, 400, 100, "YOU LOST"));
        this.game.addGameObject(new TextUI(this.game.canvas.width/2, 230, 400, 100, "SCORE: "+this.score));
        this.game.addGameObject(new TextUI(this.game.canvas.width/2, 340, 400, 100, "LEVEL: "+this.level));
        this.game.addGameObject(new Button(this.game.canvas.width/2-200, this.game.canvas.height/2+200, 400, 100, 'red', "TRY AGAIN"))
        this.game.setPause();
    }

    //method to bring the player back the check point or spawnpoint if there is no checkpoint
    spawnPlayer() {
        if (this.checkPoint === null) {
            this.x = this.spawnPoint.x;
            this.y = this.spawnPoint.y;
        } else {
            this.x = this.checkPoint.x;
            this.y = this.checkPoint.y;
        }
    }

    // emit particles
    emitParticles(collectible, color) {
        let renderer = collectible.getComponent(Renderer);
        const particleSystem = new ParticleSystem(collectible.x + (renderer.width/2), collectible.y+ (renderer.height/2),color, 20, 1, 0.5);
        this.game.addGameObject(particleSystem);
    }
    
    //stunning players
    stunPlayer() {
        const physics = this.getComponent(Physics);
        this.isStunned = true;
        
        this.direction = 1;
        this.animator.setAnimation("stun");
        
        //push player up and back
        physics.velocity.y = -200;
        physics.velocity.x = -25;
        setTimeout(() => (physics.velocity.x = 0), 1000);
        setTimeout(() => (this.isStunned = false, this.animator.setAnimation("idle")), 3000);
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
