
class Array2D {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.length = rows * cols;
    this.data = new Array(this.length);
  }
  fill(func) {
    for(var i = 0 ; i < this.length ; i ++)
      this.data[i] = func(i/this.cols|0, i%this.cols);
    return this;
  }
  map(func) {
    for(var i = 0 ; i < this.length ; i ++)
      func(this.data[i], i/this.cols|0, i%this.cols)
    return this;
  }
  get(row, col) {
    if(row < 0) row += this.rows;
    if(row >= this.rows) row -= this.rows;
    if(col < 0) col += this.cols;
    if(col >= this.cols) col -= this.cols;
    return this.data[row*this.cols + col];
  }
  set(row, col, val) {
    this.data[row*this.cols + col] = val;
    return this;
  }
}

export default Array2D;
