const express = require('express');
const app = express();
const AppError = require('./utils/AppError');
const cors = require('cors');
const identityRouter = require('./routes/identity.routes');
const globalErrorHandler = require('./controllers/error.controller');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/api/v1/health', (req, res) => {
  console.log('Backend is fine...');
  res
    .status(200)
    .json({ status: 'success', message: 'Backend services running fine' });
});

app.use('/api/v1/identity', identityRouter);

app.all('*', (req, res, next) => {
  next(new AppError(404, `Cannot find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

module.exports = app;
