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
                'Update Role',
                "Update an employee's role",
                'Delete department',
                'EXIT'
            ],
        })
        .then((answer) => {
            switch (answer.action) {
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
                case 'Update Role':
                    updateRole();
                    break;
                case "Update an employee's role":
                    updateEmployeeRole();
                    break;
                case 'Delete department' :
                    deleteDepartment();
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
        'SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, employee.manager_id AS manager ';
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

// Add employee's
const addEmployee = () => {
    inquirer
        .prompt([{
            name: 'firstname',
            type: 'input',
            message: "What is the employee's first name?",
        },
            {
                name: 'lastname',
                type: 'input',
                message: "What is the employee's last name?",
            },
            {
                name: 'role',
                type: 'input',
                message: "What is the employee's role id?",
            },
            {
                name: 'manager',
                type: 'input',
                message: "What is the employee's manager id?",
            }])
        .then((answer) => {
            connection.query('INSERT INTO employee SET ?', {
                first_name: answer.firstname,
                last_name: answer.lastname,
                role_id: answer.role,
                manager_id: answer.manager
            }, (err, res) => {
    if (err) throw err;
    console.log('Success!');
    startTracking();
})
})
}

// Add department's
const addDepartment = () => {
    inquirer
        .prompt({
            name: 'name',
            type: 'input',
            message: 'What is the name of the department you would like to add?'
        })
        .then((answer) => {
            connection.query('INSERT INTO department SET ?', {
                name: answer.name,
            }, (err, res) => {
    if (err) throw err;
    console.log('Success!');
    startTracking();
})
})
}


// Add role
const addRole = () => {
    inquirer
        .prompt([{
            name: 'title',
            type: 'input',
            message: 'What is the title of the new role?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the yearly salary for the new role?'
            },
            {
                name: 'department_id',
                type: 'input',
                message: 'What is the departments id number?',
            },])
        .then((answer) => {
            connection.query('INSERT INTO role SET ?', {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.department_id
            }, (err, res) => {
    if (err) throw err;
    console.log('Success!');
    startTracking();
})
})
}



const updateRole = () => {
    inquirer
    .prompt([{
        name: 'title',
        type: 'input',
        message: 'What role would you like to update?',
        },
        {
        name: 'salary',
        type: 'input',
        message: 'What would you like the new salary to be?',
        },
        ])
        .then((answer) => {
    const query = connection.query(
        'UPDATE role SET ? WHERE ?',
            [{
                title: answer.title,
            },
            {
                salary: answer.salary,
            },],
            (err, res) => {
                if(err) throw err;
                console.log('Role Updated!');
                startTracking();
            })
    })
}

const updateEmployeeRole = () => {
    inquirer
    .prompt([{
        name: 'id',
        type: 'input',
        message: 'What is the id of the employee you would like to update?',
    },
    {
        name: 'role_id',
        type: 'input',
        message: 'What is the id of the role you would like to assign them?'
    },
    ])
    .then((answer) => {
        const query = connection.query(
            'UPDATE employee SET ? WHERE ?',
            [{
                id: answer.id,
            },
            {
                role_id: answer.role_id,
            },],
            (err, res) => {
                if(err) throw err;
                console.log('Role Updated!');
                startTracking();
            }
        )
    })
}

const deleteDepartment = () => {
    inquirer
    .prompt([{
        name: 'id',
        type: 'input',
        message: 'What is the id of the department you would like to delete?',
    },])
    .then((answer) => {
        connection.query('DELETE FROM department WHERE ?', {
            id: answer.id,
        }, (err, res) => {
            if (err) throw err;
            console.log('Department deleted!');
            startTracking();
        })
    })
}

