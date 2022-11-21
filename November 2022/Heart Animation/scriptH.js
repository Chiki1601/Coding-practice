const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const heartX = [];
const heartY = [];

function HeartData() {
    for (let i = 0; i <= Math.PI * 2; i += 0.03) {
        let m = (16 * Math.sin(i) ** 3);
        heartX.push(m);
        let n = -(13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));
        heartY.push(n);
    }
}
HeartData();




class Symbol{
    constructor(x,y,fontSize,canasHeight){
        this.char = '۝۵დლღ☙♡♥❣❤❥❦❧➳123456789zxcvbnmlkjhgfdsaqwertyuiop'
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = ''
        this.canvasHeight = canasHeight;
       
        
    }
    draw(){

        this.text = this.char.charAt(Math.floor(Math.random()*this.char.length));
        ctx.fillStyle = '#0aff0a';
        ctx.font = this.fontSize+'px monospace'
        ctx.fillText(this.text,this.x*this.fontSize,this.y*this.fontSize)
        if (this.y* this.fontSize>this.canvasHeight && Math.random()>0.55) {
            this.y = 0;
        }else{
            this.y += 1;
        }
    }
}

class Effect{
    constructor(){
        this.fontSize=15;
        this.colums = canvas.width/this.fontSize
        this.symbal = [];

        this.init()
    }
    init(){
        for (let i = 0; i < this.colums; i++) {
           this.symbal[i] = new Symbol(i,0,this.fontSize,canvas.height)
            
        }
    }
}

const effect = new Effect()


class Heart2{
    constructor(x,y,vel,col){
        this.x = x;
        this.y = y;
        this.size = 1.5;
        this.vel = vel;
        this.gravity = -0.01;
        this.color = '#0aff0a'
        this.alpha = 5;
        this.friction = 0.99;
         

    }
    draw(){
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.fillStyle = this.color;       
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.fill(); 
        ctx.closePath();
        ctx.restore();
    }
    update(){
        this.draw();
        this.alpha -= 0.06;
        this.vel.x *= this.friction; 
        this.vel.y *= this.friction; 
        this.vel.y += this.gravity; 
        this.x += this.vel.x;
        this.y -= this.vel.y;
    }

}
let hearts = [];
function initheart() {
    let heartsNum = heartX.length;
    let speed = 0.2;
    for (let i = 0; i < heartsNum; i++) {
        hearts.push(new Heart2(canvas.width*0.5,canvas.height*0.4,{
            x:heartX[i]*speed,
            y:-heartY[i]*speed
        },'blue'))
    }
}

function handelheart() {
    hearts.forEach((object,index) => {
        if (object.alpha > 0) {
            object.update();  
        }else{
            hearts.splice(index,1);
       }
    });
}

let count = 0
function handelHeartInit() {
    if (count%21==0) {
        initheart() 
    }
    if (count>1000) {
        count=0
    }else{
        count++
    }
}

function clear() {
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(0,0,canvas.width,canvas.height);
}



function animate() {
     clear();
     effect.symbal.forEach(symbal => symbal.draw())
     handelheart()
     handelHeartInit()
     requestAnimationFrame(animate)
 }
 
animate()



