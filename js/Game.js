class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    dog1 = createSprite(100,200);
    dog1.addImage(dog1Image);
    dog1.scale=0.2;
    dog2 = createSprite(300,200);
    dog2.addImage(dog2Image);
    dog2.scale=0.2;
    dog3 = createSprite(500,200);
    dog3.addImage(dog3Image);
    dog3.scale=0.2;
    dog4 = createSprite(700,200);
    dog4.addImage(dog4Image);
    dog4.scale=0.2;
    dog = [dog1, dog2, dog3, dog4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(rgb(198,135,103));
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      //index of the array
      var index = 0;

      //x and y position of the dog
      var x = 175;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the dog a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the dog in y direction
        y = displayHeight - allPlayers[plr].distance;
        dog[index-1].x = x;
        dog[index-1].y = y;

        if (index === player.index){
          dog[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = dog[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance>3860){
      gameState=2;
    }
    drawSprites();
  }
  end(){
    console.log("GAME END");
    game.update(gameState);
  }
}
