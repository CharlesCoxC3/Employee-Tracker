INSERT INTO departments (name) 
VALUES  ('Engineer'),
        ('Sales'),
        ('HR'),
        ('Legal');



INSERT INTO role (title, salary, department_id) 
VALUES  ('Lead Engineer', 160000, 1),
        ('Engineer', 100000, 1),
        ('Sales Lead', 85000, 2),
        ('Sales Person', 60000, 2),
        ('HR', 95000, 3),
        ('Lawyer', 180000, 4);




INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES  ('John', 'Doe', 1, null),
        ('Carl', 'Hopper', 2, 1),
        ('David', 'Forester', 2, 1),
        ('Chuck', 'Checkers', 1, null),
        ('Dave', 'Silverman', 2, 4),
        ('Jerry', 'Wave', 3, null),
        ('Jon', 'Snow', 4, 6),
        ('Larry', 'Fisherman', 4, 6),
        ('Jessica', 'Smith', 5, null),
        ('Brandon', 'Munoz', 6, null);
