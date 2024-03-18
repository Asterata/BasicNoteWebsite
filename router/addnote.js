const express = require('express');
const router = express.Router();

const db = require('../db/connection');

router.post('/addnote', (req, res) => {

    const { title } = req.body;

    if (!title) {
        res.status(400).json({ message: 'Please provide both title and note.' });
        return;
    }

    // check if the title already exists
    const titleQuery = 'SELECT * FROM UserNotes WHERE NoteTitle = ? AND UserID = ?';
    db.query(titleQuery, [title, req.session.user.UserID], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        // Check if there are any results
        if (results.length > 0) {
            // Note with the same title already exists
            res.status(400).json({ message: 'Note with the same title already exists.' });
        } else {
            // Note doesn't exist, insert new note
            const insertQuery = 'INSERT INTO UserNotes (NoteTitle, UserID) VALUES (?, ?)';
            db.query(insertQuery, [title, req.session.user.UserID], (insertErr, insertResults) => {
                if (insertErr) {
                    console.error('Error inserting note into database:', insertErr);
                    res.status(500).json({ message: 'Internal server error' });
                    return;
                }

                res.status(200).json({ message: 'Note added successfully.' });
            });
        }
    });
});

module.exports = router;
