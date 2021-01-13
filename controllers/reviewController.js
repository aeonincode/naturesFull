const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  //check if there is tourId,if yes we only search for reviews where tour equal to that tourId
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  // Allow nested routes
  // if we didn't specify tour id and the body, then we want to define that as the one coming from url
  if (!req.body.tour) req.body.tour = req.params.tourId;
  // do the same with user
  if (!req.body.user) req.body.user = req.user.id;

  // code above should be:
  // if (!req.body.tour) req.body.tour = req.params.tourId;
  // req.body.user = req.user.id;

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});

exports.deleteReview = factory.deleteOne(Review);
