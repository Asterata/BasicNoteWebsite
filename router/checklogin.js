const express = require('express');
const router = express.Router();

router.get('/checklogin', (req, res) => {
    if (req.session.loggedIn) {
        res.status(200).json({ loggedIn: true });
    } else {
        res.status(401).json({ loggedIn: false });
    }
});

module.exports = router;