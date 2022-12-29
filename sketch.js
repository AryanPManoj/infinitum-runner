var PLAY = 0;
var END= 0;
var gameState = PLAY;

var cat,cat_running,cat_colided;
var ground,invisibleGround,groundImage

var obstacle,obstacle_img;
var gameOver,gameOver_img,restart,restart_img;

var score;


function preload(){
    cat_running=loadAnimation("cat1.png","cat2.png","cat3.png","cat4.png","cat5.png","cat6.png","cat7.png","cat8.png");
    cat_colided=loadAnimation("caatCrying.png");

    obstacle_img = loadImage("obstacle.png");

    backgroundImg= loadImage("bg_img.png");
    groundImage = loadImage("ground.png");

    gameOver_img=loadImage("gameOver.png");
    restart_img=loadImage("restart.png");
}

function setup() {
 createCanvas(1600,200);

 cat = createSprite(50,180,20,50);
 cat.addAnimation("running",cat_running);
 cat.addAnimation("collided",cat_colided);


 ground = createSprite(200,180,400,20);
 ground.addImage("ground",groundImage);
 ground.x=ground.width /2

 invisibleGround=createSprite(200,190,400,10);
 invisibleGround.visible=false;

 gameOver=createSprite(800,100);
 gameOver.addImage(gameOver_img);
 restart=createSprite(800,140);
 restart.addImage(restart_img);
 gameOver.scale=0.5
 restart.scale=0.5

 obstacle.createSprite()
 obstacle.addImage(obstacle_img)


 cat.setCollider("circle",1,1,30);
 cat.debug=true
 score = 0

}

function draw() {
 background(backgroundImg);
 textSize(20)
 fill("black")
 text("score:"+ score,1400,50);

 gameover.visible=false
  restart.visible=false

  if(gameState===PLAY){
    ground.velocityX = -6;
    score = score + Math.round(frameCount/60)

     //ground movement
    if (ground.x < 0){
        ground.x = ground.width/2;
      }
    //jumping
      if(keyDown("space")&& cat.y >=150) {
        cat.velocityY = -13;
    }

    //gravity
    cat.velocityY = cat.velocityY + 0.8

    //spawn the clouds
    spawnClouds();

    if(obstacle.isTouching(cat)){
        gameState = END;

    }
  }
  
  else if(gameState===END){
    ground.velocityX = 0;
    cat.changeAnimation("collided",cat_collided)
    obstacle.setVelocityX(0)
    obstacle.setLifetime(-1)
    cat.velocityY=0
    gameover.visible=true
    restart.visible=true

  }

  //stop cat from falling down
  cat.collide(invisibleGround)


  drawSprites()
}

function spawnObstacles(){
    if (frameCount % 60 === 0){
      var obstacle = createSprite(600,165,10,40);
      obstacle.velocityX = -6;




//assinging life time for obstacle
obstacle.scale = 0.5;
obstacle.lifetime = -1;
 } 
}