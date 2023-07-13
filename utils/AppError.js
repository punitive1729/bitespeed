class AppError extends Error {
  constructor(statusCode, message, status = 'error') {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.status = status;
  }
}

module.exports = AppError;
