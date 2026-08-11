let ground = document.querySelector(".ground");
let mario = document.querySelector(".mario");
let obstacle = document.querySelector(".obstacle");

let rect = mario.getBoundingClientRect();
console.log(rect);
        
//global variables
let currentTop = 150;
let velocity = -10;
let gravity = 5;
let maxJumpValue = 30;
let isJumping = false;
let direction = 'up';
let groundTop = 150;
let currentLeft=0;
let movingSpeed =65;
let gameOverDiv = null;

    function restart(){
        if (gameOverDiv) {
            gameOverDiv.remove();
            gameOverDiv = null;
        }

    currentTop = 150;
    velocity = -10;
    gravity = 5;
    maxJumpValue = 30;
    isJumping = false;
    direction = 'up';
    groundTop = 150;
    currentLeft=0;
    movingSpeed =65;

    mario.style.top=currentTop+'px';
    mario.style.left=currentLeft+'px';
    }

    function gameOver(){
        if (gameOverDiv) {
            gameOverDiv.remove();
        }

    gameOverDiv = document.createElement("div");
    gameOverDiv.innerText = `Game Over\nenter to restart`;
    gameOverDiv.classList.add("gameOver");
    document.body.appendChild(gameOverDiv);
    }       

let isGameOver = false;

function isColliding() {
    if (isGameOver) return;

    let marioRect = mario.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();

    // Standard bounding box collision check
    if (
        marioRect.x < obstacleRect.x + obstacleRect.width &&
        marioRect.x + marioRect.width > obstacleRect.x &&
        marioRect.y < obstacleRect.y + obstacleRect.height &&
        marioRect.y + marioRect.height > obstacleRect.y
    ) {
        isGameOver = true;
        gameOver(); 
        
        return; 
    }

    requestAnimationFrame(isColliding);
}

window.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && isGameOver) {
        isGameOver = false;
        restart();
        requestAnimationFrame(isColliding);
    }
});

requestAnimationFrame(isColliding);


function jump(){
if(isJumping){
    if(direction=='up' && currentTop>=maxJumpValue){
        currentTop+=velocity;
        mario.style.top=currentTop+'px';
    }else if(direction=='up' && currentTop<=maxJumpValue){
        direction='down';
    }else if(direction=='down' && currentTop<=groundTop){
        currentTop+=gravity;
        mario.style.top=currentTop+'px';
    }else if(direction=='down' && currentTop>=groundTop){
        console.log(`Mario reached to ground.. i am stopping the frames`);
        return;   
        }
    }
            
    AnimationId =  requestAnimationFrame(jump);
}

function moveRight(){
    currentLeft+=movingSpeed;
    mario.style.left=currentLeft+'px';
    }
function moveLeft(){
    currentLeft-=movingSpeed;
    mario.style.left=currentLeft+'px';
    }

    window.addEventListener("keydown",(event)=>{
        console.log(event.key);
        if(event.key==='ArrowUp'){
            isJumping=true;
            direction='up';
            jump();
        }else if(event.key==='ArrowRight'){
            moveRight();
        }else if(event.key==='ArrowLeft'){
            moveLeft();
        }
    })