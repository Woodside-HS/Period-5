'use strict'

class Bullet{

  constructor(location, bImg, angle){
    // issue#1 use preloaded bullet image instead of loadImage
    this.loc = location;
    this.speed = 12;
    this.angle = angle;
    this.img = bImg;
  }

  run(){
    this.render();
    this.update();
  }
  render(){
  
    var ctx = towerGame.context;
    ctx.save();
    ctx.translate(this.loc.vx, this.loc.vy);
    ctx.rotate(this.angle);
    ctx.drawImage(this.img, -this.img.width/2,-this.img.height/2);

    ctx.restore();
  }

  update(){
    this.loc.vy += Math.sin(this.angle)*this.speed;
    this.loc.vx += Math.cos(this.angle)*this.speed;

  }
}//  end Bullet class
