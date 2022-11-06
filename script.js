const colorName = document.querySelector("#colorName");
const message = document.querySelector("#message");
const resetButton = document.querySelector("#reset");
const easyButton = document.querySelector(`[data-difficulty="easy"]`);
const hardButton = document.querySelector(`[data-difficulty="hard"]`);
const squares = document.querySelectorAll(".colorSquare");


function changeDifficulty(e) {

    let target = e.target;
    let difficulty = target.dataset.difficulty;
    console.log(difficulty);

    if (difficulty == "easy") {
        easyButton.classList.add("active");
        hardButton.classList.remove("active");

        squares.forEach((square, index) => (index > 2) && square.classList.add("hide"));

    } else {
        hardButton.classList.add("active");
        easyButton.classList.remove("active");

        squares.forEach(square => square.classList.remove("hide"));
    }

    newGame();
}


// ------------------- GAME ---------------------------

function randomNum() {
    let randomNum = Math.floor(Math.random() * 255) + 1;
    return randomNum;
}

function randomColor() {
    let randomColor = `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
    return randomColor;
}

function newGame() {

    console.log("new game");

    // console.log(squares);
    // squares[0].style.backgroundColor = "red";

    let winningColor = randomColor();
    colorName.innerHTML = winningColor;

    squares.forEach((square) => square.classList.contains("hide") ? square.style.backgroundColor = "transparent" : square.style.backgroundColor = randomColor());


    
}


// ----------------- konec game --------------


// --------------------- RESET ------------------
function resetGame() {


    newGame();
}


// ----------------konec reset -----------------



easyButton.addEventListener("click", changeDifficulty);
hardButton.addEventListener("click", changeDifficulty);
resetButton.addEventListener("click", resetGame);