require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ================== CONFIG ==================
const PORT = process.env.PORT || 5000;

// ================== MIDDLEWARE ==================
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://tilak-palace.vercel.app",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

// ================== MONGODB ==================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ================== MODELS ==================

// Booking Model
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  roomType: { type: String, required: true },
  checkIn: String,
  checkOut: String,
  days: Number,
  totalPrice: Number,
  paymentScreenshot: String,
});

const Booking = mongoose.model("Booking", bookingSchema);

// Contact Model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

// ================== ROUTES ==================

// Test
app.get("/", (req, res) => {
  res.send("✅ Tilak Palace Backend Running");
});

// Rooms
app.get("/rooms", (req, res) => {
  res.json([
    { id: 1, type: "Single", price: 800 },
    { id: 2, type: "Deluxe", price: 1500 },
    { id: 3, type: "Suite", price: 2500 },
  ]);
});

// ================== BOOKING ==================

app.post("/book-room", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();

    res.status(201).json({
      message: "✅ Booking Successful",
      data: newBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Booking Failed",
      error: error.message,
    });
  }
});

app.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ _id: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ================== CONTACT ==================

app.post("/contact", async (req, res) => {
  try {
    const newMessage = new Contact(req.body);
    await newMessage.save();

    res.status(201).json({
      message: "✅ Message Saved",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Failed to save message",
      error: error.message,
    });
  }
});

app.get("/messages", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ _id: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});