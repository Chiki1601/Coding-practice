////library used: https://svgjs.dev/docs/3.0/
const width = 1200;
const height = 1200;
const gridSize = 300;
let numRows = height / gridSize;
let numColumns = width / gridSize;

const draw = SVG().addTo("body").size(width, height);
draw.viewbox(0, 0, numColumns, numRows);

////Utility functions
function random(from, to, exclude) {
	let x;
	do {
		x = Math.floor(from + Math.random() * (to - from));
	} while (x === exclude);

	return x;
}

////Attribute variables
let colours = ["#281F6E", "#43BBD6", "#794CC3", "#F460B4", "#FED52F"];
let rotations = ["0", "90", "180", "270"];

/////Shapes, defined with simple svg path code (with the help of: https://yqnn.github.io/svg-path-editor/)
let shapes = [
	{
		name: "quartercircle",
		drawShape: () => draw.path(`M 0 0 a 1 1 0 0 1 1 1 h-1 z`)
	},
	{
		name: "halfcircle",
		drawShape: () => draw.path(`M 0 0 a 0.5 0.5 0 0 1 0 1 z`)
	},
	{
		name: "circle",
		drawShape: () => draw.circle(1, 1, 0.5)
	}
];

////Drawing Functions

function drawManyShapes(number) {
	let mygroup = draw.group();
	for (let i = 0; i < number; i++) {
		let myRandomColour = colours[random(0, colours.length, undefined)];
		let x = Math.floor(i / Math.sqrt(number));
		let y = i % Math.sqrt(number);
		let mysubgroup = draw.group();
		let rect = draw.rect(1, 1).fill("none").move(x, y);

		let randomShape = shapes[random(0, shapes.length, undefined)]
			.drawShape()
			.move(x, y)
			.fill(myRandomColour);
		mysubgroup
			.add(randomShape)
			.add(rect)
			.rotate(rotations[random(0, rotations.length, undefined)]);
		mygroup.add(mysubgroup);
	}
	let rect = draw.rect(Math.sqrt(number), Math.sqrt(number)).fill("none");
	mygroup.add(rect);
	mygroup.rotate(rotations[random(0, rotations.length, undefined)]);
	return mygroup;
}

/////and now putting together a grid of different sized patches

function putTogetherGrid() {
	let mygroup = draw.group();
	for (let y = 0; y < numRows; y++) {
		for (let x = 0; x < numColumns; x++) {
			let numSubdivisions = random(1, 4, undefined);
			let scaleFactor = 1 / numSubdivisions;
			let manyShapes = drawManyShapes(numSubdivisions ** 2);
			//manyShapes.origin("top", "left").translate(x, y).scale(scaleFactor);
			manyShapes.transform({
				translateX: x,
				translateY: y,
				origin:[0,0],
				scale: scaleFactor
			});
			mygroup.add(manyShapes);
		}
	}
}

putTogetherGrid();
