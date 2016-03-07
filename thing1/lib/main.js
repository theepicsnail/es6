// Setup animation. Calls simulate(delta_ms) -> bool(true = end, false/undefined = continue)
var lastTime = 0;
var running = true;
function frame(time = 0) {
  if(!running) return;
  requestAnimationFrame(frame);

  var dt = time - lastTime;
  if(dt>100){
    lastTime = time;
    return;
  }
  running = !simulate(dt/1000.0);
}
setTimeout(frame, 0);


var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0,0, canvas.width, canvas.height);

// Size of a cell
// Either 10px each or enought to build a 50x50 grid
var size = 10;
/*Math.min(
    Math.max(10, canvas.width / 50),
    Math.max(10, canvas.height / 50)) | 0;*/

var rows = canvas.height / size |0;
var cols = canvas.width / size |0;

import Array2D from "./Array2D.js";
import Cell from "./Cell.js";
var grid = new Array2D(rows, cols)
  .fill((row, col)=>new Cell());

grid.map((cell, row, col)=>{
  ctx.fillStyle = cell.getFillStyle();
  ctx.fillRect(col * size, row * size, size, size);
});


var time = 0;
var i = 0;
var cos90 = [1,0,-1,0,1];
function simulate(dt) {
  time += dt;
  var num = 1000;
  while(0<--num) {
    var c = Math.random()*(grid.cols) |0;
    var r = Math.random()*(grid.rows) |0;
    var a = Math.random()*4|0;
    var cell = grid.get(r,c);
    var other = grid.get(r + cos90[a], c + cos90[a+1]);

    cell.merge(other);
    ctx.fillStyle = cell.getFillStyle();
    ctx.fillRect(c* size, r* size, size, size);
  }
}

