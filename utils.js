const utils = {
    withGrid(n) {
        return n * 32;
    },
    asGridCoords(x,y) {
        return `${x * 16}, ${y * 16}`;
    },
    nextPosition(initialX, initialY, direction) {
        let x = initialX;
        let y = initialY;
        const size = 32;
        if (direction === "left") { 
          x -= size;
        } else if (direction === "right") {
          x += size;
        } else if (direction === "up") {
          y -= size;
        } else if (direction === "down") {
          y += size;
        }
        return {x,y};
    }
}



// myObject = {  };

// for(i = 0; i < 2; i++){
//     myObject['propA' + i] = foo;
//     myObject['propB' + i] = bar;
// };