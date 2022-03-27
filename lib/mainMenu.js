const inquirer = require('inquirer');
const { getDepartments } = require('./departments');
const { getRoles } = require('./roles');
const { getEmployees } = require('./employees');

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
            console.log('add departments');
            break;
        case 'Add a role':
            console.log('add role');
            break;
        case 'Add an employee':
            console.log('add employee');
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