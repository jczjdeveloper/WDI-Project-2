/**
 * GET /dashboard
 * Dashboard post Login.
 */
const Dashboard = require('../models/Dashboard.js');

exports.getDashboard = (req, res) => {
  Dashboard.find((err, docs) => {
    res.render('dashboard', { dashboard: docs });
  });
};
