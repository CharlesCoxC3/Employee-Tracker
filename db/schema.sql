DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;


CREATE TABLE departments (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(50),
  PRIMARY KEY (id)
);


CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(50),
  salary DECIMAL(10,2),
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id)
);


CREATE TABLE employees (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employees(id)
);

INSERT INTO departments (name) VALUES 
('Engineer'),
('Sales'),
('HR'),
('Legal');


INSERT INTO role (title, salary, department_id) VALUES 
('Lead Engineer', 160000, 1),
('Engineer', 100000, 1),
('Sales Lead', 85000, 2),
('Sales Person', 60000, 2),
('HR', 95000, 3),
('Lawyer', 180000, 4);



INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES 
('John', 'Doe', 1, null),
('Carl', 'Hopper', 2, 1),
('David', 'Forester', 2, 1),
('Chuck', 'Checkers', 1, null),
('Dave', 'Silverman', 2, 4),
('Jerry', 'Wave', 3, null),
('Jon', 'Snow', 4, 6),
('Larry', 'Fisherman', 4, 6),
('Jessica', 'Smith', 5, null),
('Brandon', 'Munoz', 6, null);