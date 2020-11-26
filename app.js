const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express();

// MIDDLEWARES
app.use(morgan('dev'));
//app.use(morgan('tiny'));

// simple middleware
app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    console.log('Hello from the middleware 🤘🏻');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// ROUTES

// mounting the Route
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;