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
  newEvent.description = req.body.description
  newEvent.date = req.body.date
  newEvent.location = req.body.location
  newEvent.timestart = req.body.timestart
  newEvent.save((err, events) => {
    if (err) res.json({message: 'could not create event because: ' + err})
    res.send('posted')
  })
}
