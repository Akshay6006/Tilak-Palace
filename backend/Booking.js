const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  roomType: String,
  checkIn: String,
  checkOut: String
});

module.exports = mongoose.model("Booking", bookingSchema);