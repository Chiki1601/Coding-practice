let canvas = document.getElementById("box");
canvas.width = 640;
canvas.height = 200;
let ctx = canvas.getContext("2d");

let rects = [], i = 0, r;
const scaleWidth = canvas.width / 8;
const scaleHeight = canvas.height / 8; 

let slider = -scaleWidth
let bar = {x: slider, y: 0, w: scaleWidth, h:scaleHeight}
const rows = canvas.height/ scaleHeight;
const columns = canvas.width / scaleWidth;

let colors = ["lightgreen", "lightblue", "violet", "lightpink", '#ff3730', "orange", '#ffff91', '#d0ff85']
let sounds = [new sound("https://awiclass.monoame.com/pianosound/set/8.wav"), new sound("https://awiclass.monoame.com/pianosound/set/7.wav"), new sound("https://awiclass.monoame.com/pianosound/set/6.wav"), new sound("https://awiclass.monoame.com/pianosound/set/5.wav"), new sound("https://awiclass.monoame.com/pianosound/set/4.wav"), new sound("https://awiclass.monoame.com/pianosound/set/3.wav"), new sound("https://awiclass.monoame.com/pianosound/set/2.wav"), new sound("https://awiclass.monoame.com/pianosound/set/1.wav")];

let speedSlider = document.getElementById("myRange");
let output = document.getElementById("speed");
let speed = speedSlider.value;
output.innerHTML = speedSlider.value;

//  Draws the starting layout
for(x=0; x < rows; x++){
  for(i=0; i < columns; i++){
    rects.push({x: scaleWidth * i, y: scaleHeight * x, w: scaleWidth, h: scaleHeight, active: false, color: colors[x], row: x});
  }
}

function drawGrid(){
  for(let i = 1; i < columns; i++){
    ctx.moveTo(scaleWidth * i, 0);
    ctx.lineTo(scaleWidth * i, canvas.height);
  }
  for(let i = 1; i < rows; i++){
    ctx.moveTo(0, scaleHeight * i);
    ctx.lineTo(canvas.width, scaleHeight * i);
  }
  ctx.strokeStyle = "#c4c4c4";
  ctx.stroke();
}
drawGrid();

  
//  Moves the bar across at intervals and checks to see if they have been selected
function myFn(){
  if(slider < canvas.width - scaleWidth){
    slider += scaleWidth
  } else{
    slider = 0
  }
  
    for(i=0; i < columns * rows; i++){
        if(slider === rects[i].x){
          if(rects[i].active){
              sounds[rects[i].row].play()
          }
        }
    }
  drawGrid();
}

//  Changes the tempo
let interval = setInterval(myFn, (60 / parseInt(speed))*1000)

speedSlider.oninput = function() {
  speed = this.value;
  clearInterval(interval);
  interval = setInterval(myFn, (60 / parseInt(speed))*1000)
  output.innerHTML = this.value;
}

//  The hover effect when over a tile
canvas.onmousemove = function(e) {
  let rect = this.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  let i = 0, r;
  while(r = rects[i++]) {
    ctx.beginPath();
    ctx.rect(r.x, r.y, r.w, r.h);
    ctx.fillStyle = (r.active) ? r.color : ctx.isPointInPath(x, y) ? "#dedede" : "#f0f0f0";
    ctx.fill();
  }
  drawGrid();
};



//  Activates a tile if it is clicked
canvas.addEventListener('click', function(e) {
  let rect = this.getBoundingClientRect();
  let x = e.pageX - rect.left;
  let y = e.pageY - rect.top;
  rects.forEach(function(element) {
    if (y > element.y && y < element.y + element.h && x > element.x && x < element.x + element.w) {
      element.active = !element.active;
    }
  });
  while(r = rects[i++]) {
    ctx.beginPath();
    ctx.rect(r.x, r.y, r.w, r.h);    
    ctx.fillStyle = (r.active) ? r.color : "#f0f0f0";
    ctx.fill();
  }
  drawGrid();
}, false);


function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.currentTime = 0
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}


function clearFunction() {
  for(i=0; i<rects.length;i++){
    rects[i].active = false
    ctx.rect(rects[i].x, rects[i].y, rects[i].w, rects[i].h);
    ctx.fillStyle = "#f0f0f0";
  }
}