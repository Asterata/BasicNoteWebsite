const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const db = require('../db/connection');

router.post('/deletenote', (req, res) => {
    const { title } = req.body;    

    if (!title) {
        res.status(400).json({ message: 'Please provide a note title.' });
        return;
    }

    const query = 'DELETE FROM UserNotes WHERE NoteTitle = ? AND UserID = ?';
    db.query(query, [title, req.session.user.UserID], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Note not found.' });
            return;
        }

        res.status(200).json({ message: 'Note deleted successfully.' });
    });
});

module.exports = router;