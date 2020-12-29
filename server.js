const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 🔥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  // Local Database version
  //.connect(process.env.DATABASE_LOCAL, {

  // hosted database version
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));
// .then((con) => {
//   //console.log(con.connection);
//   console.log('DB connection successful!');
// });

// const testTour = new Tour({
//   name: 'The Park Camper',
//   price: 997,
// });

// //save it to tour collection in database
// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     //ctrl+i to open up emoji
//     console.log('ERROR 🔥', err);
//   });

//console.log(app.get('env'));
//console.log(process.env);

// START SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION! 🔥 Shutting down...');
  console.log(err.name, err.message);
  //console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
