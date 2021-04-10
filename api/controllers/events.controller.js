const createError = require('http-errors');
const Event = require('../models/event.model');

module.exports.list = (req, res, next) => {

  Event.find()
    .populate('company', '_id name email')
    .then(events => res.json(events))
    .catch(next)
}

module.exports.detail = (req, res, next) => {
  Event.findById(req.params.id)
    .populate('company', '_id name email')
    .then(event => {
      if (event) res.json(event)
      else next(createError(404, 'Event not found'))
    })
    .catch(next)
}
module.exports.create = (req, res, next) => {
  // console.log (location)

  // req.body.location = {
  //   type: 'Point',
  //   coordinates: location
  // }
  req.body.company = req.user.id;

  Event.create(req.body)
    .then(event => res.status(201).json(event))
    .catch(error => {
      console.log (error)
      if (error.errors && error.errors['location.coordinates']) {
        error.errors.location = error.errors['location.coordinates'];
        delete error.errors['location.coordinates'];
      }
      next(error);
    })
}

module.exports.delete = (req, res, next) => {
  Event.findById(req.params.id)
    .then(event => {
      if (!event) next(createError(404, 'Event not found'))
      else if (event.company != req.user.id) next(createError(403, 'Only the company of the event can perform this action'))
      else return event.delete()
        .then(() => res.status(204).end())  /*Tengo que devolver algo para que acabe la petición. En este caso ,
        no queremos devolver un json. EN su lugar , devolveremos un .end*/
    }).catch(next)
}
