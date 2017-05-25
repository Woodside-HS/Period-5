"use strict"
class Panel{
  constructor(game, x,y, id){
      this.x = x
      this.y = y
      this.pImg = new Image();
      this.pImg.addEventListener('error', function() { console.log(this.imgName + " failed to load"); }, false);
      this.game=game
      this.imgName = "pan.png"; // large image for menu tile
      this.pImg.src = this.imgName;
      this.thing = document.createElement("div")
      this.thing.id = id
      this.thing.style.width = 450+"px"
      this.thing.style.height = 290+"px"
      this.thing.style.position = "absolute"
      this.thing.style.backgroundImage = 'url("pan.png")'
      this.thing.style.top = this.y+"px"
      //this.thing.style.left = this.x+"px"
      this.thing.style.textAlign = "center"
      this.thing.align = "center"
      document.getElementById('wrapperDiv').appendChild(this.thing)
      //this.thing.appendChild(this.pImg);
      this.temp = 0
      this.intcrament  = 0
      this.go = false
  }

  render(){
    this.temp = this.lerp(this.y,300,.05)
    this.thing.style.top = this.y+"px"
    //this.thing.style.left = this.x+"px"
      if(Math.abs(this.temp) >1){
        this.y = this.temp
    }
    //this.ctx.drawImage(this.pImg, this.pLoc.x, this.pLoc.y)
    //this.pLoc.vec.y += 1
  }

  lerp( a,  b,  f){
    return a + f * (b - a)
  }
  createButtons(){
    for(var i=0;i<buttonJSON.length;i++){
      var button = document.createElement("div")
      button.imageThing = document.createElement("img")
      button.imageThing.id = buttonJSON[i].picId
      button.imageThing.src  = buttonJSON[i].pic
      button.imageThing.addEventListener("click",buttonJSON[i].thing,false)
      button.id= buttonJSON[i].id
      button.style.width=123+"px"
      button.style.height=30+"px"
      button.style.position="relative"
      button.style.top=12+21*i+"%"
      button.style.left=150+"px"
      button.appendChild(button.imageThing)
      this.thing.appendChild(button)
    }
  }

  createButtons2(x,y,z){
    var button = document.createElement("div")
    button.imageThing = document.createElement("img")
    button.imageThing.id = "backpic"
    button.imageThing.src = "back.png"
    button.imageThing.addEventListener("click",y,false)
    button.id= x
    button.style.width=123+"px"
    button.style.height=30+"px"
    button.style.position="relative"
    button.style.top=12+21+"%"
    button.style.left=125+"px"
    button.appendChild(button.imageThing)
    this.thing.appendChild(button)
  }
}

var buttonJSON= [
  {
    name:"Start",
      thing:function(){
        document.getElementById("panelStart").style.display = "none"
        towerGame.level = new Level2(towerGame)
      },
      id:"panelStartStartButton",

      pic:"play.png",
      picId: "play"
},
{
  name:"Instructions",
  thing:function(){
      document.getElementById("panelStart").style.display = "none"
      towerGame.panelInstructions = new Panel(this,100,-500, "panelInstructions")
      towerGame.panelInstructions.createButtons2("Back",
        function(){
          document.getElementById("panelStart").style.display = "block"
          document.getElementById("panelInstructions").parentNode.removeChild(document.getElementById("panelInstructions"))
        }, "panelInstructionsButton")
    },
    id:"panelStartInstructionButton",

    pic:"wframe.png",
    picId: "instructions"
},
{
  name:"Quit",
  thing:function(){
      towerGame.panelQuit = new Panel(this,100,-500,"panelQuit")
      document.getElementById("panelStart").style.display = "none"
    },
    id: "panelStartQuitButton",
    pic:"exit.png",
    picId: "exit"
}]
