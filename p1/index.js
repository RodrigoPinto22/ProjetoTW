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

function alerts() {
    const options = document.querySelector(".options");
    board.innerHTML = "";
    const about = document.createElement("div")
    about.style.height = "50px";
    about.style.width = "50px";

    options.append(about)
}

function startGame() {
    alert("teste")
}

const mostrarPainelBtn = document.getElementById('mostrarPainel');
const painel = document.getElementById('painel');
const fecharPainelBtn = document.getElementById('fecharPainel');

// Função para mostrar o painel
mostrarPainelBtn.addEventListener('click', function () {
    painel.style.display = 'block';
});

// Função para fechar o painel
fecharPainelBtn.addEventListener('click', function () {
    painel.style.display = 'none';
});
