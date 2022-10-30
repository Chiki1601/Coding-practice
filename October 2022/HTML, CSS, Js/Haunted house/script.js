var slugishness = 6;

var border = Math.sqrt(screen.height*screen.height+screen.width*screen.width);
var spy = document.querySelectorAll('.spy')[0];
var spyWidth = spy.offsetWidth-6000;
spy.style.borderWidth = border+'px';
spy.style.marginTop = -border-spyWidth/2+'px';
spy.style.marginLeft = -border-spyWidth/2+'px';

var curPos = new Vector2(screen.width/2, screen.height/2);
var destPos = curPos.clone();

var mouseMoved = false;
document.onmousemove = function(e) {
	mouseMoved = true;
	destPos.x = e.pageX;
	destPos.y = e.pageY;
}

function search() {
	if (mouseMoved == false) {
		var jerk = new Vector2(0,100+Math.random()*100);
		jerk.rotate(Math.random()*360);
		destPos.plusEq(jerk);
		if (destPos.x > screen.width) destPos.x = screen.width;
		if (destPos.x < 0) destPos.x = 0;
		if (destPos.y > screen.height) destPos.y = screen.height;
		if (destPos.y < 0) destPos.y = 0;
		setTimeout(function() {
			search();
		},1000)
	}
};
search();

function animate() {
	var dif = curPos.minusNew(destPos);
	if (dif.magnitude() > 1) {
		var drag = (mouseMoved) ? 1/slugishness : 0.05;
		curPos = curPos.minusEq(dif.multiplyEq(drag));
		spy.style.left = curPos.x+'px';
		spy.style.top = curPos.y+'px';
	}
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

var lights = document.querySelectorAll('.lights div');
function flicker() {
	var rand = Math.floor(lights.length*Math.random());
	var el = lights[rand];
	if (el.classList) {
		el.classList.toggle('on');
	} else {
		var classes = el.className.split(' ');
		var existingIndex = classes.indexOf(className);
		if (existingIndex >= 0)
			classes.splice(existingIndex, 1);
		else
			classes.push('on');
		el.className = classes.join(' ');
	}
	setTimeout(function() {
		flicker()
	}, Math.random()*2000)
}
flicker();