
const express = require('express');
const router = express.Router();

router.get('/getusername', (req, res) => {
    if (req.session.loggedIn) {
        res.status(200).json({ username: req.session.user.UserName});
    } else {
        res.status(401);
    }
});

module.exports = router;