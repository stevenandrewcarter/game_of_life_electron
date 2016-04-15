module.exports = function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.alive = false;
  this.neighbours = 0;

  this.setAlive = function(alive) {
    this.alive = alive;
  }

  this.isAlive = function() {
    return this.alive;
  }

  this.setNeighbours = function(neighbours) {
    this.neighbours = neighbours;
  }

  this.getNeighbours = function() {
    return this.neighbours;
  }

  this.draw = function(ctx) {
    ctx.fillRect(x * width, y * height, width, height);    
  }
};
