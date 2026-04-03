import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import toast from "react-hot-toast";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

function Feedback() {
  const [form, setForm] = useState({
    name: "",
    message: "",
    rating: 5,
    type: "Happy",
    image: "",
  });
  const { language } = useLanguage();
const t = translations[language];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };

    if (file) reader.readAsDataURL(file);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log("Sending:", form);

    const res = await fetch("https://tilak-palace-backend.onrender.com/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("Response:", data);

    if (res.ok) {
      toast.success(t.feedbackSuccess);
      setForm({
        name: "",
        message: "",
        rating: 5,
        type: "Happy",
        image: "",
      });
    } else {
      toast.error(t.feedbackError);
    }
  } catch (err) {
    console.error(err);
    toast.error("Server error ❌");
  }
};

  return (
    <PageWrapper>
      <div className="min-h-screen bg-black text-white py-16 px-6 md:px-20">

        <h1 className="text-4xl text-center mb-10 font-bold">
          {t.feedbackTitle}
        </h1>

       <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-5 bg-white/10 p-8 rounded-xl backdrop-blur-md shadow-lg">

  <input
    name="name"
    placeholder={t.yourName}
    value={form.name}
    onChange={handleChange}
    className="w-full p-3 text-black rounded-lg"
    required
  />

  <textarea
    name="message"
    placeholder={t.yourMessage}
    value={form.message}
    onChange={handleChange}
    className="w-full p-3 text-black rounded-lg"
    rows="4"
    required
  />

  <div className="grid grid-cols-2 gap-4">
    <select
      name="rating"
      value={form.rating}
      onChange={handleChange}
      className="p-3 text-black rounded-lg"
    >
      <option value={5}>⭐⭐⭐⭐⭐</option>
      <option value={4}>⭐⭐⭐⭐</option>
      <option value={3}>⭐⭐⭐</option>
      <option value={2}>⭐⭐</option>
      <option value={1}>⭐</option>
    </select>

    <select
      name="type"
      value={form.type}
      onChange={handleChange}
      className="p-3 text-black rounded-lg"
    >
      <option>{t.happy}</option>
      <option>{t.complaint}</option>
      <option>{t.suggestion}</option>
    </select>
  </div>

  <div className="text-sm text-gray-300">
    {t.uploadMemory} 
  </div>

  <input type="file" onChange={handleFile} className="text-sm" />

  <button className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:scale-105 transition">
    {t.submitFeedback}
  </button>

</form>
      </div>
    </PageWrapper>
  );
}

export default Feedback;