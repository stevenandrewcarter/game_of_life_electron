var Cell = require('./cell');

module.exports = function(size, width, height) {
  this.size = size;
  this.transitionTime = 200;
  this.currentFrame = 0;
  this.cells = new Array(size);
  for (var i = 0; i < size; i++) {
    this.cells[i] = new Array(size);
    for (var j = 0; j < size; j++) {
      this.cells[i][j] = new Cell(i, j, width, height);
      this.cells[i][j].setAlive(Math.random() > 0.8 ? true : false);
    }
  }

  this.findLiveNeighbours = function(x, y) {
    var numberOfLiveNeighbours = 0;
    if (this.cells[x - 1] && this.cells[x - 1][y - 1]) numberOfLiveNeighbours += this.cells[x - 1][y - 1].isAlive() ? 1 : 0;
    if (this.cells[x - 1] && this.cells[x - 1][y]) numberOfLiveNeighbours += this.cells[x - 1][y].isAlive() ? 1 : 0;
    if (this.cells[x - 1] && this.cells[x - 1][y + 1]) numberOfLiveNeighbours += this.cells[x - 1][y + 1].isAlive() ? 1 : 0;
    if (this.cells[x + 1] && this.cells[x + 1][y - 1]) numberOfLiveNeighbours += this.cells[x + 1][y - 1].isAlive() ? 1 : 0;
    if (this.cells[x + 1] && this.cells[x + 1][y]) numberOfLiveNeighbours += this.cells[x + 1][y].isAlive() ? 1 : 0;
    if (this.cells[x + 1] && this.cells[x + 1][y + 1]) numberOfLiveNeighbours += this.cells[x + 1][y + 1].isAlive() ? 1 : 0;
    if (this.cells[x][y - 1]) numberOfLiveNeighbours += this.cells[x][y - 1].isAlive() ? 1 : 0;
    if (this.cells[x][y + 1]) numberOfLiveNeighbours += this.cells[x][y + 1].isAlive() ? 1 : 0;
    return numberOfLiveNeighbours;
  }

  this.draw = function(ctx, forward) {
    var increment = forward ? 50 : -50;
    // Check the current frame and increment till the transition time
    this.currentFrame = this.currentFrame != this.transitionTime ? this.currentFrame + increment : 0;
    var aliveCells = 0;
    // Iterate all the cells in the world
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        if (this.currentFrame != this.transitionTime) {
          this.cells[i][j].setNeighbours(this.findLiveNeighbours(i, j));
        }
        if (this.cells[i][j].isAlive()) {
          ctx.fillStyle = "rgba(0, 0, 200, 0.9)";
          if (this.cells[i][j].getNeighbours() < 2 || this.cells[i][j].getNeighbours() > 3) {
            // This cell must fade out as it is dying and will be flaged as dead soon
            ctx.fillStyle = "rgba(0, 0, 200, " + (this.transitionTime - this.currentFrame) / this.transitionTime + ")";
            if (this.currentFrame == this.transitionTime) {
              this.cells[i][j].setAlive(false);
            }
          }
        } else {
          ctx.fillStyle = "white";
          if (this.cells[i][j].getNeighbours() == 3) {
            ctx.fillStyle = "rgba(0, 0, 200, " + this.currentFrame / this.transitionTime + ")";
            if (this.currentFrame == this.transitionTime) {
              this.cells[i][j].setAlive(true);
            }
          }
        }
        this.cells[i][j].draw(ctx);
        aliveCells += this.cells[i][j].isAlive() ? 1 : 0;
      }
    }
    document.getElementById('alive').innerHTML = aliveCells;
    document.getElementById('dead').innerHTML = (size * size) - aliveCells;
  }
};
