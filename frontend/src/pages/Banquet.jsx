import PageWrapper from "../components/PageWrapper";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

function Banquet() {
  const { language } = useLanguage();
  const t = translations[language];

  const [form, setForm] = useState({
    name: "",
    date: "",
    guests: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gray-100 py-16 px-6 md:px-20">

        <h1 className="text-4xl text-center font-bold mb-10">
          {t.banquet || "Banquet Hall"}
        </h1>

        <div className="bg-white p-6 rounded-xl shadow mb-10">
          <p>{t.banquetDesc}</p>

          <ul className="mt-4 space-y-2">
            <li>✔ Decoration</li>
            <li>✔ Catering</li>
            <li>✔ Sound System</li>
            <li>✔ AC Hall</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-xl shadow max-w-xl mx-auto">
          <h2 className="text-xl font-bold mb-4">
            {t.enquire || "Enquire Now"}
          </h2>

          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full p-3 mb-3 border rounded"
          />

          <input
            type="date"
            name="date"
            onChange={handleChange}
            className="w-full p-3 mb-3 border rounded"
          />

          <input
            name="guests"
            placeholder="Guests"
            onChange={handleChange}
            className="w-full p-3 mb-3 border rounded"
          />

          <button className="bg-yellow-400 px-6 py-2 rounded w-full">
            {t.submit || "Submit"}
          </button>
        </div>

      </div>
    </PageWrapper>
  );
}

export default Banquet;