const fetch = require('node-fetch');
const cTable = require('console.table');
const inquirer = require('inquirer');

function getRoles() {
    fetch ("http://localhost:3001/api/roles")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.table(data.data);
        })
}

function postRole() {
    fetch ("http://localhost:3001/api/departments")
        .then(response => {
            return response.json();
        })
        .then(data => {
            const rolesArray = data.data.map(element => element.id + ': ' + element.name);
            inquirer.prompt([
                {
                    type : 'input',
                    name : 'name',
                    message: 'Please enter a name for the new role: ',
                    validate: name => {
                        if (name == '') {
                            return 'Role name cannot be blank.';
                        } else {
                            return true;
                        }
                    }
                },
                {
                    type : 'input',
                    name : 'salary',
                    message: 'Please enter a salary for the new role: ',
                    validate: salary => {
                        if (salary == '') {
                            return 'Salary cannot be blank.';
                        } else if (!parseFloat(salary)) {
                            return 'Value entered was not a number.';
                        } else {
                            return true;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'department',
                    message: 'Select which department this role belongs to:',
                    choices: rolesArray,
                }
            ])
                .then(answers => {
                    console.log(answers);
                })
        })
}

module.exports = {
    getRoles,
    postRole
};