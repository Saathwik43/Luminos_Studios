const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  features: {
    type: [String],
    default: []
  },
  category: {
    type: String,
    default: 'Other'
  }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
