const express = require('express');
const router = express.Router();

const db = require('../db/connection');

router.post('/getnote', (req, res) => {
    const { noteId } = req.body;

    if (!noteId) {
        res.status(400).json({ message: 'Please provide a note id.' });
        return;
    }

    const query = 'SELECT NoteTitle, NoteText FROM UserNotes WHERE NoteID = ? AND UserID = ?';
    db.query(query, [noteId, req.session.user.UserID], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: 'Note not found.' });
            return;
        }

        res.status(200).json({ note: results[0] });
    });
});

module.exports = router;
