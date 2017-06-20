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
const createeventController = require('../controllers/createevent');


// Secret routes

router.get('/', dashboardController.getDashboard);
router.get('/reminders', remindersController.getReminders);
router.get('/eventlive', eventliveController.getEventlive);
router.get('/createevent', createeventController.getCreateevent);
router.post('/createevent', createeventController.postCreateEvent)


// CRUD for EVENT data

/*
 *  List guests
 */
router.get('/', (req, res, next) => {
  res.json(createeventController.list());
});

/*
 *  Create guest
 */
router.post('/', (req, res, next) => {
  const newGuest = createeventController.create(req.body);
  res.json(newGuest);
});

/*
 *  Get guest
 */
 router.get('/:id', (req, res, next) => {
   const guestId = req.params.id;
   res.json(createeventController.get(guestId));
 });

 /*
  *  Update guest
  */
  router.put('/', (req, res, next) => {
    const newGuest = createeventController.update(req.body);
    res.json(newGuest);
  });

  /*
   *  Delete guest
   */
   router.delete('/:id', (req, res, next) => {
     const guestId = req.params.id;
     res.json(createeventController.delete(guestId));
   });



module.exports = router;
