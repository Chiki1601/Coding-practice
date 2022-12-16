let c, cn;
let t, s, bd;
let regenerate = true;
let ellipseList = [];
let pts = [];
let palette = ["#00ffaa", "#ff006f", "#ff9d00", "#ffa3fd", "#f2f794", "#d9c0fa"];
// let palette = ["#FF0052", "#00FF79", "#0096FF", "#FF8700", "#C400FF", "#FFE200", "#ffffff"];

// number of flower curves
let n = 30;
// number of background elements
let nBg = 30;
// basic stroke weight
let baseSW = 3;
// stroke weight decrease per length
let dSF = 0.01;

function setup() {
  c = createCanvas(windowHeight, windowHeight);
  // c = createCanvas(1500, 1500);
}

function draw() {
  if (regenerate) {
    calcParameters();
    pointsData();
    drawBackground(nBg);
    drawCurves();
    drawPetals();
    regenerate = false;
  }
}

function calcParameters() {
  // parameters calculated according to canvas size
  bd = height / 20;
  t = random(0, PI);
  s = random(0, PI);
}

function pointsData() {
  // calculates the points used to generate the curves
  pts = [];
  for (let i = 0; i < n; i++) {
    p = {
      l: createVector(round(random(0.2 * width, 0.8 * width)), height + 10),
      pl: createVector(),
      t: random(0.005),
      s: random(0.02),
      len: round(random(height * 0.4, height * 0.6)),
      strk: round(random(50, 100))
    };
    pts.push(p);
  }
}

function drawBackground(n) {
  //draws the background elements
  background("#e0f5ff");
  // background(0, 0, 10);
  for (let k = 0; k < n; k++) {
    let num = ceil(random(5));
    let bLst = [];
    let bx = random(0.1 * width, 0.9 * width);
    let by = random(0.1 * height, 0.9 * height);
    bLst.push(createVector(bx, by));
    for (let i = 0; i < num; i++) {
      let nbx = bx + random(-bd, bd);
      let nby = by + random(-bd, bd);
      bLst.push(createVector(nbx, nby));
    }
    let col = palette[floor(random(palette.length))];
    fill(red(col), green(col), blue(col), random(20, 40));
    stroke(red(col), green(col), blue(col), random(40, 60));
    // the below function I created to generate bezier curves from a list of points
    drawBezierOpen(bLst);
  }
}

function drawCurves() {
  // flower curves are calculated as a function of sin and cosine
  ellipseList = []
  for (let p of pts) {
    let sf = 1;

    for (let i = 0; i < p.len; i++) {
      p.l.x += random(-0.2, 0.2) + cos(t) + 0.5 * sin(s + 1);
      p.l.y -= 0.8 + sin(t) + 0.5 * cos(s);
      stroke(p.strk, 0, p.strk);
      strokeWeight(baseSW / sf);
      if (i > 0) {
        line(p.pl.x, p.pl.y, p.l.x, p.l.y);
      }
      if (p.len - i === 1) {
        ellipseList.push(p.l);
      }
      p.pl = p.l.copy();
      t += p.t;
      s += p.s;
      sf += dSF;
    }
  }
}

function drawPetals() {
  // generate petals at the end of each curve as petals
  for (let e of ellipseList) {
    generatePetals(e.x, e.y);
  }
  // randomly generate ellipses
  for (let i = 0; i < n * 2; i++) {
    generateEllipses();
  }
}

function generateEllipses(x, y) {
  push();
  translate(random(width), random(height));
  rotate(random(PI));
  noStroke();
  let col = palette[floor(random(palette.length - 1))];
  fill(red(col), green(col), blue(col), random(180, 230));
  ellipse(0, 0, round(random(height / 150, height / 35)), round(random(height / 35, height / 25)));
  pop();
}



function generatePetals(x, y) {
  noStroke();
  let col = palette[floor(random(palette.length - 1))];
  fill(red(col), green(col), blue(col), random(10, 40));
  for (let i = 0; i < 15; i++) {
    push();
    translate(x, y);
    rotate(random(PI));
    let posX = random(-height / 150, height / 150);
    let posY = random(-height / 150, height / 150);
    let r1 = round(random(height / 70, height / 10));
    let r2 = round(random(height / 70, height / 10));
    ellipse(posX, posY, r1, r2);
    pop();
  }
  stroke(0, 0, 80);
  strokeWeight(height / 1000);
  noFill();
  push();
  translate(x, y);
  beginShape();
  for (let a = 0; a < TWO_PI; a += radians(5)) {
    let posX = (height / 30 + random(-height / 200, height / 200)) * cos(a);
    let posY = (height / 30 + random(-height / 200, height / 200)) * sin(a);
    vertex(posX, posY);
    if (random(1) > 0.8) {
      line(0, 0, posX, posY)
    }
  }
  endShape(CLOSE);
  pop();
}

function drawBezierOpen(l) {
  // a function that automatically draws bezier curves from a list of points (vectors)
  let s = l.length;
  if (s < 3) {
    return;
  } else if (s == 3) {
    bezier(l[0].x, l[0].y, l[1].x, l[1].y, l[1].x, l[1].y, l[2].x, l[2].y);
  } else if (l.length > 3) {
    bezier(l[0].x, l[0].y, l[1].x, l[1].y, l[1].x, l[1].y, getMid(l[1].x, l[2].x), getMid(l[1].y, l[2].y));
    for (let i = 2; i < s - 1; i++) {
      if (i == s - 2) {
        bezier(getMid(l[i].x, l[i - 1].x), getMid(l[i].y, l[i - 1].y),
          l[i].x, l[i].y, l[i].x, l[i].y, l[i + 1].x, l[i + 1].y);
      } else {
        bezier(getMid(l[i].x, l[i - 1].x), getMid(l[i].y, l[i - 1].y),
          l[i].x, l[i].y, l[i].x, l[i].y, getMid(l[i].x, l[i + 1].x), getMid(l[i].y, l[i + 1].y));
      }
    }
  }
}

function getMid(n1, n2) {
  return (n1 + n2) / 2;
}

function mousePressed() {
  if (mouseButton === LEFT) {
  regenerate = true;
  }
}
