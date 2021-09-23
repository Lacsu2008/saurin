//नमस्ते दुनिया

//variaveis
var saurin, saurin_Correndo,saurin_extinto;
var borda;
var solo, imagem_solo, solo_In;
var sorteio;
var nuvem, nuvem_em_movimento,temporal;
var cacto,cactoObs1,cactoObs2,cactoObs3,cactoObs4,cactoObs5,cactoObs6,grupoDeCactos;
var pontos;
var JOGAR, ENCERRAR, estadoJogo;
var se_lascou,vai_dnv,se_lascou2,vai_dnv2;

var pulinho,extinto,plin,musica;

//carregar funções
function preload(){
   imagem_solo = loadImage("ground2.png"); 
   saurin_Correndo = loadAnimation("trex1.png","trex3.png","trex4.png");
  
   nuvem_em_movimento = loadImage("cloud.png");
  
   cactoObs1 = loadImage("obstacle1.png");
   cactoObs2 = loadImage("obstacle2.png");
   cactoObs3 = loadImage("obstacle3.png");
   cactoObs4 = loadImage("obstacle4.png");
   cactoObs5 = loadImage("obstacle5.png");
   cactoObs6 = loadImage("obstacle6.png");
  
   se_lascou = loadImage("gameOver.png");
   vai_dnv = loadImage("restart.png");
  
  saurin_extinto = loadAnimation("trex_collided.png");
  
  musica = loadSound("musica.mp3");
  pulinho = loadSound("jump.mp3");
  extinto = loadSound("die.mp3");
  plin = loadSound("checkPoint.mp3");
} 

function setup(){
  //desenha o cenario
  createCanvas(600,200);
  
  solo = createSprite(200,180,400,20);
  solo.addImage("chão", imagem_solo);
  solo_In = createSprite(300,190,600,10);
  solo_In.visible = false;
  
  //sprite saurin
  saurin = createSprite(50,150,20,50);
  saurin.addAnimation("correndo", saurin_Correndo);
  saurin.addAnimation("no_ceu_tem_pao_e_morreu", saurin_extinto);
  saurin.scale = 0.5;
  
  vai_dnv2 = createSprite(300,128,50,50);
  vai_dnv2.addImage("restart", vai_dnv);
  vai_dnv2.scale = 0.4
  vai_dnv2.visible = false
  
  se_lascou2 = createSprite(300,80,50,50);
  se_lascou2.addImage("gameOver",se_lascou);
  se_lascou2.scale = 0.4 
  se_lascou2.visible = false
  
  pontos = 0;
  
  //cria as bordas
  borda = createEdgeSprites();
  
  grupoDeCactos = new Group();
  temporal = new Group();
  
  JOGAR = 1;
  ENCERRAR = 0;
  estadoJogo = JOGAR;
  
  saurin.setCollider("circle",0,0,40);
  //saurin.debug = true;
  
  //console.log("Olá "+teste+"!");
  
 // musica.play();
  
 
}


function draw(){
  
  //pinta o fundo
  background("white");
  
  //mão da Andrea
  if(saurin.isTouching(grupoDeCactos)){
    estadoJogo = ENCERRAR;
    
    
  }
                           //ESTADO JOGO JOGAR E ENCERRAR
  if(estadoJogo === JOGAR){
    
    solo.velocityX = -(2+pontos/100);
    pontos = pontos+Math.round(frameRate()/60);
  
    
    if(pontos > 0 && pontos%100 === 0 ){
      
      plin.play();
      
    }
    
    if(solo.x < 0 ){
     solo.x =  solo.width /2;      
    }
    
    //pulinho não tão  bugado
    if(keyDown("space") && saurin.y > 160){
       saurin.velocityY = -12.8;
       pulinho.play();
    }
    

    //"gravidade"
    saurin.velocityY += 0.8;
    
    umidade();
    
    copo_da_natureza();
    
  }else if(estadoJogo === ENCERRAR){
    za_warudo();
    
    if(mousePressedOver(vai_dnv2)){
     made_in_heaven_da(); 
    
     }
  }
  
  text("pontos: "+pontos,500,38);
  
  //tangibilidade do saurin
  saurin.collide(solo_In);
  
 
  
  drawSprites();
}

function umidade(){
  
  if(frameCount %190 === 0){
   nuvem = createSprite(600,50,30,10);
   temporal.add(nuvem);
   nuvem.velocityX = -(1+pontos/100);   
   nuvem.addImage(nuvem_em_movimento) ;
   nuvem.scale = 0.8;
    
   nuvem.lifetime = 800;
    
   nuvem.y = Math.round(random(50,100));
   nuvem.depth = saurin.depth -1;
   
     }
}

function copo_da_natureza(){
  
  if(frameCount %208 === 0){
   cacto = createSprite(600,158,30,30);
   grupoDeCactos.add(cacto);
   cacto.velocityX = -(5+pontos/100);
   sorteio = Math.round(random(1,6));
    switch(sorteio){
      case 1: cacto.addImage(cactoObs1);
      break;
      
      case 2: cacto.addImage(cactoObs2);
      break;
      
      case 3: cacto.addImage(cactoObs3);
      break;
      
      case 4: cacto.addImage(cactoObs4);
      break;
      
      case 5: cacto.addImage(cactoObs5);
      break;
      
      case 6: cacto.addImage(cactoObs6);
      break;
    }
     cacto.scale = 0.48;
     cacto.lifetime = 800;
     cacto.depth = saurin.depth;
   
  }
  
}

function za_warudo(){
  solo.velocityX = 0;
    saurin.velocityY = 0;
    saurin.changeAnimation("no_ceu_tem_pao_e_morreu",saurin_extinto);
    // PARA PAROU PAROU PAROU -João Kleber
    grupoDeCactos.setVelocityXEach(0);
    temporal.setVelocityXEach(0);
    cacto.lifetime = -8
    nuvem.lifetime = -8;
    se_lascou2.visible = true
    vai_dnv2.visible = true
    //extinto.play();
  
}

function made_in_heaven_da(){
  estadoJogo = JOGAR;
  vai_dnv2.visible = false
  se_lascou2.visible = false
  pontos = 0
  grupoDeCactos.destroyEach();
  temporal.destroyEach();
  saurin.changeAnimation("correndo", saurin_Correndo);
 
}
   
  
 