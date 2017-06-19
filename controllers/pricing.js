/**
 * GET /pricing
 * Pricing page.
 */
const Pricing = require('../models/Pricing.js');

exports.getPricing = (req, res, next) => {
  Pricing.find((err, docs) => {
    res.render('pricing', { pricing: docs });
  });
};
