'use strict'

// wait for the window to load and than call back setup()
window.addEventListener('load', setup, false);

var towerGame;   // the global game object
const FRAME_RATE=30;
var cellId = 0;


function setup() {
  towerGame = new Game();
  window.setTimeout(draw, 100);    // wait 100ms for resources to load then start draw loop
}

function draw() {   // the animation loop
    towerGame.run();
    window.setTimeout(draw, 1000/FRAME_RATE);  // come back here every interval
}

// Game is the top level object and it contains the levels
class Game {
  //  This is a test
  constructor() {
    this.i = 0;
    this.checkOnce = true;// from setup()
    this.addEnemyTimer = 60;
    this.stopped = 0;
    this.isRunning = true;
    this.enemyNum = 5;
    this.enemyTwoNum = -3;
    this.enemyThreeNum = -5;
    this.enemyFourNum = -6;
    this.enemyFiveNum = -7;
    this.timeSpawn = 0;
    this.enemyTwo = [];
    this.placingTower = false;
    this.currentTower = 0;
    this.towerType = 0;
    this.closeForRay;
    this.gameTime = 0;
    this.towers = [];
    this.fullEnemyArray = [];
    this.rays = [];
    this.wave = 0;
    this.explosiveBullets = [];
    this.towerType;
    this.enemies = [];
    this.bullets = [];
    this.closestIndex;
    this.bankValue = 1500;

    this.destroyed = 0;
    this.score = 0;
    this.canvas = document.createElement("canvas");
    if(!this.canvas || !this.canvas.getContext)
        throw "No valid canvas found!";
    this.canvas.width = 900;
    this.canvas.height = 750;
    this.canvas.canDiv=document.getElementById('canDiv')
    this.canvas.canDiv.appendChild(this.canvas);
    this.context = this.canvas.getContext("2d");
    if(!this.context)
        throw "No valid context found!";
    this.lastTime = Date.now();
    this.spawnTimer = Date.now();

    //select everything of type/class and set call backs
    this.tileDivs = this.createTileDivs();
    this.loadDOMCallBacks(this.tileDivs);
    // select canvas for callbacks
    this.canvas.addEventListener('mousemove',this.handleCNVMouseMoved,false);
    this.canvas.addEventListener('mouseover',this.handleCNVMouseOver, false);
    this.canvas.addEventListener('click', this.handleCNVMouseClicked, false);

    window.addEventListener('keypress', function(evt) {
        if(evt.key == "E" || evt.key == "e" && towerGame.enemyTwo.length == 0 && towerGame.enemies.length == 0)
            towerGame.sendEnemies();

        }, false);

    this.mouseX = 0;
    this.mouseY = 0;
    this.w = 20;
    this.done = false;
    this.level= new Level1(this)
    //panelthings
    this.panelStart = new Panel(this, 100,-500,"panelStart")
    this.panelStart.createButtons();
    // containerarrays for cells
    this.grid = [];
    this.cols = Math.floor(this.canvas.width / this.w);
    this.rows = Math.floor(this.canvas.height / this.w);

    this.loadGrid();
    this.root = this.grid[this.cols - 1][this.rows -1];
    this.brushfire();

    this.sprites = [];
    this.loadSprites();
}

  // The success callback when a tower canvas image
  // or bullet image has loaded.  Hide them from
  // displaying on the page.
  hideImgElement() { this.style.display = "none"; }

  loadSprites(){
      for (let i = 0; i < 1; i++){
    //    console.log(json);
      //  this.sprites.push(new Sprite(new vector2d(20,500), 50, 100, json));
      }
  }

  run() {

    this.level.run();
  // called from draw()
  /*
    let gt = this.updateGameTime();
    this.updateInfoElements(gt);
    this.removeBullets();
    this.removeEnemies();
    this.updateWaves();
    if (this.isRunning) {
      this.render();
    }

    // draw the grid
    for(let i = 0; i < this.cols; i++){
      for(let j = 0; j < this.rows; j++){
        this.grid[i][j].render();
      }
    }
     // draw the towers
     for (let i = 0; i < this.bullets.length; i++) {
       this.bullets[i].run();
     }


     for(let i = 0; i < this.explosiveBullets.length; i++){
      this.explosiveBullets[i].run();
     }

     for (let i = 0; i < this.enemies.length; i++) {
       this.enemies[i].run();
     }
     if(this.enemies.length == 0)
      this.explosiveBullets = [];
    for (let i = 0; i < this.towers.length; i++) {
      this.towers[i].run();
      this.findClosestEnemy(i);
    }
<<<<<<< HEAD
    for (let i = 0; i < this.rays.length; i++) {
      this.rays[i].run();
=======

    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].run();
>>>>>>> refs/remotes/origin/master
    }

    for (let i = 0; i < this.enemyTwo.length; i++) {
      this.enemyTwo[i].run();
    }
  //  for (let i = 0; i < this.sprites.length; i++){
    //  this.sprites[i].run();
  //  }




    // some help text in the bottom left of the canvas
    this.context.save();
    this.context.fillStyle = "white";
    this.context.font = "14px sans-serif";
    this.context.fillText("Press the E key to send enemies", 20, this.canvas.height-20);
    this.context.restore();
<<<<<<< HEAD
    */
  }

