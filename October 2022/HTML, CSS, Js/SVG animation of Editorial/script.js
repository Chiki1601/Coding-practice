//Classes
var arrowSmall = document.getElementsByClassName("arrowSmall");
var arrowSmallsh = document.getElementsByClassName("arrowSmallsh");
var arrowBig = document.getElementsByClassName("arrowBig");
var arrowBigsh = document.getElementsByClassName("arrowBigsh");

var person1 = document.getElementsByClassName("person1");
var person2 = document.getElementsByClassName("person2");
var person3 = document.getElementsByClassName("person3");
var person4 = document.getElementsByClassName("person4");
var person5 = document.getElementsByClassName("person5");
var peopleGroup = document.getElementsByClassName("peopleGroup");

var maskPoly = document.getElementsByClassName("maskPoly");

var plant = document.getElementsByClassName("plant");


//****** Animation
//Plant
var tlplant = new TimelineMax();
tlplant.staggerFromTo(plant, 2, {
  transformOrigin:"0% 100%",
  skewX:"1deg"
}, {
  skewX:"-2deg",
  repeat: -1,
  yoyo: true
}, 0.1);

//Clock Arrows
var tlarrowSmall = new TimelineMax({repeat:-1, yoyo:true, repeatDelay: 4.7});
tlarrowSmall.fromTo([arrowSmall, arrowSmallsh], 1, {
  transformOrigin:"0% 100%",
  rotation:"0deg"
}, {
  rotation:"160deg",
  ease:"linear",
});

var tlarrowBig = new TimelineMax({
  repeat:-1,
  repeatDelay:1.5
  });
tlarrowBig.set([arrowBigsh, arrowBig], {transformOrigin:"100% 0%"})
tlarrowBig.to([arrowBig, arrowBigsh], .8, {
  rotation:"340deg",
  ease:"linear",
  repeat: 1,
});
tlarrowBig.to([arrowBig, arrowBigsh], .6, {rotation:"350deg", delay:.8})
tlarrowBig.to([arrowBig, arrowBigsh], .6, {rotation:"360deg", delay:.8})
tlarrowBig.to([arrowBig, arrowBigsh], .8, {
  rotation:"-20deg",
  ease:"linear",
  repeat: 1,
  delay:1.2
});
tlarrowBig.to([arrowBig, arrowBigsh], .6, {rotation:"-10deg", delay:.8})
tlarrowBig.to([arrowBig, arrowBigsh], .6, {rotation:"0deg", delay:.8})


//Swoosh Animations
var tl = new TimelineMax({yoyo:true,repeat:-1, repeatDelay:5});
tl.fromTo('#star', .7,{x:-1200}, { x:0, ease: Sine.easeInOut})