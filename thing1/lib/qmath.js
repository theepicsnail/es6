var angle_resolution = .01; // radians
var pi2 = Math.PI * 2;

function mod(val, wrap) {
  val %= wrap;
  if (val < 0) val += wrap;
  return val;
}

var sin_table = [];
for(var a = 0; a < pi2 ; a += angle_resolution) {
  sin_table.push(Math.sin(a));
}

function sin(angle) {
  angle = mod(angle, pi2);
  return sin_table[angle / angle_resolution | 0];
}

console.log(sin_table);
export default {
  sin: sin
}
