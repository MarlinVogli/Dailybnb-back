const db = require('../config/db');

const Property = {
    create: (propertyData, callback) => {
        // ← don't insert media_id here, it's set later via updateMedia
        const sql = `INSERT INTO property (host_id, propertyName, city, price) VALUES (?, ?, ?, ?)`;
        db.query(sql, [propertyData.host_id, propertyData.propertyName, propertyData.city, propertyData.price], callback);
    },

    updateMedia: (propertyId, mediaId, callback) => {
        // ← update media_id on property after media is saved
        const sql = `UPDATE property SET media_id = ? WHERE property_id = ?`;
        db.query(sql, [mediaId, propertyId], callback); // ← fixed: two params
    },

    getAll: (callback) => {
        const sql = `
            SELECT p.*, m.path as image_path 
            FROM property p
            LEFT JOIN media m ON p.media_id = m.media_id
        `;
        db.query(sql, callback);
    },

    getById: (property_id, callback) => {
        const sql = `SELECT * FROM property WHERE property_id = ?`;
        db.query(sql, [property_id], callback);
    }
};

module.exports = Property;