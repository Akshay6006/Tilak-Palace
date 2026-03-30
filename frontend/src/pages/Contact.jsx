import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import PageWrapper from "../components/PageWrapper";
import toast from "react-hot-toast";

function Contact() {
  const { language } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("https://tilak-palace-backend.onrender.com/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success(
        language === "en"
          ? "Message Sent Successfully!"
          : "संदेश भेजा गया!"
      );

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } else {
      toast.error("Failed to send message ❌");
    }

  } catch (err) {
    toast.error("Server error ❌");
  }
};

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-16 px-6 md:px-20">

        {/* TITLE */}
        <h1 className="text-4xl font-bold text-center mb-12">
          {language === "en" ? "Contact Us" : "संपर्क करें"}
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
              placeholder={language === "en" ? "Your Name" : "आपका नाम"}
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded text-black"
              required
            />

            <input
              type="email"
              name="email"
              placeholder={language === "en" ? "Your Email" : "आपका ईमेल"}
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded text-black"
              required
            />

            <textarea
              name="message"
              placeholder={language === "en" ? "Your Message" : "आपका संदेश"}
              value={form.message}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded text-black"
              rows="5"
              required
            />

            <button className="w-full bg-yellow-400 text-black py-3 rounded font-semibold hover:scale-105 transition">
              {language === "en" ? "Send Message" : "भेजें"}
            </button>
          </form>

          {/* CONTACT INFO */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg">

            <h2 className="text-2xl font-bold mb-6">
              {language === "en" ? "Get in Touch" : "संपर्क जानकारी"}
            </h2>

            <div className="space-y-4 text-gray-300">

              <p>📍 Muzaffarpur, Bihar</p>

              <p>📞 +91 9876543210</p>

              <p>✉️ tilakpalace@gmail.com</p>

              <p>
                🕒 {language === "en"
                  ? "24/7 Available"
                  : "24/7 उपलब्ध"}
              </p>

            </div>

            <hr className="my-6 border-gray-600" />

            <h3 className="font-bold mb-2">
              {language === "en" ? "Why Visit Us?" : "क्यों आएं?"}
            </h3>

            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✔ Prime location</li>
              <li>✔ Luxury rooms</li>
              <li>✔ Best service</li>
              <li>✔ Affordable pricing</li>
            </ul>

          </div>

        </div>

        {/* 🔥 GOOGLE MAP */}
        <div className="mt-16">
          <iframe
            title="map"
            src="https://maps.google.com/maps?q=Muzaffarpur&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-[400px] rounded-xl border-0"
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </PageWrapper>
  );
}

export default Contact;