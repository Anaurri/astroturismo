const createError = require('http-errors');
const User = require('../models/user.model');
const passport = require('passport');


module.exports.register = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        next(createError(400, { errors: { email: 'This email already exists' } }))
      } else {
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

  res.status(204).end()
}

module.exports.list = (req, res, next) => {
  User.find()
    .then(users => res.json(users))
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
  const { id } = req.params;

  User.findByIdAndUpdate(id, req.body, { new: true })
    .then(user => res.status(202).json(user))
    .catch(next)
}

module.exports.totp = (req, res, next) => {

}
