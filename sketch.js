var parachute,database,position,bgImg,parachuteImg;

function preload() {
   bgImg = loadImage("city.png");
   parachuteImg = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");
}

function setup() {
  database = firebase.database();

  createCanvas(800,400);

  var parachutePosition = database.ref("parachute/position");
  parachutePosition.on("value",readPosition,showError);
  //console.log(parachutePosition);

  parachute = createSprite(128, 348, 50, 50);
  parachute.addAnimation("parachute",parachuteImg);
  parachute.scale = 0.5;
}

function draw() {
  background(bgImg);  

  if(keyDown(LEFT_ARROW)){
    writePosition(-1,0);
  }else if(keyDown(RIGHT_ARROW)){
    writePosition(1,0);
   }else if(keyDown(UP_ARROW)){
     writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
     writePosition(0,+1);
    }

  fill(0);
  textSize(30);
  text("Use Arrow Keys to move Hot Air Balloon!",20,30);

  drawSprites();
}

function readPosition(data) {
   position = data.val();
   console.log(position);
   parachute.x = position.x;
   parachute.y = position.y;
}

function writePosition(x,y) {
  database.ref("parachute/position").set({
    x:position.x + x,
    y:position.y + y
  });
}

function showError() {
  console.log("error in writing to the database");
}