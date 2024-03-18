const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const db = require('../db/connection');

router.post('/signin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Please provide both email and password.' });
        return;
    }
    
    // Hash the password before inserting into the database
    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
        if (hashErr) {
            console.error('Error hashing password:', hashErr);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        // Query the database to insert the new user
        const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        console.log(randomString);
        const query = 'INSERT INTO Users (UserName, Email, Password) VALUES (?, ?, ?)';
        db.query(query, [randomString, email, hashedPassword], (insertErr, result) => {
            if (insertErr) {
                console.error('Error inserting user into database:', insertErr);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }

            console.log('New user inserted:', result.insertId);
            
            // Authentication successful
            req.session.loggedIn = true;
            req.session.secretysecret = hashedPassword;
            res.status(200).json({ message: 'Signin successful.' });
        });
    });
});

module.exports = router;
