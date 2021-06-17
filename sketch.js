const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var earthSpaceship, earthSpaceshipBullets, earthBulletG, earthSpaceshipimg, earthSpaceshipBulletsimg;
var javisSpaceship, javisG, javisSpaceshipimg, bgimg; 
var explosion, shoot, bg, gameOver;
var invisibleblock;

var score = 0;
var life = 3;
var gameState = "serve";

function preload(){
  earthSpaceshipimg = loadImage("image/earth.png");
  bgimg = loadImage("image/santa_1.png");
  earthSpaceshipBulletsimg = loadImage("image/bullets.png");
  javisSpaceshipimg = loadImage("image/javis.png");
  explosion = loadSound("music/explosion.wav");
  shoot = loadSound("music/shoot.wav");
  bg = loadSound("music/bg.mp3");
  gameOver = loadSound("music/gameOver.mp3")
}

function setup() {
  createCanvas(windowWidth-0,windowHeight-0);

  engine = Engine.create();
  world = engine.world;

  earthSpaceship = createSprite(windowWidth/2-30,windowHeight-70,50,50); 
  earthSpaceship.addImage("earth",earthSpaceshipimg);
  earthSpaceship.scale=0.8;
 
  invisibleblock = createSprite(windowWidth/2,windowHeight-40,windowWidth,5);
  invisibleblock.visible  = false;

  javisG = new Group();
  earthBulletG = new Group();
  

}

function draw() {

  Engine.update(engine);

  background(bgimg);

  if(gameState === "serve") {
    
    
    fill("white");
    textSize(70);
    strokeWeight(windowWidth/100-2);
    stroke("black");
    text("Plz Press Space to Play",windowWidth/4,windowHeight/2-100);
    text(":)",windowWidth/2-10,windowHeight/2);
    textSize(50);
    text("You can play by pressing left and right arrow",windowWidth/4-100,windowHeight/3+200);
    if (keyDown("space")) {
    gameState = "play";
    }

  }else if(gameState === "play"){
    
    fill("white");
    textSize(25);
    strokeWeight(5);
    stroke("black");
    text("Score : "+score,windowWidth/100+2,windowHeight-60);
    text("Life : "+life,windowWidth/100+2,windowHeight-20);
    spawnEarthSpaceshipBullets();
    spawnjavisSpaceship();
    if(keyDown("right_arrow")){
      earthSpaceship.x = earthSpaceship.x+15;
    }
      if(keyDown("left_arrow")){
      earthSpaceship.x = earthSpaceship.x-15;
    }
    earthSpaceship.display();
    drawSprites();
    if(earthBulletG.isTouching(javisG)){
      earthSpaceshipBullets.destroy();
      javisSpaceship.destroy();
      score++;
      explosion.play();
      explosion.setVolume(0.3)
      shoot.stop();
    }
    if(javisG.isTouching(invisibleblock)){
        gameState = "end";
        console.log("Game Over");
        gameOver.play()
        gameOver.setVolume(0.5);
        
    }
   
  }else if(gameState === "end"){
    
    background(0);
    fill("yellow");
    textSize(windowHeight/10);
    strokeWeight(7);
    stroke("red");
    text("Game over",windowWidth/3+80,windowHeight/2-80);
    text("Score : "+score,windowWidth/3+80,windowHeight/2+80);
    if(life>1){
      text("Press R to play again",windowWidth/2-300,windowHeight/2);
    }
    if(life === 1){
      text("You have no life left",windowWidth/2-300,windowHeight/2);
    }
    if(keyDown("r") && life>1){
      reset();
    }
    javisG.setLifetimeEach(1);
    earthBulletG.setLifetimeEach(1);
  }

  if(!bg.isPlaying()){
    bg.play();
    bg.setVolume(0.4);
  }

  edges = createEdgeSprites();
  earthSpaceship.collide(edges);
  invisibleblock.display();

}

function reset(){
  gameState = "play";
  javisG.destroyEach();
  earthBulletG.destroyEach();
  life--;
}

function spawnjavisSpaceship(){
  if(frameCount%100 === 0){
    javisSpaceship = createSprite(0,0,50,50);
    javisSpaceship.position.x = Math.round(random(windowWidth/10,windowHeight-40));
    javisSpaceship.addImage("javis",javisSpaceshipimg);
    javisSpaceship.scale=0.2;
    javisSpaceship.velocityY = (5 + score/10);
    javisSpaceship.lifetime = 500;
    javisG.add(javisSpaceship);
  }
}

function spawnEarthSpaceshipBullets(){
  if(frameCount %10 === 0){
    earthSpaceshipBullets = createSprite(windowWidth/2-30,windowHeight-90,20,50);
    earthSpaceshipBullets.addImage("bullets",earthSpaceshipBulletsimg);
    earthSpaceshipBullets.scale=0.07;
    earthSpaceshipBullets.x = earthSpaceship.x;
    earthSpaceshipBullets.velocityY = -8;
    earthSpaceshipBullets.lifetime = 500;
    shoot.play();
    shoot.setVolume(0.1)
    earthBulletG.add(earthSpaceshipBullets);
    }
  }


