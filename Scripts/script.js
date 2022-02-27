
var angle = 0.0;

function setup() {
    let c =createCanvas(1500,900);
    background(color("#f2ede3"));
  
  
  fillColorPicker = createColorPicker("#ed225d");
//   fillColorPicker.position(0, height + 5);

  
  strokeColorPicker = createColorPicker("#ed225d");
//   strokeColorPicker.position(60, height + 5);




  saveBtn = createButton("Save Canvas");
//   removeBtn.position(30, 200)
  saveBtn.mousePressed(saveToFile);


 

  
  
}



function draw() {
    
  
  if (mouseIsPressed) {
  
    translate(mouseX, mouseY);
    rotate(angle);

    fill(fillColorPicker.color());
    stroke(strokeColorPicker.color());
    
    
    
    rect(-40, -40, 80, 80);
    angle += 0.1;
  }
  
  
}

// function keyPressed(){
//     if (key == ' '){ 
//     saveCanvas(c)
//     console.log("PRESSED")
//     }
// }

function saveToFile() {
    // Save the current canvas to file as png
    saveCanvas('mycanvas', 'png')
  }

