const fetch = require('node-fetch');
const cTable = require('console.table');

function getEmployees() {
    fetch ("http://localhost:3001/api/employees")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.table(data.data);
        })
}

module.exports = {
    getEmployees
};