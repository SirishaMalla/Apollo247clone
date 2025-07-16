const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: String,
  speciality: String,
  gender: String,
  experience: Number,
  location: String,
  fees: Number,
  rating: Number
});

module.exports = mongoose.model("Doctor", doctorSchema);
