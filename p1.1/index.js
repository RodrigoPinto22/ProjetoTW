let height = 0;
let width = 0;

function getSize() {
    const boardSize = document.getElementById("bSize").value;
    const dimensions = boardSize.split("x");
    
    height = parseInt(dimensions[0], 10);
    width = parseInt(dimensions[1], 10);
    createBoard();
}

function createBoard() {
    const board = document.querySelector(".board");
    
    board.innerHTML = "";

    for (let i = 0; i < height; i++) {
        const row = document.createElement("tr");
        board.appendChild(row);
        for (let j = 0; j < width; j++) {
            const cell = document.createElement("td");

            cell.style.width = `${500%width}px`;
            cell.style.height = `${500%height}px`;
            cell.style.border = "solid 1px";
            row.appendChild(cell);
        }
    }
}

function getInfo() {
    var button = event.target;
    var btnValue = button.value;
    const overlay = document.createElement("div");
    overlay.className = "overlay";
  
    const overlayContent = document.createElement("div");
    overlayContent.className = "overlayContent"
    overlayContent.style.backgroundImage = "url(" + `${btnValue}`+ ".png)";
    overlay.appendChild(overlayContent)

    const closeButton = document.createElement("button")
    closeButton.className = "closeButton"
    closeButton.innerText = "X";
    closeButton.onclick = closeOverlay;
    overlayContent.appendChild(closeButton)

    document.body.appendChild(overlay);

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            overlay.remove();
        }
    });
}

function closeOverlay(){
    const overlay = document.querySelector(".overlay");
    overlay.remove();
}

function getMessage() {
    const n = 1
    const p1 = document.getElementsByClassName("player1")[0]
    const p2 = document.getElementsByClassName("player2")[0]

    if(n == 1) {
        const para = document.createElement("p")
        para.textContent = "É a tua vez de jogar"
        p1.appendChild(para)
    }

    if(n == 2) {
        const para = document.createElement("p")
        para.textContent = "Podes capturar uma peça do adversário"
        p1.appendChild(para)
    }

    if(n == 3) {
        const para = document.createElement("p")
        para.textContent = "Essa jogada não é possível"
        p1.appendChild(para)
    }

    if(n == 4) {
        const para = document.createElement("p")
        para.textContent = `O jogo terminou e ${asd} ganhou!`
        p1.appendChild(para)
    }

    if(n == 5) {
        const para = document.createElement("p")
        para.textContent = `O jogador ${asd} desistiu!`
        p1.appendChild(para)
    }
}

function getScorboard() {
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    const scoreBoard = document.createElement("tr")
    scoreBoard.className = "overlayContent"

    const closeButton = document.createElement("button")
    closeButton.className = "closeButton"
    closeButton.innerText = "X";
    closeButton.onclick = closeOverlay;
    scoreBoard.appendChild(closeButton)

    overlay.appendChild(scoreBoard)
    document.body.appendChild(overlay)

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            overlay.remove();
        }
    });
}

function startGame() {
    alert("teste")
}
