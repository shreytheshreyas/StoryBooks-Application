const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Story = require('../models/Story')
// @desc Login(Landing Page)
// @route GET request to /
router.get('/', ensureGuest, (req,res) => {
    res.render('login', {
        layout: 'login'
    });
});

// @desc  Dashboard
// @route GET request to /dashboard
router.get('/dashboard', ensureAuth, async (req,res) => {
    try {
        const stories = await Story.find({user: req.user.id}).lean();
        res.render('dashboard', {
            name: req.user.firstName,
            stories
        });
    } catch(err) {  
        console.error(err);
        res.render('error/500');
    }


});

module.exports = router;