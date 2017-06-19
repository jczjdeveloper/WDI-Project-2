/**
 * GET /features
 * Features page.
 */
const Features = require('../models/Features.js');

exports.getFeatures = (req, res) => {
  Features.find((err, docs) => {
    res.render('features', { features: docs });
  });
};
