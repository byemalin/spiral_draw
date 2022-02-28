
var angle = 0.0;

function setup() {
    let c =createCanvas(1500,900);
    background(color("#f2ede3"));
  
  fillColorPicker = createColorPicker("#F4F1DE");
  fillColorPicker.position(30, 400);
  strokeColorPicker = createColorPicker("#E07A5F");
  strokeColorPicker.position(30, 480);

  saveBtn = createButton("Save Drawing");
  saveBtn.mousePressed(saveToFile);
  saveBtn.position(30, 560);

  clearBtn = createButton("Clear");
  clearBtn.mousePressed(clearFile);
  clearBtn.position(30,320); 
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

function saveToFile() {
    // Save the current canvas to file as png
    saveCanvas('mycanvas', 'png')
  }

  function clearFile() {
    // Save the current canvas to file as png
    clear()
    background(color("#f2ede3"));
  }