const mongoose = require('mongoose');

const createeventSchema = new mongoose.Schema({
  name: String
});

const Createevent = mongoose.model('Createevent', createeventSchema);
module.exports = Createevent;
