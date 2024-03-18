const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const db = require('../db/connection');

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Please provide both email and password.' });
        return;
    }

    // Query the database to find the user with the provided email
    const query = 'SELECT * FROM Users WHERE Email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        if (results.length === 0) {
            // No user found with the provided email
            res.status(401).json({ message: 'Invalid email or password.' });
            return;
        }

        const user = results[0];
        // Compare the provided password with the hashed password from the database
        bcrypt.compare(password, user.Password, (bcryptErr, bcryptResult) => {
            if (bcryptErr) {
                console.error('Error comparing passwords:', bcryptErr);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }
            if (bcryptResult) {
                // Passwords match, authentication successful
                req.session.loggedIn = true;
                req.session.user = user;
                res.status(200).json({ message: 'Signin successful.' });
            } else {
                // Passwords don't match, authentication failed
                req.session.loggedIn = false;
                res.status(401).json({ message: 'Invalid email or password.' });
            }
        });
    });
});

module.exports = router;
