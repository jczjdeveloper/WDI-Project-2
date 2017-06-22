const express = require('express')
const router = express.Router();


const passport = require('passport');
const passportConfig = require('../config/passport');
const apiController = require('../controllers/api');

/**
 * OAuth authentication routes. (Sign in)
 */
// router.get('/auth/instagram', passport.authenticate('instagram'));
// router.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/dashboard');
// });
router.get('/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/dashboard');
});
// router.get('/auth/github', passport.authenticate('github'));
// router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/dashboard');
// });
router.get('/google', passport.authenticate('google', { scope: 'profile email' }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/dashboard');
});
// router.get('/auth/twitter', passport.authenticate('twitter'));
// router.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/dashboard');
// });
router.get('/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
router.get('/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/dashboard');
});

/**
 * OAuth authorization routes. (API examples)
 */
// router.get('/auth/foursquare', passport.authorize('foursquare'));
// router.get('/auth/foursquare/callback', passport.authorize('foursquare', { failureRedirect: '/api' }), (req, res) => {
//   res.redirect('/dashboard');
// });
// router.get('/auth/tumblr', passport.authorize('tumblr'));
// router.get('/auth/tumblr/callback', passport.authorize('tumblr', { failureRedirect: '/api' }), (req, res) => {
//   res.redirect('/dashboard');
// });
// router.get('/auth/steam', passport.authorize('openid', { state: 'SOME STATE' }));
// router.get('/auth/steam/callback', passport.authorize('openid', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/dashboard');
// });
// router.get('/auth/pinterest', passport.authorize('pinterest', { scope: 'read_public write_public' }));
// router.get('/auth/pinterest/callback', passport.authorize('pinterest', { failureRedirect: '/login' }), (req, res) => {
//   res.redirect('/dashboard');
// });

module.exports = router;
