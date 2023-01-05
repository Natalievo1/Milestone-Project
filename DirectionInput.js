class DirectionInput{
    constructor() {
        this.heldDirections = [];
        this.heldMouseCoordinates = {};
        this.map = {
            "ArrowUp": "up",
            "KeyW": "up",
            "ArrowDown": "down",
            "KeyS": "down",
            "ArrowLeft": "left",
            "KeyA": "left",
            "ArrowRight": "right",
            "KeyD": "right",
        }
    }

    get direction() {
        return this.heldDirections[0];
    }

    get mouseCoordinate() {
        return this.heldMouseCoordinates;
    } 

    init() {
        document.addEventListener("keydown", e => {
            const dir = this.map[e.code];
            if(dir && this.heldDirections.indexOf(dir) === -1) {
                this.heldDirections.unshift(dir);
            }
        });

        document.addEventListener("keyup", e => {
            const dir = this.map[e.code];
            const index = this.heldDirections.indexOf(dir);
            if(index > -1){
                this.heldDirections.splice(index, 1);
            }
        });

        document.addEventListener("mousemove", (event) => {
            this.heldMouseCoordinates = {
                x: event.clientX,
                y: event.clientY,
            }
        });
    }
}