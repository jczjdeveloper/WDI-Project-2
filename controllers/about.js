/**
 * GET /about
 * About page.
 */
const About = require('../models/about.js');

exports.getAbout = (req, res) => {
  About.find((err, docs) => {
    res.render('about', { about: docs });
  });
};
