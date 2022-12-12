const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');



const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'Stacks',
    database: 'employee_db',
  });
  
  connection.connect(async (err) => {
    if (err) throw err;
    console.log(`Employee Tracker connection id ${connection.threadId}\n`);
    initTracker();
  });

  const initTracker = async () => {
    try {
      const mainQuestions = await inquirer.prompt([
        {
          name: 'userChoice',
          type: 'list',
          message: 'What would you like to do?',
          choices: [
            'View all employees?',
            'View all employee roles?',
            'View all departments?',
            'Add employee?',
            'Add role?',
            'Add department?',
            'Update employee role?',
            'Exit?'
          ],
        }
      ]);
      selections(mainQuestions.userChoice);
    } catch (e) {
      console.log(e);
    }
  };

  const selections = async (userChoice) => {
   const choice = userChoice === 'View all employees?' ? viewEmployee()
    : userChoice === 'View all employee roles?' ? viewRole()
    : userChoice === 'View all departments?' ? viewDepartment()
    : userChoice === 'Add employee?' ? addEmployee()
    : userChoice === 'Add role?' ? addRole()
    : userChoice === 'Add department?' ? addDepartment()
    : userChoice === 'Update employee role?' ? updateEmployeeRole()
    : connection.end(console.log('Exiting application')) 
  };

  const viewEmployee = () => {
    const query = `SELECT employees.id, employees.first_name, employees.last_name, employees.manager_id, role.salary, role.title FROM employees JOIN role ON employees.role_id = role.id`;
    connection.query(query, (err, employees) => {
      if (err) throw err;
      console.table(employees);
      initTracker();
  
    });
  };

  const viewRole = () => {
    const query = `SELECT * FROM role JOIN departments ON role.department_id = departments.id`;
    connection.query(query, (err, role) => {
      if (err) throw err;
      console.table(role);
      initTracker();
  
    });
  };

  const viewDepartment = () => {
    const query = `SELECT * FROM departments`;
    connection.query(query, (err, departments) => {
      if (err) throw err;
      console.table(departments);
      initTracker();
  
    });
  };

  const addEmployee = async () => {
    try {
      const { first, last, role, manager } = await inquirer.prompt([
        {
          name: 'first',
          type: 'input',
          message: 'What is the employees first name?',
        },
        {
          name: 'last',
          type: 'input',
          message: 'What is the employees last name?',
        },

        {
          name: 'role',
          type: 'list',
          message: 'What is the employees role?',
          choices: [
  
            { name: 'Lead Engineer', value: 1 },
            { name: 'Engineer', value: 2 },
            { name: 'Sales Lead', value: 3 },
            { name: 'Sales Person', value: 4 },
            { name: 'HR', value: 5 },
            { name: 'Lawyer', value: 6 },
  
          ]
        },

        {
          name: 'manager',
          type: 'list',
          message: 'Who is the employees manager?',
          choices: [
  
            { name: 'John Doe', value: 1 },
            { name: 'Chuck Checkers', value: 4 },
            { name: 'Jerry Wave', value: 6 },
            { name: 'Jessica Smith', value: 9 },
            { name: 'Brandon Munoz', value: 10 },
            { name: 'None', value: null }
  
          ]
        }
      ]);
      const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)';
      connection.query(query, [first, last, role, manager], (err, result) => {
        if (err) throw err;
        console.log(`NEW EMPLOYEE ADDED:${first} ${last} `);
        initTracker();
  
      });
    } catch (err) {
      console.log(err);
      connection.end();
    }
  };

  const addRole = async () => {
    try {
      const { title, salary, department } = await inquirer.prompt([
        {
          name: 'title',
          type: 'input',
          message: 'What is the title of the new role?',
        },
        {
          name: 'salary',
          type: 'number',
          message: 'What is the salary for the new role?',
        },

        {
          name: 'department',
          type: 'list',
          message: 'What department is the new role for?',
          choices: [
  
            { name: 'Engineer', value: 1 },
            { name: 'Sales', value: 2 },
            { name: 'HR', value: 3 },
            { name: 'Legal', value: 4 }
  
          ]
        },
      ]);
      const query = 'INSERT INTO role SET ?';
      connection.query(query, { title, salary, department_id: department }, (err, title) => {
        console.log(`NEW ROLE ADDED:${title}`);
        initTracker();
      });
    } catch (err) {
      console.log(err);
      connection.end();
    }
  };

  const addDepartment = async () => {
    try {
      const newDept = await inquirer.prompt([
        {
          name: "name",
          type: 'input',
          message: "What Department would you like to add?"
        }
      ]);
      connection.query('INSERT INTO departments(name) VALUES(?)', newDept.name);
      console.log(`New department added: ${newDept.name}`);
      initTracker();
    } catch (err) {
      console.log(err);
      connection.end();
    }
  };
  
  const updateEmployeeRole = async () => {
    connection.query('SELECT last_name from employees', async (err, res) => {
      try {
        const { last_name } = await inquirer.prompt([
          {
            name: 'last_name',
            type: 'list',
            message: 'What is the last name of the employee you want to change the role ID for?',
            choices: res.map(({ last_name }) => last_name),
          }
        ]);
  
        const { role_id } = await inquirer.prompt([
          {
            name: 'role_id',
            type: 'list',
            message: 'What would you like to update the employee role to?',
            choices: [
  
              { name: 'Lead Engineer', value: 1 },
              { name: 'Engineer', value: 2 },
              { name: 'Sales Lead', value: 3 },
              { name: 'Sales Person', value: 4 },
              { name: 'HR', value: 5 },
              { name: 'Lawyer', value: 6 },
  
            ]
  
          }
        ]);
  
        const query = 'UPDATE employees SET role_id =? WHERE last_name =?';
        connection.query(query, [parseInt(role_id), last_name], (err, res) => {
          if (err) throw err;
          console.log(`${last_name} updated Role ID to: ${role_id}`)
  
        })
        initTracker();
      } catch (error) {
        console.log(error);
        connection.end();
  
      }
    })
  };