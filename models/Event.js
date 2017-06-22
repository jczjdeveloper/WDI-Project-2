const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const Guest = require('./Guest');

const guestSchema = Guest.schema;

const eventSchema = new mongoose.Schema({
  name: String,
  description: String,
  date: String,
  location: String,
  timestart: String,
  guests: [guestSchema]

}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
