const express = require('express');
const router = express.Router();

const db = require('../db/connection');

router.post('/savenote', (req, res) => {
    const { noteId, noteText } = req.body;

    if (!noteId || !noteText) {
        res.status(400).json({ message: 'Please provide both note id and note.' });
        return;
    }

    const query = 'UPDATE UserNotes SET NoteText = ? WHERE NoteID = ? AND UserID = ?';
    db.query(query, [noteText, noteId, req.session.user.UserID], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Note not found.' });
            return;
        }

        res.status(200).json({ message: 'Note updated successfully.' });
    });
});

module.exports = router;
