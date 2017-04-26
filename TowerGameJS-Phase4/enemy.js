class Enemy {

  constructor(game, startCell, randomPath) {
    this.game = game;
    this.currentCell = startCell;
    this.loc = startCell.center.copy();
    this.randomPath = randomPath;   //boolean to randomize or not
    this.radius = 3.0;
    this.isLocked = false;
    this.vel = 1.8;
    this.isTarget= false;
    this.col = 'blue'
     this.ctx = this.game.context;
     this.lastTime = Date.now();
     this.coolDown = 1000;
       // velocity factor
    this.towerLoc =  vector2d(0, 0);
    this.targetCell = this.nextTarget();
    this.target =  this.targetCell.center;
    this.targetVec = this.target.copy().sub(this.loc);
    this.velVec;
    this.increasedDamg = 3;
    this.health = 100;     // initial velocity vector
    this.kill = false;
    this.img = new Image();
    this.img.src = "images/spritesheets/enemy.png";
    this.img.addEventListener('error', function() { console.log(this.img.src + " failed to load"); }, false);
  }

  run() {
    this.update();
    this.render();
  }

  // nextTarget()
  // Return the next cell in the path to the root target
  // The parent of the current cell is always the optimal path
  // If we want some randomness in the path, choose from among all
  // the neighbor cells with a lesser distance to the root.
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

  // render()
  // Draw the enemy at its current location
  // Enemies with a randomized path are blue and
  // enemies with an optimal path are green
  render() {




    // if(this.randomPath)
     this.ctx.fillStyle = this.col;
    // else this.ctx.fillStyle = 'green';
     this.ctx.beginPath();
     this.ctx.ellipse(this.loc.x, this.loc.y, this.radius, this.radius, 0, 2*Math.PI, false);
     this.ctx.fill();


  }

    // update()
    // Calculate a new location for this enemy.
    // If has reached the root cell, kill it
    // If it has reached the current target along the path,
    // find a new target and rotate the velocity in the direaction
    // of the new target.
  update() {
    let millis = Date.now();
    for(let h = 0; h < towerGame.bullets.length; h++){
      if(this.loc.dist(towerGame.bullets[h].loc) < 20){
        if(towerGame.bullets[h].ability == "normal"){
          //this.health = this.health - 100;
          this.health = this.health - 100;
          console.log(this.health)
          towerGame.bullets.splice(h, 1);
        } else if(towerGame.bullets[h].ability == "fast"){
          this.health = this.health - 200;
          console.log(this.health)
          towerGame.bullets.splice(h, 1);
        }else if(towerGame.bullets[h].ability == "explosive"){

          //this.health = this.health - 10;
          if(this.health <= 0){
        //    this.kill = true;
          }
          this.locations = this.loc;
          towerGame.explosiveBullets.push(new Explosives(towerGame.bullets[h].loc));
          //towerGame.explosiveBullets.push(new Explosives(towerGame.bullets[h].loc));
          towerGame.bullets.splice(h, 1);
          //console.log("exp");
        }


    }
  }

  if(this.isLocked){
    var damages = 1+ this.increasedDamg;
    this.health = this.health-this.increasedDamg;
  }



    for(let i = 0; i < towerGame.explosiveBullets.length; i++){
      if(this.loc.dist(towerGame.explosiveBullets[i].loc) < 30){
        this.health = this.health -10;
      }
      if(towerGame.explosiveBullets[i].kills == true ){
        towerGame.explosiveBullets.splice(i, 1);
        console.log("die");
      }
    }



  for(let t = 0; t < towerGame.towers.length; t++){

    if(this.loc.dist(towerGame.towers[t].loc) <  100 && towerGame.towers[t].ability == "freeze"){
      this.vel = 1.0;
      break;
    } else {
      //console.log("cancel freeze");
      this.vel = 1.8;
    }
  }
//  console.log(this.health);
  if(this.health <= 0){
    this.kill = true;
    //console.log("kills");
  }



    this.velVec  = this.targetVec.copy().normalize().scale(this.vel);
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
