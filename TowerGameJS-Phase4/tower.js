'use strict'

class Tower extends Sprite {
  // issue#1 use preloaded images

  constructor(loc, w, h, json, spritesheet, propertyName, isAnAnimation, cost){
    super(loc, w, h, json, spritesheet, propertyName, isAnAnimation);
    this.cost = cost;
    this.placed = false;
    this.visible = false;
    this.towAngle = 0;
    this.lt = Date.now();
    this.coolDown = 500;
  }

  draw(){
    var ctx = towerGame.context;
    ctx.save();
    ctx.translate(this.loc.x, this.loc.y);
    ctx.rotate(this.towAngle);
    if (this.visible){
      ctx.drawImage(this.frames[this.currentIndex], this.frames[this.currentIndex].info.x, this.frames[this.currentIndex].info.y, this.frames[this.currentIndex].info.w, this.frames[this.currentIndex].info.h, 0-this.w/2, 0-this.h/2, this.w, this.h);
    }
    ctx.restore();
  }

  update() {
    //  Rotate turret to follow mouse
    let dx = this.loc.x - towerGame.canvas.mouseX;
    let dy = this.loc.y - towerGame.canvas.mouseY;
    this.towAngle = Math.atan2(dy, dx) - Math.PI;
    this.checkEnemies();
  }

  checkEnemies(){
    let dx = this.loc.x - towerGame.canvas.mouseX;
    let dy = this.loc.y - towerGame.canvas.mouseY;
    var dist = vector2d(dx,dy).length();
    var millis = Date.now();

     if (this.placed && dist < 200 && ((millis-this.lt) > this.coolDown)){
       console.log("Last time updated");

       this.lt = millis;
       let bullet = new Bullet(vector2d(this.loc.x, this.loc.y), 10, 5, fullJSON, "images/spritesheets/demop7/spritesheet.png", "b10000", false, this.towAngle, 12);
       towerGame.bullets.push(bullet);
     }
  }

}//  end Tower class +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
