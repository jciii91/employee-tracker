const inquirer = require('inquirer');
const { getDepartments, postDepartment } = require('./departments');
const { getRoles, postRole } = require('./roles');
const { getEmployees, postEmployee } = require('./employees');

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
            console.log('update role');
            break;
        default:
            console.log('default');
            break;
    }
    return;
}

function mainMenu() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View all departments','View all roles','View all employees','Add a department','Add a role','Add an employee','Update an employee role'],
        },
    ])
    .then(answers => {
        whichAction(answers.action);
    });
}

module.exports = {
    mainMenu
};