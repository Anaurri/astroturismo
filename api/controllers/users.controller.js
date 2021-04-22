const createError = require('http-errors');
const User = require('../models/user.model');
const passport = require('passport');


module.exports.register = (req, res, next) => {
  console.log (req.body)
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        next(createError(400, { errors: { email: 'This email already exists' } }))
      } else {
        req.body.contactEmail = req.body.contactEmail //EL email de contacto es requerido. Por defecto ponemos el mismo mail de la app , pero este contactEmail se va a poder actualizar luego

        return User.create(req.body)
          .then(user => res.status(201).json(user))
      }
    })
    .catch(next)
}


module.exports.login = (req, res, next) => {
  passport.authenticate('local-auth', (error, user, validations) => {
    if (error) {
      next(error);
    } else if (!user) {
      next(createError(400, { errors: validations }))
    } else {
      req.login(user, error => {
        if (error) next(error)
        else res.json(user)
      })
    }
  })(req, res, next);
};

module.exports.logout = (req, res, next) => {
  req.logout();

  res.status(204).end()/*Tengo que devolver algo para que acabe la petición. En este caso ,
  no queremos devolver un json. EN su lugar , devolveremos un .end*/
}

module.exports.list = (req, res, next) => {
  User.find()
    .then(users => res.json(users))
    .catch(next)
}
module.exports.view = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      if (!user) next(createError(404, 'User not found'))
      else if (user.id != req.user.id) next(createError(403, 'Forbidden'))
      else res.json(user)
    })
    .catch(next)
}

module.exports.detail = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if (user) res.json(user)
      else next(createError(404, 'User not found'))
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
  
  console.log ("estoy en el controlador y el body vale:")
  console.log (req.body)

  
  const body = {
    id: req.user.id
  }
  if (req.body.name) {
    body.name = req.body.name
  }
  if (req.body.description) {
    body.description = req.body.description
  }
  if (req.body.phoneNumber) {
    body.phoneNumber = req.body.phoneNumber
  }
  if (req.body.contactEmail) {
    body.contactEmail = req.body.contactEmail
  }
  if (req.body.city) {
    body.city = req.body.city
  }
  if (req.file) {
    body.avatar = req.file.url
  }

  User.findByIdAndUpdate(req.user.id, body, { new: true })
    .then(user => res.status(202).json(user))
    .catch(next)
}

module.exports.totp = (req, res, next) => {

}
