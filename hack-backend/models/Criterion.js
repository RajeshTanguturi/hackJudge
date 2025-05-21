const mongoose = require('mongoose');

const CriterionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    default: 1,
    min: 0,
    max: 10
  },
  maxScore: {
    type: Number,
    default: 10,
    min: 1
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Criterion', CriterionSchema);