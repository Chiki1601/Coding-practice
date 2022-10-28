console.clear()

let camera, scene, renderer, clock;
let uniforms;

let GUI = new dat.GUI();

const settings = {
	duration: 3,
	tiles: 6
};

function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 100 );
	camera.position.z = 1;

	renderer = new THREE.WebGLRenderer();
	
	clock = new THREE.Clock();

	const geometry = new THREE.PlaneBufferGeometry(2, 2);
	uniforms = {
		totalTiles: { value: settings.tiles },
		playhead: { value: 0.0 },
		aspect: {value: window.innerWidth/window.innerHeight}
	};

	const material = new THREE.ShaderMaterial({
		uniforms,
		vertexShader: document.getElementById("vertex").textContent,
		fragmentShader: document.getElementById("fragment").textContent
	});
	const plane = new THREE.Mesh( geometry, material );
	scene.add( plane );

	document.body.appendChild( renderer.domElement );

	onResize();
	window.addEventListener("resize", onResize);

}

function onResize(){
	uniforms.aspect.value = window.innerWidth/window.innerHeight;
	renderer.setSize( window.innerWidth, window.innerHeight );
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
}

function render() {
	uniforms.playhead.value = (clock.getElapsedTime()/settings.duration) % 1;
	renderer.render(scene, camera);
}

function animate() {
	render();
	requestAnimationFrame(animate);
}

function initGUI(){
	GUI.add(settings, 'duration', 1, 8).step(1);
	GUI.add(settings, 'tiles', 1, 20).step(1).onChange((val) => {
		uniforms.totalTiles.value = val;
	});
}

init();
initGUI()
animate();