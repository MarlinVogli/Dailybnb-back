const Booking = require('../models/BookingModels');

const bookingController = {
    createBooking: (req, res) => {
        const {user_id, property_id, dates, status} = req.body;
        Product.create({user_id, property_id, dates, status}, (err, result) => {
            if(err) {
                return res.status(500).json({error: err.message});
            }
            res.status(201).json({msg: 'Booking created successfully', bookingId: result.insertId});
        });
    },

    getAllBooking: (req, res) => {
        Booking.getAll((err, results) => {
            if(err) {
                return res.status(500).json({error: err.message});
            }
            res.json(results);
        });
    },
    getBookingById: (req, res) => {
        const user_id = req.params.id;
        Booking.getById(user_id, (err, results) => {
            if(err) {
                return res.status(500).json({error: err.message});
            }
            if (results.length === 0){
                return res.status(404).json({msg: 'Booking not found!'});
            }
            res.json(results[0]);
        });
    }
};

module.exports = bookingController;