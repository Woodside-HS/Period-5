"use strict"
class Panel{
  constructor(game, number){
      this.game = game
      this.temp = 0
      this.y = -290
      this.panel = document.createElement("div")
      this.panel.id = panelJSON[number].id
      this.panel.style.width = 450+"px"
      this.panel.style.height = 290+"px"
      this.panel.style.backgroundImage = 'url("'+panelJSON[number].pic+'")'
      this.panel.style.position = "absolute"
      this.panel.align = "center"
      this.panel.style.top = this.y+"px"
      this.panel.style.textAlign = "center"
      this.wrapper = document.getElementById('wrapperDiv').appendChild(this.panel)
      for(let i = 0; i < panelJSON[number].buttonJSON.length; i++){
        this.createButton(panelJSON[number], i)
      }
  }

  render(){
    this.temp = this.lerp(this.y,300,.05)
    this.panel.style.top = this.y+"px"
    if(Math.abs(this.temp) >1){
      this.y = this.temp
    }
  }

  lerp( a,  b,  f){
    return a + f * (b - a)
  }

  createButton(JSON1, i){
    var button = document.createElement("div")
    button.id= JSON1.buttonJSON[i].picId
    button.style.width=123+"px"
    button.style.height=30+"px"
    button.style.position="relative"
    button.style.top=12+21*i+"%"
    button.style.left=150+"px"
    button.image = document.createElement("img")
    button.image.id = JSON1.buttonJSON[i].picId
    button.image.src = JSON1.buttonJSON[i].pic
    button.image.addEventListener("click", JSON1.buttonJSON[i].funk, false)
    button.appendChild(button.image)
    this.panel.appendChild(button)
  }
}

var panelJSON= [{
  name: "Start Panel",
  id: "firstPanel",
  pic: "pan.png",
  picId: "pan",
  buttonJSON: [
    {
      name: "Start Button",
      id: "start",
      pic: "play.png",
      picId: "play",
      funk: function(){
        towerGame.level= new Level2(towerGame)
        document.getElementById("firstPanel").parentNode.removeChild(document.getElementById("firstPanel"))
      }
    },{
      name: "Instruction Button",
      id: "instruction",
      pic: "wframe.png",
      picId: "wframe",
      funk: function(){
        towerGame.level.panelInstructions = new Panel(towerGame, 1)
        document.getElementById("firstPanel").parentNode.removeChild(document.getElementById("firstPanel"))
      }
    },{
      name: "Quit Button",
      id: "quitButton",
      pic: "exit.png",
      picId: "exit",
      funk: function(){
        towerGame.level= new Level3(towerGame)
        document.getElementById("firstPanel").parentNode.removeChild(document.getElementById("firstPanel"))
      }
    }]
},{
  name: "Instruction Panel",
  id: "instructionPanel",
  pic: "pan.png",
  picId: "pan",
  buttonJSON: [
    {
      name: "Back Button",
      id: "back",
      pic: "back.png",
      picId: "back",
      funk: function(){
        towerGame.level.panelStart = new Panel(towerGame, 0)
        document.getElementById("instructionPanel").parentNode.removeChild(document.getElementById("instructionPanel"))
      }
    }]
},{
  name: "End Panel",
  id: "endPanel",
  pic: "pan.png",
  picId: "pan",
  buttonJSON: [
    {
      name: "Replay Button",
      id: "replayButton",
      pic: "wframe.png",
      picId: "wframe",
      funk: function(){
        towerGame.level= new Level1(towerGame)
        document.getElementById("endPanel").parentNode.removeChild(document.getElementById("endPanel"))
      }
    },{
      name: "Quit Button",
      id: "quitButton",
      pic: "exit.png",
      picId: "exit",
      funk: function(){
        document.getElementById("endPanel").parentNode.removeChild(document.getElementById("endPanel"))
          towerGame.level.panelQuit = new Panel(towerGame, 2)
      }
    },{
      name: "Credits Button",
      id: "creditsButton",
      pic: "wframe.png",
      picId: "wframe",
      funk: function(){
        towerGame.level.panelCredits = new Panel(towerGame, 3)
        document.getElementById("endPanel").parentNode.removeChild(document.getElementById("endPanel"))
      }
    }]
},{
  name: "Credites Panel",
  id: "creditesPanel",
  pic: "pan.png",
  picId: "pan",
  buttonJSON: [
    {
      name: "Back Button",
      id: "back",
      pic: "back.png",
      picId: "back",
      funk: function(){
        towerGame.level.panelQuit = new Panel(towerGame, 2)
        document.getElementById("creditesPanel").parentNode.removeChild(document.getElementById("creditesPanel"))
      }
    }]
}]
