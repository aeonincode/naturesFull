const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  // pass schema as object
  name: {
    type: String,
    // Validator
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

// Create Model from schema
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
