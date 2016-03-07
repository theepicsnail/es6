
function bindDrag(canvas, handler) {
  var pressed = false;

  canvas.addEventListener('touchmove', function(e){
    handler(e.touches[0])
  }, false);
  canvas.addEventListener('mousedown', ()=>{pressed=true}, false);
  canvas.addEventListener('mouseup', ()=>{pressed=false}, false);
  canvas.addEventListener('mousemove', function(e){
    if(pressed)handler(e);
  }, false);
}


var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0,0, canvas.width, canvas.height);



ctx.font = '50px Arial';
ctx.fillStyle = "white";
ctx.fillText("Take pictures:", canvas.width/2-100, canvas.height/2);
ctx.fillText("SPACE", canvas.width/2-50, canvas.height/2 + 50);
setTimeout(function(){
  ctx.fillStyle = "white";
  ctx.fillText("Try Drawing", canvas.width/2-70, canvas.height/2 );
}, 3000)


var patternCanvas = document.createElement("canvas");
patternCanvas.width = canvas.width;
patternCanvas.height = canvas.height;
var patternCtx = patternCanvas.getContext("2d");







ctx.fillStyle = "#fff";

var t = 0;
function handler(e) {
  var x = e.pageX - canvas.offsetLeft + Math.cos(t*3) * 40 |0;
  var y = e.pageY - canvas.offsetTop + Math.sin(t*2) * 40 |0;


  var angle = t*6 + x*10 + y*10 |0;
  ctx.fillStyle = "hsl(" + angle +",100%,50%)";
  ctx.beginPath();
  ctx.arc(x,y,10,0,2*Math.PI,false);
  ctx.fill();


}
bindDrag(canvas, handler);


var factor = .97//1.03;
window.setInterval(function(){
  t += .1;

  var n = 1;
  n *= n;
  for(var dt = 0 ; dt < Math.PI*2 ; dt += Math.PI*2/7) {
    var r = Math.cos(dt*t/100 + dt*4);
  var x = (Math.cos(t/20 -dt*dt)*r+1)*canvas.width/2;
  var y = (Math.sin(t/17 +dt)*r+1)*canvas.height/2;
  var angle = t*6  + dt*57 |0;
  ctx.fillStyle = "hsl(" + angle +",100%,50%)";
  ctx.beginPath();
  ctx.arc(x,y,10,0,2*Math.PI,false);
  ctx.fill();
  }





  factor = .03 * (Math.sin(t/50) - Math.sin(t/30)
    )/2 + 1;
  patternCtx.drawImage(canvas, 0,0);

  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height/2);
  ctx.rotate(Math.PI/180 * (
        Math.sin(t/7 + Math.sin(t/9))
        + Math.cos(t/9 - Math.cos(t/7))
  ));
  ctx.translate(-canvas.width /2, -canvas.height/2);

  var f2 = (1-factor)/2;
  ctx.globalAlpha = .5;

  ctx.globalCompositeOperation = "source-atop";
  ctx.drawImage(patternCanvas,
    canvas.width * f2, canvas.height*f2,
    canvas.width * factor, canvas.height * factor);
  ctx.globalAlpha =1;

  ctx.restore();
},16);


window.addEventListener('keydown', function(evt) {
  if(evt.keyCode == 32) // space to save a screen shot
    window.open(canvas.toDataURL('png'));

}, true);
