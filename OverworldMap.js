class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(
        this.lowerImage, 
        utils.withGrid(5.5) - cameraPerson.x, 
        utils.withGrid(3) - cameraPerson.y
        );
    }

    drawUpperImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.upperImage, 
            utils.withGrid(5.5) - cameraPerson.x, 
            utils.withGrid(3) - cameraPerson.y
            );
    }


    isSpaceTaken(currentX, currentY, direction) {
        const {x, y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }
    mountObjects(){
        Object.values(this.gameObjects).forEach(o => {
            o.mount(this);
        })
    }
    addWall(x,y) {
        this.walls[`${x},${y}`] = true;
    }
    removeWall(x,y) {
        delete this.walls[`${x},${y}`];
    }
    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const {x,y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x,y);
    }  
}

//configurations for all the worlds
window.OverworldMaps = {
    BattleField: {
        lowerSrc: "images/maps/pixil-frame-0.png",
        upperSrc: "images/maps/finalbbg.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(3),
                y: utils.withGrid(4),
                rotation: 0,
            }),
            zombie: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(2),
                rotation: 0,
                src: "images/characters/people/zombie.png",
            }),
        },
        walls: {
            [utils.asGridCoords(16,16)] : true,
        },
    }
}