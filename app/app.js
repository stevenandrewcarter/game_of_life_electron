var pjson = require('../package.json');
var World = require('./world');
var animate = false;

console.log('Game of Life with Electron. Version ' + pjson.version);

function draw(forward) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  world.draw(ctx, forward);
  ctx.restore();
  if (animate) {
    window.requestAnimationFrame(draw);
  }
}

function play() {
  animate = true;
  draw();
}

function stop() {
  animate = false;
}

function nextFrame() {
  draw(true);
}

function previousFrame() {
  draw(false);
}

// Get the Canvas Variables
var canvas = document.getElementById('drawing_area');
var ctx = canvas.getContext('2d');
ctx.globalCompositeOperation = 'destination-over';
var size = 100;
var cellWidth = canvas.width / size;
var cellHeight = canvas.height / size;
var world = new World(size, cellWidth, cellHeight);
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
document.getElementById("play").addEventListener("click", play, false);
document.getElementById("forward").addEventListener("click", nextFrame, false);
document.getElementById("backward").addEventListener("click", previousFrame, false);
document.getElementById("stop").addEventListener("click", stop, false);
