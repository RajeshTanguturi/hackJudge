const mongoose = require('mongoose');

const HackathonSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer', required: true },
  judges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Judge' }],
  profileImgUrl: { type: String },
  coverImgUrl: { type: String },
  location: { type: String, required: true },
  websiteUrl: { type: String },
  socialMediaUrls: [{ type: String }],
  maxMembersPerTeam: { type: Number, required: true },
  minMembersPerTeam: { type: Number, required: true },
  noOfWinners: {type: Number, default: 0},
  prize: {type: Number, default: 0},
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Hackathon', HackathonSchema);