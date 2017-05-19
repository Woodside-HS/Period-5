'use strict'

var Sprite = function(loc, w, h, json, spritesheet, propertyName, isAnAnimation){
  this.w = w;
  this.h = h;
  this.loc = loc;
  this.frames = [];
  this.currentIndex = 0;
  this.count = 0;
  this.currentTime = 0;
  this.lastTime = Date.now();
  this.goodKeys = [];
  this.keys = getProperties(json.frames, countProperties(json.frames));
  this.isAnAnimation = isAnAnimation

  if (this.isAnAnimation){
    for (let i = 0; i < this.keys.length; i ++){
        if ( this.keys[i].substring(0,1) === propertyName) {
          this.goodKeys.push(this.keys[i]);
        }
    }

    for (let i = 0; i < this.goodKeys.length; i++){
      let image = new Image();
      image.src = spritesheet;
      let f = json.frames[this.goodKeys[i]].frame;
      image.info = {"x": f.x, "y": f.y, "w": f.w, "h": f.h}
      this.frames.push(image);
    }
  } else {
    let image = new Image();
    image.src = spritesheet;
    let f = json.frames[propertyName].frame;
    image.info = {"x": f.x, "y": f.y, "w": f.w, "h": f.h}
    this.frames = [image];
  }

  this.run = function(){
    this.update();
    this.render();
    // this.checkEdges();
  }

  // this.update = function(){
  //   this.loc.x*=1.01;
  //   this.loc.y/=1.01;
  // }
  ///////working on this////////
  // this.checkEdges = function(){
  //   if(this.loc.x <= this.canvas.width){
  //     this.loc.x = this.loc.x*-1;
  //   }
  //   if(this.loc.y <= this.canvas.height){
  //     this.loc.y = this.loc.y*-1;
  //   }
  // }

  this.render = function(){

    if (this.currentIndex >= this.goodKeys.length-1){
      this.currentIndex = 0;
    }

    // towerGame.context.drawImage(this.frames[this.currentIndex], this.frames[this.currentIndex].info.x, this.frames[this.currentIndex].info.y, this.frames[this.currentIndex].info.w, this.frames[this.currentIndex].info.h, this.loc.x, this.loc.y, this.w, this.h);
  this.draw();
    var millis = Date.now();
    if(millis - this.lastTime >= 50) {
      this.gameTime++;
      this.lastTime = millis;
      this.currentIndex++;
    }
  }
}
