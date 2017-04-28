class GreenEnemy extends Enemy {

  constructor(game, startCell, randomPath) {
    super(game, startCell, randomPath);
    this.col = 'green';
    this.health = 250;
    this.vel = 2.4;
    this.initialVel = 2.4;
  //  this.initialVel = 2.4;   // initial velocity vector
    this.kill = false;
  //  console.log("add Green");
    }



} // end class ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
