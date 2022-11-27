let sidebarMenu = document.querySelector("#sidebarMenu");
let hamburger = document.querySelector("#hamburger");
let line1 = document.querySelector("#line-1");
let line2 = document.querySelector("#line-2");
let line3 = document.querySelector("#line-3");
let menuItems = document.querySelectorAll("#menu li a");
let drop = document.querySelectorAll(".drop");

let tl = new TimelineMax({paused: true, reversed: true});
let tl2 = new TimelineMax({repeat: 3, yoyo: true});

tl
  .to(
    sidebarMenu,
    .2,
    {borderRadius: 0, width: "25em"}
  )
  .to(
    hamburger,
    .2,
    {x: 100}
  )
  .to(
    sidebarMenu,
    .2,
    {height: "750px"}  
  )
  .to(
    hamburger,
    .2,
    {y: -150}
  )
  .to(
    line2,
    .2,
    {opacity: 0}
  )
  .to(
    line1,
    .2,
    {y: 8} 
  )
  .to(
    line3,
    .2,
    {y: -8} 
  )
  .to(
    line1,
    .2,
    {transformOrigin: "50%", rotation: 45} 
  )
  .to(
    line3,
    .2,
    {transformOrigin: "50%", rotation: -45} 
  )
  .staggerTo(
    menuItems,
    1,
    {x: "0em", opacity: 1, x: 70},
    .2
  )
  .to(
    drop,
    1,
    {y: 450, ease: Sine},
  );

tl2 
    .staggerFromTo(
      drop, 
      1,
      {y: 0, ease: Sine},
      {y: 40, ease: Sine},
      .2
    );

function toggleTween(tween) {
    tween.reversed() ? tween.play() : tween.reverse();
}

hamburger.addEventListener("click", (e) => {
  if(!tl.isActive()){
    toggleTween(tl)
  }
});
