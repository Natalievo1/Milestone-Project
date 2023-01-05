class Person extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;
        this.isPlayerControlled = config.isPlayerControlled || false; 
        this.rotation = config.rotation;
        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
        this.canvas = document.querySelector("canvas");
    }

    update(state) {
        if(this.movingProgressRemaining > 0) {
          this.updatePosition();
        } else {
            if(this.isPlayerControlled && state.arrow) {
                this.startBehavior(state, {
                    type: "idle",
                    direction: state.arrow
                })
            }
             //mouseMovement
            if(this.isPlayerControlled) this.determineBodyRotation(state);
        }
    }

    startBehavior(state, behavior) {
        //setting character direction to whatever behavior has
        this.direction = behavior.direction;
        if(behavior.type == "idle"){
            //Stop if space isn't free(collision)
            console.log(state.map.isSpaceTaken(this.x, this.y, this.direction) + " " + this.x + " " + this.y );
            if(state.map.isSpaceTaken(this.x, this.y, this.direction)){
                return;
            }
            state.map.moveWall(this.x, this.y, this.direction);
            this.movingProgressRemaining = 16;
        }
        //ready to walk
        
    }

    updatePosition() {
        //deconstruct
        const [property, change] = this.directionUpdate[this.direction]; 
        this[property] += change;
        this.movingProgressRemaining -= 1;
    }

    determineBodyRotation(state) {
        this.rotation = Math.atan2(
            state.mouse.y - (this.canvas.getBoundingClientRect().y + this.canvas.getBoundingClientRect().height / 2),
            state.mouse.x - (this.canvas.getBoundingClientRect().x + this.canvas.getBoundingClientRect().width / 2),
        );
    }

}