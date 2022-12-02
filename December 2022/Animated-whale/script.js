const canvas = document.getElementById("canvas");
const whale = document.getElementById("whale");
const eyeOpen = document.getElementById("eye_open");
const eyeClosed = document.getElementById("eye_closed");
const waves = document.querySelectorAll(".wave");
const sea = document.querySelector(".wavy-line");
const ctx = canvas.getContext("2d");
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
let particles = [];
const colors = [
"#1B1184",
"#5260AA",
"#7888BF",
"#9BB0D4",
"#C1D6E8",
"#E5F2F4"];

const gravity = 0.08;
let isShowerOn = false;

whale.addEventListener("click", e => {
  makeShower();
});

const initParticles = () => {
  for (var i = 0; i < 100; i++) {
    setTimeout(createParticle, 25 * i, i);
  }
};

// resize
window.addEventListener("resize", resize);
function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}

const createParticle = () => {
  const x = width * 0.5 - 17;
  const y = height * 0.5 - 70;
  const vx = -1.5 + Math.random() * 3;
  const vy = Math.random() * -8;
  const size = 4 + Math.random() * 3;
  const color = colors[Math.floor(Math.random() * colors.length)];
  const life = 7 + Math.random() * 9;
  const opacity = 0.5 + Math.random() * 0.5;
  const p = new Particle(x, y, vx, vy, size, color, opacity, life);
  particles.push(p);
};

function Particle(x, y, vx, vy, size, color, opacity, life) {
  this.update = function (i) {
    vy += gravity;
    x += vx;
    y += vy;
    life -= 0.2;
    if (particles[i].remove() === true) {
      particles.splice(i, 1);
    }
    this.draw();
  };

  this.remove = function () {
    return life <= 0;
  };

  this.draw = function () {
    ctx.beginPath();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.arc(x, y, size, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  };
}

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < particles.length; i++) {
    particles[i].update(i);
  }
  if (particles.length > 0) {
    requestAnimationFrame(animate);
  } else {
    isShowerOn = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initParticles();
  }
};

const addClasses = () => {
  whale.classList.add("shake");
  eyeOpen.classList.add("is-hidden");
  sea.classList.add("animate-sea");
  waves.forEach(wave => {
    wave.classList.add("animate-wave-forwards");
  });
};

const removeClasses = () => {
  whale.classList.remove("shake");
  eyeOpen.classList.remove("is-hidden");
  sea.classList.remove("animate-sea");
  waves.forEach(wave => {
    wave.classList.remove("animate-wave-forwards");
  });
};

const makeShower = () => {
  if (!isShowerOn) {
    isShowerOn = true;
    animate();
    addClasses();
    setTimeout(removeClasses, 2000);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initParticles();
});
