'use strict'

class Bullet extends Sprite{

  constructor(loc, w, h, json, spritesheet, propertyName, isAnAnimation, angle, speed){
    super(loc, w, h, json, spritesheet, propertyName, isAnAnimation);
    this.angle = angle;
    this.speed = speed;
  }

  draw(){
    var ctx = towerGame.context;
    ctx.save();
    ctx.translate(this.loc.x, this.loc.y);
    ctx.rotate(this.angle);
    ctx.drawImage(this.frames[this.currentIndex], this.frames[this.currentIndex].info.x, this.frames[this.currentIndex].info.y, this.frames[this.currentIndex].info.w, this.frames[this.currentIndex].info.h, 0-this.w/2, 0-this.h/2, this.w, this.h);
    ctx.restore();
  }

  update(){
    this.loc.y += Math.sin(this.angle)*this.speed;
    this.loc.x += Math.cos(this.angle)*this.speed;
  }
}//  end Bullet class
