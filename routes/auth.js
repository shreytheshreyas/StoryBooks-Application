const express = require('express');
const router = express.Router();
const passport = require('passport');

// @desc Authenticate with Google
// @route GET request to /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc  Google authenticate callback
// @route GET request to /auth/google/callback
router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/'}), (req, res) => {
        //this callback is executed if the authentication is successful
        res.redirect('/dashboard');
    });

// @desc Logout user
// @route /auth/logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
});

module.exports = router;