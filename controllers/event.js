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

exports.getOne = (req, res) => {
  let id = req.params.id
  Event.findById({_id: id}, (err, event) => {
    if (err) return res.json({message: 'could not find event by id because: ' + err})
    res.send(event)
  })
}

exports.postEvent = (req, res) => {
  console.log('post')
  let newEvent = new Event()
  newEvent.name = req.body.name
  newEvent.description = req.body.description
  newEvent.date = req.body.date
  newEvent.location = req.body.location
  newEvent.timestart = req.body.timestart
  newEvent.save((err, events) => {
    if (err) {
      res.json({message: 'could not create event because: ' + err})
    } else {
      res.redirect('/dashboard/Event')
    }
  })
}

exports.updateEvent = (req, res) => {
  let id = req.params.id
  Event.findById({_id: id}, (err, event) => {
    if (err) return res.json({message: 'could not find event by id because: ' + err})
    event.name = req.body.name
    event.description = req.body.description
    event.date = req.body.date
    event.location = req.body.location
    event.timestart = req.body.timestart
    event.save((err, events) => {
      if (err) {
        res.json({message: 'could not create event because: ' + err})
      } else {
        res.redirect('/dashboard/Event')
      }
    })
  })
}

exports.deleteEvent = (req, res) => {
  let id = req.params.id
  Event.findById({_id: id}, (err, event) => {
    if (err) return res.json({message: 'could not find event by id because: ' + err})
    event.remove((err, events) => {
      if (err) {
        res.json({message: 'could not delete event because: ' + err})
      } else {
        res.redirect('/dashboard/Event')
      }
    })
  })
}
