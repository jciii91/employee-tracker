const fetch = require('node-fetch');

function getDepartments() {
    fetch ("http://localhost:3001/api/departments")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
}

module.exports = {
    getDepartments
};