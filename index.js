function getSize() {
    boardSize = document.getElementById("bSize").value;
    console.log(boardSize)
}



function handleClick() {
    const boardElement = document.querySelector(".board");

    for (let i = 0; i < 6; i++) {
        const newDiv = document.createElement("div");

        if(i%2 == 0) {
            newDiv.style.width = "50px";
            newDiv.style.height = "50px";
            newDiv.style.backgroundColor = "black";
        }
        else{
            newDiv.style.width = "50px";
            newDiv.style.height = "50px";
            newDiv.style.backgroundColor = "white";
        }
        boardElement.appendChild(newDiv);
    }
   


}
