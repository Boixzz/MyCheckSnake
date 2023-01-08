// Start Game
const startGame = () => {
    handleInput();
    checkItemAt(...startPoint);
    placeAppleAt(...getRandomPosition());
}

startGame();