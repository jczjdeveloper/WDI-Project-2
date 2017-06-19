const express = require('express')
const router = express.Router();

const passport = require('passport');
const passportConfig = require('../config/passport');

/**
 * ONLY ALLOW ACCESS TO SECRET ROUTES IF USER IS LOGGED IN
 */
function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

router.all('/*', function(req, res, next){
    loggedIn(req, res, next)
    //next();
});




/**
 * Controllers (route handlers).
 */
const dashboardController = require('../controllers/dashboard');
const remindersController = require('../controllers/reminders');


// Secret routes

router.get('/', dashboardController.getDashboard);
router.get('/reminders', remindersController.getReminders);


module.exports = router;
