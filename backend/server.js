const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ================== MongoDB Connection ==================
mongoose.connect("mongodb+srv://whatsappUser:Akshay6006@tilakpalace.zm0wivk.mongodb.net/tilakPalaceDB?retryWrites=true&w=majority")
.then(() => {
    console.log("MongoDB Connected");

    app.listen(5000, () => {
        console.log("Server is running on port 5000");
    });
})
.catch(err => console.log(err));

// ================== Booking Model ==================
const bookingSchema = new mongoose.Schema({
    name: String,
    phone: String,
    roomType: String,
    checkIn: String,
    checkOut: String,
    days: Number,
    totalPrice: Number,
    paymentScreenshot: String
});

const Booking = mongoose.model("Booking", bookingSchema);

// ================== Routes ==================

// Home
app.get("/", (req, res) => {
    res.send("Tilak Palace Backend Running");
});

// Rooms API
app.get("/rooms", (req , res) => {
    const rooms = [
        {id: 1, type: "Single", price: 800 },
        {id: 2, type: "Deluxe", price: 1500 },
        {id: 3, type: "Suite", price: 2500 },
    ];
    res.json(rooms);
});

// Book Room (SAVE TO DATABASE)
app.post("/book-room", async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();

        res.json({
            message: "Room booked successfully",
            data: newBooking
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

// Get All Bookings
app.get("/bookings", async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json(bookings);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});