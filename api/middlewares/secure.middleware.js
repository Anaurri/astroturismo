const createError = require('http-errors');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(createError(401, 'user is not authenticated'))
  }
};

module.exports.checkRole = (role) => {
  return (req, res, next) => {
    if (req.user.role === role) {
      next();
    } else {
    next(createError(403, 'You must not be here'))
    }
  }
}
