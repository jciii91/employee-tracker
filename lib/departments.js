const fetch = require('node-fetch');
const cTable = require('console.table');
const inquirer = require('inquirer');

function getDepartments() {
    fetch ("http://localhost:3001/api/departments")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.table(data.data);
        })
}

function postDepartment() {
    inquirer.prompt([
        {
            type : 'input',
            name : 'name',
            message: 'Please enter a name for the new department: ',
            validate: name => {
                if (name == '') {
                    return 'Department name cannot be blank.';
                } else {
                    return true;
                }
            }
        }
    ])
        .then(answers => {
            const options = {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(answers),
            };

            fetch ("http://localhost:3001/api/departments", options)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })
        })
}

module.exports = {
    getDepartments,
    postDepartment
};