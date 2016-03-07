import Array2d from "./Array2D.js";
import {EMPTY_CELL} from "./Cell.js";

// 500  = full width
// 11 gaps + 10 cells.
var gap_size = 10; // px
// 500 - 11 * gap = 390 px
// 390 / 10 cells = 39 per cell
var cell_size = 39;

var borderColor = {
  "normal": "#CCC",
  "hover": "#88F",
  "selected": "#000",
}

function forwardMouseEvents(canvas, target) {
  canvas.onmousedown=target.onmousedown.bind(target);
  canvas.onmousemove=target.onmousemove.bind(target);
}

function equalPoints(p1, p2) {
  return p1.x == p2.x && p1.y == p2.y;
}

export default class Board {
  constructor(canvas) {
    // Setup canvas
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    forwardMouseEvents(canvas, this);

    // Setup grid
    this.grid = new Array2d(10,10)
      .fill(()=>EMPTY_CELL);

    // Extras
    this.hover = {x:-1, y:-1};
    this.selected = {x:-1, y:-1};

    this.draw();
  }

  draw() {
    var ctx = this.ctx;
    var step = gap_size + cell_size;
    ctx.lineWidth = 2;

    // Clear the board
    ctx.fillStyle="#fff";
    ctx.fillRect(0,0,this.canvas.width, this.canvas.height);

    // Fill it back in
    this.grid.map((cell, x, y)=>{
      ctx.fillStyle=cell.color;
      var pt = {x:x,y:y};
      if(equalPoints(this.selected, pt))
        ctx.strokeStyle=borderColor["selected"];
      else if(equalPoints(this.hover, pt))
        ctx.strokeStyle=borderColor["hover"];
      else
        ctx.strokeStyle=borderColor["normal"];

      // grid coord -> screen coord
      x = x * step + gap_size;
      y = y * step + gap_size;
      ctx.fillRect(x, y, cell_size, cell_size);
      ctx.strokeRect(x, y, cell_size, cell_size);
    });
  }


  getPos(evt) {
    var bounds = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - bounds.left,
      y: evt.clientY - bounds.top
    };
  }


  getGridPos(evt) {
    var pos = this.getPos(evt);
    var size = cell_size + gap_size;
    if(pos.x % size <= gap_size)
      return {x:-1, y:-1};
    if(pos.y % size <= gap_size)
      return {x:-1, y:-1};
    return {
      x: pos.x / size | 0,
      y: pos.y / size | 0};
  }


  onmousemove(evt) {
    this.hover = this.getGridPos(evt);
    this.draw();

    //var pos = this.getPos(evt);
    //this.ctx.strokeRect(pos.x-10, pos.y-10, 20,20);
  }

  onmousedown(evt) {
    var old = this.selected;
    this.selected = this.getGridPos(evt);

    if(equalPoints(this.selected, old)) {
      // "unselect"
      this.selected.x = -1;
    }

    this.draw();
  }
};
