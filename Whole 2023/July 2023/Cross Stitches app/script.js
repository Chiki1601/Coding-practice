const heightInput = document.getElementById("height-input");
const colorInput = document.getElementById("color-input");
const clearButton = document.getElementById("clear-button");
const createButton = document.getElementById("create-grid");
const grid = document.getElementById("grid");
const inputContainer = document.querySelector(".input-container");
const widthInput = document.getElementById("width-input");
const saveButton = document.getElementById("save-button");
const errMessage = document.getElementById("err-message");
let currentColor;
colorInput.addEventListener("input", () => {
  currentColor = colorInput.value;
});

const createGrid = () => {
  errMessage.innerText = "";
  grid.innerHTML = "";
  const height = parseInt(heightInput.value) || 10;
  const width = parseInt(widthInput.value) || 10;
  if (height > 20 || width > 20) {
    errMessage.innerText = "Height and width cannot be more than 20";
    return false;
  }

  grid.style.gridTemplateColumns = `repeat(${width},1fr)`;

  for (let i = 0; i < height * width; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.addEventListener("click", (e) => {
      e.target.style.color = currentColor;
      if (e.target.innerText == "X") {
        e.target.innerText = "";
      } else {
        e.target.innerText = "X";
      }
    });
    grid.appendChild(tile);
  }
};

const clearGrid = () => {
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((element) => {
    element.innerText = "";
  });
};

saveButton.addEventListener("click", () => {
  html2canvas(grid).then((canvas) => {
    const imageURL = canvas.toDataURL();
    const downloadButton = document.createElement("a");
    downloadButton.setAttribute("href", imageURL);
    downloadButton.setAttribute("download", "image.png");
    downloadButton.click();
    downloadButton.remove();
  });
});

clearButton.addEventListener("click", clearGrid);
createButton.addEventListener("click", createGrid);
window.onload = () => {
  errMessage.innerText = "";
  heightInput = 10;
  widthInput = 10;
  currentColor = "#000000";
  colorInput.value = currentColor;
  createGrid();
};
