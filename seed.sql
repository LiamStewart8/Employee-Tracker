DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id)
);


INSERT INTO department (name)
Values ("Engineering");

INSERT INTO department (name)
Values ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Front-End Developer", 80000.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Front-End Manager", 100000.00, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales-Manager", 90000.00, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 70000.00, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Liam", "Stewart", 1, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 2, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jane", "Doe", 3, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kevin", "Johnson", 4, 3);

