const mysql = require('mysql');
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
    : connection.end().console.log('Exiting application')
  };

  const viewEmployee = () => {
    const query = `SELECT * FROM employees`;
    connection.query(query, (err, employees) => {
      if (err) throw err;
      console.table(employees);
      initTracker();
  
    });
  };

  const viewRole = () => {
    const query = `SELECT * FROM role`;
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