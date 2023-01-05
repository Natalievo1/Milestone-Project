class Sprite {
    constructor(config) {
        //Set up the image
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            //a flag to make sure it doesn't draw before it's true
            this.isLoaded = true;
        }
        //Configuring animation & Initial State
        this.animations = config.animations || {
            "idle-up": [ [0,0] ],
        }

        this.currentAnimation = config.currentAnimation || "idle-up";
        this.currentAnimationFrame = 0;

        //Reference the game object
        this.gameObject = config.gameObject;
    }

    drawHero(ctx, cameraPerson) {
        ctx.save();
        const x = this.gameObject.x + utils.withGrid(5.5) - cameraPerson.x;
        const y = this.gameObject.y + utils.withGrid(3) - cameraPerson.y;
        // const x = this.gameObject.x/2;
        // const y = this.gameObject.y/2;
        ctx.translate(x, y);
        ctx.rotate(this.gameObject.rotation);

        this.isLoaded && ctx.drawImage(this.image, 
            -this.image.height/2,
            -this.image.width/2,
        )

        ctx.restore();
    }

}
