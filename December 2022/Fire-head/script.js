var select = function(s) {
      return document.querySelector(s);
    }, selectAll = function(s) {
      return document.querySelectorAll(s);
    }, container = select('.container'),
		mainSVG = select('.mainSVG'),
		bubble = select('.bubble')


var mainTimeline = gsap.timeline({paused:true});


var particleColorArray = ['#CC230C', '#E0550D', '#C8433E', '#FA9417', '#F7A958', '#F4BEA2', '#D57A84'];

var numBubbles = 100;

//behind
for(var i = 0; i < numBubbles/2; i++){

  var colorId = Math.floor(Math.random()*particleColorArray.length);
  
  var p = bubble.cloneNode(true)
  mainSVG.insertBefore(p, mainSVG.firstChild);
  var startRadius = gsap.utils.random(2, 32); 
  TweenMax.set(p, {
    attr:{
      cx:gsap.utils.random(200, 300),
      cy:gsap.utils.random(400, 400),
      r:0
    },
    filter:'url(#glow)',
    fill:particleColorArray[colorId]
  })
  
  p.startRadius = startRadius;
  
var dur = gsap.utils.random(8, 10);
  var angle = gsap.utils.random(0, 90);
  var tl = gsap.timeline({repeat:3});
  
  tl.to(p, dur/2, {
    attr:{
      r:startRadius
    }
  })
  .to(p, dur, {
  transformOrigin:'30% 50%', 
    rotation:-180,
  	opacity:1,
    attr:{
      cy:700
    },
  physics2D:{
    velocity:-0, 
    angle:angle, 
    acceleration:0, 
    gravity:-2, 
    accelerationAngle:0
  }
},'-=' + (dur/2))
  .to(p, dur/2, {
    attr:{
      r:0
    }
  },'-=' + (dur/2))
  
  mainTimeline.add(tl, i/10);  

}

//in front
for(var i = 0; i < numBubbles; i++){

  var colorId = Math.floor(Math.random()*particleColorArray.length);
  
  var p = bubble.cloneNode(true)
  mainSVG.appendChild(p);
  var startRadius = gsap.utils.random(1, 20); 
  TweenMax.set(p, {
    attr:{
      cx:gsap.utils.random(250, 350),
      cy:gsap.utils.random(350, 500),
      r:0
    },
    fill:particleColorArray[colorId]
  })

 var dur = gsap.utils.random(10, 12);
  var angle = gsap.utils.random(0, -90);
  var tl = gsap.timeline({repeat:3});
  tl.to(p, dur/2, {
    attr:{
      r:startRadius
    }
  })
    .to(p, dur , {
    rotation:280,
  	opacity:1,
    attr:{
      cy:650
    },
  physics2D:{
    velocity:-20, 
    angle:angle, 
    acceleration:-2, 
    gravity:-10, 
    accelerationAngle:0
  }
},'-=' + (dur/2))
  .to(p, dur/2, {
    attr:{
      r:0
    }
  },'-=' + (dur/2))
  
  mainTimeline.add(tl, i/8);

}


//top of head
for(var i = 0; i < numBubbles; i++){

  var colorId = Math.floor(Math.random()*(particleColorArray.length-1)) + 1;
  
  var p = bubble.cloneNode(true)
  mainSVG.insertBefore(p, mainSVG.firstChild);
  var startRadius = gsap.utils.random(2, 10); 
  TweenMax.set(p, {
    attr:{
      cx:gsap.utils.random(250, 350),
      cy:gsap.utils.random(190, 210),
      r:startRadius
    },
    fill:particleColorArray[colorId]
  })
    
var dur = gsap.utils.random(6, 10);
  var angle = gsap.utils.random(0, 90);
  
  var t = TweenMax.fromTo(p, {
		duration: dur,
    	opacity:1,
    	attr:{
      	r:startRadius
  		}
  }, {
  transformOrigin:'30% 650%', 
    rotation:-0,
  	repeat:3,
  	opacity:1,
    attr:{
      r:0,
      cx:'+=30'
    },
  physics2D:{
    velocity:0, 
    angle:angle, 
    acceleration:0, 
    gravity:-20, 
    accelerationAngle:90
  }
}); 
  
  mainTimeline.add(t, i/6);  

}




mainSVG.removeChild(bubble);



var allTl = gsap.timeline({repeat:-1, yoyo:false, paused:false});
allTl.timeScale(1.1)
allTl.to(mainTimeline, {
	duration: 12,
  time:mainTimeline.duration(),
  ease:Linear.easeNone
  
})
/*
allTl.to(mainTimeline, 20, {
  time:3,
  ease:Power2.easeInOut
  
})
.to(mainTimeline, 15, {
  time:5,
  ease:Power2.easeInOut
  
})
.to(mainTimeline, 10, {
  time:7,
  ease:Power2.easeInOut
  
})
.to(mainTimeline, 20, {
  time:20,
  ease:Power2.easeInOut
  
})
.to(mainTimeline, 20, {
  time:30,
  ease:Power2.easeInOut
  
})

.to(mainTimeline, 20, {
  time:40,
  ease:Power2.easeInOut
  
})

function updateHue(){
  
  TweenMax.set('.colorMatrix', {
    attr:{
      values:(allTl.time()/allTl.duration())
    }
  })
}*/
