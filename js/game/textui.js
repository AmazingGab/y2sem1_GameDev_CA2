import GameObject from "../engine/gameObject.js"


class TextUI extends GameObject {
    constructor(x, y, w, h, text) {
        super(x, y);
        this.width = w;
        this.height = h;
        this.text = text;
    }

    draw(ctx) {
        super.draw(ctx);
        
        ctx.fillStyle = 'black';
        ctx.fillRect(this.game.camera.x + this.x - this.width/2, this.game.camera.y + this.y, this.width, this.height);
        ctx.textAlign = "center";
        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(this.text, this.game.camera.x + this.x, this.game.camera.y + this.y + this.height / 2 + 10);
    }

    setText(newText) {
        this.text = newText;
    }

}

export default TextUI;