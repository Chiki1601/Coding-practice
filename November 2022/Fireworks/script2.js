const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;   
});

let hue = 0
class Fire{
    constructor(x,y,vely,size,alpha=2,col=1.5){
        this.x = x;
        this.y = y;
        this.size = Math.random()*2 + size;
        this.speedX = 0//Math.random()*3 - 1.5;
        this.speedY = Math.random()*2+vely;
        this.gravity = -0.09;
        this.color = 'hsl(' +60+ ',100%,50%)';
        this.color1 = this.color
        this.alpha = Math.random()*5+alpha;
       
    }
    draw(){
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.fillStyle = this.color;       
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill(); 
        ctx.closePath();
    }
    update(){
        this.alpha -= 0.06;
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y -= this.speedY;
    }
}

class Firework{
    constructor(x,y,vel,col){
        this.x = x;
        this.y = y;
        this.size = 10;
        this.vel = vel;
        this.gravity = -0.05;
        this.color = col;
        this.alpha = Math.random()*1.5+1;
        this.friction = 0.99;
        this.randomPos = Math.random()*10-5 
    }
    draw(){
        drawStar(this.x,this.y,6,this.size,this.size*0.5,this.color)
    }
    update(){
        this.draw();
        this.alpha -= 0.05;
        this.vel.x *= this.friction; 
        this.vel.y *= this.friction; 
        this.vel.y += this.gravity; 
        this.x += this.vel.x;
        this.y -= this.vel.y;
        this.size -= 0.2
    }

}
let fireworks = [];
function initFirework(x,y) {
    let fireworksNum = 100;
    let color = 'hsl(' +Math.random()*360+ ',100%,50%)'
    let speed = 6;
    let ang = Math.PI*2/fireworksNum;
    for (let i = 0; i < fireworksNum; i++) {
        fireworks.push(new Firework(x,y,{
            x:Math.cos(ang*i)*Math.random()*speed,
            y:Math.sin(ang*i)*Math.random()*speed
        },color))
    }
}

function handelFirework() {
    fireworks.forEach((object,index) => {
        if (object.alpha > 0) {
            object.update();  
        }else{
            fireworks.splice(index,1);
       }
    });
}
let rocket = [];
function initRocket() {
    //rocket.push(new Fire(Math.random()*canvas.width,canvas.height,8.5,2,10,2.5));
    rocket.push(new Fire(Math.random()*canvas.width*0.8+100,canvas.height,7.5,2,10,3.5));
    rocket.push(new Fire(Math.random()*canvas.width*0.8+100,canvas.height,7,2,10,3.0));
    rocket.push(new Fire(Math.random()*canvas.width*0.8+100,canvas.height,8,2,10));
}
initRocket()

function handelRocket() {

     rocket.forEach((object,index) => {
         if ( object.speedY < 0) {    
            initFirework(object.x,object.y)
            rocket.splice(index,1); 
            rocket.push(new Fire(Math.random()*canvas.width*0.8+100,canvas.height,8.5,2,10,2.5)); 
         }
        if (object.alpha > 0) {
            object.draw();
            object.update();  
        }else{
            rocket.splice(index,1);      
       }    
    });
}

class Circle{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = Math.random()*1;
        this.dir = 1
    }
    draw(){
        ctx.fillStyle = 'white';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 0;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.closePath();
        ctx.fill();
        
    }
    update(){
        if (Math.random()<0.5) {
            this.size += 0.05*this.dir
                if (this.size>1.2 || this.size < 0.2) {
                    this.dir *= -1
                }
        }
    }
}
let cir = [];
function Cir() {
    for (let i = 0; i < 126; i++) {
       cir.push(new Circle( Math.random()*canvas.width, Math.random()*canvas.height));
    }
}
Cir();

function handelStar() {
    for (let i = 0; i < cir.length; i++) {
        cir[i].draw();
        cir[i].update();
        
    }
}

function clear() {
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

setInterval(()=>{  
    clear();
    handelStar()
    handelFirework();
    handelRocket();  
    hue += 0.5;
   
},1000/60);


function drawStar(positionX,positionY,points,outerRadius,innerRadius,color) {
    ctx.beginPath();
    ctx.save()
    ctx.translate(positionX,positionY)   
    ctx.fillStyle = "white"
    ctx.strokeStyle = color
    ctx.shadowBlur = 2//blur;
    ctx.globalAlpha = 4//alpha
    ctx.lineWidth = 2//linW
    ctx.shadowColor =color;
    ctx.moveTo(0,outerRadius);
    for (let i = 0; i < 2*points+1; i++) {
        let r = (i%2==0) ? outerRadius : innerRadius
        let a = Math.PI * i/points       
        ctx.lineTo(r*Math.sin(a),r*Math.cos(a));    
    }
    ctx.stroke()
    ctx.fill()
    ctx.closePath();
    ctx.restore()
}
