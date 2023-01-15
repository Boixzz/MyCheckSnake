// Adding Helper Functions
const rows = document.querySelectorAll('.row');

const getItemAt = (x, y) => rows[y - 1].children[x - 1];
const checkItemAt = (x, y) => getItemAt(x, y).checked = true;
const unCheckItemAt = (x, y) => getItemAt(x, y).checked = false;

const placeAppleAt = (x, y) => {
    getItemAt(x, y).type = 'radio';
    checkItemAt(x, y);
}

const removeAppleAt = (x, y) => {
    getItemAt(x, y).type = 'checkbox';
    unCheckItemAt(x, y);
}

//Getting the position of the apple
const getApplePosition = () => {
    const position = [1, 1];

    rows.forEach((row, rowIndex) => {
        Array.from(row.children).forEach((input, inputIndex) => {
            if (input.type === 'radio') {
                position[0] = inputIndex + 1;
                position[1] = rowIndex + 1;
            }
        });
    });

    return position;
}

//Get a ramdom position
const getRandomPosition = () => {
    const availablePositions = [];

    rows.forEach((row, rowIndex) => {
        Array.from(row.children).forEach((input, inputIndex) => {
            if (input.type === 'checkbox' && input.checked === false) {
                availablePositions.push([inputIndex + 1, rowIndex + 1]);
            }
        });
    });

    const index = Math.floor(Math.random() * (availablePositions.length) - 1) + 1;

    return availablePositions[index];
}

//Increasing score
const increaseScore = () => {
    const score = document.querySelector('.score');

    currentScore = parseInt(score.innerText, 10);
    score.innerText = currentScore + 1;
    
    if (currentScore == 6) {
        changeMode();
    }
    if (currentScore == 12) {
        changeMode();
    }
    if (currentScore == 18) {
        changeMode();
    }
    if (currentScore == 24) {
        changeMode();
    }
    if (currentScore == 30) {
        changeMode();
    }
    if (currentScore == 36) {
        changeMode();
    }
    if (currentScore == 42) {
        changeMode();
    }
    if (currentScore == 48) {
        changeMode();
    }
    if (currentScore == 54) {
        changeMode();
    }
    if (currentScore == 60) {
        changeMode();
    }
}

// Handling User Input
const handleInput = () => {
    document.addEventListener('keydown', e => {
        switch(e.keyCode) {
            case key.arrowUp:    movingDirection = movingDirection === 'down' ? 'down' : 'up'; break;
            case key.arrowDown:  movingDirection = movingDirection === 'up' ? 'up' : 'down'; break;
            case key.arrowLeft:  movingDirection = movingDirection === 'right' ? 'right' : 'left'; break;
            case key.arrowRight: movingDirection = movingDirection === 'left' ? 'left' : 'right'; break;
        }
        
        if (moveInterval === undefined) {
            moveInterval = setInterval(() => {
                move(movingDirection || 'left');
            }, 1000 / speed);
        }
    });
}

const screenInput = () => {
    document.getElementById("left").onclick = function() {left()};
    document.getElementById("up").onclick = function() {up()};
    document.getElementById("down").onclick = function() {down()};
    document.getElementById("right").onclick = function() {right()};
    
     function left(){
         movingDirection = movingDirection === 'right' ? 'right' : 'left';
     };
     function up(){
         movingDirection = movingDirection === 'down' ? 'down' : 'up';
     };
     function down(){
         movingDirection = movingDirection === 'up' ? 'up' : 'down';
     };
     function right(){
         movingDirection = movingDirection === 'left' ? 'left' : 'right';
     };
    
     if (moveInterval === undefined) {
         moveInterval = setInterval(() => {
                move(movingDirection || 'left');
         }, 1000 / speed);
     }
}

//Adding Movement
const playWave = head => {
    const checkboxes = [];

    for (let x = 1; x <= worldSize; x++) {
        for (let y = 1; y <= worldSize; y++) {
            checkboxes.push(getItemAt(x, y));
        }
    }

    getItemAt(...head).className = 'wave';

    checkboxes.forEach((checkbox, index) => {
        setTimeout(() => {
            checkbox.className = 'wave';
            checkbox.checked = false;
        }, 10 * index);
    });
}

//Direction
const move = direction => {
    const applePosition = getApplePosition();
    const head = [...snake[0]];
    const tail = [...snake[snake.length - 1]];

    const updateSnake = () => {
        snake.unshift(head);
        snake.pop();

        snake.forEach(snakePart => checkItemAt(...snakePart));
    }

    //Snake die if it hits the edges
    switch (direction) {
        case 'up':    head[1] = head[1] === 1 ? worldSize : head[1] - 1; break;
        case 'down':  head[1] = head[1] === worldSize ? 1 : head[1] + 1; break;
        case 'left':  head[0] = head[0] === 1 ? worldSize : head[0] - 1; break;
        case 'right': head[0] = head[0] === worldSize ? 1 : head[0] + 1; break;
    }

    //GameOver
    if (getItemAt(...head).type === 'checkbox' && getItemAt(...head).checked) {
        document.querySelector('h2').innerText = 'Game Over...';
        document.querySelectorAll('input').forEach(input => input.disabled = true);
        document.querySelector('.retry-btn').style.display = "block";

        playWave(head);

        clearInterval(moveInterval);  
    }

    //delay the animation
    if (head[0] === applePosition[0] && head[1] === applePosition[1]) {
        snake.push(tail);

        placeAppleAt(...getRandomPosition());
        removeAppleAt(...applePosition);
        
        increaseScore();

        updateSnake();
    } else {
        updateSnake();
        unCheckItemAt(...tail);
    }
}
