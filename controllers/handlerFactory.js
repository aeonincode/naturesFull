const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    // 204 means no content
    res.status(204).json({
      status: 'success',
      // usually we dont send any data back, we send null to show that the resource that we deleted now no longer exists
      data: null,
    });
  });
