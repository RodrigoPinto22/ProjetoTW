let rows, cols;
let nrows = 6;
let ncols = 5;
let counter = 0;
let currentPlayer = "white";
let opponent = 0; // 0-computador || 1-jogador
let selectedPiece = null;
let whitePieces = []
let blackPieces = []
let emptyCells = []
for (i = 1; i < 31; i++) {
    emptyCells.push(i)
}

function changeSize() {
    const board = document.getElementById("board")
    board.innerHTML = ""
    try{
        const boardSize = document.getElementById("bSize").value;
        console.log(boardSize)
        const dimensions = boardSize.split("x");
        rows = parseInt(dimensions[0], 10);
        cols = parseInt(dimensions[1], 10);
        board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        for (let i = 1; i <= rows * cols; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = i;
            board.appendChild(cell);
        }
    }
    catch(error) {
        board.style.gridTemplateRows = `repeat(6, 1fr)`;
        board.style.gridTemplateColumns = `repeat(5, 1fr)`;
    }   
}

function selectOpponent() {
    const opponent = document.querySelector("input[name='opponent']:checked").value;
    console.log(opponent)
}

function getFirstPlayer() {
    const fPlayer = document.querySelector('input[name="fPlayer"]:checked').value;
    console.log(fPlayer)
}


function addPieces() {
    const p1Cont = document.getElementById("p1Container")
    const p2Cont = document.getElementById("p2Container")
   
    for (i = 0; i<24; i++) {
        const piece = document.createElement("div")
        piece.className = "piece";
        
        if(i%2 == 0) {
            piece.id = `piece${i}`
            piece.setAttribute("value", i)
            piece.style.backgroundColor = "white"
            p1Cont.appendChild(piece);
        } else {
            piece.id = `piece${i}`
            piece.style.backgroundColor = "black"
            piece.setAttribute("value", i)
            p2Cont.appendChild(piece);  
        }  
    } 
}

function startGame() {
    getMessage(1)
    function placePieces(event) {
        const cell = event.target
        if (counter >= 10) {
            getMessage(2);
            board.removeEventListener('click', placePieces);
            captureStage();
            return;
        }
       
        const piece = document.createElement("div")
        piece.className = "piece"
        piece.id = `piece${counter}`
        if(cell.hasChildNodes() || event.target.className == "piece" ){
            getMessage(3);
            return;
        }
        if (checkMove(cell) == 1){
            getMessage(3);
            return;
        };
        emptyCells = emptyCells.filter(id => id !== parseInt(cell.id));

        if (counter % 2 == 0) {
            piece.style.backgroundColor = "white"
            whitePieces.push(parseInt(cell.id))
            let index = emptyCells.indexOf(parseInt(cell.id));
            
            if (index !== -1) {
                emptyCells.splice(index, 1);
            }
        } else {
            piece.style.backgroundColor = "black"
            blackPieces.push(parseInt(cell.id))
            let index = emptyCells.indexOf(parseInt(cell.id));
            if (index !== -1) {
                emptyCells.splice(index, 1);
            }
        }
        
        cell.appendChild(piece)
        counter++;
        if(opponent == 0) {
            placeRandomPiece()
        }
    }
    const board = document.getElementById("board");
    board.addEventListener("click", placePieces)
}

function placeRandomPiece() {
    console.log(emptyCells);
    let randomCell = Math.floor(Math.random() * 31);
    let index = emptyCells.indexOf(randomCell);
    let cell = document.getElementById(randomCell.toString());

    while (cell === null || checkMove(cell) === 1) {
        randomCell = Math.floor(Math.random() * 31);
        index = emptyCells.indexOf(randomCell);
        cell = document.getElementById(randomCell.toString());
    }
    if (index !== -1) {
        const piece = document.createElement("div")
        piece.className = "piece"
        piece.id = `piece${counter}`
        emptyCells.splice(index, 1);
        if (counter % 2 == 0) {
            piece.style.backgroundColor = "white"
            whitePieces.push(parseInt(cell.id))
            let index = emptyCells.indexOf(parseInt(cell.id));
            if (index !== -1) {
                emptyCells.splice(index, 1);
            }
        } else {
            piece.style.backgroundColor = "black"
            blackPieces.push(parseInt(cell.id))
            let index = emptyCells.indexOf(parseInt(cell.id));
            if (index !== -1) {
                emptyCells.splice(index, 1);
            }
        }
        cell.appendChild(piece)
        counter++;
    }       
}


function captureStage() {
    const board = document.getElementById("board");
    
    board.addEventListener('click', function(event) {
        const clickedCell = event.target;
        const isCellEmpty = !clickedCell.hasChildNodes()
        console.log("white: " + whitePieces)
        console.log("black: " + blackPieces)
        console.log(`counter = ${counter}`)
        if (selectedPiece && isCellEmpty && event.target.className != "piece") {
            console.log(selectedPiece.style.backgroundColor);
            if (checkMove(clickedCell) == 1) {
                getMessage(3)
                return;
            } else {
                if (counter % 2 == 0) {
                    whitePieces = whitePieces.filter(item => item != selectedPiece.parentNode.id);
                    whitePieces.push(clickedCell.id)
                } else {
                    blackPieces =  blackPieces.filter(item => item != selectedPiece.parentNode.id);
                    blackPieces.push(clickedCell.id)
                }
                clickedCell.appendChild(selectedPiece);
                selectedPiece = null;
                counter++;
            }  
        } else if (!selectedPiece && clickedCell.classList.contains("piece")) {
            selectedPiece = clickedCell;
        } else if (event.target.className == "piece") {
            getMessage(3);
            return;
        }  
    });
}

