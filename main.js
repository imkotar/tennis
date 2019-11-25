const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const playerPointsDiv=document.getElementById('playerPoints');
const aiPointsDiv=document.getElementById('aiPoints');
let licznik=0;
let keyPressed;

canvas.width = 1000*0.85;
canvas.height = 500*0.85;

const cw = canvas.width;
const ch = canvas.height;

const paddleHeight = 100;
const paddleWidth = 10;

const playerX =0;
const aiX = cw-paddleWidth;
let playerY=100;
let aiY = 100;

let playerPoints=0;
let aiPoints=0;

const ballSize=20;
let ballX=(cw/2)-ballSize/2;
let ballY=(ch/2)-ballSize/2;

let ballSpeedX = randomNumber(-1, 2);
let ballSPeedY = randomNumber(-1, 2)+randomNumber(-1, 2)*0.9;
let speedIncrease =0.5;
console.log('X '+ ballSpeedX)
console.log('Y '+ ballSPeedY)

topCanvas = canvas.offsetTop;

function randomNumber(x, y){
let output = 0;
do{
    output = Math.floor(Math.random() * (y - x)) + x
}while (output==0)
   return output;
}

function player(){
    ctx.fillStyle = '#7fff00';
    ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight)
}
function ai(){
    ctx.fillStyle = '#7fff00';
    ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight)
}

function playerPosition(e){
    playerY = e.clientY - topCanvas - paddleHeight/2;
    //playerY = ballY - topCanvas - paddleHeight/2; //AI for testing
    if(playerY+paddleHeight>=ch){
        playerY = ch-paddleHeight;
    }
    if(playerY<=0 ){
        playerY=0;
    }
}

canvas.addEventListener("mousemove", playerPosition)

function aiPosition(e){
    let middlePaddel = aiY + paddleHeight/2;
    let middleBall = ballY + ballSize/2;
    let aiSpeed = 7;
    if(ballSpeedX==4 || ballSpeedX==-4){
        aiSpeed=20;
    }
    if(ballX>cw/4){
        if(middlePaddel-middleBall>200){
            aiY -= 5+aiSpeed;
        }
        if(middlePaddel-middleBall>50){
            aiY-= aiSpeed;
        }
        if(middlePaddel-middleBall<-200){
            aiY += 5+aiSpeed;
        }
        if(middlePaddel-middleBall<-50){
            aiY += aiSpeed;
        }
    }

}

function table(){
    ctx.fillStyle = 'green';
    ctx.fillRect( 0, 0, cw ,ch)
    ctx.fillStyle = "white";
    for(let i=0; i<ch; i=i+12){
    ctx.fillRect((cw/2)-1, i, 2, 6)
    }
}
function ball(){
    ctx.fillStyle = 'white';
    ctx.fillRect(ballX, ballY, ballSize, ballSize)
    ballX += ballSpeedX;
    ballY += ballSPeedY;

    if (ballY <= 0 || ballY +ballSize >=ch){
        ballSPeedY= -ballSPeedY;
    }

}
function PaddleCollision(){
    if(ballX<=playerX+paddleWidth+1 && ballY+ballSize>=playerY && ballY<=playerY+paddleHeight){ //player paddle
        ballSpeedX= -ballSpeedX;
        ballSpeedX =Math.abs(ballSpeedX)+speedIncrease;
        if(ballSPeedY>=0){
            ballSPeedY =ballSPeedY + speedIncrease;
        }
        else{
            ballSPeedY =Math.abs(ballSPeedY)+speedIncrease;
            ballSPeedY =-ballSPeedY;
        }
    }
    else if (ballX+ballSize>=aiX && ballY+ballSize>=aiY && ballY<=aiY+paddleHeight){ //ai paddle
        ballSpeedX =Math.abs(ballSpeedX)+speedIncrease;
        if(ballSPeedY>=0){
            ballSPeedY =ballSPeedY + speedIncrease;
        }
        else{
            ballSPeedY =Math.abs(ballSPeedY)+speedIncrease;
            ballSPeedY =-ballSPeedY;
        }
        ballSpeedX= -ballSpeedX;
    }
    if(ballSpeedX>=7.5 ){
        ballSpeedX=8;
    }else if(ballSpeedX<=-7.5){
        ballSpeedX=-8;
    }
}
function pointsCounter(){
    if (ballX <= 0 ){
        aiPoints++;
        ballReset();
        aiPointsDiv.textContent=aiPoints;
        console.log('ai points ' + aiPoints)
    }
    else if(ballX >=cw){
        playerPoints++;
        playerPointsDiv.textContent=playerPoints;
        ballReset();
        console.log('player points ' + playerPoints)
    }
}

function ballReset(){
    ballX=((cw/2)-ballSize/2);
    ballY=((ch/2)-ballSize/2)+randomNumber(-100, 110);
    ballSpeedX = randomNumber(-1, 2)+0.5;
    ballSPeedY = randomNumber(-1, 2)+0.5;
    console.log('X '+ ballSpeedX)
    console.log('Y '+ ballSPeedY)
}

function game(){
    table();
    ball();
    player();
    ai();
    ball();
    PaddleCollision();
    pointsCounter();
    aiPosition();
    //playerPosition(); //enables AI for testing
}

setInterval(game, 1000/60)