var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var dog, dog1, dog2, dog3, dog4;
var track, dog1Image, dog2Image, dog3Image, dog4Image;

function preload(){

  track=loadImage("images/track.jpg");
  dog1Image=loadImage("images/backDog.png");
  dog2Image=loadImage("images/backDog2.png");
  dog3Image=loadImage("images/backDog3.png");
  dog4Image=loadImage("images/backDog4.png");

}
function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  if(gameState==2){
    game.end();
    
  }
}
