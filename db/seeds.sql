INSERT INTO departments
    (name)
VALUES
    ('Sales'),
    ('Customaer Service'),
    ('Engineering'),
    ('Management');

INSERT INTO roles
    (title, salary, department_id)
VALUES
    ('Salesman', 50000, 1),
    ('Lead Salesman', 75000, 1),
    ('Representative', 40000, 2),
    ('Lead Representative', 45000, 2),
    ('Engineer', 100000, 3),
    ('Lead Engineer', 150000, 3),
    ('Manager', 60000, 4),
    ('Executive Manager', 80000, 4);

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Salesman', 'Lead', 2, NULL),
    ('Salesman', 'One', 1, 1),
    ('Salesman', 'Two', 1, 1),
    ('Representative', 'Lead', 4, NULL),
    ('Representative', 'One', 3, 4),
    ('Representative', 'Two', 3, 4),
    ('Engineer', 'Lead', 6, NULL),
    ('Engineer', 'One', 5, 7),
    ('Engineer', 'Two', 5, 7),
    ('Manager', 'Executive', 8, NULL),
    ('Manager', 'One', 7, 10),
    ('Manager', 'Two', 7, 10);