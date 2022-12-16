console.clear();

const paths = document.querySelectorAll('path');
const group = document.querySelector('#group');
const colours = [chroma.scale(['#FF7900', '#F94E5D', '#CA4B8C', '#835698', '#445582', '#2F4858']), chroma.scale(['#845EC2', '#D65DB1', '#FF6F91', '#FF9671', '#FFC75F', '#F9F871']), chroma.scale(['#F24B8E', '#F6ACC2', '#FFE3F1', '#59BAB7']), chroma.scale(['#1FAAFE', '#00C6FF', '#00DCE4', '#10ECB8', '#A0F68B', '#F9F871'])];
let currentGradient = 1;
const tl = gsap.timeline({
  onReverseComplete : () => {
    tl.timeScale(1);
    tl.play(0);
  },
  onComplete: () => {
    tl.timeScale(1.5);
    tl.reverse(0);
  }
});


function generatePoints () {
  tl.clear();
  group.innerHTML = '';
  let delay = 0;
  paths.forEach(path => {
    const length = path.getTotalLength();
    for (let i = 0; i < length; i+=1) {
      const pointLength = Math.random() * length;
      const point = path.getPointAtLength(pointLength);
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', point.x);
      circle.setAttribute('cy', point.y);
      circle.setAttribute('r', Math.random() * 3 + 1);
      group.appendChild(circle);
      const coloursX = (point.x / 476.5) + ((Math.random() - 0.5) * 0.2);
      tl.to(circle, {
        autoRound: false,
        fill: colours[currentGradient % colours.length](coloursX).hex(),
        cx: point.x + (Math.random() - 0.5) * 60,
        cy: point.y + (Math.random() - 0.5) * 60,
        duration: 'random(0.5, 2)',
        delay: (delay + pointLength) * 0.002,
        ease: 'power2.out'
      }, 0);
    }
    delay += length;
  });
  tl.reversed(false).play(0);
  currentGradient++;
}
window.addEventListener('click', () => {
  generatePoints();
});
generatePoints();
