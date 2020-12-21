const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema(
  {
    // pass schema as object
    name: {
      type: String,
      // Validator
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      // trim : remove all white space in the beginning and end of the string
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      // name of the image,later we will be able to read from file system
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    // save images as array of strings
    images: [String],
    //a timestamp that is set by time that user gets a new tour, at tile tour created
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    // Array of dates, when tours starts
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual properties
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// Create Model from schema
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
