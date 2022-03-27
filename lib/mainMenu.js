const inquirer = require('inquirer');

function whichAction(selection) {
    switch (selection) {
        case 'View all departments':
            console.log('view departments');
            break;
        case 'View all roles':
            console.log('view roles');
            break;
        case 'View all employees':
            console.log('view employees');
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