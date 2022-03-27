const fetch = require('node-fetch');

function getRoles() {
    fetch ("http://localhost:3001/api/roles")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
}

module.exports = {
    getRoles
};