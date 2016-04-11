module.exports = {
  draw: function(ctx, x, y, width, height, alive) {
    if (alive == 1) {
      ctx.strokeStyle =  "rgba(200, 0, 0, 0.5)";
      ctx.strokeRect(x * width, y * height, width, height);
    }
  }
};
