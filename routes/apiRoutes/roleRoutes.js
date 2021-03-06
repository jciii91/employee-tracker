const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all roles
router.get('/roles', (req, res) => {
    const sql = `SELECT roles.id, roles.title, roles.salary, departments.name
                    AS department_name
                    FROM roles
                    LEFT JOIN departments
                    ON roles.department_id = departments.id`;

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

// post a new role to the roles table
router.post('/roles', ({ body }, res) => {
    const sql = 'INSERT INTO roles (title,salary,department_id) VALUES(?,?,?)';
    let tempArray = body.department_id.split(':');
    const department_id = tempArray[0];
    const params = [
        body.title,
        body.salary,
        department_id,
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