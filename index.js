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
                'View All Departments',
                'View All Roles',
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
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'View All Roles':
                    viewRoles();
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
// View all employees
const viewAllEmployees = () => {
    let query =
    'SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, employee.manager_id AS manager ';
        query += 'FROM ((employee ';
        query += 'INNER JOIN role ON employee.role_id = role.id) ';
        query += 'INNER JOIN department ON role.department_id = department.id)';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        startTracking();
    });
};

// View all departments
const viewDepartments = () => {
    let query = 
    'SELECT * FROM department';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        startTracking();
    });
}

// View all roles
const viewRoles = () => {
    let query = 
    'SELECT * FROM role';
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        startTracking();
    });
}


// const addEmployee = () => {
//     inquirer
//         .prompt ({
//             name: 'firstname',
//             type: 'input',
//             message: "What is the employee's first name?",
//         },
//         {
//             name: 'lastname',
//             type: 'input',
//             message: "What is the employee's last name?",
//         },
//         {
//             name: 'role',
//             type: 'list',
//             message: "What is the employee's role?",
//             choices: [
//                 'Front-End Developer',
//                 'Salesperson'
//             ],
//         },
//         {
//             name: 'manager',
//             type: 'list',
//             message: "Who is the employee's manager?",
//             choices: [
//                 'John Doe',
//                 'Jane Doe'
//             ],
//         },)
//         .then (function ())
// }


