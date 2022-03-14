var trex, trex_running, edges,trexmortinho;
var groundImage ,ground  ;
var solo
var nuvem,nuvemimagem
var cactos,cactosimagem1,cactosimagem2,cactosimagem3,cactosimagem4,cactosimagem5,cactosimagem6
var grupocactos,gruponuvens 
var estadodejogo="inicio"
var pontos=0
var sompulo,sommorte,somponto
var fim,fimimagem,reset,resetimagem



function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png")
nuvemimagem=loadImage("cloud.png")
cactosimagem1=loadImage("obstacle1.png")
cactosimagem2=loadImage("obstacle2.png")
cactosimagem3=loadImage("obstacle3.png")
cactosimagem4=loadImage("obstacle4.png")
cactosimagem5=loadImage("obstacle5.png")
cactosimagem6=loadImage("obstacle6.png")
trexmortinho=loadImage("trex_collided.png")
sompulo=loadSound("jump.mp3")
sommorte=loadSound("die.mp3")
somponto=loadSound("checkpoint.mp3")
fimimagem=loadImage("gameOver.png")
resetimagem=loadImage("restart.png")

}

function setup(){
  createCanvas(windowWidth,windowHeight);
  gruponuvens=new Group()
  grupocactos=new Group()
  //criando o trex
  trex = createSprite(50,height-30,20,50);
  trex.addAnimation("running", trex_running);
  trex.addImage("trexmortinho",trexmortinho)

  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  ground=createSprite(width/2,height-20)
  ground.addImage(groundImage)
  solo=createSprite(width/2,height-10,width,5)
  solo.visible=false
  trex.debug=false
  trex.setCollider("circle",0,0,40)
fim=createSprite(width/2,height/2)
reset=createSprite(width/2+300,height/2)
fim.addImage(fimimagem)
reset.addImage(resetimagem)
reset.scale=0.5
fim.visible=false
reset.visible=false
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");

  text("pontos"+pontos,width-100,20)
  if (pontos>0&&pontos%100===0) {
  somponto.play 
  }
  
  
 //impedir que o trex caia
  trex.collide(solo)
   drawSprites();
  if(estadodejogo==="inicio"){
    pontos=pontos+Math.round(getFrameRate()/60)
//pular quando tecla de espaço for pressionada
if(touches.length>0||keyDown("space")&&trex.y>height-80){
  trex.velocityY = -10;
  sompulo.play()
  touches=[]
}

trex.velocityY = trex.velocityY + 0.5;
ground.velocityX=-3
if(ground.x<0){
ground.x=ground.width/2
} 
criarnuvem()
criacactos()
if (trex.isTouching(grupocactos)) {
  estadodejogo="fim"
  sommorte.play()
}
  }else if(estadodejogo==="fim"){
ground.velocityX=0
trex.velocityY=0
grupocactos.setVelocityXEach(0)
gruponuvens.setVelocityXEach(0)
trex.changeAnimation("trexmortinho",trexmortinho)
grupocactos.setLifetimeEach(-1)
gruponuvens.setLifetimeEach(-1)
fim.visible=true
reset.visible=true
if (touches.length>0||mousePressedOver(reset)) {
  touches=[]
  restart()
}
  }
}
function criarnuvem(){
  if(frameCount%60===0){
  nuvem=createSprite(width-10,150)
  nuvem.addImage(nuvemimagem)
  nuvem.velocityX=-3
  nuvem.y=Math.round(random(5,height/2))
  nuvem.depth=trex.depth
 trex.depth=trex.depth+1
 nuvem.lifetime=800
 gruponuvens.add(nuvem)
}
}
function criacactos() {
  
  if(frameCount%60===0){
    cactos=createSprite(width,height-25)
   cactos.velocityX=-3
   cactos.scale=0.7
   cactos.lifetime=800
   grupocactos.add(cactos)
   var dado =Math.round(random(1,6))
   switch (dado) {
     case 1:cactos.addImage(cactosimagem1)  
       break;
       case 2:cactos.addImage(cactosimagem2)  
       break;
       case 3:cactos.addImage(cactosimagem3)  
       break;
       case 4:cactos.addImage(cactosimagem4)  
       break;
       case 5:cactos.addImage(cactosimagem5)  
       break;
       case 6:cactos.addImage(cactosimagem6)  
       break;
     default:
       break;
   }
  }
 
}
function restart(){
estadodejogo="inicio"
trex.changeAnimation("running", trex_running);
grupocactos.destroyEach()
gruponuvens.destroyEach()
fim.visible=false
reset.visible=false
pontos=0
}


