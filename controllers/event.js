/**
 * GET /event
 * CREATE EVENT PAGE!
 */
const Event = require('../models/event.js');

exports.getEvent = (req, res) => {
  Event.find((err, docs) => {
    res.render('event', { event: docs });
  });
};

exports.postEvent = (req, res) => {
  console.log('post')
  let newEvent = new Event()
  newEvent.name = req.body.name
  newEvent.email = req.body.email
  newEvent.save((err, events) => {
    if (err) res.json({message: 'could not create event because: ' + err})
    res.send('posted')
  })
}
