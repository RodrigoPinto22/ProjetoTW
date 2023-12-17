let nrows = 6;
let ncols = 5;
let counter = 0;
let currentPlayer = "white";
let opponent = true;
let selectedPiece = null;
let whitePieces = [];
let blackPieces = [];
let emptyCells = [];
let game = 0;
let loggedIn = false;
let isJoined = false;
const LINK = "http://twserver.alunos.dcc.fc.up.pt:8008/"


async function getBoard(){
    const nick = document.getElementById("username").value;
    if(isJoined){
    const data =  await fetch(LINK + `update?nick=${nick}&game=${game}`)
        console.log(data)
    return data
    }
    return null
}

function update() {
    const nick = document.getElementById("username").value;
    fetch(LINK + "update" + `?nick=${nick}&game=${game}`)
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((error) => console.error('Error during fetch:', error));
}
function register(event) {

    event.preventDefault();
    const nick = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    fetch(LINK + "register",{
        method: 'POST',
        body: JSON.stringify( { nick, password } )
      })
        .then((response) => {
            if(response.status === 200){
                loggedIn = true
            }
          return response.json()
        })
        .then((json) => console.log(json))
        .catch((error) => console.error('Error during fetch:', error));

}

function join() {
    const group = 11;
    const nick = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    let size = {
        "rows": nrows,
        "columns": ncols
    };

    fetch(LINK + "join",{
        method: 'POST',
        body: JSON.stringify( { group, nick, password, size } )
      })
        .then((response) =>{
            if(response.status === 200){
                isJoined = true
            }
            return response.json()})
        .then((json) => {
            game= json["game"]})
        .catch((error) => console.error('Error during fetch:', error));
}

function leave() {
    const nick = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    fetch(LINK + "leave",{
        method: 'POST',
        body: JSON.stringify( { nick, password, game } )
    })
        .then((response) => {
            if(response.status === 200){
                isJoined = false
            }
            response.json()
        })
        .then((json) => console.log(json))
        .catch((error) => console.error('Error during fetch:', error));

    for (let i = 0; i < 30; i++) {
        let targetCell = document.getElementById(i);
        if (targetCell && targetCell.hasChildNodes()) {
            targetCell.removeChild(targetCell.firstChild)
        }
    }
}

function notify(event) {
    const nick = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    game = game;
    let move = {
        "row": parseInt(event.target.getAttribute("row")),
        "column": parseInt(event.target.getAttribute("column"))
    }
    fetch(LINK + "notify",{
        method: 'POST',
        body: JSON.stringify( { nick, password, game, move } )
      })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((error) => console.error('Error during fetch:', error));
}

function getRanking(group, size) {
    fetch(LINK + "ranking", {
        method: 'POST',
        body: JSON.stringify({ group, size })
    })
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.error('Error fetching ranking:', error));
}



function initialUpdate() {
    let rowCoord = 0;
    let colCoord = 0;
    for (let i = 1; i <= nrows * ncols; i++) {
        const cell = document.getElementById(i)
        cell.setAttribute("row", rowCoord)
        cell.setAttribute("column", colCoord)
        colCoord++;
        if(i % ncols === 0) {
            rowCoord++;
            colCoord=0;
        }
        emptyCells.push(i);
    }
}


function changeSize() {
    const board = document.getElementById("board");
    board.innerHTML = "";
    try {
        const boardSize = document.getElementById("bSize").value;
        const dimensions = boardSize.split("x");
        nrows = parseInt(dimensions[0], 10);
        ncols = parseInt(dimensions[1], 10);
        board.style.gridTemplateRows = `repeat(${nrows}, 1fr)`;
        board.style.gridTemplateColumns = `repeat(${ncols}, 1fr)`;
        for (let i = 1; i <= nrows * ncols; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = i;
            board.appendChild(cell);
        }
    } catch (error) {
        console.error("Error changing board size: ", error);
    }
}

function selectOpponent() {
    opponent = document.querySelector("input[name='opponent']:checked").value;
    console.log(opponent)
}

function getFirstPlayer() {
    currentPlayer = document.querySelector('input[name="fPlayer"]:checked').value;
}

function addPieces() {
    const p1Cont = document.getElementById("p1Container")
    const p2Cont = document.getElementById("p2Container")

    for (i = 0; i<24; i++) {
        const piece = document.createElement("div")
        piece.className = "piece";
        piece.id = `rem${i}`

        if(i%2 === 0) {

            piece.setAttribute("value", i)
            piece.style.backgroundColor = "white"
            p1Cont.appendChild(piece);
        } else {

            piece.style.backgroundColor = "black"
            piece.setAttribute("value", i)
            p2Cont.appendChild(piece);
        }
    }
}