  render() { // draw game stuff
    this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
  }

  findClosestEnemy(i){
    if(this.enemies.length > 0){
    var a = this.towers[i].loc.x - this.enemies[0].loc.x;
    var b = this.towers[i].loc.y - this.enemies[0].loc.y;
    var c = Math.sqrt(a*a + b*b);
    this.towerType = "basic";
  }
    var a1;
    var b1;
    var close = 0;
    if( this.towers.length > 0 ){
      if(this.enemies.length > 0){

      for(let j = 1; j< this.enemies.length; j++){
        a = this.towers[i].loc.x - this.enemies[j].loc.x;
        b = this.towers[i].loc.y - this.enemies[j].loc.y;
        if(Math.sqrt(a*a + b*b) < c){
          this.enemies[close].isTarget = false;
          c = Math.sqrt(a*a + b*b);
          close = j;
          this.towerType = "basic";
        }

      }
    }
///////////////////
    if(this.enemyTwo.length > 0){
      console.log("hi");
      for(let k = 0; k < this.enemyTwo.length; k++ ){
        a1 = this.towers[i].loc.x - this.enemyTwo[k].loc.x;
        b1 = this.towers[i].loc.y - this.enemyTwo[k].loc.y;
        if(Math.sqrt(a1*a1 + b1*b1) < c){
          close = k;
          c = Math.sqrt(a1*a1 + b1*b1);
          this.towerType = "two";
        }
      }
    }
      if(this.towerType == "basic" && this.enemies.length > 0){
      this.towers[i].enX = this.enemies[close].loc.x;
      this.towers[i].enY = this.enemies[close].loc.y;
      this.closeForRay = this.enemies[close].loc;
      this.closestIndex = close;
      this.enemies[close].isTarget = true;
    } else if( this.towerType = "two" && this.enemyTwo.length > 0){
      this.towers[i].enX = this.enemyTwo[close].loc.x;
      this.towers[i].enY = this.enemyTwo[close].loc.y;
    }
  }





}


      // brushfire()
    // starting with the 'root' cell, which is the bottom right cell of the grid
    // assign a "distance" to all other cells where the distance is the
    // accumulated steps from that cell to the root cell.
    // An adjacent neighbor has a step of 10
    // and a diagonal neighbor has a step of 14.

  brushfire() {
    // Initialize each cell in the grid to have a distance that
    // is the greatest possible.  Initialize each cell to
    // have no parent and populate it's array of neighbors
    for(var i = 0; i < this.cols; i++){
      for(var j = 0; j < this.rows; j++){
        var cell = this.grid[i][j];
        cell.dist = this.cols * this.rows * 10;     // set distance to max
        cell.vec = null;    // clear parent vector
        cell.parent = 0;    // clear parent
        cell.addNeighbors(this,  this.grid); // fill the neighbors array
      }
    }
    // Initialize the fifo queue with the root cell
    this.root.dist = 0;
    this.root.occupied = false; // in case it was randomly set occupied
    var queue = [this.root];

    // loop as long as the queue is not empty, removing the first cell
    // in the queue and adding all its neighbors to the end of the
    // queue.  The neighbors will only be those that are not occupied
    // and not blocked diagonally.
    while(queue.length) {
        var current = queue.shift();   // remove the first cell from the queue
        // for all its neighbors...
        for(let j =0; j < current.neighbors.length; j++){
            let neighbor = current.neighbors[j];
            var dist = current.dist+10; // adjacent neighbors have a distance of 10
            if(current.loc.x != neighbor.loc.x && current.loc.y != neighbor.loc.y)
                dist = current.dist+14; // diagonal neighbors have a distance of 14
            // if this neighbor has not already been assigned a distance
            // or we now have a shorter distance, give it a distance
            // and a parent and push to the end of the queue.
            if(neighbor.dist > dist) {
                neighbor.parent = current;
                neighbor.dist = dist;
                queue.push(neighbor);
                }
          }     // for each neighbor
        }   // while(queue.length)

    // delete any enemy that is currently in a cell without a parent
    for(let i = 0; i < this.enemies.length;  i++) {
        let enemy = towerGame.enemies[i];
        if(!enemy.currentCell.parent)
            enemy.kill = true;    // kill the orphans
        }

        // give each cell a vector that points to its parent
//       for(var i = 0; i < this.cols; i++){
//         for(var j = 0; j < this.rows; j++){
//           this.grid[i][j].vec = this.grid[i][j].getVector();
//         }
//       }

    }

