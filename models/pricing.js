const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  name: String
});

const Pricing = mongoose.model('Pricing', pricingSchema);
module.exports = Pricing;
