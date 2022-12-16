const canvas = document.querySelector("canvas");
const input = document.querySelector('input[type="range"]');

let { innerHeight: height, innerWidth: width } = window;
canvas.width = width;
canvas.height = height;

const context = canvas.getContext("2d");

// max color is used for the portion of the rgb components
// the idea is to have brighter blues as the lines are drawn lower and to the right
const maxColor = 100;

// distance between successive lines
let spacing = 20;
let lineWidth = 0.2;

// limit for requestAnimationFrame
let drawTime;
let drawInterval = 60;

// odds of drawing a line
let threshold = 0.8;
const odds = () => Math.random() > threshold;

function resize() {
	width = window.innerWidth;
	height = window.innerHeight;
	canvas.width = width;
	canvas.height = height;
}

function draw() {
	context.clearRect(0, 0, width, height);
	context.lineWidth = lineWidth;
	for (let x = 0; x < width; x += spacing) {
		for (let y = 0; y < height; y += spacing) {
			const color =
				Math.min(Math.ceil((maxColor / 2 / width) * x), maxColor / 2) +
				Math.min(Math.ceil((maxColor / 2 / height) * y), maxColor / 2);
			context.strokeStyle = `rgb(${color / 4}, ${color / 2}, ${color})`;
			if (odds()) {
				context.beginPath();
				context.moveTo(x, y);
				context.lineTo(x + spacing, y + spacing);
				context.closePath();
				context.stroke();
			}
		}
	}
}

window.addEventListener("resize", () => {
	resize();
});

function animate(timestamp) {
	if (!drawTime) {
		drawTime = timestamp;
	} else {
		const elapsedTime = timestamp - drawTime;
		if (elapsedTime > drawInterval) {
			draw();
			drawTime = null;
		}
	}

	window.requestAnimationFrame(animate);
}

animate();

const map = ({ value, min, max, minRange, maxRange }) =>
	minRange + (maxRange - minRange) * ((value - min) / (max - min));

/*
from drizzle to downpour
spacing: [25, 10]
interval: [100, 40]
lineWidth: [0.1, 0.4]
threshold: [0.95, 0.65]
*/
input.addEventListener("input", (e) => {
	const { value, min, max } = e.target;
	spacing = map({ value, min, max, minRange: 25, maxRange: 10 });
	drawInterval = map({ value, min, max, minRange: 100, maxRange: 40 });
	lineWidth = map({ value, min, max, minRange: 0.1, maxRange: 0.4 });
	threshold = map({ value, min, max, minRange: 0.95, maxRange: 0.65 });
});
