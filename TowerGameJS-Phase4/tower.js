'use strict'

class Tower {
  // issue#1 use preloaded images
  constructor( cost, tImg, bImg, ability) {
    this.loc = vector2d(0, 0);
    this.placed = false;
    this.enX= 0;
    this.enY =0;
    this.pastIndex;
    this.visible = false;
    this.cost = cost;
    this.bulletImg = bImg;
    this.towImg = tImg;
    this.towAngle = 0;
    this.currentIndex = 0;
    this.lastTime = Date.now();
    if(ability == "freeze")
      this.coolDown = 3000;
    else if(ability == "normal" || ability == "explosive")
      this.coolDown = 600;
    else if(ability == "fast")
      this.coolDown = 200;
    else
      this.coolDown = 100;
    this.ability = ability;
    //console.log(this.coolDown);
  }
  run() {
    this.render();
    this.update();
  }
  render() {
    var ctx = towerGame.context;
    ctx.save();
      ctx.translate(this.loc.x, this.loc.y);
      ctx.rotate(this.towAngle);
      if (this.visible) { //  not visible when first created
        ctx.drawImage(this.towImg, -this.towImg.width/2,-this.towImg.height/2);
        }
    ctx.restore();
  }
  update() {
    //  Rotate turret to follow mouse
    if(towerGame.enemies.length != 0){
    if(this.dist(towerGame.enemies[this.currentIndex].loc) < 300){

    } else {

      this.currentIndex++;
    }
  }
    if(towerGame.enemies.length != 0 && towerGame.enemies[this.currentIndex].loc != undefined){
      this.enX = towerGame.enemies[this.currentIndex].loc.x;
      this.enY = towerGame.enemies[this.currentIndex].loc.y;

    }
    //console.log(towerGame.enemies.length);
  //  this.enX = towerGame.enemeis[towerGame.enemies.length-1].loc.x;
  //  this.enY = towerGame.enemies[towerGame.enemies.length-1].loc.y;
    //console.log(towerGame.enemies[1].loc);
    let dx = this.loc.x - this.enX;//towerGame.canvas.mouseX;
    let dy = this.loc.y - this.enY;//towerGame.canvas.mouseY;
    this.towAngle = Math.atan2(dy, dx) - Math.PI;
    this.checkEnemies();

  }

  dist(f){
    this.xx = this.loc.x - f.x;
    this.yy = this.loc.y - f.y;
    return Math.atan2(this.yy, this.xx);
  }

  checkEnemies(){ //  dist < 200
    let dx = this.loc.x - this.enX;//towerGame.canvas.mouseX;
    let dy = this.loc.y - this.enY;//towerGame.canvas.mouseY;
    let dist = vector2d(dx,dy).length();
    let millis = Date.now();
     if(this.placed && dist < 300 && towerGame.enemies.length !=0 && this.coolDown != 100 &&

      (millis-this.lastTime > this.coolDown )){
          // reset lastTime to current time
          this.lastTime = millis;
          let bulletLocation = vector2d(this.loc.x, this.loc.y);
          let b = new Bullet(bulletLocation , this.bulletImg, this.towAngle, this.ability);
          //console.log(this.ability);
          if(this.ability != "freeze"){
           towerGame.bullets.push(b);
        }
    }
    if(towerGame.enemies.length != 0)
      towerGame.closeForRay = towerGame.enemies[this.currentIndex].loc
    if(this.ability == "ray" && towerGame.enemies.length != 0 && towerGame.closeForRay != undefined && towerGame.closestIndex < towerGame.enemies.length  ){
      var a3 = this.loc.x - towerGame.closeForRay.x;
      var b3 = this.loc.y - towerGame.closeForRay.y;
      var k = Math.sqrt(a3*a3 + b3*b3);
      if( k < 400 && towerGame.enemies.length != 0){
      var rys = new LockOn(this.loc, towerGame.closeForRay);
      rys.run();
     towerGame.enemies[this.currentIndex].isLocked = true;//health -=  10;
    } else {
      towerGame.rays = [];
    }
    }
  }

}//  end Tower class +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
