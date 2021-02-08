var bananaImage, obstacleImage, obstacleGroup, Background, score = 0, ground;

function preload() {
  monkeyI = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  backgroundI = loadImage("jungle.jpg");
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  
  Background = createSprite(200,200,10,10);
  Background.addImage("rbw", backgroundI);
  Background.velocityX = -6;
  
  ground = createSprite(200,380,400,1);
  ground.visible = false;
  
  monkey = createSprite(50,350,10,10);
  monkey.addAnimation("run",monkeyI);
  monkey.scale = 0.1;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  background(220);
  
  if(Background.x < 0){
    Background.x = Background.width/2;
  }
  
  if(keyDown("space") && monkey.y >= 348){
    monkey.velocityY = -13;
  }
  
  monkey.velocityY = monkey.velocityY + 0.45 ;
  
  monkey.collide(ground);
  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score = score + 2;
  }
  
  switch (score){
    case 10 : monkey.scale = 0.12;
    break;
    case 20 : monkey.scale = 0.14;
    break;
    case 30 : monkey.scale = 0.16;
    break;
    case 40 : monkey.scale = 0.18;
    break;
    default : break;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale = 0.1
  }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : " + score,500,50)
  
  spawnBananas();
  spawnObstacles();
  
  drawSprites();
}

function spawnBananas () {
  if(frameCount % 100 === 0){
    banana = createSprite(400,200,10,10);
    banana.addImage("ban", bananaImage);
    banana.y = random(120,200);
    banana.scale = 0.05 ;  
    banana.velocityX = -6;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 150 === 0){
    obstacle = createSprite(400,380,10,10);
    obstacle.addImage("obsta", obstacleImage);
    obstacle.scale = 0.2   ;
    obstacle.velocityX = -6;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}