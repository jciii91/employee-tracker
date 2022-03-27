const fetch = require('node-fetch');
const cTable = require('console.table');

function getDepartments() {
    fetch ("http://localhost:3001/api/departments")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.table(data.data);
        })
}

module.exports = {
    getDepartments
};