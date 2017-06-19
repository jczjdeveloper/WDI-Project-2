const mongoose = require('mongoose');

const eventliveSchema = new mongoose.Schema({
  name: String
});

const Eventlive = mongoose.model('Eventlive', eventliveSchema);
module.exports = Eventlive;
