let rows, cols;
let currentPlayer = "white";
const whitePieces = []
const blackPieces = []
function getSize() {
    try{
        const boardSize = document.getElementById("bSize").value;
        const dimensions = boardSize.split("x");
        rows = parseInt(dimensions[0], 10);
        cols = parseInt(dimensions[1], 10);
        createBoard(rows, cols);
    }
    catch(error) {
        createBoard(6, 5);
    }   
}

function getCustomSize(){
    event.preventDefault()
    rows = document.getElementById("width").value
    cols = document.getElementById("height").value

    if (rows > 16 || cols > 16) {
        alert("O tamanho escolhido é inválido");
        return;
    }
    createBoard(rows, cols);
}

function createBoard(rows, cols) {

    const board = document.querySelector(".board");
    board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    board.innerHTML = "";
    board.setAttribute("nrows", rows)
    board.setAttribute("ncols", cols)

    var columnVal = 1;
    var rowVal = 1;

    for (let i = 0; i < cols * rows; i++) {
        const cell = document.createElement("div");
        cell.className = "cell"
        cell.style.height = 700/rows
        cell.style.width = 700/cols
        cell.id = i+1;
        cell.setAttribute("rowVal", rowVal)
        cell.setAttribute("columnVal", columnVal)
        board.appendChild(cell);

        if (columnVal < cols) {
            columnVal++;
        } else {
            columnVal = 1;
            rowVal++;
        }

    }
   
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
    let counter = 0;
    const board = document.getElementById("board");
    getMessage(1)
    const nrows = parseInt(board.getAttribute('nrows'));
    const ncols = parseInt(board.getAttribute('ncols'));

    const pieceHeight = 600 / nrows;
    const pieceWidth = 600 / ncols;

    function placePieces(event) {
        const currentCell = event.target;
        checkMove(currentCell)
        if (counter > 23) {
            board.removeEventListener('click', placePieces);
            capturing = true;
            getMessage(2)
            capturingStage()
            return;
        }   
    };

    function checkMove(currentCell) {
       
        const currentRow = currentCell.getAttribute("rowVal")
        const currentCol = currentCell.getAttribute("columnVal")
        const id = currentID = currentCell.getAttribute("id")
        const cellId = parseInt(id);

        //mesma linha (esquerda)
        if (currentCol > 3) {
            const leftCell = document.getElementById(cellId-1);
            const leftCell2 = document.getElementById(cellId-2);
            const leftCell3 = document.getElementById(cellId-3);
            if(counter % 2 == 0 && whitePieces.includes(`${cellId-1}`) && leftCell.getAttribute("rowval") === currentCell.getAttribute("rowval")){
                if(whitePieces.includes(`${cellId-2}`) && leftCell2.getAttribute("rowval") === leftCell.getAttribute("rowval")){
                    if(whitePieces.includes(`${cellId-3}`) && leftCell3.getAttribute("rowval") === leftCell2.getAttribute("rowval")){
                        getMessage(3);
                        return;
                    }
                }
            }
            else if(counter % 2 == 1 && blackPieces.includes(`${cellId-1}`) && leftCell.getAttribute("rowval") === currentCell.getAttribute("rowval")) {
                if(blackPieces.includes(`${cellId-2}`) && leftCell2.getAttribute("rowval") === leftCell.getAttribute("rowval")){
                    if(blackPieces.includes(`${cellId-3}`) && leftCell3.getAttribute("rowval") === leftCell2.getAttribute("rowval")){
                        getMessage(3);
                        return;
                    }
                }
            }
        }
        //mesma linha direita
        if (currentCol <= ncols - 3) {
            const rightCell = document.getElementById(cellId + 1);
            const rightCell2 = document.getElementById(cellId + 2);
            const rightCell3 = document.getElementById(cellId + 3);
            if (counter % 2 == 0 && whitePieces.includes(`${cellId + 1}`) && rightCell.getAttribute("rowval") === currentCell.getAttribute("rowval")) {
                if (whitePieces.includes(`${cellId + 2}`) && rightCell2.getAttribute("rowval") === rightCell.getAttribute("rowval")) {
                    if (whitePieces.includes(`${cellId + 3}`) && rightCell3.getAttribute("rowval") === rightCell2.getAttribute("rowval")) {
                        getMessage(3);
                        return;
                    }
                }
            } else if (counter % 2 == 1 && blackPieces.includes(`${cellId + 1}`) && rightCell.getAttribute("rowval") === currentCell.getAttribute("rowval")) {
                if (blackPieces.includes(`${cellId + 2}`) && rightCell2.getAttribute("rowval") === rightCell.getAttribute("rowval")) {
                    if (blackPieces.includes(`${cellId + 3}`) && rightCell3.getAttribute("rowval") === rightCell2.getAttribute("rowval")) {
                        getMessage(3);
                        return;
                    }
                }
            }
        }
        //mesma coluna cima
        if (currentRow > 3) {
            const upCell = document.getElementById(cellId - ncols);
            const upCell2 = document.getElementById(cellId - 2 * ncols);
            const upCell3 = document.getElementById(cellId - 3 * ncols);
            if (counter % 2 == 0 && whitePieces.includes(`${cellId - ncols}`) && upCell.getAttribute("columnval") === currentCell.getAttribute("columnval")) {
                if (whitePieces.includes(`${cellId - 2 * ncols}`) && upCell2.getAttribute("columnval") === upCell.getAttribute("columnval")) {
                    if (whitePieces.includes(`${cellId - 3 * ncols}`) && upCell3.getAttribute("columnval") === upCell2.getAttribute("columnval")) {
                        getMessage(3);
                        return;
                    }
                }
            } else if (counter % 2 == 1 && blackPieces.includes(`${cellId - ncols}`) && upCell.getAttribute("columnval") === currentCell.getAttribute("columnval")) {
                if (blackPieces.includes(`${cellId - 2 * ncols}`) && upCell2.getAttribute("columnval") === upCell.getAttribute("columnval")) {
                    if (blackPieces.includes(`${cellId - 3 * ncols}`) && upCell3.getAttribute("columnval") === upCell2.getAttribute("columnval")) {
                        getMessage(3);
                        return;
                    }
                }
            }
        }
        //mesma coluna baixo
        if (currentRow <= nrows - 3) {
            const downCell = document.getElementById(cellId + ncols);
            const downCell2 = document.getElementById(cellId + 2 * ncols);
            const downCell3 = document.getElementById(cellId + 3 * ncols);
            if (counter % 2 == 0 && whitePieces.includes(`${cellId + ncols}`) && downCell.getAttribute("columnval") === currentCell.getAttribute("columnval")) {
                if (whitePieces.includes(`${cellId + 2 * ncols}`) && downCell2.getAttribute("columnval") === downCell.getAttribute("columnval")) {
                    if (whitePieces.includes(`${cellId + 3 * ncols}`) && downCell3.getAttribute("columnval") === downCell2.getAttribute("columnval")) {
                        getMessage(3);
                        return;
                    }
                }
            } else if (counter % 2 == 1 && blackPieces.includes(`${cellId + ncols}`) && downCell.getAttribute("columnval") === currentCell.getAttribute("columnval")) {
                if (blackPieces.includes(`${cellId + 2 * ncols}`) && downCell2.getAttribute("columnval") === downCell.getAttribute("columnval")) {
                    if (blackPieces.includes(`${cellId + 3 * ncols}`) && downCell3.getAttribute("columnval") === downCell2.getAttribute("columnval")) {
                        getMessage(3);
                        return;
                    }
                }
            }
        }
        
        
        if (currentCell.classList.contains('cell') && !currentCell.hasChildNodes()) {
            const piece = document.createElement("div");
            const containerPiece = document.createElement("div")
            containerPiece.id = `piece${counter}`
            containerPiece.style.display = "none"
            piece.className = "piece";
            piece.style.height = pieceHeight + "px";
            piece.style.width = pieceWidth + "px";
            piece.style.backgroundColor = (counter % 2 == 0) ? "white" : "black";
            currentCell.appendChild(piece);
            if (counter % 2 == 0){
                whitePieces.push(id)
            } else {
                blackPieces.push(id)
            }
            counter++;
        } else {
            getMessage(3)
        }   
                         
    }
    function capturingStage() {
        let selectedPiece = null;
    
    
        function movePiece(event) {
            const clickedCell = event.target;
            const isCellEmpty = !clickedCell.hasChildNodes();
       
        
            if (selectedPiece && isCellEmpty) {
                clickedCell.appendChild(selectedPiece);
                selectedPiece = null;
            } else if (!selectedPiece && clickedCell.classList.contains("piece")) {
                selectedPiece = clickedCell;
            }
        }
    
        const board = document.querySelector(".board");
        board.addEventListener('click', movePiece);
    }

    board.addEventListener('click', placePieces)
   
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
            <select name="bSize" id="bSize" onchange="getSize()">
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
        `<form action="opponent" id="opponent">
            <label for="opponent">Adversário:</label>
            <br>
            <input type="radio" name="opponent" id="player">
            <label for="player">Jogador</label>
            <br>
            <input type="radio" name="opponent" id="computer">
            <label for="computer">Computador</label>
        </form>`,
        `<form action="fPlayer" id="fPlayer">
            <label for="fPlayer">Primeiro a jogar</label>
            <br>
            <input type="radio" name="fPlayer" id="white">
            <label for="white">Peças brancas</label>
            <br>
            <input type="radio" name="fPlayer" id="black">
            <label for="black">Peças pretas</label>
        </form>`,
        `<form action="AILevel" id="AILevel">
            <label for="AILevel">Escolher nível de dificuldade</label>
            <br>
            <input type="radio" name="AILevel" id="easy">
            <label for="easy">Fácil</label>
            <br>
            <input type="radio" name="AILevel" id="medium">
            <label for="medium">Médio</label>
            <br>
            <input type="radio" name="AILevel" id="hard">
            <label for="hard">Difícil</label>
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
    getSize();
    addPieces();

}
