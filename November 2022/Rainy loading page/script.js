const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

window.addEventListener('resize',function () {
    CANVAS_WIDTH = window.innerWidth;
    CANVAS_HEIGHT = window.innerHeight;
});


function initializeCanvas(canvasID) {
    const canvas = document.getElementById(canvasID);
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    return canvas;
}
function clear(canvas) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);

}

let rainCanvas;
let cloudCanvas;
let grd;

function main(){
    rainCanvas = initializeCanvas('rainCanvas');
    cloudCanvas = initializeCanvas('cloudCanvas');
    setInterval(() => {
       handleParticle();
       handelCloud();
    },1000/60);

    grd = cloudCanvas.getContext('2d').createLinearGradient(0,0,0,CANVAS_HEIGHT);
    grd.addColorStop(0,'rgba(15, 15, 11,0.8)');
    grd.addColorStop(0.2,'rgba(115, 115, 131,0.7)');
    grd.addColorStop(1,'rgba(205,205,205,0.2)');
}

let gravitey = 0.2;
function map(n,x1,y1,x2,y2) {
    let x = n*(y1-x1)/y1;
    let m = x*(y2-x2)/x2-y2;
    return m;
}
console.log(map(4,1,5,1,20));
class rain{
    constructor(){
        this.x = Math.random()*CANVAS_WIDTH;
        this.y = Math.random()*CANVAS_HEIGHT;
        this.size = Math.random()*20+1;
        this.speed = Math.random()*5+2;
        this.size1 = map(this.speed,1,5,1,20);
       }
    update(){
        this.speed += gravitey;
        this.y += this.speed;
        if (this.y-this.size1 > CANVAS_HEIGHT) {
            this.y = 0;
            this.speed = Math.random()*20+1;
        }
    }
    draw(canvas){
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.size1*0.8);
        ctx.stroke();
        ctx.closePath();     
    }
}
let rainParticle = [];
for (let i = 0; i < 150; i++) {
   rainParticle.push(new rain());
}

function handleParticle() {
    clear(rainCanvas);
    for (let i = 0; i < rainParticle.length; i++) {
       rainParticle[i].draw(rainCanvas);
       rainParticle[i].update();
    }
}
class cloud{
    constructor(){
        this.x = Math.random()*CANVAS_WIDTH;
        this.y = Math.random()*50 + 10;
        this.size = Math.random()*100 + 20;
        this.speed = Math.random()*1+0.5; 
       }
    update(){
        this.x += this.speed;
        if (this.x > CANVAS_WIDTH+50){
            this.x = -50;
        }
    } 
    draw(canvas){
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = 'white';
        ctx.fillStyle = grd;
        ctx.lineWidth = 0.005;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
        ctx.stroke();
        ctx.closePath();
        ctx.fill();
    }   
}
let cloudParticle = [];
for (let i = 0; i < 120; i++) {
    cloudParticle.push(new cloud());
}

function handelCloud() {
    clear(cloudCanvas);
    for (let i = 0; i < cloudParticle.length; i++) {
        cloudParticle[i].update();
        cloudParticle[i].draw(cloudCanvas);
    }   
}