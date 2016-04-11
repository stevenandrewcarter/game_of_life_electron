var pjson = require('../package.json');
var World = require('./world');

console.log('Game of Life with Electron. Version ' + pjson.version);

function draw() {
  var ctx = canvas.getContext('2d');
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var world = new World(size);
  ctx.save();
  world.draw(ctx, cellWidth, cellHeight);
  world.process();
  ctx.restore();
  window.requestAnimationFrame(draw);
}

// Get the Canvas Variables
var canvas = document.getElementById('drawing_area');
var size = 40;
var cellWidth = canvas.width / size;
var cellHeight = canvas.height / size;
var numberOfCells = size * size;
// Check for the context (In case it is not supported)
if (canvas.getContext) {
  window.requestAnimationFrame(draw);
} else {
  document.write('No Canvas Support!');
}
var stats = 'Number: ' + numberOfCells + ' - CellWidth: ' + cellWidth + ' - CellHeight: ' + cellHeight;
document.write('<p>' + stats + '</p>');
