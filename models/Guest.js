const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  name: String,
  email: String,
  //contactnumber: Number,

}, { timestamps: true });

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;
