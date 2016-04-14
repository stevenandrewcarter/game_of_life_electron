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
      this.cells[i][j].setAlive(Math.random() > 0.5 ? true : false);
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

  this.draw = function(ctx) {
    if (this.currentFrame != this.transitionTime) {
      // Render the Transition
      this.currentFrame = this.currentFrame + 10;
    } else {
      this.currentFrame = 0;
    }
    var aliveCells = 0;
    var newCells = this.cells;
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        var neighbours = this.findLiveNeighbours(i, j);
        if (this.cells[i][j].isAlive()) {
          if (neighbours < 2 || neighbours > 3) {
            ctx.fillStyle = "rgba(0, 0, 200, " + (200 - this.currentFrame) / 200 + ")";
            if (this.currentFrame == 200) {
              this.cells[i][j].setAlive(false);
            }
          } else {
            ctx.fillStyle = "rgba(0, 0, 200, 1)";
          }
        } else {
          if (neighbours == 3) {
            ctx.fillStyle = "rgba(0, 0, 200, " + this.currentFrame / 200 + ")";
            if (this.currentFrame == 200) {
              this.cells[i][j].setAlive(true);
            }
          } else {
            ctx.fillStyle = "white";
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
