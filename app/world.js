var cell = require('./cell');

module.exports = function(size) {
  this.size = size;
  this.cells = new Array(size);
  for (var i = 0; i < size; i++) {
    this.cells[i] = new Array(size);
    for (var j = 0; j < size; j++) {
      this.cells[i][j] = Math.random() > 0.8 ? 1 : 0;
    }
  }

  this.findLiveNeighbours = function(x, y) {
    var numberOfLiveNeighbours = 0;
    if (this.cells[x - 1] && this.cells[x - 1][y - 1]) numberOfLiveNeighbours += this.cells[x - 1][y - 1];
    if (this.cells[x - 1] && this.cells[x - 1][y]) numberOfLiveNeighbours += this.cells[x - 1][y];
    if (this.cells[x - 1] && this.cells[x - 1][y + 1]) numberOfLiveNeighbours += this.cells[x - 1][y + 1];
    if (this.cells[x + 1] && this.cells[x + 1][y - 1]) numberOfLiveNeighbours += this.cells[x + 1][y - 1];
    if (this.cells[x + 1] && this.cells[x + 1][y]) numberOfLiveNeighbours += this.cells[x + 1][y];
    if (this.cells[x + 1] && this.cells[x + 1][y + 1]) numberOfLiveNeighbours += this.cells[x + 1][y + 1];
    if (this.cells[x][y - 1]) numberOfLiveNeighbours += this.cells[x][y - 1];
    if (this.cells[x][y + 1]) numberOfLiveNeighbours += this.cells[x][y + 1];
    return numberOfLiveNeighbours;
  }

  this.draw = function(ctx, width, height) {
    var newCells = this.cells;
    var aliveCells = 0;
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        var neighbours = this.findLiveNeighbours(i, j);
        if (this.cells[i][j] == 1 && (neighbours < 2 || neighbours > 3)) {
          newCells[i][j] = 0;
        } else if (this.cells[i][j] == 0 && neighbours == 3) {
          newCells[i][j] = 1;
        }
        aliveCells += this.cells[i][j];
      }
    }
    this.cells = newCells;
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        var neighbours = this.findLiveNeighbours(i, j);
        var overPopulated = false;
        var underPopulated = false;
        var reborn = false;
        if (this.cells[i][j] == 1) {
          if (neighbours < 2) {
            underPopulated = true;
            ctx.strokeStyle = "rgba(0, 200, 0, 0.9)";
          }
          if (neighbours > 3) {
            overPopulated = true;
            ctx.strokeStyle = "rgba(200, 0, 0, 0.9)";
          }
        } else {
          if (neighbours == 3) {
            reborn = true;
            ctx.strokeStyle = "rgba(0, 0, 200, 0.9)";
          }
        }
        cell.draw(ctx, i, j, width, height, this.cells[i][j], false, neighbours);
      }
    }
    document.getElementById('alive').innerHTML = aliveCells;
    document.getElementById('dead').innerHTML = (size * size) - aliveCells;
  }
};
