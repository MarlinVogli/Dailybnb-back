const db = require('../config/db');

const Booking = {
    create: (bookingData, callback) => {
        const sql = `INSERT INTO booking (user_id, property_id, dates, status) VALUES (?, ?, ?, ?)`;
        db.query(sql, [bookingData.user_id, bookingData.property_id, bookingData.dates, bookingData.status], callback);
    },
    getAll: (callback) => {
        const sql = `SELECT * FROM booking`;
        db.query(sql, callback);
    },
    getById: (user_id, callback) => {
        const sql = `SELECT * FROM property WHERE user_id = ?`;
        db.query(sql, [user_id], callback)
    }
};

module.exports = Booking;