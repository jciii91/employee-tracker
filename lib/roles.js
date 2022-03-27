const fetch = require('node-fetch');
const cTable = require('console.table');

function getRoles() {
    fetch ("http://localhost:3001/api/roles")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.table(data.data);
        })
}

module.exports = {
    getRoles
};