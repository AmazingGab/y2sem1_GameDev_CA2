import GameObject from '../engine/gameobject.js';
import Level from './level.js';

class Button extends GameObject {
    constructor(x, y, w, h, color, str) {
        super(x, y);
        this.width = w;
        this.height = h;
        this.color = color;
        this.text = str;
        this.handleClick = this.click.bind(this);
        document.addEventListener('click', this.handleClick, false);
    }


    click(event) {
        let rect = this.game.canvas.getBoundingClientRect();
        let width = this.width;
        let height = this.height;

        if (event.clientX - rect.left >= this.x && event.clientX - rect.left <= this.x + width && event.clientY - rect.top >= this.y && event.clientY - rect.top <= this.y + height) {

            if (this.text === "PLAY" || this.text === "TRY AGAIN") {
                const level = new Level(this.game.canvas.id);
                document.removeEventListener('click', this.handleClick, false);
                level.start();
            }
        }
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.game.camera.x + this.x, this.game.camera.y + this.y, this.width, this.height);
        ctx.textAlign = "center";
        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(this.text, this.game.camera.x + this.x + this.width / 2, this.game.camera.y + this.y + this.height / 2 + 10);
    }

}
export default Button
