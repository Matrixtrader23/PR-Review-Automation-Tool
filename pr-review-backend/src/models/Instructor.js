const mongoose = require("mongoose");

const InstructorSchema = new mongoose.Schema({
  email: String,
  password: String
});

module.exports = mongoose.model("Instructor", InstructorSchema);
