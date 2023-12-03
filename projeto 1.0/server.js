function registerPlayer(username, password) {
    // Server endpoint for registration
    const endpoint = 'http://twserver.alunos.dcc.fc.up.pt:8008/register';

    // Data to be sent in the request body
    const data = {
        username: username,
        password: password
    };

    // Fetch options for the POST request
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    // Make the fetch request
    fetch(endpoint, options)
        .then(response => {
            // Check if the response status is OK (200-299)
            if (!response.ok) {
                throw new Error(`Registration failed with status: ${response.status}`);
            }
            // Registration successful
            console.log('Player registered successfully!');
            return response.json(); // If the server sends JSON in the response, otherwise, you can use response.text()
        })
        .then(data => {
            // Process the data if needed
            console.log('Server response:', data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error during registration:', error.message);
        });
}