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
                    name : 'title',
                    message: 'Please enter a title for the new role: ',
                    validate: title => {
                        if (title == '') {
                            return 'Role title cannot be blank.';
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
                    name: 'department_id',
                    message: 'Select which department this role belongs to:',
                    choices: rolesArray,
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
    
                fetch ("http://localhost:3001/api/roles", options)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                    })
            })
        })
}

module.exports = {
    getRoles,
    postRole
};