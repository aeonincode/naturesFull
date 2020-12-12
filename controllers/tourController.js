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
exports.getAllTours = async (req, res) => {
  //console.log(req.requestTime);
  try {
    // Get all tours from database
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      // useful when we sending an array,multiple object
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
  // console.log(req.params);
  // const id = req.params.id * 1;

  //   const tour = tours.find((el) => el.id === id);
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
