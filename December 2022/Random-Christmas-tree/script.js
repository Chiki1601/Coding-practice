console.clear();
const element = document.querySelector(".element");

let topCorner = element.clientWidth / 2; // position of the top of the triangle/tree in this case is the horizontal center of the container
let bottomLeftCorner = topCorner - 200; // position of the bottom left corner of the triangle/tree 
let bottomRightCorner = topCorner + 200; // position of the bottom right corner of the triangle/tree 
let triangleHeight = 600; //height of the container to calculate the Y position of the corners

//array containing the coordinates of the three corners of the triangle, first element is bottom left [x1,y1], second element is bottom right [x2,y2] and the third element is the top [x3,y3]

/*
                       [x3,y3]
                          0        
                        /   \ 
                      /       \
                    /           \        
                  0---------------0 
               [x1,y1]         [x2,y2]      

*/
let triangleCoordinates = [[bottomLeftCorner, triangleHeight], [bottomRightCorner, triangleHeight], [topCorner, 0]];



/* ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ */

/*

Formulas taken from: 
https://www.geeksforgeeks.org/check-whether-a-given-point-lies-inside-a-triangle-or-not/

*/


//calculate the area of a triangle given the coordinates of its three points
const area = (x1, y1, x2, y2, x3, y3) => {
    
    return Math.abs((x1*(y2-y3) + x2*(y3-y1) + x3*(y1-y2))/2.0);
  
};


//check if a given point of coordinates (x,y) is inside the triangle of coordinates (x1,y1), (x2,y2), (x3,y3)
const isInside = (x1, y1, x2, y2, x3, y3, x, y)=>{
  
          /* Calculate area of triangle ABC */
        let A = area (x1, y1, x2, y2, x3, y3);

        /* Calculate area of triangle PBC */
        let A1 = area (x, y, x2, y2, x3, y3);

        /* Calculate area of triangle PAC */
        let A2 = area (x1, y1, x, y, x3, y3);

        /* Calculate area of triangle PAB */   
        let A3 = area (x1, y1, x2, y2, x, y);

        /* Check if sum of A1, A2 and A3 is same as A */
        return (A == A1 + A2 + A3);

}

/*↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑*/



//takes random values for pointX and pointY and returns the X and Y coordinates only if it's equivalent to a point inside the triangle of the christmas tree
const elementInside = (pointX, pointY)=>{
  
  if(isInside(...triangleCoordinates.flat(), pointX, pointY)){
    return [pointX, pointY];
  }else {
    return false
  }
  
  
}

//returns a random left or x coordinate number inside the container of the tree 
const randomLeft = ()=>{  
  return Math.floor( (Math.random()*(element.clientWidth))+1);
  };

//returns a random top or y coordinate number inside the container of the tree 
const randomTop = ()=>{
  return Math.floor((Math.random()*(element.clientHeight))+1);
};

//returns x and y coordinates of a point inside the traingle or christmas tree 
const coordinatesInsideTriangle = ()=>{
  
  let x = randomLeft();
  let y = randomTop();
  
  //checks if the given coordinates generate a point inside the triangle if it doesn't it changes the value of x and y until it gets a point inside the triangle then returns an array with the coordinates
  while (!elementInside(x, y)) {
    
    x = randomLeft();
    y = randomTop();
    
  };
  
  return [x,y];
  
}




//random size for a circle
const randomSize  = ()=>{
  
  return Math.floor((Math.random()*15)+5);
  
}


const randomColor = ()=>{
  
  const hue = Math.floor((Math.random() * 360)+1);
  const saturation =90;
  const lightness = 50;
  const color =`hsl(${hue}, ${saturation}%, ${lightness}%)`;
  return color
  
}


//creates the tree in this case with the default 600 lights


const createTree = (numberOfLights = 600)=>{

  
  const treeElements = document.querySelectorAll("section > div");
  treeElements.forEach(el=>{
    el.remove();
  });
  
  
  let star = document.createElement("div");
  star.classList.add("star");
  star.style.background = randomColor();
  element.appendChild(star);
    
    for (let i = 0; i<numberOfLights; i++){
  
  let coordinates = coordinatesInsideTriangle();
  let size = randomSize();
  let color = randomColor();
  let sphere = document.createElement("div");
  sphere.classList.add("sphere");
  sphere.style.top = coordinates[1] + "px";
  sphere.style.left = coordinates[0] + "px";
  sphere.style.width = size + "px";
  sphere.style.height = size + "px";
  sphere.style.background = color;
  sphere.style.color = color;
  sphere.style.animationDelay = `${Math.random()}s`;
  element.appendChild(sphere);
  
  
  };
  
}


createTree();
