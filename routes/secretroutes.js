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
const eventliveController = require('../controllers/eventlive');
const eventController = require('../controllers/event');


// Secret routes

router.get('/', dashboardController.getDashboard);
router.get('/reminders', remindersController.getReminders);
router.get('/eventlive', eventliveController.getEventlive);
router.get('/event', eventController.getEvent);
router.get('/event/:id', eventController.getOne)
router.post('/event', eventController.postEvent)
router.put('/event/:id', eventController.updateEvent)


// CRUD for EVENT data

/*
 *  List guests
 */
router.get('/event', (req, res, next) => {
  res.json(eventController.list());
});

/*
 *  Create guest
 */
router.post('/event', (req, res, next) => {
  const newGuest = eventController.create(req.body);
  res.json(newGuest);
});

/*
 *  Get guest
 */
 router.get('/:id', (req, res, next) => {
   const guestId = req.params.id;
   res.json(eventController.get(guestId));
 });

 /*
  *  Update guest
  */
  router.put('/', (req, res, next) => {
    const newGuest = eventController.update(req.body);
    res.json(newGuest);
  });

  /*
   *  Delete guest
   */
   router.delete('/:id', (req, res, next) => {
     const guestId = req.params.id;
     res.json(eventController.delete(guestId));
   });



module.exports = router;
