

let canvasX = 500, canvasY = canvasX;
let black = [25, 25, 25];
let white = 255;
let purple = [90, 79, 159];
let cols = 5, rows = cols;
let gap = 16;
let s = 40;
let bigS = s*2;

class Square {
  constructor(posY) {
    this.posY = posY;
  }

  display() {
    let colors = [purple, white, black];
    let colorFirst = random(colors);
    let colorSecond = random(colors);
    let colorThird = random(colors);

    while (colorThird == colorFirst && colorThird == colorSecond) {
      colorThird = random(colors);
    }

    var origin  = this.posY*bigS;

    var first   = [origin, 0];
    var second  = [origin, bigS];
    var third   = [origin + bigS, 0];
    var fourth  = [origin + bigS, bigS];

    var myTriangles = [];

    if (Math.random() > 0.7){
      myTriangles = [[...second, ...fourth, ...first], [...first, ...third, ...fourth]];
    } else {
      myTriangles = [[...second, ...fourth, ...third], [...first, ...third, ...second]];
    }


    fill(colorFirst);
    triangle(...myTriangles[0]);
    fill(colorSecond);
    triangle(...myTriangles[1]);


    fill(colorThird);
    square(this.posY*bigS+bigS/4,bigS/4, s);
  }
}

function setup() {
  createCanvas(canvasX, canvasY);
  background(black);
  frameRate(0.5);
  smooth();
  noStroke();
}

function draw() {
  for (let i = 0; i < cols; i++) {
    translate(gap, gap);
    for (let j = 0; j < rows; j++) {
      push();
      let dani = new Square(j);
      dani.display();
      pop();
      translate(gap, 0);
    }
    translate(-gap -bigS, bigS);
  }
}
