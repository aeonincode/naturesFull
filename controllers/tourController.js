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
    console.log(req.query);

    // BUILD QUERY
    // 1) Filtering
    // this ... take all fields out of the object and with {} we create new object
    const queryObj = { ...req.query };

    // create array of all fields that we want to exclude
    const excludedFields = ['page', 'sort', 'limit', 'fields'];

    // remove all of these fields from our query object
    excludedFields.forEach((el) => delete queryObj[el]);

    //console.log(req.query, queryObj);

    // 2) Advanced filtering
    // first convert object to string
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    const query = Tour.find(JSON.parse(queryStr));

    // EXECUTE QUERY
    const tours = await query;

    // second way
    // const query = Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // SEND RESPONSE
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
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    //first by need find document that is to be updated we use req.params.id
    //second the data that we want to change and that data in body, use req.body
    // as third argument we can pass some options
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      // sendback data,updated tour
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
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      // usually we dont send any data back, we send null to show that the resource that we deleted now no longer exists
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }

  // 204 means no content
};
