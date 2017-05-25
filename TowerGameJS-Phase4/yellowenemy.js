class YellowEnemy extends Enemy {

  constructor(game, startCell, randomPath) {
    super(game, startCell, randomPath);
    this.col = 'yellow';
    this.health = 750;
    this.vel = 1.8;
    this.initialVel = 1.8;
  //  this.initialVel = 2.4;   // initial velocity vector
    this.kill = false;
  //  console.log("add Green");
    }
}
