const moment = require('moment');// para poder cancelar la reserva ( antes de 48horas )

const createError = require('http-errors');
const Notification = require('../models/notification.model')
const User = require('../models/user.model')
const Reservation = require('../models/reservation.model')
const Event = require('../models/event.model')


module.exports.list = (req, res, next) => {

    Notification.find({ $or: [{ recipient: req.user.id }, { sender: req.user.id }] })
        .populate('event', '_id name date') //de momento saco eso, si quiere ver más detalles sobre el lodge o precio etc...DETALLE DEL EVENTO.
        .populate('sender', '_id name email') //de momento saco eso, si quiere ver más detalles sobre el lodge o precio etc...DETALLE DEL EVENTO.
        .populate('recipient', '_id name email') //de momento saco eso, si quiere ver más detalles sobre el lodge o precio etc...DETALLE DEL EVENTO.
        .then(notifications => {
            console.log(notifications)
            if (notifications) res.json(notifications)
            else next(createError(404, 'There is no notifications'))
        })
        .catch(next)
}


/*Este mensaje será cliente-comàñia o viceversa. El mensaje lo generan ellos en un formulario*/
module.exports.createMessage = (req, res, next) => {
    req.body.sender = req.user.id;
    req.body.date = new Date().getDate;
    req.body.typeOfNotification = 'message'
    req.body.titleNotification= "You have a message"


    console.log (req.body.event)

    /*Si no esta informado el reciver, le damos el id de company*/
    if (req.body.recipient == null) {
        return Event.findById(req.body.event)
            .then(event => {
                if (event) {
                    req.body.recipient = event.company
                    console.log (req.body)
                    return Notification.create(req.body)
                        .then(notification => res.status(201).json(notification))
                        .catch(error => {
                            console.log(error)
                            next(error);
                        })
                }
                else next(createError(404, 'Event not found'))
            })
    }
    else {
        Notification.create(req.body)
            .then(notification => res.status(201).json(notification))
            .catch(error => {
                console.log(error)
                next(error);
            })
    }
}

/*Lo genera el servidor.¿ cuándo ? Se podría hacer al iniciar sesión. Cuando el usuario pulsa en notificaciones ,se podría recorrer las reservas del usu y
 si hay reservas a falta d dos días del evento , creamos la notificación avisando ( de q faltan dos dias para el event y de q ya no lo puede cancelar)
Tendría que ver cómo hacer que solo se genere una notificacion : podría ser solo una notice faltan dos días por client*/
module.exports.createNotice = (req, res, next) => {
    /*Buscamos el ID del admin. Se supone q nunca va a cambiar, pero lo buscamos por si a caso*/
    User.findOne({ role: 'admin' })
        .then(admin => {
            const today = new Date();
            const dayAfer2mrw = new Date().setDate(today.getDate() + 2)
            /*Buscamos las reservas por usuario y por fecha (a dos días del evento) */
            return Reservation.find({ $and: [{ client: req.user.id }, { date: { $lte: dayAfer2mrw } }] })
                .then(reservations => {
                    console.log(reservations.length)
                    if (reservations.length = 0) next(createError(404, 'Reservation not found'))
                    else {
                        const notifications = reservations.map(reservation => {
                            notification = {
                                sender: admin.id,
                                receiver: req.user.id,
                                date: new Date(),
                                typeOfNotification: 'notice',
                                textNotification: 'There are two days left for the event',
                                event: reservation.event,
                                titleNotification: "The event is very close!!!"

                            }            
                            return Notification.create(notification)
                        })
                        return Promise.all(notifications)
                            .then((notifications) => {
                                return res.json({ notifications }) //Solo puede haber un res.json en todo el endpoint. Si no ponenmos el res.status , por defecto es 200.
                            })
                    }


                })
        }).catch(next)
}