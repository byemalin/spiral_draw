// var angle = 0.0;
let sizeSlider;

//local variables:
let fillColorPicker;
let strokeColorPicker;
//p5 party variables:
let me;
let participants;

let isSetup = false; // flag to make sure preloading is done and setup is called

function preload() {
  partyConnect(
    "wss://deepstream-server-1.herokuapp.com",
    "Spiral_Draw_2",
    "main1"
  );
  me = partyLoadMyShared();
  participants = partyLoadParticipantShareds();
}

function setup() {
  //main styling
  let c = createCanvas(1500, 900);

  background(color("#0B132B"));

  // stroke(0);
  strokeWeight(0.5);

  rectMode(CENTER);
  angleMode(DEGREES);

  //DOM elements: sliders and colour selectors

  fillColorPicker = createColorPicker("#8F3985");
  fillColorPicker.position(30, 400);

  strokeColorPicker = createColorPicker("#98DFEA");
  strokeColorPicker.position(30, 480);

  //square size:
  sizeSlider = createSlider(10, 130, 90, 20);
  sizeSlider.position(25, 250);
  sizeSlider.style("width", "80px");

  //bg colour
  bgBtn = createButton("BG");
  bgBtn.mousePressed(bgFile);
  bgBtn.position(30, 320);

  //Image Saving:
  saveBtn = createButton("Save Drawing");
  saveBtn.mousePressed(saveToFile);
  saveBtn.position(30, 560);

  //Clear Button:
  clearBtn = createButton("Clear");
  clearBtn.mousePressed(clearFile);
  clearBtn.position(width +150,450);

  

  //party variables initialization
  // initialize this participants cursor position
  me.x = 200;
  me.y = 200;
  me.r = 0;
  me.rectSize = 0;
  // initialize history array
  me.history = [];

  //me fill colors
  me.fillRed = 0;
  me.fillGreen = 0;
  me.fillBlue = 0;
  me.strokeRed = 0;
  me.strokeGreen = 0;
  me.strokeBlue = 0;

  //make sure preloading is done
  me.ready = true;
  isSetup = true;


}

// Updating the history
function mouseMoved(e) {

    if (!isSetup) return;

    // update this participants cursor position and rotation of square
    me.x = mouseX;
    me.y = mouseY;
    me.r += 5;

    // create a data object from this participants cursor position
    // I also added the rotation and colours to this data object
    var v = {
      //location
      x: me.x,
      y: me.y,
      //rotation
      r: me.r,
      //fill
      fillRed: me.fillRed,
      fillGreen: me.fillGreen,
      fillBlue: me.fillBlue,
      //stroke
      strokeRed: me.strokeRed,
      strokeGreen: me.strokeGreen,
      strokeBlue: me.strokeBlue,
      //scale
      rectSize: me.rectSize,
    };

    //push the new data object to the history array
    me.history.push(v);
}
  


function draw() {
  // background(color(100, 80, 100));

  //extracting the colours from the colour pickers:
  //and sliders

  let fillColor = color(fillColorPicker.color());
  let strokeColor = color(strokeColorPicker.color());

  let tempRectSize = sizeSlider.value();

  me.fillRed = red(fillColor);
  me.fillGreen = green(fillColor);
  me.fillBlue = blue(fillColor);

  me.strokeRed = red(strokeColor);
  me.strokeGreen = green(strokeColor);
  me.strokeBlue = blue(strokeColor);

  //slider
  me.rectSize = tempRectSize;
  //console.log(me.rectSize)

  // draw each participants cursor

  for (const p of participants) {
    if (p.ready === true) {
      // looping through each participants 'history' array and drawing a rect at each point
      for (const g of p.history) {
        push();
        translate(g.x, g.y);
        rotate(g.r);

        fill(color(g.fillRed, g.fillGreen, g.fillBlue));
        stroke(color(g.strokeRed, g.strokeGreen, g.strokeBlue));

        // rect(0, 0, 30, 30);
        rect(0, 0, me.rectSize, me.rectSize);

        pop();
      }
    }
  }
}

function saveToFile() {
    saveCanvas('mycanvas', 'png')
  }

  function clearFile() {
    clear()
    me.history = [];
  }

  function bgFile() {
    background(color(random(255),random(255),random(255)));
  }
