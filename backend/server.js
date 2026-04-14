console.log("🔥 SERVER STARTED NEW VERSION");

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//  CONFIG 
const PORT = process.env.PORT || 5000;

//  MIDDLEWARE 
// const cors = require("cors");

app.use(cors({
  origin: ["http://localhost:5173", "https://tilak-palace.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));


app.get("/test", (req, res) => {
  res.json({ message: "Backend working ✅" });
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// MongoDB 
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log("❌ MongoDB Error:", err));


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

//Routes
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

//BOOKING

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

// Contact
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
//FEEDBACK MODEL
const feedbackSchema = new mongoose.Schema({
  name: String,
  message: String,
  rating: Number,
  type: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

//RECEIPT MODEL

const receiptSchema = new mongoose.Schema({
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Receipt = mongoose.model("Receipt", receiptSchema);
// FEEDBACK

// POST feedback
app.post("/feedback", async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();

    res.status(201).json({
      message: "✅ Feedback Saved",
      data: newFeedback,
    });
  } catch (error) {
    res.status(500).json({
      message: "❌ Failed to save feedback",
      error: error.message,
    });
  }
});

// GET feedback
app.get("/feedbacks", async (req, res) => {
  try {
    const { limit, rating } = req.query;

    let query = {};


    // ⭐ filter by rating
    if (rating) {
      query.rating = Number(rating);
    }

    let feedbacks = await Feedback.find(query).sort({ _id: -1 });

    // 🎯 Randomize results (important for rotation)
    feedbacks = feedbacks.sort(() => 0.5 - Math.random());

    // 🔥 Limit results
    if (limit) {
      feedbacks = feedbacks.slice(0, Number(limit));
    }

    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//RECEIPT

app.post("/upload-receipt", async (req, res) => {
  try {
    const newReceipt = new Receipt({
      image: req.body.receipt,
    });

    await newReceipt.save(); 

    res.json({ message: "Receipt saved in DB ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/book-table", async (req, res) => {
  try {
    console.log("Table booking:", req.body);
    res.json({ message: "Table booked successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//