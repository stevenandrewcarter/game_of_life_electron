module.exports = {
  draw: function(ctx, x, y, width, height, alive, changed, neighbours) {
    if (alive == 1) {
      // ctx.strokeStyle = changed ? "rgba(0, 0, 200, 0.9)" : "rgba(200, 0, 0, 0.9)";
      ctx.strokeRect(x * width, y * height, width, height);
    }
    else {
      // ctx.strokeStyle = "rgba(200, 200, 200, 0.5)";
    }
    ctx.fillText(neighbours, (x * width) + width / 2, (y * height) + height / 2);
  }
};
