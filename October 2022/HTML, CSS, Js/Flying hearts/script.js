var ctx=document.getElementById("c1").getContext("2d");
var points=[];
var counter=0;
var index=0;
var alpha=0;
function drawHeart(x,y,radius,color){
ctx.fillStyle = color;
ctx.fontSize=radius+"px";
ctx.fillText("❤",x,y);
/*ctx.beginPath();
ctx.arc(x,y,radius,0,2*Math.PI);
ctx.fill();*/
}
function drawPattern(points){
ctx.clearRect(0,0,500,500);
  for(var i=0;i<points.length;i++){
    drawHeart(points[i].x,points[i].y,5,points[i].col);
  }
}
function rand(from,to){
      return Math.floor(Math.random()*(to-from))+from;
}
var ctx2=document.getElementById("emoji").getContext("2d");
var emojis=['💗','💕','💖','💓','💘'];
function makeHeart(){
ctx2.clearRect(0,0,500,500);
ctx2.fillStyle="grey";
ctx2.font = "400px Arial";
ctx2.fillText(emojis[index],0,400);
index=(index>3)?0:(index+1);
var pix=ctx2.getImageData(0,0,500,500).data;
points=[];
for(var i=0;i<pix.length;i+=4){
  if(pix[i]!==0){
    var x=(i/4)%500;
    var y=Math.floor(Math.floor(i/500)/4);
    var col="rgba("+pix[i]+","+pix[i+1]+","+pix[i+2]+","+pix[i+3]+")";
    if((x &&x%10===0)&&(y&&y%10===0)){
       points.push({x:x,y:y,col:col});
       }
  }
}
drawPattern(points);
}
makeHeart();
function update(){
if(counter==120){
makeHeart();
counter=0;
}
else if(counter>=0&&counter<21){
    alpha+=0.05;
    ctx.globalAlpha = alpha;
    drawPattern(points);
  }
  else if(counter>=30&&counter<50&&counter%3==0){
    for(i=0;i<points.length;i++){
      points[i].x+=rand(-30,30);
      points[i].y+=rand(-30,30);
    }
    drawPattern(points);
  }
  else if(counter>=50&&counter<70){
    for(i=0;i<points.length;i++){
      points[i].x+=rand(-10,10);
      points[i].y+=rand(-10,10);
    }
    drawPattern(points);
  }
  else if(counter>=70&&counter<94){
    alpha-=0.02;
    ctx.globalAlpha = alpha;
    for(i=0;i<points.length;i++){
      points[i].x+=rand(-5,5);
      points[i].y+=rand(-5,5);
    }
    drawPattern(points);
  }
  else if(counter>=95&&counter<120){
    alpha-=0.02;
    ctx.globalAlpha = alpha;
    drawPattern(points);
  }
  counter++;
  requestAnimationFrame(update);
}
update();