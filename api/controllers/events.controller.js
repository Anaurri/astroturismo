const createError = require('http-errors');
const Event = require('../models/event.model');
const Reservation = require('../models/reservation.model');
const Notification = require('../models/notification.model');

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
      console.log(error)
      if (error.errors && error.errors['location.coordinates']) {
        error.errors.location = error.errors['location.coordinates'];
        delete error.errors['location.coordinates'];
      }
      next(error);
    })
}

module.exports.update = (req, res, next) => {
  //desde react: El submit que llamará a este endpoint, se habilitará cuando rellene tambien la notificación con la alerta informada de que se ha cambiado el evento para enviarselo a  los usuarios.
  Event.findById(req.params.id)
    .populate('reservations') //el mongoose no te trae el virtual por defecto si no se lo pides porque cuesta. De ahí el populate.
    .then(event => {
      /*Validamos fecha antes de mandar la actualización*/
      const today = new Date(); //hoy en ms desde 1970
      const threeDays = new Date().setDate(today.getDate() + 3) //hoy+3días  en ms desde 1970 
      const eventDate = event.date.getTime() //día de la reserva en ms desde 1970
      if (!event) next(createError(404, 'Event not found'))
      else if (event.company != req.user.id) next(createError(403, 'Only the company of the event can perform this action'))
      else if (eventDate < threeDays) next(createError(403, 'The company cannot be update three days before of the event'))
      else {
        Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
          .then((eventUpdate) => {
            console.log("traza")
            /*Creamos las notificaciones para los usuarios*/
            /*De cada reserva cogemos el Id del cliente para crear un mensaje con el Id recipient = Id client*/

            const promises = event.reservations.map(reservation => {
              const notification = {
                typeOfNotification: 'alert',
                event: req.params.id,
                sender: req.user.id,
                recipient: reservation.client,
                date: today,
                textNotification: req.body.textNotification

              }
              console.log(reservation.id)  //valor correcto. 3 veces , una por reserva
              console.log(notification)    //valor correcto.  3 veces , una por reserva
              Notification.create(notification)
                .then((newNotification) => {
                  console.log("nueva noti") 
                  console.log(newNotification)    //Solo me saca la info una vez.
                  return res.status(201).json(newNotification)
                })
            })
            Promise.all(promises).then(console.log, console.error)
            return res.status(201).json(eventUpdate)
          })
      }
    }).catch(next)
}

// module.exports.update = (req, res, next) => {
//   //desde react: El submit que llamará a este endpoint, se habilitará cuando rellene tambien la notificación con la alerta informada de que se ha cambiado el evento para enviarselo a  los usuarios.
//   Event.findById(req.params.id)
//     .populate('reservations') //el mongoose no te trae el virtual por defecto si no se lo pides porque cuesta. De ahí el populate.
//     .then(event => {
//       /*Validamos fecha antes de mandar la actualización*/
//       const today = new Date(); //hoy en ms desde 1970
//       const threeDays = new Date().setDate(today.getDate() + 3) //hoy+3días  en ms desde 1970 
//       const eventDate = event.date.getTime() //día de la reserva en ms desde 1970
//       if (!event) next(createError(404, 'Event not found'))
//       else if (event.company != req.user.id) next(createError(403, 'Only the company of the event can perform this action'))
//       else if (eventDate < threeDays) next(createError(403, 'The company cannot be update three days before of the event'))
//       else {
//         Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
//           .then((eventUpdate) => {
//             console.log("traza")
//             /*Creamos las notificaciones para los usuarios*/
//             /*De cada reserva cogemos el Id del cliente para crear un mensaje con el Id recipient = Id client*/
//             event.reservations.map(reservation => {
//               const notification = {
//                 typeOfNotification: 'alert',
//                 event: req.params.id,
//                 sender: req.user.id,
//                 recipient: reservation.client,
//                 date: today
//               }
//               console.log(reservation.id)
//               console.log(notification)
//               Notification.create(notification)
//                 .then((newNotification) => {
//                   console.log(newNotification)
//                   return res.status(201).json(newNotification)
//                 })
//             })
//             return res.status(201).json(eventUpdate)
//           })
//       }
//     }).catch(next)
// }

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
