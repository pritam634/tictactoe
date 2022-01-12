let playClick = document.querySelectorAll('div.box');
let clickAudio = new Audio("./click_sound.mp3");
let winAudio = new Audio("./winner.mp3");
let reset = document.getElementById("reset");
let turn = "X";
let gameOver = false;
let count = 1;

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
}

// Function to check for a win
const checkWin = () => {
    let text_box = document.getElementsByClassName("text-box");
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, -45],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90]
    ]
    wins.forEach(e => {
        if ((text_box[e[0]].innerText === text_box[e[1]].innerText) && (text_box[e[2]].innerText === text_box[e[1]].innerText) && text_box[e[0]].innerText !== "") {
            document.querySelector(".info").innerText = text_box[e[0]].innerText + " Win";
            gameOver = true;
            document.querySelector("img").classList.add("open");
            winAudio.play();
            document.querySelector(".line").style.width = "20vw";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            setTimeout(() => {
                document.querySelector("img").classList.remove("open");
            }, 2500);
            setTimeout(() => {
                let text_box = document.querySelectorAll(".text-box");
                Array.from(text_box).forEach(element => {
                    element.innerText = "";
                });
                turn = "X";
                gameOver = false;
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
                document.querySelector(".line").style.width = "0";
            }, 3000);
            count = 1;
        }
    });
}

// Game Engine
Array.from(playClick).forEach((clicked) => {
    let text_box = clicked.querySelector(".text-box");
    clicked.addEventListener("click", (e) => {
        if (text_box.innerText === '') {
            text_box.innerText = turn;
            turn = changeTurn();
            count++;
            clickAudio.play();
            checkWin();
            if (!gameOver) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }

            if (count == 10) {
                gameOver = true;
                document.getElementsByClassName("info")[0].innerText = "Match draw!";
                count = 1;
            }
        }
    });
});

// Reset game
reset.addEventListener("click", () => {
    let text_box = document.querySelectorAll(".text-box");
    Array.from(text_box).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    gameOver = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector(".line").style.width = "0";
    count = 1;
});

Runner.instance_.gameOver = () => {
    
}