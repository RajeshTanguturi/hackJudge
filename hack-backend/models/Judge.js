const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const JudgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['judge'],
    default: 'judge'
  },
  hackathon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hackathon'
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organizer'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Hash password before saving
JudgeSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {

    return next();
  }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare passwords
JudgeSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Judge', JudgeSchema);
