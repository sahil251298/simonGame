var buttonColours=["red","blue","green","yellow"];
var userClickedPattern=[];
var gamePattern=[];
var level=0;
var current=0;
function playSound(colour){
    var audio=new Audio("./sounds/"+colour+".mp3");
    audio.play();
}

function animate(colour){
    $("#" + colour).animate({
        opacity: 0.5 
    }, 100);

    $("#" + colour).animate({
        opacity: 1 
    }, 100);
}

function animatePress(colour){
    $("#" + colour).addClass("pressed");
    setTimeout(function() {
        $("#" + colour).removeClass("pressed");
    }, 100);
    
}

function nextSequence(){
    level++;
    current=0;
    $("h1").text("Level "+level);
    userClickedPattern=[]
  var randomNumber=Math.random()*4;
  randomNumber=Math.floor(randomNumber);
  var randomChosenColor=buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    animate(randomChosenColor);

    playSound(randomChosenColor);
}

function checkAnswer(){
    if(gamePattern.length<=current)
        return;
    if(userClickedPattern[current]!=gamePattern[current]){
        $("h1").text("Game Over!!! Score: "+(level-1));
        level=0;
        gamePattern=[];
        setTimeout(function() {
            $("h1").text("Press A Keyboard Key to Start");
        }, 3000);
        return;  
    }
    current++;
    if(userClickedPattern.length==gamePattern.length){
        setTimeout(nextSequence,500);
    }
}



$(".btn").click(function (){
var userChosenColour=this.id;
userClickedPattern.push(userChosenColour);
animatePress(userChosenColour)
playSound(userChosenColour);
checkAnswer();
});

$(document).keypress(function (){
    if(level==0){
        nextSequence();
    }
        
});