    // sendEnemies()
    // Send a random number of enemies, up to 5, each from a random location
    // in the top half of the grid.  About half of the enemies will take the
    // optimal path simply by following the parent chain and about half will
    // take a path of randomly choosing cells to be next on the path
    // from all those cells with a distance to the root that is
    // less than its current location.
    // A valid cell to start the enemy must have a parent because lack
    // of a parent means either it is occupied or it is blocked from any path.
    //addEnemyTimer = 60,
    //stopped = 0,
    //addEnemyTimer--;
  //if(addEnemyTimer<1) {
    //addEnemy()
    //addEnemyTimer = (stopped > 40) ? 20 : 30;

    updateWaves(){
      if(this.timeSpawn > 0 && this.enemies.length == 0 && this.checkOnce){
       this.enemyNum += 3;
        this.enemyTwoNum +=2;
        console.log(this.wave);
        //if(this.wave > 4){
          this.enemyThreeNum += 1;
          this.enemyFourNum += 1;
          this.enemyFiveNum += 1;
      //  }
        this.checkOnce = false;
        this.i = 0;
      }
      this.wave++;
    }
    addEnemiesFive(){
        this.enemies.push(new YellowEnemy(this, this.grid[0][0], 0));
        //this.fullEnemyArray.push(new YellowEnemy(this, this.grid[0][0], 0));
        console.log("five");
    }
    addEnemiesFour(){
        this.enemies.push(new PurpleEnemy(this, this.grid[0][0], 0));
      //  this.fullEnemyArray.push(new PurpleEnemy(this, this.grid[0][0], 0));
        console.log("four");
    }
    addEnemiesThree(){
        this.enemies.push(new RedEnemy(this, this.grid[0][0], 0));
        //this.fullEnemyArray.push(new RedEnemy(this, this.grid[0][0], 0));
        console.log("three");
    }
    addEnemiesTwo(){
      this.enemies.push(new GreenEnemy(this, this.grid[0][0], 0));
      //this.fullEnemyArray.push(new GreenEnemy(this, this.grid[0][0], 0));
    }
    addEnemies(){
      this.checkOnce = true;
    try{

      this.enemies.push(new Enemy(this, this.grid[0][0], 0));
      //this.fullEnemyArray.push(new Enemy(this, this.grid[0][0], 0));


      //  alert('VIDEO HAS STOPPED');
    } catch (e){
      console.log(e);
      }
    }