function checkMove(currentCell) {
    const currentRow =  Math.floor((currentCell.getAttribute("id") - 1) / 5) + 1;
    const currentCol = (currentCell.getAttribute("id") - 1) % 5 + 1;
    const cellId = parseInt( currentCell.getAttribute("id"), 10);
    
    if (currentCol > 3) {
        if (counter % 2 === 0 && [cellId - 1, cellId - 2, cellId - 3].every(id => whitePieces.includes(id))) {
            return 1;
        }
        else if (counter % 2 === 1 && [cellId - 1, cellId - 2, cellId - 3].every(id => blackPieces.includes(id))) {
            return 1;
        }
    }
    //mesma linha direita
    if (currentCol < ncols - 2) {
        if (counter % 2 === 0 && [cellId + 1, cellId + 2, cellId + 3].every(id => whitePieces.includes(id))) {
            return 1;
        }
        else if (counter % 2 === 1 && [cellId + 1, cellId + 2, cellId + 3].every(id => blackPieces.includes(id))) {
            return 1;
        }
    }
    //mesma coluna cima
    if (currentRow > 3) {
        if (counter % 2 === 0 && [cellId - ncols, cellId - 2 * ncols, cellId - 3 * ncols].every(id => whitePieces.includes(id))) {
            return 1;
        }
        else if (counter % 2 === 1 && [cellId - ncols, cellId - 2 * ncols, cellId - 3 * ncols].every(id => blackPieces.includes(id))) {
            return 1;
        }
    }
    //mesma coluna baixo
    if (currentRow < nrows - 2) {
        if (counter % 2 === 0 && [cellId + ncols, cellId + 2 * ncols, cellId + 3 * ncols].every(id => whitePieces.includes(id))) {
            return 1;
        }
        else if (counter % 2 === 1 && [cellId + ncols, cellId + 2 * ncols, cellId + 3 * ncols].every(id => blackPieces.includes(id))) {
            return 1;
        }
    }           
}

function getMessage(n) {
    
    if(n == 1) {
        document.getElementById("messages").innerHTML = "Coloca as peças"
    }

    if(n == 2) {
        document.getElementById("messages").innerHTML = "Todas as peças foram colocadas, captura as peças do teu adversário"
    }

    if(n == 3) {
        document.getElementById("messages").innerHTML = "Não podes colocar uma peça nessa posição"
        setTimeout(function() { getMessage(1); }, 1000);
    } 

    if(n == 4) {
        document.getElementById("messages").innerHTML = "Todas as peças foram colocadas, captura as peças do teu adversário"
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

function showOptions() {
    const overlay = document.createElement("div");
    overlay.className = "overlay";

    const overlayContent = document.createElement("div");
    overlayContent.className = "overlayContent";

    const optionsContainer = document.createElement("div");
    optionsContainer.className = "optionsContainer";

    const forms = [
        `<form class="bSize">
            <label for="bSize">Escolher tamanho do tabuleiro:</label> 
            <select name="bSize" id="bSize" onchange="changeSize()">
                <option value="6x5" selected="selected">6x5</option>
                <option value="6x6">6x6</option>
                <option value="7x7">7x7</option> 
            </select>
        </form>`,
        `<form class="bSize">
            <label for="bSize">Escolher tamanho personalizado:</label> 
            <input type="number" id="width" class="custSize">
            <label for="">x</label>
            <input type="number" id="height" class="custSize">
            <button class="custButton" onclick="getCustomSize()">Confirmar</button>
        </form>`,
        `<form action="opponent" id="opponentForm" onchange="selectOpponent()">
            <input type="radio" name="opponent" id="computer" value=0 checked>Computador</br>
            <input type="radio" name="opponent" id="player" value=1>Jogador</br>
            
        </form>`,
        `<form action="fPlayer" id="fPlayerForm" onchange="getFirstPlayer()">
            <label for="fPlayer">Primeiro a jogar</label></br>
            <input type="radio" name="fPlayer" id="white" value="white">Peças brancas</br>
            <input type="radio" name="fPlayer" id="black" value="black">Peças pretas</br>
        </form>`,
        `<form action="AILevel" id="AILevelForm">
            <label for="AILevel">Escolher nível de dificuldade</label></br>
            <input type="radio" name="AILevel" id="easy">Fácil</br>
            <input type="radio" name="AILevel" id="medium">Médio</br>
            <input type="radio" name="AILevel" id="hard"> Difícil</br>
        </form>`
    ];

    forms.forEach(form => {
        const formElement = document.createElement("div");
        formElement.innerHTML = form;
        optionsContainer.appendChild(formElement);
    });

    overlayContent.appendChild(optionsContainer);
    overlay.appendChild(overlayContent);
    overlayContent.style.backgroundImage = "linear-gradient(to bottom, #0cc0df,#ffde59)";

    const closeButton = document.createElement("button");
    closeButton.className = "closeButton";
    closeButton.innerText = "X";
    closeButton.onclick = closeOverlay;
    overlayContent.appendChild(closeButton);

    document.body.appendChild(overlay);

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            overlay.remove();
        }
    });
}

window.onload = function() {
    
    addPieces();
}