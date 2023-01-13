// Start Game
const startGame = () => {
    handleInput();
    screenInput();
    checkItemAt(...startPoint);
    placeAppleAt(...getRandomPosition());
}

startGame();
