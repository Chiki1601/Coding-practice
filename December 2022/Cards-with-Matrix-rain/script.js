window.onload = function() {
  let slideLeft = document.querySelectorAll('.cards_slide_left');
  let slideRight = document.querySelectorAll('.cards_slide_right');
  let slideInnerLeft = document.querySelectorAll('.cards_slide_inner_left');
  let slideInnerRight = document.querySelectorAll('.cards_slide_inner_right');
  TweenMax.to(slideLeft, 2, {width:"300px",ease: Elastic.easeOut,})
  TweenMax.to(slideRight, 2, {width:"100px", ease: Elastic.easeOut,})
  TweenMax.to(slideInnerLeft, 1, {width:"200px", delay:0.3, ease: Linear.easeNone,})
  TweenMax.to(slideInnerRight, 1, {width:"0", delay:0.3, ease:Power0.easeNone,})
  TweenMax.to(slideLeft, 1, {width:"500px",  delay: 2, ease:Power0.easeNone,})
  TweenMax.to(slideRight, 1, {width:"250px", delay: 2, ease:Power0.easeNone,})
  TweenMax.to(slideInnerLeft, 1, {width:"500px", delay: 1.5, ease:Power0.easeNone,})
  TweenMax.to(slideInnerRight, 1, {width:"250px", delay: 1.5, ease:Power0.easeNone,})
};
var card = document.querySelectorAll('.cards');
  for (var i = 0; i < card.length; i++) {
    card[i].addEventListener('mouseenter', function(e) {
      cardMouseEnter(e.target);
    }, false);  
    card[i].addEventListener('mouseleave', function(e) {
      cardMouseLeave(e.target)
    }, false);  
     card[i].addEventListener('touchstart', function(e) {
      cardMouseLeave(e.target)
    }, false); 
  }
function cardMouseEnter(el){
    let slideLeft = el.querySelector('.cards_slide_left');
    const slideRight = el.querySelector('.cards_slide_right');
    var slideInnerLeft = el.querySelector('.cards_slide_inner_left');
    let slideInnerRight = el.querySelector('.cards_slide_inner_right');
    TweenMax.to(slideLeft, 3, {width:"300px",ease: Elastic.easeOut,})
    TweenMax.to(slideRight, 3, {width:"100px", ease: Elastic.easeOut,})
    TweenMax.to(slideInnerLeft, 1, {width:"200px", delay:0.3, ease: Linear.easeNone,})
    TweenMax.to(slideInnerRight, 1, {width:"0", delay:0.3, ease:Power0.easeNone,})
}
function cardMouseLeave(el){
    let slideLeft = el.querySelector('.cards_slide_left');
    let slideRight = el.querySelector('.cards_slide_right');
    let slideInnerLeft = el.querySelector('.cards_slide_inner_left');
    let slideInnerRight = el.querySelector('.cards_slide_inner_right');
    TweenMax.to(slideLeft, 1, {width:"500px", ease:Power0.easeNone,})
    TweenMax.to(slideRight, 1, {width:"250px", ease:Power0.easeNone,})
    TweenMax.to(slideInnerLeft, 1, {width:"500px", ease:Power0.easeNone,})
    TweenMax.to(slideInnerRight, 1, {width:"250px", ease:Power0.easeNone,})
}

var theCanvas = document.querySelectorAll(".theCanvas");
for (i = 0; i < theCanvas.length; i++) { 
  createCanvas(theCanvas[i]);
}
function createCanvas(e){
  var ctx = e.getContext("2d");
  var slideLeftWindow = document.querySelector('.slide_left_window');
  e.height = slideLeftWindow.offsetHeight;
  e.width = slideLeftWindow.offsetWidth;

  var chinese = "敏捷的棕色狐狸跳过了懒狗";
  chinese = chinese.split(""); //makes array into single chars

  var font_size = 12;
  var columns = e.width/font_size; // how many columns for characters based on font size
  var drops = []; // array for each character within its column
  //x below is the x coordinate
  //1 = y co-ordinate of the drop(same for every drop initially)
  for(var x = 0; x < columns; x++) 
    drops[x] = 1; 

  function draw()
  {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; //canvas background
    ctx.fillRect(0, 0, e.width, e.height); //translucent background for 'trail' effect
    ctx.fillStyle = "#0F0"; //color of characters
    ctx.font = font_size + "px arial";

    for(var i = 0; i < drops.length; i++) //loop for drops 
    {
      var text = chinese[Math.floor(Math.random()*chinese.length)]; //prints random character
      ctx.fillText(text, i*font_size, drops[i]*font_size); 
      if(drops[i]*font_size > e.height && Math.random() > 0.975)
        drops[i] = 0;
      drops[i]++;
    }
  }
  setInterval(draw, 43);
};
