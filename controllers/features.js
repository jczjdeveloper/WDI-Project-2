/**
 * GET /features
 * Features page.
 */
const Features = require('../models/features.js');

exports.getFeatures = (req, res) => {
  Features.find((err, docs) => {
    res.render('features', { features: docs });
  });
};
