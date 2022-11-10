const colorName = document.querySelector("#colorName");
const message = document.querySelector("#message");
const resetButton = document.querySelector("#reset");
const easyButton = document.querySelector(`[data-difficulty="easy"]`);
const hardButton = document.querySelector(`[data-difficulty="hard"]`);
const squares = document.querySelectorAll(".colorSquare");
const header = document.querySelector("h1");


function changeDifficulty(e) {

    let target = e.target;
    let difficulty = target.dataset.difficulty;
    // console.log(difficulty);

    if (difficulty == "easy") {
        easyButton.classList.add("active");
        hardButton.classList.remove("active");

        squares.forEach((square, index) => (index > 2) && square.classList.add("hide"));

    } else {
        hardButton.classList.add("active");
        easyButton.classList.remove("active");

        squares.forEach(square => square.classList.remove("hide"));
    }

    resetGame();
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

function randomSquareIndex(totalNumberOfSquares) {
    let index = Math.floor(Math.random() * totalNumberOfSquares);
    return index; 
}

// function guess(event, winningSquare) {
//     console.log("guess");
//     // console.log(event);

//     // if (e.target == winningSquare) {
//     //     message.innerHTML = "yes, you won!";
//     //     squares.forEach(square => square.removeEventListener("click", guess));
//     // } else {
//     //     message.innerHTML = "keep go on";
//     // }
// }


function newGame() {

    // console.log("new game");

    // console.log(squares);

    let winningColor = randomColor();
    // console.log(winningColor);
    colorName.innerHTML = winningColor;
    let winningSquare;
  

    if (easyButton.classList.contains("active")) {
        // console.log("easy");
        // [...squares].forEach((square, index) => { (index < 2) ? square.style.backgroudColor = randomColor() : console.log(index)} );
        squares[0].style.backgroundColor = randomColor();
        squares[1].style.backgroundColor = randomColor();
        squares[2].style.backgroundColor = randomColor();
        winningSquare = squares[randomSquareIndex(3)];

    } else {
        // console.log("hard");
        squares.forEach((square) => square.style.backgroundColor = randomColor());
        winningSquare = squares[randomSquareIndex(6)];
    }

    winningSquare.style.backgroundColor = winningColor;
    winningSquare.classList.add("winning");
    // console.log(winningSquare);

    squares.forEach(square => square.addEventListener("click", (e) => {
        // console.log(e.target); 
        // console.log(winningSquare);
        // console.log(e.target == winningSquare);

        if (e.target == winningSquare) {
            message.innerHTML = "yes, you won!";
            squares.forEach((square) => square.classList.add("noPointerEvents"));
            squares.forEach((square)=> square.style.backgroundColor = winningColor);
            header.style.backgroundColor = winningColor;
        } else {
            message.innerHTML = "keep go on";
            e.target.style.backgroundColor = "transparent";
        }
    
    })); 


    // squares.forEach((square) => square.classList.contains("hide") ? square.style.backgroundColor = "transparent" : square.style.backgroundColor = randomColor());



}


// ----------------- konec game --------------


// --------------------- RESET ------------------
function resetGame() {
    squares.forEach((square) => square.classList.remove("noPointerEvents"));
    squares.forEach((square) => square.classList.remove("winning"));
    message.innerHTML = "";
    header.style.backgroundColor = "var(--primary-color)";
    newGame();
}


// ----------------konec reset -----------------

easyButton.addEventListener("click", changeDifficulty);
hardButton.addEventListener("click", changeDifficulty);
resetButton.addEventListener("click", resetGame);


// initial call for new game:

newGame();