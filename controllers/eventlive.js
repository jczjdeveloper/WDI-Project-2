/**
 * GET /eventlive
 * Eventlive page.
 */
const Eventlive = require('../models/eventlive.js');

exports.getEventlive = (req, res) => {
  Eventlive.find((err, docs) => {
    res.render('eventlive', { eventlive: docs });
  });
};
