'use strict'

var Sprite = function(loc, w, h, json){
  this.w = w;
  this.h = h;
  this.loc = loc;
  this.frames = [];
  this.currentIndex = 0;
  this.count = 0;
  this.currentTime = 0;
  this.lastTime = Date.now();

  this.max = countProperties(json.frames);

  for (let i = 0; i < countProperties(json.frames); i++){
    let image = new Image();
    image.src = "images/spritesheets/enemy.png"
    let f = json.frames["Rocket" + i].frame;
    image.info = {"x": f.x, "y": f.y, "w": f.w, "h": f.h}
    this.frames.push(image);
  }

  this.run = function(){
    this.update();
    this.render();
  }

  this.update = function(){
    this.loc.x*=1.01;
    this.loc.y/=1.005;
  }

  this.render = function(){

    if (this.currentIndex >= this.max){
      this.currentIndex = 0;
    }

    towerGame.context.drawImage(this.frames[this.currentIndex], this.frames[this.currentIndex].info.x, this.frames[this.currentIndex].info.y, this.frames[this.currentIndex].info.w, this.frames[this.currentIndex].info.h, this.loc.x, this.loc.y, this.w, this.h);

    var millis = Date.now();
    if(millis - this.lastTime >= 50) {
      this.gameTime++;
      this.lastTime = millis;
      this.currentIndex++;
    }
  }
}
