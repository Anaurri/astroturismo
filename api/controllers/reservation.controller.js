const moment = require('moment');// para poder cancelar la reserva ( antes de 48horas )

const createError = require('http-errors');
const Event = require('../models/event.model');
const Reservation = require('../models/reservation.model')

module.exports.create = (req, res, next) => {
    Event.findById(req.params.id)
        .populate('reservations') //el mongoose no te trae el virtual por defecto si no se lo pides porque cuesta. De ahí el populate.
        .then(event => {
            if (!event) next(createError(404, 'Event not found'))
            else {
                /* En react ya validará si hay plazas para poder reservar, pero aquí también tenemos que hacerlo.
                SIEMPRE SE VALIDA EN LA API SI O SI.*/
                const bookingsCount = event.reservations.reduce((total, reservation) => total + reservation.numberOfPeople, 0)
                var availablePlace = event.capacity - (bookingsCount + Number(req.body.numberOfPeople))
                if (availablePlace >= 0) {
                    req.body.date = event.date; //de momento la fecha de la reserva será la del evento. Más adelante un evento tendrá varias fechas
                    req.body.event = event.id;
                    req.body.eventName = event.name;   /*Por el problema con el populate del evento, me guardo el name en el modelo de reservation*/
                    req.body.client = req.user.id;
                    req.body.price = Number(event.price);  /*Por el problema con el populate del evento, me guardo el price en el modelo de reservation*/

                    availablePlace = 0 /* Se queda un valor si no lo reseteo*/
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
        // .populate('event', 'name') //Al listar con el populate, da 500:TypeError: Cannot read property 'coordinates' of undefined. Al crearse queda bien relacionado con el event
        /*Para parchear esto , creamos en el modelo de reserva un eventName, y metemos el nombre del evento en la tabla de reservations.*/
        .then(reservations => {
            if (reservations) res.json(reservations)
            else next(createError(404, 'There is no reservation'))
        })
        .catch(next)
}
module.exports.updateState = (req, res, next) => {
    const body = {
        id: req.body.id,
        paymentState: req.body.paymentState
    }
    Reservation.findByIdAndUpdate(req.body.id, body, { new: true })
        .then(reservation => res.status(202).json(reservation))
        .catch(next)
}