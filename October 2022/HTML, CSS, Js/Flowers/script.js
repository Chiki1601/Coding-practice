"use strict";

window.addEventListener("load",function() {

  const SPEED_ANIM = 50;

  let canv, ctx;   // canvas and context : global variables (I know :( )
  let maxx, maxy;  // canvas sizes (in pixels)
  let xc, yc;      // canvas center;

  let flower;
  let persp; // perspective object

// for animation
  let events;

// shortcuts for Math.…

  const mrandom = Math.random;
  const mfloor = Math.floor;
  const mround = Math.round;
  const mceil = Math.ceil;
  const mabs = Math.abs;
  const mmin = Math.min;
  const mmax = Math.max;

  const mPI = Math.PI;
  const mPIS2 = Math.PI / 2;
  const m2PI = Math.PI * 2;
  const msin = Math.sin;
  const mcos = Math.cos;
  const matan2 = Math.atan2;
  const mtan = Math.tan;

  const mhypot = Math.hypot;
  const msqrt = Math.sqrt;

//-----------------------------------------------------------------------------

  function alea (min, max) {
// random number [min..max[ . If no max is provided, [0..min[

    if (typeof max == 'undefined') return min * mrandom();
    return min + (max - min) * mrandom();
  }

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  function intAlea (min, max) {
// random integer number [min..max[ . If no max is provided, [0..min[

    if (typeof max == 'undefined') {
      max = min; min = 0;
    }
    return mfloor(min + (max - min) * mrandom());
  } // intAlea

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function Noise1DOneShot (period, min = 0, max = 1, random) {
/* returns a 1D single-shot noise generator.
   the (optional) random function must return a value between 0 and 1
  the returned function has no parameter, and will return a new number every tiime it is called.
  If the random function provides reproductible values (and is not used elsewhere), this
  one will return reproductible values too.
  period should be > 1. The bigger period is, the smoother output noise is
*/
  random = random || Math.random;
  let currx = random(); // start with random offset
  let y0 = min + (max - min) * random(); // 'previous' value
  let y1 = min + (max - min) * random(); // 'next' value
  let dx = 1 / period;

  return function() {
    currx += dx;      // currx grows from 0 to 1 at constant speed 1 / period (sawtooth function)
    if (currx > 1) {
      currx -= 1;
      y0 = y1;  
      y1 = min + (max - min) * random();
    }
    let z = (3 - 2 * currx) * currx * currx;
    return z * y1 + (1 - z) * y0;
  }
} // Noise1DOneShot

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function distance(p1, p2) {
/* distance between 2 points given by 2 or 3 coordinates */
  const diff = [];
  p1.forEach ((x, k) => diff.push(p2[k] - x));
  return mhypot(...diff);
} // distance

function normalize(vect) {

  const dist = mhypot(...vect); // hope this is not 0 !
  return vect.map(comp => comp / dist);

} // normalize
//-----------------------------------------------------------------------------

function createTranslation (depl) {

  const [dx, dy, dz] = depl;

  function apply (p) {
  // p may be a single point or an array of points
  // but not an array of arrays of points

    if (p[0].length !== 3)                     // single point
      return [p[0] + dx, p[1] + dy, p[2] + dz];
    else                                      // array of points
      return p.map(pt => [pt[0] + dx, pt[1] + dy, pt[2] + dz]);
  } //
  return {
    dx: dx, dy: dy, dz: dz,
    apply: apply
  }
} // createTranslation

//-----------------------------------------------------------------------------

function createRotation (thx, thy) {

// rotate around y axis, then around x axis

  const sx = msin(thx);
  const cx = mcos(thx);
  const sy = msin(thy);
  const cy = mcos(thy);
  const a10 = sx * sy;
  const a12 = - sx * cy;
  const a20 = - sy * cx;
  const a22 = cx * cy;

  function apply (p) {
  // p may be a single point or an array of points
  // but not an array og arrays of points

    if (p[0].length !== 3) {                    // single point
        let [x, y, z] = p;
        return [ cy * x +           sy * z,
                a10 * x + cx * y + a12 * z,
                a20 * x + sx * y + a22 * z];
    } else {                                     // array of points
      return p.map(pt => {
        let [x, y, z] = pt;
        return [ cy * x +           sy * z,
                a10 * x + cx * y + a12 * z,
                a20 * x + sx * y + a22 * z];
      });
    }
  } //
  return {
    thx: thx, thy: thy,
    apply: apply
  }
} // createRotation

//-----------------------------------------------------------------------------

function createPerspective3 (pcam, pLookAt, th, resx, resy) {
/* pcam : array of 3 coordinates, position of the camera
  pLookAt : point the camera is looking at
th (angle of the width of the screen seen by the camera
resx, resy : number of pixels of the screen
*/
  const resx2 = resx / 2;
  const resy2 = resy / 2;
  const th2 = th / 2; // for easier calculations
  const proj = resx2 / mtan(th2);
  const transl = createTranslation([-pLookAt[0], -pLookAt[1], -pLookAt[2]]);

  const redpcam = transl.apply(pcam);
  const D = mhypot(redpcam[0], redpcam[1], redpcam[2]);
  const X = redpcam[0] / D;
  const Y = redpcam[1] / D;
  const Z = redpcam[2] / D;
  const m11 = msqrt(1 - Y * Y); // Cx /!\ Y= + / - 1 => Cx = 0
  const m00 = Z / m11;  // Cy
  const m02 = - X / m11;  // -Sy
  const m10 = Y * m02; // -Y.Sy
  const m12 = -Y * m00; // -Y.Cy
  const m20 = X;
  const m21 = Y;
  const m22 = Z;

  function rotatePoint (point) {
// rotation for camera position
    return [m00 * point[0] + m02 * point[2],
            m10 * point[0] + m11 * point[1] + m12 * point[2],
            m20 * point[0] + m21 * point[1] + m22 * point[2]];
  } // rotatePoint

  function pointToScreen (point) {
// projection on canvas
      return [point[0] / (D - point[2]) * proj + resx2,
             - point[1] / (D - point[2]) * proj + resy2];
  } // pointToScreen

  function projection (spaceCoords) {

  // spaceCoords may be a single point or an array of points
    if (spaceCoords[0].length !== 3)             // single point
      return pointToScreen(rotatePoint(transl.apply(spaceCoords)));
    else                     // array of points
      return spaceCoords.map(pt => pointToScreen(rotatePoint(transl.apply(pt))));
  }

  return {
    pcam: pcam,
    pLookAt : pLookAt,
    D: D, th: th, resx: resx, resy: resy,
    projection: projection
  }
} // createPerspective3

//-----------------------------------------------------------------------------
function Flower() {

  this.nbPetals = 2 * intAlea(3,7);
  this.angle0 = alea(m2PI);  // orientation of petal 0

  this.dangle = mPI / this.nbPetals; // each petals is 2 * this.dangle wide
  this.cdangle = mcos(this.dangle);
  this.sdangle = msin(this.dangle);

/* shape of petal */

// extremity of petals
  this.radius2 = alea(6,8);
  this.y2 = alea(2, 14);

// cercle at which petals begin to separate
  this.radius1 = this.radius2 * alea(0.3, 0.6);
  this.y1 = this.y2 * alea(0.3,0.6);
  this.slope1 = mtan(mPIS2 - alea(0.2, 0.4)); // slope of tangent at this point

/* not all cominations of dangle2 / alpha2 / bez21 give good results */
  this.dangle2 = alea(0.3, mPIS2); // half-angle at the petal tip, in the petal tip plane
  this.alpha2 = alea(-1, 1); // angle of petal tip plane with horizontal
  this.calpha2 = mcos(this.alpha2);
  this.salpha2 = msin(this.alpha2);

  this.bez01 = 0.5; // for bezier curve from origin (to point 1)
  this.bez10 = 0.5; // for Bezier curve from point 1 to origin
  this.bez12 = 0.6; // for Bezier curve from point 1 to point 2
  this.bez21 = 0.4; // for Bezier curve from point 2 to point 1

  this.hue0 = intAlea(360);
  this.hue1 = intAlea(2) ? this.hue0 : (this.hue0 + 80 ) % 360;
  this.color0 = `hsl(${this.hue0},100%,70%)`;
  this.color1 = `hsl(${this.hue1},100%,60%)`;
} // Flower

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Flower.prototype.createPetals = function(alpha) {

/* do create petals */

  let petal = this.createPetal(alpha);
  this.petals = [];
  for (let k = 0; k < this.nbPetals; ++k) {
    this.petals[k] = this.rotatePetal(k);
  } // for k
} // Flower.prototype.createPetals

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Flower.prototype.createPetal = function(alpha) {

/* creates a single petal symmetrical with respect to the xOy plane
  creates some line between full petal (alpha = 1) and central line (alpha = 0)
*/

  let x, y, dist, dangle, cdangle, sdangle;

// compute points of petal

  const points = [];

  dangle = alpha * this.dangle;
  cdangle = mcos(dangle);
  sdangle = msin(dangle);

// origin - the easy one
  points[0] = [0, 0, 0];
// point of separation of petals
  points[1] = [this.radius1 * cdangle, this.y1, this.radius1 * sdangle];
// end of petals
  points[2] = [this.radius2, this.y2, 0];
// symmetric of point 1
  points[3] = [points[1][0], points[1][1], -points[1][2]];
// back to origin
  points[4] = [points[0][0], points[0][1], points[0][2]];

// control points for Bezier curve

  const controls = [];
// 1st bezier arc
//  direction starting from point 0
  let dir0 = [cdangle, 0, sdangle]; // horizontal tangent
  let dir1 = normalize( [-cdangle, -this.slope1, -sdangle]);
  controls[0] = computeControls( points[0], points[1], dir0, dir1, this.bez01, this.bez10);

  dir1 = [-dir1[0], -dir1[1], -dir1[2]]; // opposite dir for next arc

  let dir2 = [-mcos(this.dangle2 * alpha) * this.calpha2,
              -mcos(this.dangle2 * alpha) * this.salpha2,
              msin(this.dangle2 * alpha)];

  controls[1] = computeControls( points[1], points[2], dir1, dir2, this.bez12, this.bez21);
// other controls by symmetry
  controls[2] = [[controls[1][1][0], controls[1][1][1], -controls[1][1][2]],
                 [controls[1][0][0], controls[1][0][1], -controls[1][0][2]]];
  controls[3] = [[controls[0][1][0], controls[0][1][1], -controls[0][1][2]],
                 [controls[0][0][0], controls[0][0][1], -controls[0][0][2]]];

  return this.petal = {points: points, controls: controls};

  function computeControls (p1, p2, dir1, dir2, bez12, bez21) {
/* dir1 and dir2 are unity-length vectors giving direction of tangent */
    let dist = distance (p1, p2);
    let d1 = dist * bez12;
    let ctrl1 = [p1[0] + d1 * dir1[0],
                 p1[1] + d1 * dir1[1],
                 p1[2] + d1 * dir1[2]];
    let d2 = dist * bez21;
    let ctrl2 = [p2[0] + d2 * dir2[0],
                 p2[1] + d2 * dir2[1],
                 p2[2] + d2 * dir2[2]];
    return [ctrl1, ctrl2];
  } // computeControls
} // Flower.prototype.createPetal

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Flower.prototype.rotatePetal = function(k) {

  const rotation = createRotation (0, 2 * this.dangle * k + this.angle0);
  const points = this.petal.points.map (p => rotation.apply(p));
  const controls = this.petal.controls.map (seg => seg.map(p => rotation.apply(p)));
  return {points: points, controls: controls};

} // Flower.prototype.rotatePetal

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Flower.prototype.translate = function (depl) {

  const trans = createTranslation (depl);

  this.petals.forEach (petal => {
    petal.points = trans.apply(petal.points);
    petal.controls = petal.controls.map(trans.apply);
  });

} // Flower.prototype.translate

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

Flower.prototype.draw = function () {

  let x, y, x1, y1, x2, y2, x3, y3;
  ctx.lineWidth = maxx / 8000;

  this.petals.forEach ((petal, kpet) => {
    ctx.strokeStyle = (kpet & 1) ? this.color0 : this.color1;
    ctx.beginPath();
    [x, y] = persp.projection (petal.points[0]);
    ctx.moveTo (x, y);

    petal.controls.forEach ((ctrl , k) => {

      [x1, y1] = persp.projection (ctrl[0]);
      [x2, y2] = persp.projection (ctrl[1]);
      [x3, y3] = persp.projection (petal.points[k + 1]);
      ctx.bezierCurveTo (x1, y1, x2, y2, x3, y3);
    }); // petal.controls.forEach

    ctx.stroke();

  }); // this.petals.forEach

} // Flower.prototype.draw

//-----------------------------------------------------------------------------
// returns false if nothing can be done, true if drawing done

function startOver() {

// canvas dimensions

  maxx = window.innerWidth;
  maxy = window.innerHeight;

  canv.style.left = ((window.innerWidth ) - maxx) / 2 + 'px';
  canv.style.top = ((window.innerHeight ) - maxy) / 2 + 'px';

  ctx.canvas.width = maxx;
  ctx.canvas.height = maxy;
  ctx.lineCap = 'round';   // placed here because reset when canvas resized

  if (maxx < 100) return false;

  xc = maxx / 2;
  yc = maxy / 2;

  ctx.clearRect (0, 0, maxx, maxy);

  persp = createPerspective3(
                [alea(20, 60), 50, 70],
                [0, 8, 0],
                0.5, maxx, maxy);

  return true; // ok

} // startOver

//------------------------------------------------------------------------
let animate;
{
  let animState = 0;
  let nbSteps, kStep;
  let kx, kz;

  animate = function(tStamp) {

    let tinit;

    window.requestAnimationFrame(animate);

    const event = events.shift();
    if (event && event.event == 'reset') animState = 0;
    if (event && event.event == 'click') animState = 0;

    switch (animState) {

      case 0 :
        if (startOver()) {
          ++animState;
          kz = -3;
          kx = -2;
        }
        break;

      case 1 :
        flower = new Flower();
        nbSteps = 100;
        kStep = 2 * nbSteps + 1;
        ++animState;
        break;

      case 2 :
        tinit = performance.now();
        do {
          flower.createPetals(kStep / (2 * nbSteps + 1));
          flower.translate([16 * kx, 0, 16 * kz]);
          flower.draw();
          kStep -= 2;
        } while (kStep >= 0 && performance.now() - tinit < SPEED_ANIM);
        if (kStep < 0) {
          ++animState;
        }
        break;

      case 3 :
        ++kx;
        if (kx > 1) {
          kx = -2;
          ++kz;
          if (kz > 1) {
            ++animState; // finished
            break;
          }
        }
        animState = 1; // next flower

    } // switch
  } // animate
} // scope for animate
//------------------------------------------------------------------------

function mouseClick(event) {
  events.push ({event: 'click'});
} // mouseClick

//------------------------------------------------------------------------
//------------------------------------------------------------------------
// beginning of execution

  {
    canv = document.createElement('canvas');
    canv.style.position="absolute";
    document.body.appendChild(canv);
    ctx = canv.getContext('2d');
    canv.setAttribute('title', 'click me');
  } // canvas creation

  document.body.addEventListener('click', mouseClick);
  window.requestAnimationFrame(animate);
  events = [{event: 'reset'}];

}); // window load listener