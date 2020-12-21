const Tour = require('./../models/tourModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

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
    // 1A) Filtering
    // this ... take all fields out of the object and with {} we create new object
    //const queryObj = { ...req.query };

    // create array of all fields that we want to exclude
    //const excludedFields = ['page', 'sort', 'limit', 'fields'];

    // remove all of these fields from our query object
    //excludedFields.forEach((el) => delete queryObj[el]);

    //console.log(req.query, queryObj);

    // 1B) Advanced filtering
    // first convert object to string
    //let queryStr = JSON.stringify(queryObj);

    // \b before and after because we only want to match these exact words without any other string around it
    // /g g flag means that is happen multiple times so if we have 2 or 3 operators or even all of them
    // then it will replace all of them and without /g it would be only replace the first occurrence
    //queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    //console.log(JSON.parse(queryStr));

    //let query = Tour.find(JSON.parse(queryStr));

    // 2) Sorting
    // sort result base on the value
    //if (req.query.sort) {
    //const sortBy = req.query.sort.split(',').join(' ');
    //console.log(sortBy);
    // chain someting to the query
    //query = query.sort(sortBy);
    //} else {
    // descending order, newest ones appear first
    //query = query.sort('-createdAt');
    //}

    // 3) Field Limiting
    //if (req.query.fields) {
    //const fields = req.query.fields.split(',').join(' ');
    // The operation of selecting only certain field names is called projecting
    //query = query.select(fields);
    //} else {
    // default
    // excluding only this field
    //query = query.select('-__v');
    //}

    // 4) Pagination
    // trick to convert string to number and || 1 means we want page number 1 by default
    //const page = req.query.page * 1 || 1;
    //const limit = req.query.limit * 1 || 100;
    // (page - 1) means previous page
    //const skip = (page - 1) * limit;

    // limit is amount of results that we want in the query
    // skip is amount of results that should be skipped before actually querying in data
    // page=2&limit=10, 1-10 page 1, 11-20 page 2, 21-30 page 3 ...
    //query = query.skip(skip).limit(limit);

    // if (req.query.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error('This page does not exists');
    // }

    // EXECUTE QUERY
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;
    // query.sort().select().skip().limit()

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

    // 204 means no content
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
};

// Aggregation pipeline
exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      // steps
      {
        // stage
        $match: { ratingsAverage: { $gte: 4.5 } },
      },
      {
        $group: {
          // _id: '$ratingsAverage',
          _id: { $toUpper: '$difficulty' },
          numTours: { $sum: 1 },
          numRating: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      {
        $sort: { avgPrice: 1 },
      },
      // {
      //   // selelect all documents not easy, excluding easy ones
      //   $match: { _id: { $ne: 'EASY' } },
      // },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = req.params.year * 1; //2021

    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates',
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' },
        },
      },
      {
        $addFields: { month: '$_id' },
      },
      {
        $project: {
          // hide id in postman
          _id: 0,
        },
      },
      {
        // -1 starting with highest number , descending
        $sort: { numTourStarts: -1 },
      },
      {
        // 12 output
        $limit: 12,
      },
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        plan,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
