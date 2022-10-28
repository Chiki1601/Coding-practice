const rand = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const numParticles = 200;
const pixelSizeX = 6;
const pixelSizeY = 6;
const gridX = 10;
const gridY = 10;

class Particle {
    
    constructor() {
        this.setRandomPosition();
        this.setRandomColor();
        this.setRandomDirection();
    }
    
    setRandomDirection() {
        const d = rand(0,1) ? -1 : 1;
        if (rand(0, 1) === 0) {
            this.xr = 0;
            this.yr = d;
        } else {
            this.xr = d;
            this.yr = 0;
        }
    }
    
    setRandomColor() {
        this.color =
            "#" +
            rand(0, 15).toString(16) +
            rand(0, 15).toString(16) +
            rand(0, 15).toString(16);
    }

    get maxX() {
        return Math.floor(innerWidth / pixelSizeX);
    }
    
    get maxY() {
        return Math.floor(innerWidth / pixelSizeY);
    }
    
    
    setRandomPosition() {
        this.x = rand(0, this.maxX);
        this.y = rand(0, this.maxY);
    }
    

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x * pixelSizeX, this.y * pixelSizeY, pixelSizeX, pixelSizeY);
    }
    
    move() {
        this.x += this.xr;
        this.y += this.yr;
        if (this.xr === 1 && this.x >= this.maxX) {
            this.x = this.maxX;
            this.xr *= -1;
        }
        if (this.xr === -1 && this.x < 0) {
            this.x = 0;
            this.xr *= -1;
        }
        if (this.yr === 1 && this.y >= this.maxY) {
            this.y = this.maxY;
            this.yr *= -1;
        }
        if (this.yr === -1 && this.y < 0) {
            this.y = 0;
            this.yr *= -1;
        }
        if (this.x % gridX === 0 || this.y % gridY === 0) {
            this.setRandomDirection();
        }
    }
}

function setSize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
}

setSize();
window.addEventListener('resize', setSize);

const particles = Array(numParticles)
    .fill(0)
    .map((_) => new Particle());

function loop(time = 0) {
    ctx.fillStyle = 'rgba(0,0,0,.1)';
    ctx.fillRect(0, 0, innerWidth, innerHeight);
    ctx.globalCompositeOperation = 'lighter';
    particles.map(p => {
        p.draw();
        p.move();
    });
    ctx.globalCompositeOperation = 'source-over';
    window.setTimeout(() => requestAnimationFrame(loop), 60);
}

loop();