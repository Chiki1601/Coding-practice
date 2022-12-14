var rootEl = document.querySelector(".container");
var baseUrl = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/142414";

function loadAnimation(container, path) {
	return bodymovin.loadAnimation({
		container: container,
		renderer: "svg",
		loop: true,
		autoplay: true,
		path: path
	});
}

function loadAnimations(files) {
	const animationInstances = files.map(file => {
		// create and append a new container for every animation
		const container = document.createElement("div");
		container.classList.add("clickable");
		rootEl.appendChild(container);

		// load animation into container
		return loadAnimation(container, `${baseUrl}/${file}`);
	});
}

var animations = loadAnimations([
	"x01.json",
	"x02.json",
	"x03.json",
	"x04.json?2",
	"x05.json?2",
	"x06.json",
	"x07.json",
	"x08.json"
]);
