let isRunning = false;

function animateCircle(distance, icon) {
  let t1 = gsap.timeline();

  if (!isRunning) {
    isRunning = true;
    t1.eventCallback("onComplete", function () {
      isRunning = false;
    });

    gsap.to(
      ".container",
      1.5,
      {
        ease: "elastic.out(.4, 0.3)",
        scale: 0.7
      },
      0
    );

    gsap.to(
      ".container",
      1.5,
      {
        ease: "elastic.out(.4, 0.3)",
        scale: 1
      },
      0
    );

    t1.to(".circle", 0.4, {
      ease: "elastic.out(.4, 0.3)",
      y: 0
    });

    t1.to(".circle", 0.3, {
      ease: "power1.inOut",
      x: distance
    });

    t1.to(
      `#${icon}`,
      0.8,
      {
        ease: "elastic.out(.4, 0.5)",
        y: -160
      },
      0.7
    );

    t1.to(
      ".circle",
      1,
      {
        ease: "elastic.out(.4, 0.3)",
        y: -140
      },
      0.7
    );

    t1.to(`#${icon}`, 1, {
      ease: "elastic.out(.4, 0.3)",
      y: -66,
      stroke: "white"
    });

    t1.to(
      ".circle",
      0.6,
      {
        ease: "elastic.out(.5, 0.3)",
        y: -135
      },
      1.9
    );

    t1.to(
      ".circle",
      0.4,
      {
        ease: "power1.inOut",
        y: -140
      },
      2.1
    );

    t1.to(
      `#${icon}`,
      1,
      {
        ease: "elastic.out(.4, 0.3)",
        y: 0,
        stroke: "#ff5157"
      },
      2.6
    );

    t1.to(
      ".circle",
      1,
      {
        ease: "elastic.out(.5, 0.3)",
        y: 0
      },
      2.6
    );
  }
}

let box = document.querySelector("#box");
let home = document.querySelector("#home");
let calendar = document.querySelector("#calendar");

box.addEventListener("click", function () {
  animateCircle(0, "box");
});

home.addEventListener("click", function () {
  animateCircle(140, "home");
});

calendar.addEventListener("click", function () {
  animateCircle(280, "calendar");
});
