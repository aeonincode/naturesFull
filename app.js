const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES
//onsole.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  //app.use(morgan('tiny'));
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// simple middleware
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//     console.log('Hello from the middleware 🤘🏻');
//     next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);

  next();
});

// ROUTES
// mounting the Route
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// all stand for all http methods
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
