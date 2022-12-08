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