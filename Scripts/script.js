
var angle = 0.0;

let slider;

function setup() {
    let c =createCanvas(1500,900);
    background(color("#0B132B"));
  
  fillColorPicker = createColorPicker("#3A506B");
  fillColorPicker.position(30, 400);
  strokeColorPicker = createColorPicker("#1C2541");
  strokeColorPicker.position(30, 480);

  saveBtn = createButton("Save Drawing");
  saveBtn.mousePressed(saveToFile);
  saveBtn.position(30, 560);

  clearBtn = createButton("Clear");
  clearBtn.mousePressed(clearFile);
  clearBtn.position(width +150,450); 

  bgBtn = createButton("BG");
  bgBtn.mousePressed(bgFile);
  bgBtn.position(30, 320); 

  slider = createSlider(10, 90, 40, 20);
  slider.position(25, 250);
  slider.style('width', '80px');
}

function draw() {
  if (mouseIsPressed) {

    let slider_val = slider.value();


    translate(mouseX, mouseY);
    rotate(angle);

    fill(fillColorPicker.color());
    stroke(strokeColorPicker.color());
    rect(-1*slider_val, -1*slider_val, slider_val*2, slider_val*2);
    angle += 0.1;
  }
}

function saveToFile() {
    saveCanvas('mycanvas', 'png')
  }

  function clearFile() {
    clear()
  }

  function bgFile() {
    background(color(random(255),random(255),random(255)));
  }