const db = require('../config/db');

const User = {
    create: (userData, callback) => {
        const sql = `INSERT INTO users (email, password, role) VALUES (?, ?, ?)`;
        db.query(sql, [userData.email, userData.password, userData.role], callback);
    },
    findByEmail: (email, callback) => {
        const sql = `SELECT * FROM users WHERE email = ?`;
        db.query(sql, [email], callback);
    }
};

module.exports = User;