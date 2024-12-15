import GameObject from "../engine/gameObject.js"


class ImageTextUI extends GameObject {
    constructor(x, y, w, h, img, amount) {
        super(x, y);
        this.width = w;
        this.height = h;
        this.image = img
        this.text = amount;
    }

    draw(ctx) {
        super.draw(ctx);
        
        ctx.drawImage(this.image, this.game.camera.x + this.x, this.game.camera.y + this.y - 200, this.width, this.height);
        
        ctx.textAlign = "center";
        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(this.text, this.game.camera.x + this.x + this.width / 2, this.game.camera.y + this.y + this.height / 2 - 185);
    }

    setText(newText) {
        this.text = newText;
    }

}

export default ImageTextUI;