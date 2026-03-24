import { useState, useEffect } from "react";

function Booking({ language }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    roomType: "",
    checkIn: "",
    checkOut: "",
    days: 0,
    totalPrice: 0,
    paymentScreenshot: ""
  });

  const [displayText, setDisplayText] = useState("");

  const fullText =
    language === "en"
      ? "Luxury Stay • Banquet • Restaurant • Gym • Parking"
      : "लक्ज़री होटल • बैंक्वेट • रेस्टोरेंट • जिम • पार्किंग";

  // ✅ FIXED Typing Animation (no undefined bug)
 useEffect(() => {
  let index = 0;

  const interval = setInterval(() => {
    index++;

    if (index <= fullText.length) {
      setDisplayText(fullText.slice(0, index));
    } else {
      clearInterval(interval);
    }
  }, 40);

  return () => clearInterval(interval);
}, [language]);

  const roomPrices = {
    Single: 800,
    Deluxe: 1500,
    Suite: 2500
  };

  const handleChange = (e) => {
    const updatedForm = {
      ...form,
      [e.target.name]: e.target.value
    };

    // ✅ Calculate days + price
    if (updatedForm.checkIn && updatedForm.checkOut && updatedForm.roomType) {
      const checkIn = new Date(updatedForm.checkIn);
      const checkOut = new Date(updatedForm.checkOut);

      const diffTime = checkOut - checkIn;
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const pricePerDay = roomPrices[updatedForm.roomType] || 0;
      const total = days * pricePerDay;

      updatedForm.days = days > 0 ? days : 0;
      updatedForm.totalPrice = total > 0 ? total : 0;
    }

    setForm(updatedForm);
  };

  const handleFile = (e) => {
    setForm({
      ...form,
      paymentScreenshot: e.target.files[0]?.name || ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/book-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    alert(
      language === "en"
        ? "Room Booked Successfully!"
        : "कमरा सफलतापूर्वक बुक हुआ!"
    );
  };

  return (
    <div
      className="min-h-screen flex items-center justify-between px-5 md:px-10 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1566073771259-6a8506099945')"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* LEFT SIDE TEXT */}
      <div className="relative text-white max-w-xl">
        <h1 className="text-5xl font-bold mb-6">
          {language === "en"
            ? "Welcome to Tilak Palace"
            : "तिलक पैलेस में आपका स्वागत है"}
        </h1>

        <p className="text-xl text-gray-300 h-10">
          {displayText}
        </p>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="relative bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6">
          {language === "en" ? "Book Your Room" : "कमरा बुक करें"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder={language === "en" ? "Name" : "नाम"}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            name="phone"
            placeholder={language === "en" ? "Phone" : "मोबाइल नंबर"}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <select
            name="roomType"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">
              {language === "en" ? "Select Room" : "कमरा चुनें"}
            </option>
            <option value="Single">Single</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Suite">Suite</option>
          </select>

          <div>
            <label>
              {language === "en" ? "Check-in (1 PM)" : "चेक-इन (1 बजे)"}
            </label>
            <input
              type="date"
              name="checkIn"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label>
              {language === "en" ? "Check-out (11 AM)" : "चेक-आउट (11 बजे)"}
            </label>
            <input
              type="date"
              name="checkOut"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          {/* PRICE */}
          <div className="bg-gray-100 p-3 rounded">
            <p>
              {language === "en" ? "Days" : "दिन"}: {form.days}
            </p>
            <p>
              {language === "en" ? "Total Price" : "कुल कीमत"}: ₹{form.totalPrice}
            </p>
          </div>

          {/* PAYMENT */}
          <div className="bg-yellow-100 p-3 rounded text-center">
            <p className="font-semibold">
              {language === "en" ? "Pay via UPI" : "UPI से भुगतान करें"}
            </p>
            <p><b>tilakpalace@upi</b></p>
          </div>

          <input type="file" onChange={handleFile} />

          <button className="w-full bg-yellow-400 py-2 rounded font-semibold hover:bg-yellow-300">
            {language === "en" ? "Confirm Booking" : "बुकिंग करें"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Booking;