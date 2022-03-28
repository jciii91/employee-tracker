const { getDepartments, postDepartment } = require('./departments');
const { getRoles, postRole } = require('./roles');
const { getEmployees, postEmployee, pushEmployee } = require('./employees');

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
        default:
            console.log('default');
            break;
    }
    return;
}

module.exports = {
    whichAction
};