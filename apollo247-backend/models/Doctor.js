const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  fees: { type: Number, required: true },
  availability: { type: String, required: true },
  gender: { type: String, required: true },
  experience: { type: Number, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Doctor', doctorSchema);
