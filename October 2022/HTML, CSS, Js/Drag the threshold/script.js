console.clear();

$(document).ready(function() {
	
	const dragEl = $('.drag');
	const dragHandle = $('.drag--handle');
	const dragLine = $('.drag--line');
	const dragTarget = $('.drag--target');
	const dragContainer = $('body');
	
	let containerWidth = dragContainer.outerWidth();
	let elWidth = dragHandle.outerWidth();
	let dragWidth = dragEl.outerWidth();
	
	let threshold = dragWidth * .8; // threshold at 80% of the line
	
	let active = false;
	let currentX;
	let initialX;
	let xOffset = 0;
	let triggered = false;
	
	dragContainer.on('touchstart', dragStart);
	dragContainer.on('touchend', dragEnd);
	dragContainer.on('touchmove', drag);
	
	dragContainer.on('mousedown', dragStart);
	dragContainer.on('mouseup', dragEnd);
	dragContainer.on('mousemove', drag);
	
	// end drag if mouse leaves document
	addEvent(document, 'mouseout', function(e) {
		e = e ? e : window.event;
		let from = e.relatedTarget || e.toElement;
		if (!from || from.nodeName == 'HTML') {
			dragEnd();
		}
	});
	
	function addEvent(obj, evt, fn) {
		if (obj.addEventListener) {
			obj.addEventListener(evt, fn, false);
		} else if (obj.attachEvent) {
			obj.attachEvent('on' + evt, fn);
		}
	}
	
	function dragStart(e) {
		dragTarget.removeClass('trigger');

		if (e.type === 'touchstart') {
			initialX = e.touches[0].clientX - xOffset;
		} else {
			initialX = e.clientX - xOffset;
		}
		
		if (e.target === dragHandle[0]) {
			active = true;
		}
	}
	
	function dragEnd() {
		initialX = currentX;
		
		active = false;
		
		if (currentX < threshold) {
			// move to start if dragged under threshold
			TweenMax.to(dragHandle, .5, {
				transform: 'translate3d(0, 0, 0)'
			});
			
			TweenMax.to(dragLine, .5, {
				width: '100%'
			});
			
			currentX = 0;
			xOffset = 0;
		} else if (currentX > threshold) {
			// move to end if dragged over threshold
			TweenMax.to(dragHandle, .25, {
				transform: `translate3d(${dragWidth}px, 0, 0)`
			});
			
			TweenMax.to(dragLine, .5, {
				width: '0'
			});
			
			if (!triggered) {
				dragTarget.addClass('trigger');	
				triggered = true;
			}
			
			currentX = dragWidth;
			xOffset = dragWidth;
		}
	
	}
	
	function drag(e) {
		if (active) {
			e.preventDefault();
			
			if (e.type === 'touchmove') {
				currentX = e.touches[0].clientX - initialX;
			} else {
				currentX = e.clientX - initialX;
			}
			
			// limit dragging to start of line
			if (currentX < 0) {
				currentX = 0;
			}
			
			// limit dragging to end of line
			if (currentX > dragWidth) {
				currentX = dragWidth;
			}
			
			if (currentX > threshold) {
				dragTarget.addClass('active');
			} else {
				dragTarget.removeClass('active');
				triggered = false;
			}
			
			xOffset = currentX;
			setTranslate(currentX, dragHandle);
		}
	}
	
	function setTranslate(xPos, el) {
		TweenMax.to(el, .25, {
			transform: `translate3d(${xPos}px, 0, 0)`
		});
		TweenMax.to(dragLine, .25, {
			width: dragWidth - xPos
		});
	}

	
	
	// show threshold details
	$('.detail').on('click', function() {
		$('.detail-el').remove();
		$('<div class="detail-el"></div>').appendTo(dragEl).css({
			left: threshold
		});
	});
	
});