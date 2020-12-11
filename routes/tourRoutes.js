const express = require('express');
const tourController = require('./../controllers/tourController');

// create new Router and save this to new variable router
const router = express.Router();

// define parameter middleware in your own application
// router.param('id', tourController.checkID);

// Create a checkBody middleware
// Check if body contains the name and price property
// if not, send back 400 (bad request)
// Add it to the post handler stack

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
