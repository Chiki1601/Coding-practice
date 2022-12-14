const DIM = +document.querySelector('svg').getAttribute('viewBox').split(' ')[2],
R = +document.getElementById('cc').getAttribute('r'),
RA = .2 * R,
ABASE = `M0 0 ${RA} 0A${RA} ${RA} 0 0 1 `,
P = 5,
E = 0,
BA_DEG = 360 / P,BA_RAD = 2 * Math.PI / P,
TBB = document.querySelector('.adeg').getBBox(),
TR = .5 * Math.hypot(TBB.width, 2 * TBB.height),
COORD = [],
VX = Array.from(document.querySelectorAll('.point')).map((c, i) => {
  const _O = {
    g: c,
    pt: c.querySelector('circle'),
    lb: c.querySelector('.lbl'),
    nm: c.querySelector('.name'),
    id: c.querySelector('tspan'),
    dg: c.querySelector('.adeg') },

  CA_RAD = i * BA_RAD,
  COS = Math.cos(CA_RAD),
  SIN = Math.sin(CA_RAD);

  let x = +(R * COS).toFixed(E),
  y = +(R * SIN).toFixed(E);

  COORD.push([x, y]);

  c.setAttribute(...[
  'transform',
  `translate(${COORD[i].join(' ')})`]);


  x = +(TR * COS).toFixed(E);
  y = +(TR * SIN).toFixed(E);

  _O.lb.dataset.pos = `translate(${[x, y].join(' ')})`;
  _O.lb.setAttribute(...[
  'transform',
  _O.lb.dataset.pos]);


  return _O;
}),
T = {
  grow: 32,
  show: 61,
  draw: 92 },

_ARC = { g: document.getElementById('arc') },
_PREV = document.getElementById('prev'),
_CURR = document.getElementById('curr'),
_POLY = document.getElementById('poly'),
TFN = {
  'linear': function (k) {
    return k;
  },
  'ease-in': function (k, e = 1.75) {
    return Math.pow(k, e);
  },
  'ease-out': function (k, e = 1.75) {
    return 1 - Math.pow(1 - k, e);
  },
  'bounce-fin': function (k, e = .7 * Math.PI) {
    return Math.sin(k * e) / Math.sin(e);
  },
  'bounce-xtra': function (k) {
    return 1 - Math.cos(k * 7.5 * Math.PI) / Math.pow(2, Math.round(k / .4 / 3));
  } };


let q = null,rID = null,prev_rad,prev_deg,curr_coord;

function reset() {
  prev_deg = prev_rad = 0;

  VX.forEach(c => {
    c.pt.setAttribute('transform', 'scale(.7)');
    c.nm.setAttribute('font-size', '0');
    c.nm.setAttribute('opacity', 0);
  });

  _ARC.g.setAttribute('opacity', 0);
  _ARC.g.setAttribute('transform', 'rotate(0)');
  _ARC.path.setAttribute('d', '');
  _ARC.text.setAttribute('opacity', 0);
  _PREV.setAttribute('opacity', 0);
  _PREV.setAttribute('transform', 'none');
  _CURR.setAttribute('opacity', 0);
  _POLY.setAttribute('d', '');
};

function stopAni() {
  cancelAnimationFrame(rID);
  rID = null;
};

function ani(step = -1, t = T.grow) {
  let k,vid = (step + 1) * q % P,j,x,y;

  switch (true) {
    case t <= T.grow:
      k = t / T.grow;

      let ca_rad = k * q * BA_RAD;

      _CURR.setAttribute('transform', `rotate(${prev_deg + k * q * BA_DEG})`);
      _ARC.path.setAttribute('d', ABASE + `${RA * Math.cos(ca_rad)} ${RA * Math.sin(ca_rad)}z`);

      if (t === T.grow) {
        if (step < 0) _CURR.setAttribute('transform', `none`);

        if (step === P - 1) {t = T.show;} else
        {VX[vid].id.textContent = step + 1;}
      }
      break;
    case t <= T.show:
      k = (t - T.grow) / (T.show - T.grow);

      if (step < P - 1) {
        VX[vid].pt.setAttribute('transform', `scale(${.7 + TFN['bounce-xtra'](k) * .3})`);
        VX[vid].nm.setAttribute('font-size', `${TFN['bounce-fin'](k)}em`);
        VX[vid].nm.setAttribute('opacity', TFN['ease-out'](k));
      }

      if (step < 0) _CURR.setAttribute('opacity', k);

      if (t === T.show) {
        if (step < 0) {
          _PREV.setAttribute('opacity', 1);
          _ARC.path.setAttribute('d', '');
          _ARC.g.setAttribute('opacity', 1);

          ++step;
          t = -1;
        }
      }
      break;
    case t <= T.draw:
      k = (t - T.show) / (T.draw - T.show);
      j = 1 - k;

      [x, y] = curr_coord[step].map((c, i) => j * c + k * curr_coord[(step + 1) % P][i]);

      _PREV.setAttribute('opacity', TFN['ease-in'](j));
      _ARC.g.setAttribute('opacity', TFN['ease-in'](j));
      if (step === P - 1) _CURR.setAttribute('opacity', TFN['ease-in'](j));

      _POLY.setAttribute('d', `M${curr_coord.slice(0, step + 1)} ${[x, y]}`);

      if (t === T.draw) {
        if (++step === P) {
          stopAni();
          return;
        }

        prev_deg = step * q * BA_DEG;
        _PREV.setAttribute('transform', `rotate(${prev_deg})`);
        _ARC.g.setAttribute('transform', `rotate(${prev_deg})`);
        _PREV.setAttribute('opacity', 1);
        _ARC.path.setAttribute('d', '');
        _ARC.g.setAttribute('opacity', 1);

        t = -1;
      }
      break;}


  rID = requestAnimationFrame(ani.bind(this, step, ++t));
};

(function init() {
  _ARC.path = _ARC.g.querySelector('path');
  _ARC.text = _ARC.g.querySelector('text');

  reset();

  addEventListener('change', e => {
    const _T = e.target;

    if (_T.dataset.q) {
      if (rID) stopAni();
      q = +_T.dataset.q;
      reset();

      curr_coord = Array(P).fill(1).map((c, i) => COORD[q * i % P]);

      ani();
    }
  }, false);
})();