    loadEnemies(){
      var numEnemies = Math.random() * 5;     // up to 5 enemies
      var row, col, startCell, i, j;

      if(this.enemyFiveNum > 0){
        for(var i = 0; i < this.enemyFiveNum; i++){
        towerGame.addEnemiesFive();
      }
    }
      if(this.enemyFourNum > 0){
        for(var i = 0; i < this.enemyFourNum; i++){
          towerGame.addEnemiesFour();
        }
      }
      if(this.enemyThreeNum > 0){
        for(var i = 0; i < this.enemyThreeNum; i++){
          towerGame.addEnemiesThree();
        }
      }
      if(this.enemyTwoNum > 0){
        for(var i = 0; i < this.enemyTwoNum; i++){
        towerGame.addEnemiesTwo();
        }
      }

      for(var i = 0; i < this.enemyNum; i++){
          towerGame.addEnemies();
        }
        //console.log(this.fullEnemyArray.length);
      while(this.i < this.fullEnemyArray.length){
          this.milliss = Date.now();
          if( this.milliss - this.spawnTimer> 200){
            this.spawnTimer = this.milliss;
            towerGame.enemies.push(towerGame.fullEnemyArray[this.i]);
            //towerGame.sendEnemies(this.i);
            console.log("spawn");
            this.i++;
          }
        }
/*
        for(var i = 0; i < this.fullEnemyArray.length; i++){
            towerGame.sendEnemies(i);
        //    console.log("adsf");
      } */
      //  console.log("his");




    }
    sendEnemies() {
        //console.log(towerGame.fullEnemyArray[0]);
      //for(var i = 0; i < towerGame.fullEnemyArray.length; i++){
    //  setTimeout(function(){
      //  towerGame.enemies.push(towerGame.fullEnemyArray[i]);
    //  }, 150 * i);
  //    console.log("ok" + i);







        //////////////////////////////////////////////////

      for(var i = 0; i < this.enemyNum; i++){
          setTimeout(function(){
            towerGame.addEnemies();
          }, 200 * i);

      }
      if(this.enemyTwoNum > 0){
      for(var i = 0; i < this.enemyTwoNum; i++){
        setTimeout(function(){
          towerGame.addEnemiesTwo();
        }, 200 * i);

    }
  }

  if(this.enemyThreeNum > 0){
    for(var i = 0; i < this.enemyThreeNum; i++){
      setTimeout(function(){
        towerGame.addEnemiesThree();
      }, 200 * i);

    }
  }
  if(this.enemyFourNum > 0){
    console.log("purps");
    for(var i = 0; i < this.enemyFourNum; i++){
      setTimeout(function(){
        towerGame.addEnemiesFour();
      }, 200 * i);

    }
  }
  if(this.enemyFiveNum > 0){
    for(var i = 0; i < this.enemyFiveNum; i++){
      setTimeout(function(){
        towerGame.addEnemiesFive();
      }, 200 * i);

    }
  }
      this.timeSpawn++;
      //console.log(this.timeSpawn);//this.enemies.length);
    }

    // Delete any enemies that have died
    removeEnemies() {
    //  console.log(this.enemies[0]);
      for(let i = this.enemies.length-1; i >= 0; i--) {
        if(this.enemies[i].kill)

            this.enemies.splice(i,1);   // delete this dead enemy
        else this.enemies[i].run();

        }
        for(let i = this.enemyTwo.length-1; i >= 0; i--) {
          if(this.enemyTwo[i].kill)
            this.enemyTwo.splice(i, 1);
          else this.enemyTwo[i].run();
        }
  }

  removeBullets(){
    if(this.bullets.length < 1) return;
    for(let i = this.bullets.length-1; i >= 0; i--){

       if( this.bullets[i].loc.x < 0 ||
           this.bullets[i].loc.x > this.canvas.width ||
           this.bullets[i].loc.y < 0 ||
           this.bullets[i].loc.y > this.canvas.height ){
             this.bullets.splice(i, 1);
           }

    }
  }
  updateInfoElements(time){
    let infoElements = document.getElementById('infoDiv').getElementsByClassName('infoTileDiv');
    for(let i = 0; i < infoElements.length; i++){
      let info = infoElements[i];
      // change the html content after condition--use indexOf

      if(info.innerHTML.indexOf('Bank') != -1){
        info.innerHTML = 'Bank <br/>' + this.bankValue;
      }else if(info.innerHTML.indexOf('Time') != -1){
        info.innerHTML = 'Time <br/>' + time;
      } else if( info.innerHTML.indexOf('Wave') != -1){
        info.innerHTML = 'Wave <br/>' + this.timeSpawn;
      }else if(info.innerHTML.indexOf('Destroyed') != -1){
        info.innerHTML = 'Destroyed <br/>' + this.destroyed;
      }else if(info.innerHTML.indexOf('Score') != -1){
        info.innerHTML = 'Score <br/>' + this.score;

      }
    }
  }

  updateGameTime(){
    var millis = Date.now();
    if(millis - this.lastTime >= 1000) {
      this.gameTime++;
      this.lastTime = millis;
    }
    return this.gameTime;
  }

   // +++++++++++++++++++++++++++++++++++++++++++  load a 2D array with cells
  loadGrid(){

    for(var i = 0; i < this.cols; i++){     // columns of rows
      this.grid[i] = [];
      for(var j = 0; j < this.rows; j++){
        this.grid[i][j] = new Cell(this, vector2d((i*this.w), (j*this.w)), ++cellId);
        // make 10% of the cells occupied
        //if(this.grid[i][j] != this.root && Math.floor(Math.random()*100) < 8 && i != 0 && i!=10)
        //    this.grid[i][j].occupied = true;

      }
    }


  }  // ++++++++++++++++++++++++++++++++++++++++++++++  End LoadGrid



