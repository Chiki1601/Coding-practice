//Initial References
const container = document.querySelector(".container");
let drawHearts;
let mouseX = 0,
  mouseY = 0;
let hearts = [];

//Red Shades
let colors = ["#ff0000", "#dc143c", "#ff4040", "#ed2939", "#fe2712", "#ed1c24"];

//Events Object
let events = {
  mouse: {
    move: "mousemove",
    stop: "mouseout",
  },
  touch: {
    move: "touchmove",
    stop: "touchend",
  },
};

let deviceType = "";

//Detect touch device
const isTouchDevice = () => {
  try {
    //We try to create TouchEvent (It would fail for desktops and throw error)
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

//Random number between given range
function randomNumberGenerator(min, max) {
  return Math.random() * (max - min) + min;
}

//Create Hearts
function startCreation() {
  //If drawHearts = true only then start displaying hearts. This is done to stop hearts creation when mouse is not on the screen.
  if (drawHearts) {
    //Create Div
    let div = document.createElement("div");
    div.classList.add("heart-container");
    //Set left and top based on mouse X and Y
    div.style.left = mouseX + randomNumberGenerator(5, 50) + "px";
    div.style.top = mouseY + randomNumberGenerator(5, 50) + "px";
    //Random shade of Red
    let randomColor =
      colors[Math.floor(randomNumberGenerator(0, colors.length - 1))];
    //heart dic
    div.innerHTML = `<div class="heart"></div>`;
    div.style.opacity = 1;
    //Set the value of variable --size to random number
    let root = document.querySelector(":root");
    let sizeValue = randomNumberGenerator(10, 20);
    //Random height/width value
    //You can change this
    root.style.setProperty("--size", sizeValue + "px");
    root.style.setProperty("--color", randomColor);
    container.appendChild(div);
    //set visible flag for div
    hearts.push({
      visible: true,
    });
  }
  updateHearts();
  window.setTimeout(startCreation, 50);
}
function updateHearts() {
  for (let i in hearts) {
    //get div at current index
    let heartContainer = document.getElementsByClassName("heart-container")[i];
    //If visible
    if (hearts[i].visible) {
      heartContainer.style.opacity = +heartContainer.style.opacity - 0.1;
      //If 0 set visible to false
      if (heartContainer.style.opactiy == 0) {
        hearts[i].visible = false;
      }
    } else {
      //if div is not visible remove it and remove entry from hearts array
      heartContainer.remove();
      hearts.splice(i, 1);
    }
  }
}
isTouchDevice();
document.addEventListener(events[deviceType].move, function (e) {
  mouseX = isTouchDevice() ? e.touches[0].pageX : e.pageX;
  mouseY = isTouchDevice() ? e.touches[0].pageY : e.pageY;
  drawHearts = true;
});

document.addEventListener(events[deviceType].stop, function (e) {
  drawHearts = false;
});

window.onload = () => {
  drawHearts = false;
  startCreation();
};
