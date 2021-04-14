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
        // const updateInfo = {date, city, capacity} = req.body  /*Capamos la info que puede actualizarse.ESta línea de código crea un nuevo objeto con las claves que indicamos entre {} y los valores de req.body d esas claves*/
        // /*No tenemos que volver a acceder a mongo para actualizar (findByIdAndUpdate),ya tenemos el evento. Con Object.assign y event.save() lo podemos actualizar.*/
        // Object.assign(event, updateInfo)  /*al primer objeto le asignolas claves dle segundo*/
        ["date", "capacity", "city", "price"].forEach(field => {
          if (req.body[field]) {
            event[field] = req.body[field]
          }
        })
        return event.save()               /*TODA PROMESA QUE ANIDADA EN OTRA Y QUIERA COMPARTIR EL CATCH CON ELLA, TIENEN QUE DEVOLVERSE CON EL RETURN*/
          .then((eventUpdate) => {
            /*Creamos las notificaciones para los usuarios*/
            /*De cada reserva cogemos el Id del cliente para crear un mensaje con el Id recipient = Id client*/
            const notifications = event.reservations.map(reservation => {
              const notification = {
                typeOfNotification: 'alert',
                event: req.params.id,
                sender: req.user.id,
                recipient: reservation.client,
                date: today,
                textNotification: req.body.textNotification
              }
              return Notification.create(notification) /*Aqui no creamos las notificaciones. SOlo creamoS la query , y cuando pongamos el .then en el Promise.all será cuando se creen en BBDD. EL return de esta línea es por el map*/
            })
            return Promise.all(notifications) /*TODA PROMESA QUE ANIDADA EN OTRA Y QUIERA COMPARTIR EL CATCH CON ELLA, TIENEN QUE DEVOLVERSE CON EL RETURN*/
              .then((notifications) => {
                /* El notifications no necesita clave:valor si es el mismo nombre*/
                return res.json({ event: eventUpdate , notifications }) //Solo puede haber un res.json en todo el endpoint. Si no ponenmos el res.status , por defecto es 200.
              })
          })
      }
    }).catch(next)
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
