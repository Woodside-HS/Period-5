'use strict'

class Enemy extends Sprite {

  constructor(loc, w, h, json, spritesheet, propertyName, isAnAnimation, game, startCell, randomPath){
      super(loc, w, h, json, spritesheet, propertyName, isAnAnimation);
      this.game = game;
      this.currentCell = startCell;
      this.loc = loc;
      this.randomPath = randomPath;
      this.radius = 3.0;
      this.vel = 3.0;
      this.targetCell = this.nextTarget();
      this.target = this.targetCell.center;
      var targetVec = this.target.copy().sub(this.loc);
      this.velVec = targetVec.copy().normalize().scale(this.vel);      // initial velocity vector
      this.kill = false;
  }

  nextTarget() {
    if(!this.randomPath)
        return(this.currentCell.parent);    // the parent cell is always the shortest path
    else {  // else choose from cells with a lesser distance to the root
        let candidates = [];
        for(let i = 0; i < this.currentCell.neighbors.length; i++) {
            if(this.currentCell.neighbors[i].dist < this.currentCell.dist)
                candidates.push(this.currentCell.neighbors[i]);
            }
        // randomly pick one of the candidates
        return(candidates[Math.floor(Math.random() * candidates.length)]);
        }
    }

  draw(){
    var ctx = this.game.context;
    ctx.drawImage(this.frames[this.currentIndex], this.frames[this.currentIndex].info.x, this.frames[this.currentIndex].info.y, this.frames[this.currentIndex].info.w, this.frames[this.currentIndex].info.h, this.loc.x-this.w/2, this.loc.y-this.h/2, this.w, this.h);
  }

  update() {
    if(this.loc.dist(this.target) <= this.radius*4) {    // if we have reached the current target
        this.currentCell = this.targetCell;
        if(this.currentCell == this.game.root) {   // we have reached the end of the path
            this.kill = true;
            return;
            }
        this.targetCell = this.nextTarget();                  // set a new target
        if(!this.targetCell) {
            this.kill = true;   // can happen if user blocks cells while enemies are attacking
            return;
            }
         this.target = this.targetCell.center;      // always target the center of the cell
        }
    // calculate new vector from current location to the target.
    var targetVec = this.target.copy().sub(this.loc);    // the direction we want to go
    var angleBetween = this.velVec.angleBetween(targetVec);
    if(angleBetween) {  // if there is some angle between
        if(angleBetween > 0 && angleBetween > Math.PI)  // positive and > 180 degrees
            angleBetween = angleBetween - 2*Math.PI;   // make negative and < 180 degrees
        else if(angleBetween < 0 && angleBetween < -Math.PI)   // negative and < -180 degrees
            angleBetween = angleBetween = angleBetween + 2*Math.PI;  // make positive and < 180 degrees

        // now rotate the current velocity in the direction of the targetAngle
        // a little at a time
        this.velVec.rotate(angleBetween/2);
        }
    this.loc.add(this.velVec);          // apply velocity to location
  }

} // end class ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
