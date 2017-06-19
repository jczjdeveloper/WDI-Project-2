/**
 * GET /pricing
 * Pricing page.
 */
const Pricing = require('../models/Pricing.js');

exports.getPricing = (req, res) => {
  Pricing.find((err, docs) => {
    res.render('pricing', { pricing: docs });
  });
};
