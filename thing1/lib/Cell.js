var history = {};
class Cell {
  constructor() {
    this.color = Math.random()*360|0;
  }

  merge(other) {
    var key = this.color + ":" + other.color;
    var res = history[key];
    if(res !== undefined) {
      this.color = res;
      return;
    }


    var diff = other.color - this.color;
    if(diff > 180) diff -= 360;
    if(diff < -180) diff += 360;
    //if(diff > 5)
    //  return;

    var alpha = .5;
    var a1 = this.color * Math.PI/180 + .05;
    var a2 = other.color * Math.PI/180;

    var x = Math.cos(a1)*alpha + Math.cos(a2)*(1-alpha);
    var y = Math.sin(a1)*alpha + Math.sin(a2)*(1-alpha);
    var res = Math.atan2(y,x)*180/Math.PI|0;
    if(res < 0) res += 360;
    this.color = res;

    history[key] = this.color;
  }

  getFillStyle() {
    return "hsl(" + this.color +",90%,45%)";
  }
}

var c = new Cell();
var d = new Cell();
for(var c1 = 0; c1 < 360 ; c1++) {
  for(var c2 = 0; c2 < 360 ; c2++) {
    c.color = c1;
    d.color = c2;
    c.merge(d);
}}


export default Cell;

