const mongoose = require('mongoose');

const remindersSchema = new mongoose.Schema({
  name: String
});

const Reminders = mongoose.model('Reminders', remindersSchema);
module.exports = Reminders;
