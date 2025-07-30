const AppError = require('../utils/AppError');

const errorHandler = (err, req, res, next) => {
 
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // In dev, show full stack; in prod, limit output
  res.status(statusCode).render("listings/error.ejs",{err});
};

module.exports = errorHandler;
