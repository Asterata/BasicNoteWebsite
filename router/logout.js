const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
    
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).json({ message: 'Internal server error' });
            return;
        }
        res.status(200).json({ message: 'Logged out successfully.' });
    });
});

module.exports = router;