  // Create the divs to hold the menu of towers with
  // the large images.  This divs also contain the
  // parameters for creating towers to be drawn on the
  // canvas.
  createTileDivs(){
    var tiles = [];

    for(var i = 0; i < 6; i++){
      var mtd = document.createElement("div"); // createDiv("");
      var cnvTurImgPath = "tow" + (i+1) + "s.png";  // small tower image for canvas
      var cnvBulImgPath = "b" + (i+1) + ".png";     // bullet image for canvas
      mtd.cnvTurImg = new Image();
      mtd.cnvTurImg.addEventListener('load',this.hideImgElement,false);
      mtd.cnvTurImg.addEventListener('error', function() { console.log(cnvTurImgPath + " failed to load"); }, false);
      mtd.cnvTurImg.src = cnvTurImgPath;    // start loading image

      mtd.cnvBulImg = new Image();
      mtd.cnvBulImg.addEventListener('load',this.hideImgElement,false);
      mtd.cnvBulImg.addEventListener('error', function() { console.log(cnvBulImgPath + " failed to load"); }, false);
      mtd.cnvBulImg.src = cnvBulImgPath;    // start loading image

      document.getElementById("menuDiv").appendChild(mtd);
      if(i == 0){
        mtd.ability = "normal";
//        this.bankValue = 200;

      } else if(i == 1){
        mtd.ability = "fast";
      //  this.bankValue = 500;

      } else if(i == 2){
        mtd.ability = "freeze";
      //  this.bankValue = 300;

      } else if(i == 3){
        mtd.ability = "explosive";
      //  this.bankValue = 700;

      } else {
        mtd.ability = "ray";
      //  this.bankValue = 1000;
      }

      mtd.cost = 100*i -50;

      console.log(mtd.cost);
      mtd.id = 'towImgDiv' + i;
      tiles.push(mtd);
      var imgName = 'tow' + i + '.png'; // large image for menu tile
      var tImg = new Image();
      tImg.addEventListener('error', function() { console.log(imgName + " failed to load"); }, false);
      tImg.src = imgName;
      mtd.appendChild(tImg);
    }
    return tiles;
  }

  getBankValue(){
    return this.bankValue;
  }
  //  Logic to add tower +++++++++++++++++++++++
  canAddTower(cell) {
    // add conditions before allowing user to place turret
    // Some money required but also cannot place tower on a cell
    // of the grid that is occupied or is the root cell
    if(towerGame.placingTower) {
        if(!cell.occupied && !cell.hasTower && cell != towerGame.root)
            return true;
      }
    return(false);
  }

  createTower(mtd) { // menu turret div
    // create a new tower object and add to array list
    // the menu tower div contains the parameters for the tower

  //  console.log(mtd.getAttribute("id"));
    if(mtd.getAttribute("id") === "towImgDiv5") {
      var wall = new Wall(mtd.cost, mtd.cnvTurImg);
      if(wall) {
        this.towers.push(wall);
      } else {
        println('failed to make wall');
      }
    } else {
      var tower = new Tower( mtd.cost, mtd.cnvTurImg, mtd.cnvBulImg, mtd.ability);
      if(tower)
        this.towers.push(tower); // add tower to the end of the array of towers
      else {
        println('failed to make tower');
      }
    }
  }


  placeTower(cell) {
    //  place tower into play area at center of cell
    towerGame.towers[towerGame.towers.length-1].loc = cell.center.copy();
//    console.log(towerGame.towers[towerGame.towers.length-1].loc.toString());
    //  tower needs to know if it is placed
    towerGame.towers[towerGame.towers.length-1].placed = true;
    cell.hasTower = true;
    //  only one tower placed at a time
    towerGame.placingTower = false;
    // placing a tower makes the cell containing the tower
    // unavailable to enemies the same as if it were
    // occupied (blocked)
    towerGame.brushfire();   // all new distances and parents
  }

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ load callbacks
  loadDOMCallBacks(menuTiles) {
    //  load tile menu callbacks
    for (var i = 0; i < menuTiles.length; i++) {
        var mtd = menuTiles[i];
        mtd.addEventListener('mouseover',this.tileRollOver,false);
        mtd.addEventListener('mouseout', this.tileRollOut, false);
        mtd.addEventListener('mousedown', this.tilePressed, false);
        mtd.addEventListener('click', this.tileClicked, false);
    }
  }

