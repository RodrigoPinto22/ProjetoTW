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
    console.log()
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    
    const overlaycontent = document.createElement("div");
    overlaycontent.className = "overlayContent"
    overlaycontent.style.backgroundImage = "url(" + `${btnValue}`+ ".png)";
    overlay.appendChild(overlaycontent)

    const closeButton = document.createElement("button")
    closeButton.className = "closeButton"
    closeButton.innerText = "X";
    closeButton.onclick = closeOverlay;
    overlaycontent.appendChild(closeButton)


    document.body.appendChild(overlay);
}

function closeOverlay(){
    const overlay = document.querySelector(".overlay");
    overlay.remove();
}




function startGame() {
    alert("teste")
}

