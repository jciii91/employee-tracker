const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all employees
router.get('/employees', (req, res) => {
    const sql = 'SELECT * FROM employees';

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
    let manager_id = body.manager_id.charAt(0);
    if (manager_id == 0) {
        manager_id = null;
    }
    const params = [
        body.first_name,
        body.last_name,
        body.role_id.charAt(0),
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
    
    const params = [
        body.role_id.charAt(0),
        body.id.charAt(0)
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