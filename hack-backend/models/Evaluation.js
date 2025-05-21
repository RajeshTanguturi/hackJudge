const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  judge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Judge',
    required: true
  },
  scores: [{
    criterion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Criterion',
      required: true
    },
    score: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    comment: {
      type: String,
      trim: true
    }
  }],
  feedback: {
    type: String,
    trim: true
  },
  totalScore: {
    type: Number,
    default: 0
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Ensuring a judge can only evaluate a project once
EvaluationSchema.index({ project: 1, judge: 1 }, { unique: true });

module.exports = mongoose.model('Evaluation', EvaluationSchema);