class Game {
  constructor(){}

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
    player1 = createSprite(displayWidth-150,displayHeight/2)
    player2 = createSprite(displayWidth-50,displayHeight/2)
    player3 = createSprite(displayWidth+50,displayHeight/2)
    player4 = createSprite(displayWidth+150,displayHeight/2)

    players = [player1,player2,player3,player4];
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      //var display_position = 130;
      var index = 0;
      var x = 0;
      var y 
      for(var plr in allPlayers){
        index = index +1;
        x = x+300;
        y = displayHeight - allPlayers[plr].distance
        players[index-1].x = x
        players[index-1].y = y
        if (index === player.index){
        players[index-1].shapeColor = "red";
        camera.position.x = displayWidth/2;
        camera.position.y = players[index-1].y
        }
        else
        fill("black");
      
        
      }
     drawSprites();
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
  }
}
