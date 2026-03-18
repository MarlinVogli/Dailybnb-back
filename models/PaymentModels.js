const db = require('../config/db');

const Payment = {
    create: (paymentData, callback) => {
        const sql = `INSERT INTO payment (booking_id, amount, status) VALUES (?, ?, ?)`;
        db.query(sql, [paymentData.booking_id, paymentData.amount, paymentData.status], callback);
    },
    getAll: (callback) => {
        const sql = `SELECT * FROM payment`;
        db.query(sql, callback);
    },
    getById: (payment_id, callback) => {
        const sql = `SELECT * FROM payment WHERE payment_id = ?`;
        db.query(sql, [payment_id], callback)
    }
};

module.exports = Payment;