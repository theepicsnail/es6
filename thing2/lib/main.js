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

import {Cell} from "./Cell.js";
import Board from "./Board.js";
canvas.width = 500;
canvas.height = 500;
var ctx = canvas.getContext("2d");

var board = new Board(document.getElementById("canvas"));
board.grid.set(0,4, new Cell("#0000FF"));

function simulate(dt) {
  return true;
}

