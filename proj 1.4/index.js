function getSize() {
    const boardSize = document.getElementById("bSize").value;
    const dimensions = boardSize.split("x");
    
    rows = parseInt(dimensions[0], 10);
    cols = parseInt(dimensions[1], 10);
    createBoard(rows, cols);
}

function getCustomSize(){
    event.preventDefault()
    const rows = document.getElementById("width").value
    const cols = document.getElementById("height").value
    createBoard(rows, cols);
}

function createBoard(rows, cols) {

    const board = document.querySelector(".board");
    board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    board.innerHTML = "";
    
    for (let i = 0; i < cols * rows; i++) {
        const cell = document.createElement("div");
        cell.className = "cell"
        cell.id = `cell${i}`
        board.appendChild(cell);
    }
}

function getInfo() {
    var button = event.target;
    var btnValue = button.value;
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    
    const overlayContent = document.createElement("div");
    overlayContent.className = "overlayContent"
    const title = document.createElement("h1")

    const titles = {
        1: "O que é?",
        2: "Como jogar",
        3: "Regras",
    };
    title.textContent = titles[btnValue]
    title.className = "title"
    overlayContent.appendChild(title)
    if (btnValue == 1) {
        overlayContent.style.backgroundImage = "linear-gradient(to right,#ffde59, #ff914d)";

        const items1 = [
            "Dara é um jogo de tabuleiro de estratégia abstrata para dois jogadores, jogado em vários paises da África Ocidental.",
            "Este jogo foi inventado no século XIV.",
            "Na Nigéria é jogado pelo povo Dakarkari.",
            "É popular também em Burkina Faso e em Niger entre os Zarma, onde é chamado dili.",
            "Na língua Hausa , o jogo é chamado doki, que significa cavalo.",
            "O jogo também é conhecido por Derrah e é muito parecido ao Wali e Dama Tuareg."
        ]
        items1.forEach((paragraphText) => {
            const paragraph = document.createElement("p");
            paragraph.className = "paragraph"
            paragraph.textContent = paragraphText;
            overlayContent.appendChild(paragraph);
        });
       
      

    } else if (btnValue == 2) {
        overlayContent.style.backgroundImage = "linear-gradient(to right,#cdffd8, #94b9ff)";
        const list = document.createElement("ol")
        const items2 = [
            "1) Cada jogador escolhe a cor das peças: branco ou preto.",
            "2) Escolher quem joga primeiro.",
            "3) Alternadamente, cada jogador coloca uma das suas peças numa casa livre do tabuleiro.",
            "4) Cada jogador move alternadamente uma peça da sua cor para uma casa contigua.",
            "5) O jogo termina quando um jogador não puder ganhar, por exemplo se tiver apenas 2 peças no tabuleiro, ou se não puder realizar uma jogada válida."
        ]
        items2.forEach((itemText) => {
            const listItem = document.createElement("li");
            listItem.className = "listItem"
            listItem.textContent = itemText;
            list.appendChild(listItem);
        });
        overlayContent.appendChild(list);

        const msg = document.createElement("h1")
        msg.className = "msg"
        msg.textContent = "Bom jogo!"
        overlayContent.append(msg)

        
    } else if (btnValue == 3) {
        overlayContent.style.backgroundImage = "linear-gradient(to right,#0cc0df, #ffde59)";

        const list = document.createElement("ol")
        const items3 = [
            "-Não podem ser postas mais de 3 peças em linha.",
            "-São consideradas em linha:",
            "-Uma linha de tamanho 3 permite capturar peça do adversário á escolha.",
            "-Só uma peça é removida por jogada (mesmo sendo formadas várias linhas)",
            "-Uma peça não pode retornar á posição da jogada anterior, apenas nas jogadas seguintes"
        ]
        const items4 = [
            "-Sequências de 3 ou mais peças contíguas",
            "-Na horizontal ou vertical (não na diagonal)",
            "-Todas da mesma cor"
        ]
        items3.forEach((itemText) => {
            const listItem = document.createElement("li");
            listItem.className = "listItem"
            listItem.textContent = itemText;
            list.appendChild(listItem);

            if (itemText.startsWith("-São consideradas em linha:")){
                
                items4.forEach((subItemText) => {
                    const subListItem = document.createElement("li");
                    subListItem.textContent = subItemText;
                    subListItem.className = "subListItem"
                    listItem.append(subListItem)
                })
                
                
                
            }
        });
        overlayContent.appendChild(list);
    }

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

function getScorboard() {
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    const scoreBoard = document.createElement("table")
    scoreBoard.className = "scoreBoard"
    scoreBoard.style.border = "solid 1px black"

    for(i = 0; i < 5; i++) {

        const row = document.createElement("tr")
        row.style.height="20%"
        row.style.width="100%"
        row.style.border = "solid 1px black"
    
        scoreBoard.appendChild(row)
    }
    
   

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



window.onload = function() {
    getSize();
}
