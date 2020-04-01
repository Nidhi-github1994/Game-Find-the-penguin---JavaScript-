"use strick";

var $ = function(id){
    return(document.getElementById(id));
};


let score = 0;      //global variable
let highscore;      //global variable


//Level choice
function chooseLevel(){
    var gameLevel = prompt("Enter the level you want to play \n Enter 1 for Regular level \n Enter 2 for Difficult level");
    if(gameLevel == 1){regularLevel();}
    else if(gameLevel == 2){difficultLevel();}
    else{alert("enter valid number");chooseLevel();}
}


//regular level game
var regularLevel = function (){
    
    let gameholder = $("gameholder");
    var newdiv;
    
    //display the level name
    $("gamelevel").removeAttribute("class","displayNone");
    $("gamelevel").innerHTML = "Regular <br> Level";
    
    //remove divs
    while(gameholder.hasChildNodes()){
        gameholder.removeChild(gameholder.firstChild);
    }
    
    //append the divs
    for(var i = 1; i < 9; i++){
        newdiv = document.createElement('div');
        newdiv.setAttribute("id", "penguin" +i+"");
        gameholder.appendChild(newdiv);
    }
    
    //reular level with 1 yeti
    let yetiDiv = document.createElement('div');
    yetiDiv.setAttribute("id", "yeti");
    gameholder.appendChild(yetiDiv);
    
    shuffle();
    let divElements = gameholder.getElementsByTagName("div");
    
    
    // attach event handler for each div tag	
    for (let i = 0; i < divElements.length; i++ ) {
    	divElements[i].onclick = findResult;
    }
}


//Difficult level game
var difficultLevel = function (){
    
    $("gamelevel").removeAttribute("class","displayNone");
    $("gamelevel").innerHTML = "Difficult <br> Level";
    
    let gameholder = $("gameholder");
    
    //remove divs
    while(gameholder.hasChildNodes()){
        gameholder.removeChild(gameholder.firstChild);
    }
    
    //append the divs
    for(var i = 1; i < 9; i++){
        var newdiv = document.createElement('div');
    newdiv.setAttribute("id", "penguin" + i +"");
    gameholder.appendChild(newdiv);
    }
    
    //difficult level with 4 yeti
    for(i = 0; i < 4; i++){
        let yetiDiv = document.createElement('div');
        yetiDiv.setAttribute("id", "yeti");
        gameholder.appendChild(yetiDiv);
    }
    
    
    shuffle();
    let divElements = gameholder.getElementsByTagName("div");
    
    
    // attach event handler for each div tag	
    for (let i = 0; i < divElements.length; i++ ) {
    	divElements[i].onclick = findResult;
    }
}

//function to shuffle the places of panguine and yeti
function shuffle() {
        let gameholder = $("gameholder");
        
        //array of all the div elements 
        let divArray = Array.prototype.slice.call(gameholder.getElementsByTagName("div"));
        
        //shufflearray function 
        shuffleArray(divArray);
        
        divArray.forEach(function(element){
            gameholder.appendChild(element);
        })
}
    
//function to shuffle the array of div
function shuffleArray(divArray) {
    for (let i = divArray.length; i; i--) {
        let k = Math.floor(Math.random() * i);
        [divArray[k], divArray[i - 1], ] = [divArray[i - 1], divArray[k]];
    }
        return divArray;
}


//When the Yeti appears the reset function called
function resetGame(){
    let gameholder = $("gameholder");
    let divElements = gameholder.getElementsByTagName("div");
    for (var i = 0; i < divElements.length; i++ ) {
        divElements[i].style.backgroundImage = null;
    }
    
    //after the backgraound remove shuffle function is called
    setTimeout(shuffle, 100);
    checkHighscore();
}


//check for the highscore
function checkHighscore(){
    
    var storagedHighScore = sessionStorage.getItem("highscore");
    if (score > parseInt(storagedHighScore)) {
        sessionStorage.setItem("highscore", score);
        highscore = sessionStorage.getItem("highscore");
        $("highScore").innerHTML = "High Score <br>" + highscore;
    }
    
    score = 0;
    $("score").innerHTML = "Score <br>" + score;

}


//when any div is clicked 
var findResult = function(){
    let currentDiv = this;
    let currentDivId = this.id;
    let backgroundImage = window.getComputedStyle(currentDiv, ':before').getPropertyValue('background-image')
    
    //when yeti appear
    if(currentDivId == 'yeti'){
        let sound = $("yetiSound");
        sound.play();
        currentDiv.style.backgroundImage = backgroundImage;
        setTimeout(function(){alert("Game Over!!!!!");} ,500) ;
        //reset game after 1 sec
        setTimeout(resetGame, 1000);
        
    }
    
    //when panguin appear
    else{
        if( currentDiv.style.backgroundImage != backgroundImage ){
        let sound = $("panguinSound");
        sound.play();
        score++;
        currentDiv.style.backgroundImage = backgroundImage;
        $("score").innerHTML = "Score <br>" + score;
        }
        setTimeout(function(){
            if(score == 8){
                alert("You are winner!!!!!!!!!"); 
                checkHighscore();
                chooseLevel();
            }
        }, 200);
    }
}


//page load
window.onload = function(){
    
    chooseLevel();
    
    //check for the highscore session  
    if(sessionStorage['highscore']) { 
        let highscore = sessionStorage.getItem("highscore");
        $("highScore").innerHTML = "High Score <br>" + highscore;
        
    }
    else { 
        sessionStorage.setItem("highscore", 0);
        $("highScore").innerHTML = "High Score <br> 0";
     }
    
    
    
}