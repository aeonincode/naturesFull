const Tour = require('./../models/tourModel');

// show use how middleware works
// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };

// 2) ROUTE HANDLERS
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // useful when we sending an array,multiple object
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  //   const tour = tours.find((el) => el.id === id);

  //   res.status(200).json({
  //     status: 'success',
  //     data: {
  //       tour,
  //     },
  //   });
};

exports.createTour = async (req, res) => {
  // test for errors
  try {
    //   const newTour = new Tour({})
    //   newTour.save()

    // better way
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    // sendback data,updated tour
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  // 204 means no content
  res.status(204).json({
    status: 'success',
    // usually we dont send any data back, we send null to show that the resource that we deleted now no longer exists
    data: null,
  });
};
