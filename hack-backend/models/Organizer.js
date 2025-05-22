const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const OrganizerSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['organizer'], default: 'organizer' },
  organization: { type: String, trim: true },
  registeredAt: { type: Date, default: Date.now }
}, { timestamps: true });

OrganizerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

OrganizerSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Organizer', OrganizerSchema);