import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useLocation } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import toast from "react-hot-toast";

function Booking() {
  const { language } = useLanguage();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const selectedRoom = params.get("room");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    roomType: "",
    checkIn: "",
    checkOut: "",
    days: 0,
    totalPrice: 0,
    paymentScreenshot: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Auto select room
  useEffect(() => {
    if (selectedRoom) {
      setForm((prev) => ({
        ...prev,
        roomType: selectedRoom,
      }));
    }
  }, [selectedRoom]);

  // ✅ Calculate days & price
  useEffect(() => {
    if (form.checkIn && form.checkOut) {
      const start = new Date(form.checkIn);
      const end = new Date(form.checkOut);
      const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

      let price = 0;
      if (form.roomType.includes("Single")) price = 800;
      if (form.roomType.includes("Deluxe")) price = 1500;
      if (form.roomType.includes("Suite")) price = 2500;

      setForm((prev) => ({
        ...prev,
        days: diff > 0 ? diff : 0,
        totalPrice: diff > 0 ? diff * price : 0,
      }));
    }
  }, [form.checkIn, form.checkOut, form.roomType]);

  // ✅ Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ✅ File upload (SAFE)
const handleFile = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  // ❌ limit to 1MB (IMPORTANT)
  if (file.size > 1 * 1024 * 1024) {
    toast.error("Image too large (max 1MB) ❌");
    return;
  }

  const reader = new FileReader();

  reader.onloadend = () => {
    setForm((prev) => ({
      ...prev,
      paymentScreenshot: reader.result,
    }));
  };

  reader.readAsDataURL(file);
};

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 VALIDATION
    if (!form.name || !form.phone || !form.roomType) {
      toast.error("Fill all fields ❌");
      return;
    }

    if (!form.paymentScreenshot) {
      toast.error("Upload payment screenshot ❌");
      return;
    }

    if (form.days <= 0) {
      toast.error("Invalid dates ❌");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://tilak-palace.onrender.com/book-room",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Booking Successful 🎉");

        setForm({
          name: "",
          phone: "",
          roomType: "",
          checkIn: "",
          checkOut: "",
          days: 0,
          totalPrice: 0,
          paymentScreenshot: "",
        });
      } else {
        console.log(data);
        toast.error(data.message || "Booking Failed ❌");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server Error ❌");
    }

    setLoading(false);
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-16 px-6 md:px-20 text-white">

        <h1 className="text-3xl font-bold text-center mb-10">
          {language === "en" ? "Book Your Stay" : "अपनी बुकिंग करें"}
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg"
          >

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded text-black"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded text-black"
              required
            />

            <select
              name="roomType"
              value={form.roomType}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded text-black"
              required
            >
              <option value="">Select Room</option>
              <option>Single Room</option>
              <option>Deluxe Room</option>
              <option>Suite Room</option>
            </select>

            <div className="flex gap-4 mb-4">
              <input
                type="date"
                name="checkIn"
                value={form.checkIn}
                onChange={handleChange}
                className="w-full p-3 rounded text-black"
                required
              />

              <input
                type="date"
                name="checkOut"
                value={form.checkOut}
                onChange={handleChange}
                className="w-full p-3 rounded text-black"
                required
              />
            </div>

            {/* QR */}
            <div className="bg-black p-4 rounded mb-4 text-center">
              <p className="mb-2">Scan & Pay</p>
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=yourupi@upi"
                className="mx-auto"
              />
              <p className="text-sm mt-2">UPI ID: yourupi@upi</p>
            </div>

            {/* FILE */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="w-full mb-4"
              required
            />

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black py-3 rounded font-semibold"
            >
              {loading
                ? "Processing..."
                : language === "en"
                ? "Confirm Booking"
                : "बुकिंग करें"}
            </button>
          </form>

          {/* SUMMARY */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

            <p>Room: {form.roomType || "-"}</p>
            <p>Days: {form.days}</p>
            <p>Total: ₹{form.totalPrice}</p>

            <hr className="my-4" />

            <h3 className="font-bold mb-2">Why Book With Us?</h3>
            <ul className="space-y-2 text-sm">
              <li>✔ Best price guarantee</li>
              <li>✔ Secure payment</li>
              <li>✔ 24/7 support</li>
            </ul>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}

export default Booking;