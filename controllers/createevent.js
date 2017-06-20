/**
 * GET /createevent
 * CREATE EVENT PAGE!
 */
const Createevent = require('../models/createevent.js');

exports.getCreateevent = (req, res) => {
  Createevent.find((err, docs) => {
    res.render('createevent', { createevent: docs });
  });
};

exports.postCreateEvent = (req, res) => {
  console.log('post')
  let newEvent = new Createevent()
  newEvent.name = req.body.name
  newEvent.email = req.body.email
  newEvent.save((err, events) => {
    if (err) res.json({message: 'could not create event because: ' + err})
    res.send('posted')
  })
}
