const LINK = "http://twserver.alunos.dcc.fc.up.pt:8008"

function login() {
    const nick = document.getElementById("username");
    const password = document.getElementById("password");

    fetch(LINK + "/register",{
        method: 'POST',
        body: JSON.stringify( { nick, password } )  
      })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((error) => console.error('Error during fetch:', error));
}

function join() {
    const group = 
    const nick = document.getElementById("username");
    const password = document.getElementById("password");

    fetch(LINK + "/register",{
        method: 'POST',
        body: JSON.stringify( { nick, password } )  
      })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((error) => console.error('Error during fetch:', error));
}
{"group": 99, "nick": "zp", "password": "secret", "size": { "rows": 6, "columns": 5 } }
