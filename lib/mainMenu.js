const inquirer = require('inquirer');
const fetch = require('node-fetch');
const cTable = require('console.table');

function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View all departments','View all roles','View all employees','Add a department','Add a role','Add an employee','Update an employee role', 'Close application'],
        },
    ])
    .then(answers => {
        whichAction(answers.action);
    });
}

function whichAction(selection) {
    switch (selection) {
        case 'View all departments':
            getDepartments();
            break;
        case 'View all roles':
            getRoles();
            break;
        case 'View all employees':
            getEmployees();
            break;
        case 'Add a department':
            postDepartment();
            break;
        case 'Add a role':
            postRole();
            break;
        case 'Add an employee':
            postEmployee();
            break;
        case 'Update an employee role':
            pushEmployee();
            break;
        case 'Close application':
            console.log('\nBye\n');
            process.exit();
            break;
        default:
            console.log('default');
            break;
    }
    return;
}

function getDepartments() {
    fetch ("http://localhost:3001/api/departments")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.table(data.data);
            mainMenu();
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
                    mainMenu();
                })
        })
}

function getRoles() {
    fetch ("http://localhost:3001/api/roles")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.table(data.data);
            mainMenu();
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
                        mainMenu();
                    })
            })
        })
}

function getEmployees() {
    fetch ("http://localhost:3001/api/employees")
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.table(data.data);
            mainMenu();
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
                const options = {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json',
                    },
                    body : JSON.stringify(answers),
                };
    
                fetch ("http://localhost:3001/api/employees", options)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        mainMenu();
                    })
            })
        })
}

function pushEmployee() {
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
        const employeesArray = values[1].data.map(element => element.id + ': ' + element.first_name + ' ' + element.last_name);
        inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: 'Select which employee to change the role of:',
                choices: employeesArray,
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'Select which role will be assigned to this employee:',
                choices: rolesArray,
            }
        ])
        .then(answers => {
            const options = {
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify(answers),
            };

            fetch ("http://localhost:3001/api/employees", options)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    mainMenu();
                })
        })
    })
}

module.exports = {
    mainMenu
};