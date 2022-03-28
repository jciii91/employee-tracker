const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all employees
router.get('/employees', (req, res) => {
    const sql = `SELECT e.id, e.first_name, e.last_name, 
                    roles.title AS role_title,
                    roles.salary AS salary,
                    departments.name AS department_name,
                    CONCAT(m.first_name, ' ', m.last_name) AS 'manager'
                    FROM employees e
                    LEFT JOIN roles ON e.role_id = roles.id
                    LEFT JOIN departments ON roles.department_id = departments.id
                    LEFT JOIN employees m ON e.manager_id = m.id`;

    db.query(sql, (err, rows) => {
    if (err) {
        res.status(500).json({ error: err.message });
        return;
    }
    res.json({
        message: 'success',
        data: rows
        });
    });
});

// post a new employee to the employees table
router.post('/employees', ({ body }, res) => {
    const sql = 'INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES(?,?,?,?)';
    
    let tempArrayRole = body.role_id.split(':');
    let tempArrayManager = body.manager_id.split(':');
    const role_id = tempArrayRole[0];
    let manager_id = tempArrayManager[0];

    if (manager_id == 0) {
        manager_id = null;
    }
    const params = [
        body.first_name,
        body.last_name,
        role_id,
        manager_id
    ];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error : err.message });
            return;
        }
        res.json({
            message : 'success',
            data : body
        });
    });
});

// put a new role for the selected employee into their database row
router.put('/employees', ({ body }, res) => {
    const sql = 'UPDATE employees SET role_id = ? WHERE id = ?';

    let tempArrayRole = body.role_id.split(':');
    let tempArrayID = body.id.split(':');
    const role_id = tempArrayRole[0];
    const id = tempArrayID[0];

    const params = [
        role_id,
        id
    ];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error : err.message });
            return;
        }
        res.json({
            message : 'success',
            data : body
        });
    });
});

module.exports = router;