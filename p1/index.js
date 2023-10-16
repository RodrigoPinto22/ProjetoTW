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
            cell.style.backgroundColor = (j + i) % 2 === 0 ? "white" : "black";
            row.appendChild(cell);
        }
    }
}



function startGame() {
    alert("teste")
}
