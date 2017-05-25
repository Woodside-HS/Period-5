'use strict'

class Wall {
  constructor(cost, img) {
    this.loc = vector2d(0, 0);
    this.placed = false;
    this.visible = false;
    this.cost = cost;
    this.img = img;
    this.lastTime = Date.now();
    this.coolDown = 500;
  }

  run() {
    this.render();
  }

  render() {
    var ctx = towerGame.context;
    ctx.save();
     ctx.translate(this.loc.x, this.loc.y);
      if (this.visible) { //  not visible when first created
        ctx.drawImage(this.img, -this.img.width/2,-this.img.height/2);
      }
    ctx.restore();
  }
}
