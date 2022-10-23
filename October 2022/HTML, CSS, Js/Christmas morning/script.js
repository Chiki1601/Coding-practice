// call this function
(() => {
  // customization
  const FLAKES_COUNT = 200;
  const FLAKES_COLORS = [[255, 255, 255], [205, 246, 246]];
  // canvas specific  
  let canvas;
  let context;
  // to draw individual flakes
  let range;
  let drawCircle;
  let xpos;
  // to generate snow shower
  let snowFlake;
  let snowFlakes;

  canvas = document.getElementById("fg");
  context = canvas.getContext("2d");

  window.w = canvas.width = 300;
  window.h = canvas.height = 300;

  range = (a, b) => {
    const r = (b - a) * Math.random() + a;
    return r;
  };

  drawCircle = (x, y, r, style) => {
    context.beginPath();
    // starting angle is 0 and ending angle is 2PI
    context.arc(x, y, r, 0, 2 * Math.PI, false);
    context.fillStyle = style;
    return context.fill();
  };

  snowFlake = class SnowFlake {
    constructor() {
      // select a random rgb value
      this.style = FLAKES_COLORS[~~range(0, 2)];
      // set the random rgb value to the corresponding attribute
      this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
      // select a random radius between 5 and 10
      this.r = ~~range(1, 5);
      this.r2 = this.r;
      this.replace();
    }

    replace() {
      this.opacity = 0;
      this.dop = 0.03 * range(1, 4);
      this.x = range(-this.r2, w - this.r2);
      this.y = range(-20, h - this.r2);
      this.xmax = w - this.r;
      this.ymax = h - this.r;
      this.vx = ~~range(0, 2);
      return this.vy = this.r;
    }

    draw() {
      let ref;
      this.x += this.vx;
      this.y += this.vy;
      this.opacity += this.dop;
      if (this.opacity > 1) {
        this.opacity = 1;
        this.dop *= -1;
      }
      if (this.opacity < 0 || this.y > this.ymax) {
        this.replace();
      }
      if (!(0 < (ref = this.x) && ref < this.xmax)) {
        this.x = (this.x + this.xmax) % this.xmax;
      }
      return drawCircle(~~this.x, ~~this.y, ~~this.r, `${this.rgb},${this.opacity})`);
    }};



  //METHOD to generate snowflakes as an array
  snowFlakes = (() => {
    let snowFlakes = [];
    for (let j = 0; j <= FLAKES_COUNT; ++j) {
      snowFlakes.push(new snowFlake());
    }
    return snowFlakes;
  })();

  // METHOD call this method to start snow shower
  window.shower = () => {
    let snowFlake;
    let snowFlakeShower;
    //It is a window method
    //window.requestAnimationFrame() requests that the browser call a specified callback to update an animation before the next repaint.
    requestAnimationFrame(shower);
    context.clearRect(0, 0, w, h);
    snowFlakeShower = [];
    for (let snowFlake of snowFlakes) {
      snowFlakeShower.push(snowFlake.draw());
    }
    return snowFlakeShower;
  };

  shower();

}).call(this);


/*Inspired by https://codepen.io/linrock/pen/Amdhr?limit=all&page=3&q=canvas*/