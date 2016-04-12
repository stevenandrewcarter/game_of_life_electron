var pjson = require('../package.json');
var World = require('./world');
var animate = false;

console.log('Game of Life with Electron. Version ' + pjson.version);

function draw() {
  var ctx = canvas.getContext('2d');
  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var world = new World(size);
  ctx.save();
  world.draw(ctx, cellWidth, cellHeight);
  ctx.restore();
  if (animate)
    window.requestAnimationFrame(draw);
}

function nextFrame() {
  draw();
}

// Get the Canvas Variables
var canvas = document.getElementById('drawing_area');
var size = 10;
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
document.getElementById('cells').innerHTML = numberOfCells;
document.getElementById('width').innerHTML = cellWidth;
document.getElementById('height').innerHTML = cellHeight;
document.getElementById("play").addEventListener("click", nextFrame, false);
