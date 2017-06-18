/**
 * GET /
 * Pricing page.
 */
exports.index = (req, res) => {
  res.render('pricing', {
    title: 'Pricing'
  });
};
