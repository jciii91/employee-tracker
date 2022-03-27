const fetch = require('node-fetch');
const cTable = require('console.table');
const inquirer = require('inquirer');

function getEmployees() {
    fetch ("http://localhost:3001/api/employees")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.table(data.data);
        })
}

function postEmployee() {
    const roles = fetch ("http://localhost:3001/api/roles")
                    .then(response => {
                        return response.json();
                    });
    const employees = fetch ("http://localhost:3001/api/employees")
                    .then(response => {
                        return response.json();
                    });
    Promise.all([roles,employees])
        .then(values => {
            const rolesArray = values[0].data.map(element => element.id + ': ' + element.title);
            let employeesArray = values[1].data.map(element => element.id + ': ' + element.first_name + ' ' + element.last_name);
            employeesArray.push("0: This employee has no manager");
            inquirer.prompt([
                {
                    type : 'input',
                    name : 'first_name',
                    message: 'Please enter the employee\'s first name: ',
                    validate: first_name => {
                        if (first_name == '') {
                            return 'First name cannot be blank.';
                        } else {
                            return true;
                        }
                    }
                },
                {
                    type : 'input',
                    name : 'last_name',
                    message: 'Please enter the employee\'s last name: ',
                    validate: last_name => {
                        if (last_name == '') {
                            return 'Last name cannot be blank.';
                        } else {
                            return true;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'role_id',
                    message: 'Select which role will be assigned to this employee:',
                    choices: rolesArray,
                },
                {
                    type: 'list',
                    name: 'manager_id',
                    message: 'Select which employee manages this employee:',
                    choices: employeesArray,
                }
            ])
                .then(answers => {
                    console.log(answers);
                })
        })
}

module.exports = {
    getEmployees,
    postEmployee
};