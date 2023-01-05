class Overworld {
    // int element = 0;
    //
    constructor(config) {
      this.element = config.element;
      this.screen = config.screen;
      this.canvas = this.element.querySelector(".game-canvas");
      // this.heroCanvas = this.element.querySelector(".hero");
      // this.zombieCanvas = this.element.querySelector(".zombie");
      //canvas has a ctx and the ctx allows us to draw to the image

      //this.zombieC = this.zombieCanvas.getContext("2d");
      // this.heroC = this.heroCanvas.getContext("2d");
      this.ctx = this.canvas.getContext("2d");
      this.map = null;
    }

    startGameLoop() {
      const step = () => {
        //this isn't calling it's this is step calling step when a new frame starts
        //if step wasn't in the callback function it would run infinitly

        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        // this.heroC.clearRect(150,150, this.heroC.width, this.heroC.height);
        //this.zombieC.fillRect(25,25, 19,19);
        //Establish the camera object
        const cameraPerson = this.map.gameObjects.hero;
        
        //Update all objects
        Object.values(this.map.gameObjects).forEach(object =>{
          object.update({
            arrow: this.directionInput.direction,
            mouse: this.directionInput.mouseCoordinate,
            map: this.map,
          })
        })

        this.map.drawLowerImage(this.ctx, cameraPerson);

        Object.values(this.map.gameObjects).sort((a,b) => {
          return a.y - b.y;
        }).forEach(object => {
          object.sprite.drawHero(this.ctx, cameraPerson);
        })

        // Object.values(this.map.gameObjects).forEach(object => {
        //   //reference when you draw yourself
        //   object.sprite.drawHero(this.ctx, cameraPerson);
        //   //object.sprite.drawZombie(this.ctx);
        // })

        this.map.drawUpperImage(this.ctx, cameraPerson);
        
        requestAnimationFrame(() => {
          step();
        })
      }
      step();
    }

    init() {
      this.map = new OverworldMap(window.OverworldMaps.BattleField);
      this.map.mountObjects();
      this.directionInput = new DirectionInput();
      this.directionInput.init();

      this.startGameLoop();
    }
}