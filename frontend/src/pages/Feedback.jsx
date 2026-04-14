import { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import toast from "react-hot-toast";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

function Feedback() {
   const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({
    name: "",
    message: "",
    rating: 5,
    type: "Happy",
    image: "",
  });
  const { language } = useLanguage();
  useEffect(() => {
  fetch("https://tilak-palace.onrender.com/feedbacks")
    .then((res) => res.json())
    .then((data) => {
      console.log("All feedbacks:", data);
      setFeedbacks(data);
    })
    .catch((err) => console.log(err));
}, []);
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

    const res = await fetch("https://tilak-palace.onrender.com/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Server error:", text);
      throw new Error("Server response not OK");
    }

    const data = await res.json();
    console.log("Response:", data);

    toast.success(t.feedbackSuccess);

    const updated = await fetch("https://tilak-palace.onrender.com/feedbacks");
const newData = await updated.json();
setFeedbacks(newData);

    setForm({
      name: "",
      message: "",
      rating: 5,
      type: "Happy",
      image: "",
    });

  } catch (err) {
    console.error("ERROR:", err);
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

<div className="mt-16">
  <h2 className="text-3xl text-center mb-10 font-bold">
    All Feedback
  </h2>

<div className="mt-16">
  <h2 className="text-3xl text-center mb-10 font-bold">
    {t.allFeedback || "All Feedback"}
  </h2>

  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

    {feedbacks.map((review, i) => (
      <div
        key={i}
        className="bg-white text-black rounded-2xl shadow-lg p-6 
        hover:shadow-2xl transition duration-300 transform hover:-translate-y-2"
      >
        <div className="text-yellow-500 text-lg">
          {"⭐".repeat(review.rating)}
        </div>

        <p className="mt-4 text-gray-700 italic leading-relaxed">
          "{review.message}"
        </p>

        {review.image && (
          <img
            src={review.image}
            className="w-full h-40 object-cover rounded-lg mt-4"
          />
        )}

        <div className="mt-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-400 text-black flex items-center justify-center rounded-full font-bold">
            {review.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h4 className="font-semibold text-gray-900">
              {review.name}
            </h4>
            <p className="text-xs text-gray-500">
              {review.type}
            </p>
          </div>
        </div>
      </div>
    ))}

  </div>
</div>
</div>

      </div>
    </PageWrapper>
  );
}

export default Feedback;