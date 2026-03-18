const Payment = require('../models/PaymenttModels');

const paymentController = {
    createPayment: (req, res) => {
        const {booking_id, amount, status} = req.body;
        Payment.create({booking_id, amount, status, }, (err, result) => {
            if(err) {
                return res.status(500).json({error: err.message});
            }
            res.status(201).json({msg: 'Payment created successfully', paymentId: result.insertId});
        });
    },

    getAllPayment: (req, res) => {
        Payment.getAll((err, results) => {
            if(err) {
                return res.status(500).json({error: err.message});
            }
            res.json(results);
        });
    },
    getPaymentById: (req, res) => {
        const booking_id = req.params.id;
        Payment.getById(booking_id, (err, results) => {
            if(err) {
                return res.status(500).json({error: err.message});
            }
            if (results.length === 0){
                return res.status(404).json({msg: 'Payment not found!'});
            }
            res.json(results[0]);
        });
    }
};

module.exports = paymentController;