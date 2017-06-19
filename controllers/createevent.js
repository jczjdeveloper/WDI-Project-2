/**
 * GET /createevent
 * CREATE EVENT PAGE!
 */
const Createevent = require('../models/createevent.js');

exports.getCreateevent = (req, res) => {
  Createevent.find((err, docs) => {
    res.render('createevent', { createevent: docs });
  });
};
