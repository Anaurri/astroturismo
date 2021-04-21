const moment = require('moment');// para poder cancelar la reserva ( antes de 48horas )

const createError = require('http-errors');
const Event = require('../models/event.model');
const Reservation = require('../models/reservation.model')

module.exports.create = (req, res, next) => {
    console.log(req.body)
    Event.findById(req.params.id)
        .populate('reservations') //el mongoose no te trae el virtual por defecto si no se lo pides porque cuesta. De ahí el populate.
        .then(event => {
            if (!event) next(createError(404, 'Event not found'))
            else {
                /* En react ya validará si hay plazas para poder reservar, pero aquí también tenemos que hacerlo.
                SIEMPRE SE VALIDA EN LA API SI O SI.*/
                const bookingsCount = event.reservations.reduce((total, reservation) => total + reservation.numberOfPeople, 0)
                const availablePlace = event.capacity - (bookingsCount + req.body.numberOfPeople)

                if (availablePlace >= 0) {
                    req.body.date = event.date; //de momento la fecha de la reserva será la del evento. Más adelante un evento tendrá varias fechas
                    req.body.event = event.id;
                    req.body.client = req.user.id;
                    return Reservation.create(req.body)
                        .then(reservation => {
                            res.status(201).json(reservation)
                        })
                }
                else next(createError(409, 'No quedan plazas disponibles'))

            }
        }).catch(next)

}

module.exports.list = (req, res, next) => {
    Reservation.find({ client: req.user.id })
        // .populate('event', 'name') //de momento saco eso, si quiere ver más detalles sobre el lodge o precio etc...DETALLE DEL EVENTO.
        .then(reservations => {
            if (reservations) res.json(reservations)
            else next(createError(404, 'There is no reservation'))
        })
        .catch(next)
}

module.exports.detail = (req, res, next) => {
    Reservation.find({$and: [{_id: req.params.id}, {client: req.user.id}]})
        .populate('event', '_id name date city packWithLodge company') //de momento saco eso, si quiere ver más detalles sobre el lodge o precio etc...DETALLE DEL EVENTO.
        .then(reservation => {
            if (reservation.length > 0) res.json(reservation)
            else next(createError(404, 'There is no reservation'))
        })
        .catch(next)
}

module.exports.delete = (req, res, next) => {
    Reservation.findById(req.params.id)
      .then(reservation => {

        const today = new Date(); //hoy en ms desde 1970
        const dayAfer2mrw = new Date().setDate(today.getDate()+2) //hoy+2días  en ms desde 1970 
        const reservationDate = reservation.date.getTime() //día de la reserva en ms desde 1970
        if (!reservation) next(createError(404, 'Reservation not found'))
        else if (reservation.client != req.user.id) next(createError(403, 'Only the owner of the reservation can perform this action'))
        else if (reservationDate < dayAfer2mrw) next(createError(403, 'The reservation cannot be canceled two days before of the event'))
        else return reservation.delete()
          .then(() => res.status(204).end())  /*Tengo que devolver algo para que acabe la petición. En este caso ,
          no queremos devolver un json. EN su lugar , devolveremos un .end*/
      }).catch(next)
  }
  