function checkThree(arr) {
    for(let i = 0; i <= arr.length; i++) {
        if (arr.includes(arr[i] + 1) && arr.includes(arr[i] + 2) || arr.includes(arr[i] + ncols) && arr.includes(arr[i] + 2*ncols)) {
            return true;
        }
    }
    return false
}
function startGame() {
    getMessage(1)
    join()
    function placePieces(event) {

        const cell = event.target
        if (counter >= 24) {
            getMessage(2);
            board.removeEventListener('click', placePieces);
            captureStage();
            return;
        }

        const piece = document.createElement("div")
        piece.className = "piece"
        piece.id = `piece${counter}`
        if(cell.hasChildNodes() || event.target.className === "piece" ){
            getMessage(3);
            return;
        }
        if (checkMove(cell) === 1){
            getMessage(3);
            return;
        }
        emptyCells = emptyCells.filter(id => id !== parseInt(cell.id));

        if (counter % 2 === 0) {
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
        let remPiece = document.getElementById(`rem${counter}`)
        remPiece.remove()
        cell.appendChild(piece)
        notify(event)
        counter++;

        if(!opponent) {
            remPiece = document.getElementById(`rem${counter}`)
            remPiece.remove()
            placeRandomPiece()

        }
    }
    const board = document.getElementById("board");
    board.addEventListener("click", placePieces)
}

function placeRandomPiece() {
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let randomCellId = emptyCells[randomIndex];
    let cell = document.getElementById(randomCellId.toString());

    while (cell === null || checkMove(cell) === 1) {
        randomIndex = Math.floor(Math.random() * emptyCells.length);
        randomCellId = emptyCells[randomIndex];
        cell = document.getElementById(randomCellId.toString());
    }

    const piece = document.createElement("div");
    piece.className = "piece";
    piece.id = `piece${counter}`;
    emptyCells.splice(randomIndex, 1);
    piece.style.backgroundColor = counter % 2 === 0 ? "white" : "black";
    if (counter % 2 === 0) {
        whitePieces.push(randomCellId);
    } else {
        blackPieces.push(randomCellId);
    }
    cell.appendChild(piece);
    counter++;
}

function captureStage() {
    const board = document.getElementById("board");

    board.addEventListener('click', function capture(event) {
        let clickedCell = event.target;
        let isCellEmpty = !clickedCell.hasChildNodes()

        if(whitePieces.length <=2) {
            getMessage(5)
            return
        } else if (blackPieces.length <=2) {
            getMessage(6)
            return
        }

        if(event.target.className === "piece" && counter % 2 === 0 && clickedCell.style.backgroundColor === "black") {
            if(checkThree(whitePieces)) {
                let remID = parseInt(clickedCell.parentNode.id)
                let idx = blackPieces.indexOf(remID)
                blackPieces.splice(idx, 1)
                clickedCell.remove()
                counter++;
                return;
            }
            else {
                getMessage(4)
                return;
            }
        }
        else if (event.target.className === "piece" && counter % 2 !== 0 && clickedCell.style.backgroundColor === "white") {
            if(checkThree(blackPieces)) {
                let remID = parseInt(clickedCell.parentNode.id)
                let idx = whitePieces.indexOf(remID)
                whitePieces.splice(idx, 1)
                clickedCell.remove()
                counter++;
                return;
            }
            else {
                getMessage(4)
                return;
            }
        }
        else if (!selectedPiece && clickedCell.classList.contains("piece")) {
            selectedPiece = clickedCell;
            return;
        }
        else if (selectedPiece && isCellEmpty && clickedCell.className !== "piece") {
            if(checkMove(clickedCell) === 1) {
                getMessage(3);
                return;
            }
            let remID = parseInt(selectedPiece.parentNode.id)
            if(selectedPiece.style.backgroundColor === "white") {
                let idx = whitePieces.indexOf(remID)
                whitePieces.splice(idx, 1)
                whitePieces.push(parseInt(clickedCell.id))
                let emptyIDX = emptyCells.indexOf(parseInt(clickedCell.id));
                emptyCells.splice(emptyIDX, 1);

            } else if (selectedPiece.style.backgroundColor === "black") {
                let idx = blackPieces.indexOf(remID)
                blackPieces.splice(idx, 1)
                blackPieces.push(parseInt(clickedCell.id))
            }
           notify(event)
            clickedCell.appendChild(selectedPiece)
            selectedPiece = null;
            counter++;
        }

        if(opponent === false && counter % 2 !== 0) {
            moveRandomPiece();
        }



    });
}

function moveRandomPiece() {

    const randIndex = Math.floor(Math.random() * blackPieces.length);
    const randID = blackPieces[randIndex];
    const remCell = document.getElementById(randID);

    remCell.removeChild(remCell.firstChild);
    blackPieces.splice(randIndex, 1);

    const emptyIndex = Math.floor(Math.random() * emptyCells.length);
    const addID = emptyCells[emptyIndex];
    const addCell = document.getElementById(addID);

    const randPiece = document.createElement("div");
    randPiece.className = "piece";
    randPiece.style.backgroundColor = "black";
    addCell.appendChild(randPiece);

    blackPieces.push(addID);
    emptyCells.splice(emptyIndex, 1);

    counter++;
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

    if(n === 1) {
        document.getElementById("messages").innerHTML = "Coloca as peças"
    }

    if(n === 2) {
        document.getElementById("messages").innerHTML = "Todas as peças foram colocadas, captura as peças do teu adversário"
    }

    if(n === 3) {
        document.getElementById("messages").innerHTML = "Não podes colocar uma peça nessa posição"
        setTimeout(function() { getMessage(1); }, 1000);
    }

    if(n === 4) {
        document.getElementById("messages").innerHTML = "Não podes capturar uma peça"
    }

    if(n === 5) {
        document.getElementById("messages").innerHTML = "As peças pretas ganharam!"
    }

    if(n === 6) {
        document.getElementById("messages").innerHTML = "As peças brancas ganharam!"
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
        `<form action="opponent" id="opponentForm"">
            <input type="radio" name="opponent" id="player" value=true checked>Jogador</br>
            <input type="radio" name="opponent" id="computer" value=false onchange="changeOpponent()">Computador</br>
            
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

function changeOpponent() {
    opponent = !opponent;
}

window.onload = function() {
    initialUpdate();
    addPieces();
}