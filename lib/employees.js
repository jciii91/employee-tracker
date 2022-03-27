const fetch = require('node-fetch');

function getEmployees() {
    fetch ("http://localhost:3001/api/employees")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
}

module.exports = {
    getEmployees
};