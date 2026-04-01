import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";
import PageWrapper from "../components/PageWrapper";
import toast from "react-hot-toast";

function Contact() {
  const { language } = useLanguage();
  const t = translations[language];

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
        toast.success(t.successMsg);

        setForm({
          name: "",
          email: "",
          message: "",
        });
      } else {
        toast.error(t.failMsg);
      }

    } catch (err) {
      toast.error(t.serverError);
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white py-16 px-4 md:px-20">

        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t.contactTitle}
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-lg"
          >
            <input
              type="text"
              name="name"
              placeholder={t.namePlaceholder}
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded text-black"
              required
            />

            <input
              type="email"
              name="email"
              placeholder={t.emailPlaceholder}
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded text-black"
              required
            />

            <textarea
              name="message"
              placeholder={t.messagePlaceholder}
              value={form.message}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded text-black"
              rows="5"
              required
            />

            <button className="w-full bg-yellow-400 text-black py-3 rounded font-semibold hover:scale-105 transition">
              {t.sendMessage}
            </button>
          </form>

          {/* INFO */}
          <div className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-xl shadow-lg">

            <h2 className="text-xl md:text-2xl font-bold mb-6">
              {t.getInTouch}
            </h2>

            <div className="space-y-4 text-gray-300 text-sm md:text-base">

              <p>📍 Muzaffarpur, Bihar</p>
              <p>📞 +91 9876543210</p>
              <p>✉️ tilakpalace@gmail.com</p>
              <p>🕒 {t.availability}</p>

            </div>

            <hr className="my-6 border-gray-600" />

            <h3 className="font-bold mb-2">
              {t.whyVisit}
            </h3>

            <ul className="text-gray-300 space-y-2 text-sm">
              <li>✔ {t.why1}</li>
              <li>✔ {t.why2}</li>
              <li>✔ {t.why3}</li>
              <li>✔ {t.why4}</li>
            </ul>

          </div>
        </div>

        {/* MAP */}
        <div className="mt-16">
          <iframe
            title="map"
            src="https://maps.google.com/maps?q=Muzaffarpur&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-[300px] md:h-[400px] rounded-xl border-0"
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </PageWrapper>
  );
}

export default Contact;