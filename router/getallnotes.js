const express = require('express');
const router = express.Router();

const db = require('../db/connection');

router.get('/getallnotes', (req, res) => {
    if (req.session.loggedIn) {
        const query = 'SELECT NoteTitle, NoteText, NoteID FROM UserNotes WHERE UserID = ?';
        db.query(query, [req.session.user.UserID], (err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }
            res.status(200).json({ notes: results });
        });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

module.exports = router;