  //+++++++++++++++++++++++++   tile menu callbacks
  tileRollOver() {
    this.style.backgroundColor = '#f7e22a';
  }

  tileRollOut() {
    this.style.backgroundColor = '#DDD';
  }

  tilePressed() {
    this.style.backgroundColor = '#900';
  }

  tileClicked() {
    //if user clicks tile and not placing tile change placing to true
    // can add Tower checks cost and other conditions
    console.log(towerGame.getBankValue());
    if(towerGame.placingTower === true) return;

    if (towerGame.getBankValue() >= this.cost) {

      towerGame.createTower(this);
      towerGame.bankValue -= this.cost;
      towerGame.placingTower = true;
    }

  }

//  ++++++++++++++++++++++++++++++++++++++++++++++++++    mouse handlers
  handleCNVMouseOver() {
    if(towerGame.towers.length < 1) return;
      towerGame.towers[towerGame.towers.length-1].visible = true;
  }

  handleCNVMouseMoved(event) {
    // add some properties to the canvas to track the mouse.
    console.log(towerGame);
    this.mouseX = event.offsetX;
    this.mouseY = event.offsetY;
    if(towerGame.towers.length < 1) return;
    if(!towerGame.towers[towerGame.towers.length-1].placed &&
      towerGame.placingTower === true ){
        //follow mouse

        towerGame.towers[towerGame.towers.length-1].loc.x = this.mouseX;
        towerGame.towers[towerGame.towers.length-1].loc.y = this.mouseY;
        console.log(" mouseX? "+ this.mouseX);
        console.log(" mouseY? "+ this.mouseY);
//        console.log(this.mouseX + ", " + this.mouseY + ", " + towerGame.towers[towerGame.towers.length-1].loc.toString());
      }
  }

  handleCNVMouseClicked(event) {
    var row = Math.floor(event.offsetY/towerGame.w);
    var col = Math.floor(event.offsetX/towerGame.w);
    var cell = towerGame.grid[col][row];
    if(towerGame.placingTower && towerGame.canAddTower(cell)){
      towerGame.placeTower(cell);
    }
    else if(!towerGame.placingTower && !cell.hasTower) {
        // toggle the occupied property of the clicked cell
        cell.occupied = !cell.occupied;
        towerGame.brushfire();   // all new distances and parents
        }
  }

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //collision detection utilities
  distance(c0, c1){
      this.x0 = c0.x;
      this.y0 = c0.y;
      this.x1 = c1.x;
      this.y1 = c1.y;

      var dx = this.x1 - this.x0;
      var dy = this.y1 - this.y0;

      return Math.sqrt(dx * dx + dy * dy);

    }

    distanceXY(x0, y0, x1, y1){
      var dx = x1 - x0;
      var dy = y1 - y0;

      return Math.sqrt(dx * dx + dy * dy);
    }

    inRange(value, min, max){
      return value >= Math.min(min, max) && Math.max(min, max) <= Math.max(min, max);
    }

  //parameters:
  //loc1 = location vector of first circle
  //loc2 = location vector of second circle
  //rad1 = radius of first circle
  //rad2 = radius of second circle
    circleCollision(loc1, loc2, rad1, rad2){
      if(this.distance(loc1, loc2) <= rad1 + rad2){
        return true;
      }
    }

    //parameters:
    //x, y = locations of point
    //circx, circy = locations of circle
    //radius = radius of circle
    circlePointCollision(x, y, circx, circy, radius, multiplier){
      if(this.distanceXY(x, y, circx, circy) < (radius * multiplier)){
        return true;
      }
    }

    //parameters:
    //x, y = locations of point
    //loc = location vector of rectangle
    //rect width, height = width and height of rectangle
    rectanglePointCollision(x, y, loc, rectWidth, rectHeight){
      if(this.inRange(x, loc.x, loc.x + rectWidth) && inRange(y, loc.y, loc.y + rectHeight)){
        return true;
      }
    }


    range(min0, max0, min1, max1){
      return Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1);
    }


    //parameters:
    //loc1 = location vector of first rectangle
    //loc2 = location vector of second rectangle
    rectangleCollision(loc1, rectWidth1, rectHeight1, loc2, rectWidth2, rectHeight2){
      if(this.range(loc1.x, loc1.x + rectWidth1, loc2.x, loc2.x + rectWidth2) &&
      this.range(loc1.y, loc1.y + rectHeight1, loc2.y, loc2.y + rectHeight2)){
    return true;
  }
    }
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Other
} // end Game class +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
