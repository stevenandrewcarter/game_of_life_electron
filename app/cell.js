module.exports = function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.alive = false;

  this.setAlive = function(alive) {
    this.alive = alive;
  }

  this.isAlive = function() {
    return this.alive;
  }

  this.draw = function(ctx) {
    // if (this.alive) {
      ctx.fillRect(x * width, y * height, width, height);
    // }
  }
};
