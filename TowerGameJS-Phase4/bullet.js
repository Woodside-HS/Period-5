'use strict'

class Bullet{

  constructor(location, bImg, angle, type){
    // issue#1 use preloaded bullet image instead of loadImage
    this.ability = type;
    this.loc = location;
    this.speed = 60;
    this.angle = angle;
    this.img = bImg;
    this.start = location;

  }

  run(){
    this.render();
    this.update();
  }
  render(){

    var ctx = towerGame.context;
    ctx.save();
    ctx.translate(this.loc.x, this.loc.y);
    ctx.rotate(this.angle);
    ctx.drawImage(this.img, -this.img.width/2,-this.img.height/2);

    ctx.restore();
  }

  update(){
    this.loc.y += Math.sin(this.angle)*this.speed;
    this.loc.x += Math.cos(this.angle)*this.speed;

  }
}//  end Bullet class
