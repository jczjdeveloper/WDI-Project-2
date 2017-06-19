/**
 * GET /reminders
 * Reminders customization page.
 */
const Reminders = require('../models/Reminders.js');

exports.getReminders = (req, res, next) => {
  Reminders.find((err, docs) => {
    res.render('reminders', { reminders: docs });
  });
};
