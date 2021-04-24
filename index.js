const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employeeDB',
});

connection.connect((err) => {
    if (err) throw err;
    startTracking();
});


const startTracking = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Employee by Departments',
                'View All Employee by Roles',
                'Add Employee',
                'Add Department',
                'Add Role',
                'Update Employee Role',
                'EXIT'
            ],
        })
        .then((answer) => {
            switch(answer.action) {
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'View All Employee by Departments':
                    viewEmployeeDepartments();
                    break;
                case 'View All Employee by Roles':
                    viewEmployeeRoles();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Update Employee Role':
                    updateRole();
                    break;
                case 'EXIT':
                    connection.end();
                    console.log("Success!");
            }
        })
};
//View all employees
const viewAllEmployees = () => {
    let query =
    'SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, employee.manager_id ';
        query += 'FROM ((employee ';
        query += 'INNER JOIN role ON employee.role_id = role.id) ';
        query += 'INNER JOIN department ON role.department_id = department.id)';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        startTracking();
    });
};
// View all employees by department
const viewEmployeeDepartments = () => {
        inquirer
            .prompt ({

            })
}