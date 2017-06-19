const express = require('express')
const router = express.Router();


const passport = require('passport');
const passportConfig = require('../config/passport');

// /**
//  * Controllers (route handlers).
//  */
const homeController = require('../controllers/home');
const pricingController = require('../controllers/pricing');
const featuresController = require('../controllers/features');
const aboutController = require('../controllers/about');
const userController = require('../controllers/user');
const contactController = require('../controllers/contact');
const apiController = require('../controllers/api');

// /**
//  * Primary app routes.
//  */
router.get('/', homeController.index);
router.get('/pricing', pricingController.getPricing);
router.get('/features', featuresController.getFeatures);
router.get('/about', aboutController.getAbout);
router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);
router.get('/logout', userController.logout);
router.get('/forgot', userController.getForgot);
router.post('/forgot', userController.postForgot);
router.get('/reset/:token', userController.getReset);
router.post('/reset/:token', userController.postReset);
router.get('/signup', userController.getSignup);
router.post('/signup', userController.postSignup);
router.get('/contact', contactController.getContact);
router.post('/contact', contactController.postContact);
router.get('/account', passportConfig.isAuthenticated, userController.getAccount);
router.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
router.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
router.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
router.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);

module.exports = router;
