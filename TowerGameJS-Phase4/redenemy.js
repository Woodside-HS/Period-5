class RedEnemy extends Enemy {

    constructor(game, startCell, randomPath) {
      super(game, startCell, randomPath);
      this.col = 'red';
      this.health = 500;     // initial velocity vector
      this.kill = false;
      this.vel = 1.8;
      this.initialVel = 1.8;
      //console.log("add Red");
      }



}
