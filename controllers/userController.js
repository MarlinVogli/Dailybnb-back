const User = require('../models/UserModels');
const db = require('../config/db');
const e = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.getAllUsers = (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if(err) {
            return res.status(500).json({error: err.message});
        }
        res.json(results);
    });
};

exports.getUserByEmail = (req, res) => {
    const email = req.params.email;

    User.findByEmail(email, (err, results) => {
        if(err){
            return res.status(500).json({error: err.message});
        }
        if(results.length === 0){
            return res.status(404).json({msg: 'User not found'});
        }
        res.json(results[0]);
    });
};

exports.createUser = (req, res) =>{
    const {email, password} = req.body;

    console.log("Register attempt:", email);

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    User.create({email, password: hashedPassword, role: " "}, (err, results) => {
        if(err) {
            console.error("DB Error:", err);
            return res.status(500).json({error: err.message});
        }
        res.status(201).json({msg: 'User created successfuly', userId: results.insertId});
    });
};

exports.loginUser = (req, res) => {
    const {email, password} = req.body;

    User.findByEmail(email, (err, results) => {
        if(err) {
            return res.status(500).json({error: err.message});
        }
        if(results.length === 0) {
            return res.status(404).json({msg: 'User not found'});
        }

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({msg: 'Invalid Password'});
        }
        const token =jwt.sign(
            {
                id: user.user_id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );
        res.json({
            msg: 'Login Successful',
            token,
            user: {
                id: user.user_id,
                email: user.email,
                role: user.role,
            },
        });

    });
};