const inquirer = require('inquirer');

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
        console.log('Action: ' + answers.action);
    });
}

module.exports = {
    mainMenu
};