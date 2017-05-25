'use strict'

// The Level class contains most of the assets.
class Level {
  constructor(game, number, canvas) {

    this.game = game;
    this.number = number;
    this.cnv = canvas;
    this.init();
  }
  init() {
    //lol
  }
}
class Level1 extends Level {
  constructor(game){
    super(game,1)
    this.game.canvas.canDiv.style.backgroundImage="url('resources/images/bg.png')"
    this.panelStart = new Panel(this, 0)
    this.panelInstructions = 0
    this.panelQuit = 0
  }
  run() {
    if(this.panelStart){
      this.panelStart.render()
    }

    if(this.panelInstructions){
      this.panelInstructions.render()
    }
  }
}
class Level2 extends Level{
  constructor(game) {
    super(game,2)
    this.game.canvas.canDiv.style.backgroundImage="url('resources/images/bg2.png')"
  }
  init(){

  }
  run(){
    let gt = this.game.updateGameTime();
    this.game.updateInfoElements(gt);
    this.game.removeBullets();
    this.game.removeEnemies();
    this.game.controlWaves()
    if (this.game.isRunning) {
      this.game.render();
    }

    // draw the grid
    for(let i = 0; i < this.game.cols; i++){
      for(let j = 0; j < this.game.rows; j++){
        this.game.grid[i][j].render();
      }
    }
    // draw the towers
    for (let i = 0; i < this.game.towers.length; i++) {
      this.game.towers[i].run();
    }
    for (let i = 0; i < this.game.enemies.length; i++) {
      this.game.enemies[i].run();
    }
    for (let i = 0; i < this.game.bullets.length; i++) {
      this.game.bullets[i].run();
    }

    // some help text in the bottom left of the canvas
    this.game.context.save();
    this.game.context.fillStyle = "white";
    this.game.context.font = "14px sans-serif";
    this.game.context.fillText("Press the E key to send enemies", 20, this.game.canvas.height-20);
    this.game.context.restore();

    //more panelthings
    // if(this.game.panelStart){
    //   this.game.panelStart.render()
    // }
    //
    // if(this.game.panelInstructions){
    //   this.game.panelInstructions.render()
    // }
    //
    // if(this.game.panelQuit){
    //   this.game.panelQuit.render()
    // }

    //collision detection
    for(var i = this.game.enemies.length-1; i >= 0; i--){
      for(var j = this.game.bullets.length-1; j >= 0; j--){
        if(this.game.circlePointCollision(this.game.bullets[j].loc.x, this.game.bullets[j].loc.y, this.game.enemies[i].loc.x, this.game.enemies[i].loc.y, this.game.enemies[i].radius)){
          this.game.bullets.splice(j, 1);
          this.game.enemies[i].kill = true;
          this.game.score = this.game.score + 1;
          if(this.game.score % 20 === 0){
            this.game.bankValue = this.game.bankValue + 10;
          }
        }
      }
    }
    if( this.game.health <= 0){
      this.game.level=new Level3(this.game)
    }
  }

}
class Level3 extends Level{
  constructor(game) {
    super(game)
    this.game.enemies=[]
    this.game.canvas.canDiv.style.backgroundImage="url('resources/images/bg3.png')"
    this.panelQuit = new Panel(this, 2)
    this.panelCredits = 0
    this.panelStart = 0
  }
  run() {
    this.game.render()

    if(this.panelQuit){
      this.panelQuit.render()
    }
    if(this.panelCredits){
      this.panelCredits.render()
    }
  }
}
