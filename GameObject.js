class GameObject {
    constructor(config) {
        //state
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.mouse = {
            x: config.x || 0,
            y: config.y || 0,
        }
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "images/characters/people/heroSprite.png",  
        });
    }

    mount(map) {
        this.isMounted = true;
        map.addWall(this.x, this.y);
    }
        
    update() {

    }
}