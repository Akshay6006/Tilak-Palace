import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  // 🔥 HERO SLIDER
  const images = [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <PageWrapper>
      <>
        {/* 🔥 HERO SLIDER */}
        <div
          className="min-h-screen pt-16 relative flex items-center justify-center text-white transition-all duration-1000"
          style={{
            backgroundImage: `url(${images[index]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 1 }}
            className="relative text-center px-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t.welcome}
            </h1>

            <p className="text-lg md:text-xl mb-6">
              Luxury • Comfort • Memorable Experiences
            </p>

            <Link
              to="/booking"
              className="bg-yellow-400 px-6 py-3 rounded-lg text-black font-semibold hover:scale-105 hover:shadow-lg transition duration-300"
            >
              {t.bookNow}
            </Link>
          </motion.div>
        </div>

        {/* STAY EXPERIENCE */}
        <motion.div
          className="py-20 px-6 md:px-20 bg-white"
          initial="hidden"
          whileInView="show"
          variants={fadeUp}
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            {language === "en" ? "Stay Experience" : "रहने का अनुभव"}
          </h2>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative group overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1618773928121-c32242e63f39"
                className="w-full h-[400px] object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white">
                {language === "en" ? "Premium Rooms" : "प्रीमियम कमरे"}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">
                Luxury Rooms & Comfort
              </h3>

              <p className="text-gray-600 mb-4">
                Experience thoughtfully designed rooms with modern interiors,
                premium bedding, and a peaceful ambiance.
              </p>

              <ul className="text-gray-600 mb-6 space-y-2">
                <li>✔ Spacious & hygienic rooms</li>
                <li>✔ 24/7 room service</li>
                <li>✔ High-speed WiFi & smart TV</li>
                <li>✔ Comfortable bedding & AC</li>
              </ul>

              <Link
                to="/rooms"
                className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
              >
                Explore Rooms
              </Link>
            </div>
          </div>
        </motion.div>

        {/* DINING */}
        <motion.div
          className="py-20 px-6 md:px-20 bg-gray-100"
          initial="hidden"
          whileInView="show"
          variants={fadeUp}
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Dining Experience
              </h3>

              <p className="text-gray-600 mb-4">
                Enjoy a rich culinary journey with a variety of cuisines prepared
                by experienced chefs.
              </p>

              <ul className="text-gray-600 mb-6 space-y-2">
                <li>✔ Multi-cuisine menu</li>
                <li>✔ Hygienic kitchen</li>
                <li>✔ Family-friendly ambiance</li>
                <li>✔ Quick service</li>
              </ul>

              <Link
                to="/gallery"
                className="bg-black text-white px-6 py-3 rounded"
              >
                View Dining
              </Link>
            </div>

            <div className="relative group overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de"
                className="w-full h-[400px] object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white">
                Restaurant
              </div>
            </div>
          </div>
        </motion.div>

        {/* BANQUET */}
        <motion.div
          className="py-20 px-6 md:px-20 bg-white"
          initial="hidden"
          whileInView="show"
          variants={fadeUp}
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative group overflow-hidden rounded-xl">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552"
                className="w-full h-[400px] object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4">
                Events & Banquet
              </h3>

              <p className="text-gray-600 mb-4">
                Perfect venue for weddings, parties and corporate events.
              </p>

              <ul className="text-gray-600 mb-6 space-y-2">
                <li>✔ Large seating capacity</li>
                <li>✔ Decoration support</li>
                <li>✔ Catering services</li>
                <li>✔ Parking facility</li>
              </ul>

              <Link
                to="/contact"
                className="bg-black text-white px-6 py-3 rounded"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </motion.div>

        {/* TESTIMONIALS */}
        <motion.div
          className="py-20 px-6 md:px-20 bg-gray-100 text-center"
          initial="hidden"
          whileInView="show"
          variants={fadeUp}
        >
          <h2 className="text-3xl font-bold mb-10">
            {language === "en" ? "Guest Reviews" : "ग्राहक समीक्षा"}
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                text: "Amazing stay and great service!",
                name: "Rahul Kumar",
                city: "Patna",
              },
              {
                text: "Best hotel experience in Muzaffarpur.",
                name: "Amit Singh",
                city: "Delhi",
              },
              {
                text: "Clean rooms and great ambiance.",
                name: "Priya Sharma",
                city: "Lucknow",
              },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition"
              >
                ⭐⭐⭐⭐⭐
                <p className="mt-3 italic">"{review.text}"</p>
                <h4 className="mt-3 font-bold">{review.name}</h4>
                <p className="text-sm text-gray-500">{review.city}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <div className="bg-yellow-400 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">
            {language === "en"
              ? "Book Your Luxury Stay Today"
              : "आज ही अपनी बुकिंग करें"}
          </h2>

          <Link
            to="/booking"
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
          >
            {t.bookNow}
          </Link>
        </div>
      </>
    </PageWrapper>
  );
}

export default Home;