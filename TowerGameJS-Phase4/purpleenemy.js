class PurpleEnemy extends Enemy {

  constructor(game, startCell, randomPath) {
    super(game, startCell, randomPath);
    this.col = 'purple';
    this.health = 620;
    this.vel = 1.8;
    this.initialVel = 1.8;
  //  this.initialVel = 2.4;   // initial velocity vector
    this.kill = false;
  //  console.log("add Green");
    }
}
