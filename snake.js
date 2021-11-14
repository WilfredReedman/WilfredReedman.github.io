var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var WIDTH = 16;
var HEIGHT = 16;
var cellSize = canvas.width/WIDTH;
var speed = 250;
var score = 0;

var startX = 8;
var startY = 8;
var foodX = 11;
var foodY = 8;

var dx = 1;
var dy = 0;

let snake = [
    {x: startX, y: startY},
    {x: startX - 1, y: startY},
    {x: startX - 2, y: startY},
]
document.addEventListener("keydown", change_direction);

main();

function main(){
    document.getElementById('score').innerHTML = (score);


    if(checkGameOver()) return;
    setTimeout(function onTick() {
    clearCanvas();
    moveSnake();
    drawSnake();
    drawFood();
    // Call main again
    main();
  }, speed)

}

function moveSnake() 
{  
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    
    
    //check eaten
    if(head.x == foodX && head.y == foodY){
        newFood();
        score++;
        
    }
    else{
        snake.pop();
    }
}

function drawSnake(){
    snake.forEach(drawSnakePart)
}

function drawSnakePart(snakePart){
    ctx.fillStyle = "#DDDDDD";
    ctx.fillRect(snakePart.x * cellSize, snakePart.y * cellSize, cellSize * 0.8, cellSize * 0.8);
}

function drawFood(){
    ctx.fillStyle = "#DD0000";
    ctx.fillRect(foodX * cellSize, foodY * cellSize, cellSize * 0.8, cellSize * 0.8);

}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function change_direction(event) 
{  
   const LEFT_KEY = 37;
   const RIGHT_KEY = 39;
   const UP_KEY = 38;
   const DOWN_KEY = 40;
 
   const keyPressed = event.keyCode;
   const goingUp = dy == -1;
   const goingDown = dy == 1;
   const goingRight = dx == 1;  
   const goingLeft = dx == -1;
 
     if (keyPressed == LEFT_KEY && !goingRight)
     {    
          dx = -1;
          dy = 0;  
     }
 
     if (keyPressed == UP_KEY && !goingDown)
     {    
          dx = 0;
          dy = -1;
     }
 
     if (keyPressed == RIGHT_KEY && !goingLeft)
     {    
          dx = 1;
          dy = 0;
     }
 
     if (keyPressed == DOWN_KEY && !goingUp)
     {    
          dx = 0;
          dy = 1;
     }
}

function checkGameOver() {
    for (let i = 4; i < snake.length; i++) {
      if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) return true
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > WIDTH - 1;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > HEIGHT - 1;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
  }

function newFood(){

    foodX = Math.floor(Math.random() * WIDTH);
    foodY = Math.floor(Math.random() * HEIGHT);
    
    snake.forEach(function checkFoodIsNotOnSnake(item){
        if(item.x == foodX && item.y == foodY){
            newFood();
        }
    });
}