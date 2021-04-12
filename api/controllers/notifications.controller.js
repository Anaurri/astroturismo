const moment = require('moment');// para poder cancelar la reserva ( antes de 48horas )

const createError = require('http-errors');
const Notification = require('../models/notification.model')
const User = require('../models/user.model')
const Reservation = require('../models/reservation.model')



/*Este mensaje será cliente-comàñia o viceversa. El mensaje lo generan ellos en un formulario*/
module.exports.createMessage = (req, res, next) => {
    req.body.sender = req.user.id;
    req.body.date = new Date();
    req.body.typeOfNotification = 'message'

    Notification.create(req.body)
        .then(notification => res.status(201).json(notification))
        .catch(error => {
            console.log(error)
            next(error);
        })
}

/*Lo genera el servidor.¿ cuándo ? Se podría hacer al iniciar sesión. Cuando el usuario pulsa en notificaciones ,se podría recorrer las reservas del usu y
 si hay reservas a falta d dos días del evento , creamos la notificación avisando ( de q faltan dos dias para el event y de q ya no lo puede cancelar)
Tendría que ver cómo hacer que solo se genere una notificacion : podría ser solo una notice faltan dos días por client*/
module.exports.createNotice = (req, res, next) => {
    /*Buscamos el ID del admin. Se supone q nunca va a cambiar, pero lo buscamos por si a caso*/
    User.findOne({ role: 'admin' })
        .then(user => {
            console.log(user)
            return notification = {
                sender: user.id,
                receiver: req.user.id,
                date: new Date(),
                typeOfNotification: 'notice',
                textNotification: 'Quedan dos días para el evento'
            }
        })
        .then(notification => {
            /*Buscamos las reservas del usuario y comprobamos la fecha*/
            return Reservation.find({ client: req.user.id })
                .then(reservations => {
                    console.log(reservations.length)
                    if (reservations.length = 0) next(createError(404, 'Reservation not found'))
                    else {
                        const today = new Date();
                        const dayAfer2mrw = new Date().setDate(today.getDate() + 2)
                        const notifications = reservations.map(reservation => {
                            const reservationDate = reservation.date.getTime()
                            console.log(reservationDate)
                            console.log(dayAfer2mrw)

                            if (reservationDate < dayAfer2mrw) {
                                console.log("reservationDate")

                                console.log(reservationDate)
                                notification.event = reservation.event
                                console.log("notification")

                                console.log(notification)
                                return Notification.create(notification)
                            }
                        })
                        return Promise.all(promises)
                            .then((promises) => {
                                return res.json({ reservations , notifications }) //Solo puede haber un res.json en todo el endpoint. Si no ponenmos el res.status , por defecto es 200.

                            })
                    }

                })
        })
        .catch(next)
}