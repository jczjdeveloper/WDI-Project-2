const mongoose = require('mongoose');

const featuresSchema = new mongoose.Schema({
  name: String
});

const Features = mongoose.model('Features', featuresSchema);
module.exports = Features;
