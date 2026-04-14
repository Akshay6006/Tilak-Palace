import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useLocation } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import toast from "react-hot-toast";

function Booking() {
  const { t } = useLanguage();
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

  useEffect(() => {
    if (selectedRoom) {
      setForm((prev) => ({
        ...prev,
        roomType: selectedRoom,
      }));
    }
  }, [selectedRoom]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      toast.error(t.errors.largeImage);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.roomType) {
      toast.error(t.errors.fill);
      return;
    }

    if (!form.paymentScreenshot) {
      toast.error(t.errors.upload);
      return;
    }

    if (form.days <= 0) {
      toast.error(t.errors.invalidDate);
      return;
    }

    setLoading(true);

    try {
      console.log("Sending data:", form);

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

      console.log("Response:", data);

      if (res.status === 201 && data.data) {
        toast.success(t.errors.success);

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
        toast.error(data.message || t.errors.failed);
      }

    } catch (error) {
      console.error("Error:", error);
      toast.error(t.errors.server);
    }

    setLoading(false);
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-16 px-6 md:px-20 text-white">

        <h1 className="text-3xl font-bold text-center mb-10">
          {t.bookingTitle}
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          <form onSubmit={handleSubmit} className="bg-white/10 p-8 rounded-xl">

            <input name="name" placeholder={t.name} value={form.name} onChange={handleChange} className="w-full p-3 mb-4 rounded text-black" />

            <input name="phone" placeholder={t.phone} value={form.phone} onChange={handleChange} className="w-full p-3 mb-4 rounded text-black" />

            <select name="roomType" value={form.roomType} onChange={handleChange} className="w-full p-3 mb-4 rounded text-black">
              <option value="">{t.selectRoom}</option>
              <option>Single Room</option>
              <option>Deluxe Room</option>
              <option>Suite Room</option>
            </select>

            <div className="flex gap-4 mb-4">
              <input type="date" name="checkIn" value={form.checkIn} onChange={handleChange} className="w-full p-3 rounded text-black" />
              <input type="date" name="checkOut" value={form.checkOut} onChange={handleChange} className="w-full p-3 rounded text-black" />
            </div>

            <div className="bg-black p-4 rounded mb-4 text-center">
              <p>{t.scanPay}</p>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=yourupi@upi" className="mx-auto" />
              <p className="text-sm mt-2">{t.upi}: yourupi@upi</p>
            </div>

            <input type="file" onChange={handleFile} className="w-full mb-4" />

            <button className="w-full bg-yellow-400 text-black py-3 rounded font-semibold">
              {loading ? t.processing : t.confirmBooking}
            </button>
          </form>

          <div className="bg-white/10 p-8 rounded-xl">
            <h2 className="text-xl font-bold mb-4">{t.bookingSummary}</h2>

            <p>{t.room}: {form.roomType || "-"}</p>
            <p>{t.days}: {form.days}</p>
            <p>{t.total}: ₹{form.totalPrice}</p>

            <hr className="my-4" />

            <h3 className="font-bold mb-2">{t.whyBook}</h3>
            <ul className="space-y-2 text-sm">
              <li>✔ {t.bestPrice}</li>
              <li>✔ {t.securePayment}</li>
              <li>✔ {t.support}</li>
            </ul>
          </div>

        </div>
      </div>
    </PageWrapper>
  );
}

export default Booking;