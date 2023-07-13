module.exports = (err, req, res, next) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Something went wrong at our end!!';
  return res.status(err.statusCode).json({
    status: 'failure',
    message: err.message,
  });
};
