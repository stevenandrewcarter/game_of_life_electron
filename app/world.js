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

  this.draw = function(ctx, width, height) {
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        cell.draw(ctx, i, j, width, height, this.cells[i][j]);
      }
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

  this.process = function() {
    var newCells = this.cells;
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        var neighbours = this.findLiveNeighbours(i, j);
        if (this.cells[i][j] == 1 && (neighbours < 2 || neighbours > 3)) {
          newCells[i][j] = 0;
        } else if (this.cells[i][j] == 0 && neighbours == 3) {
          newCells[i][j] = 1;
        }
      }
    }
    this.cells = newCells;
  }
};
