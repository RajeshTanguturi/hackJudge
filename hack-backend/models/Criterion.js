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
    max: 100
  },
  maxScore: {
    type: Number,
    default: 10,
    min: 1
  },
  hackathon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hackathon',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Criterion', CriterionSchema);