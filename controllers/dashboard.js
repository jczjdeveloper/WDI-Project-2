/**
 * GET /dashboard
 * Dashboard post Login.
 */
const Dashboard = require('../models/dashboard.js');

exports.getDashboard = (req, res) => {
  Dashboard.find((err, docs) => {
    res.render('dashboard', { dashboard: docs });
  });
};
