const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModels');
const db = require('../config/db');
const router = express.Router();
const Media = require('../uploads/media')

const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');
const propertyController = require('../controllers/propertyController');
//const paymentController = require('../controllers/paymentController');
const bookingController = require('../controllers/bookingController')

//Auth (public)
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);

//Users (protected)
router.get('/users', authMiddleware, userController.getAllUsers);
router.get('/users/:email', authMiddleware, userController.getUserByEmail);

//Property (protected)
router.post('/addProperty', authMiddleware, Media.upload.single("image"), propertyController.createProperty);
router.get('/property', authMiddleware, propertyController.getAllProperty);
router.get('/property/:id', authMiddleware, propertyController.getPropertyById);

//booking (protected)
router.post('/addBooking', authMiddleware, bookingController.createBooking);
router.get('/booking', authMiddleware, bookingController.getAllBooking);
router.get('/booking/:id', authMiddleware, bookingController.getBookingById);


module.exports = router;