import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";

function Gallery() {
  const { language } = useLanguage();
  const t = translations[language];

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [filter, setFilter] = useState("All");

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  const categories = [
    { key: "All", label: t.all },
    { key: "Rooms", label: t.rooms },
    { key: "Dining", label: t.diningTitle },
    { key: "Events", label: t.banquet },
  ];

  const images = [
    { src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39", category: "Rooms" },
    { src: "https://images.unsplash.com/photo-1590490360182-c33d57733427", category: "Rooms" },
    { src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b", category: "Rooms" },

    { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de", category: "Dining" },
    { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5", category: "Dining" },

    { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622", category: "Events" },
  ];

  const filteredImages =
    filter === "All"
      ? images
      : images.filter((img) => img.category === filter);

  useEffect(() => {
    const handleKey = (e) => {
      if (selectedIndex === null) return;

      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev === filteredImages.length - 1 ? 0 : prev + 1
        );
      }

      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev === 0 ? filteredImages.length - 1 : prev - 1
        );
      }

      if (e.key === "Escape") {
        setSelectedIndex(null);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, filteredImages.length]);

  const nextImage = () => {
    setSelectedIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-black text-white py-16 px-4 md:px-20">

        {/* TITLE */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center mb-10"
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          {t.gallery}
        </motion.h1>

        {/* FILTER */}
        <div className="flex justify-center gap-3 md:gap-4 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-4 md:px-5 py-2 rounded-full text-sm md:text-base border transition ${
                filter === cat.key
                  ? "bg-yellow-400 text-black"
                  : "border-gray-500 text-white hover:bg-white hover:text-black"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {filteredImages.map((img, i) => (
            <motion.div
              key={i}
              className="relative group cursor-pointer break-inside-avoid"
              initial="hidden"
              whileInView="show"
              variants={fadeUp}
            >
              <img
                src={img.src}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x300?text=Image+Unavailable";
                }}
                onClick={() => setSelectedIndex(i)}
                className="w-full rounded-xl object-cover group-hover:scale-105 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white rounded-xl transition text-sm md:text-base">
                {img.category === "Rooms"
                  ? t.rooms
                  : img.category === "Dining"
                  ? t.diningTitle
                  : t.banquet}
              </div>
            </motion.div>
          ))}
        </div>

        {/* LIGHTBOX */}
        {selectedIndex !== null && (
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50">

            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 text-white text-3xl"
            >
              ✕
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 md:left-6 text-white text-3xl md:text-4xl"
            >
              ‹
            </button>

            <motion.img
              key={filteredImages[selectedIndex].src}
              src={filteredImages[selectedIndex].src}
              className="max-w-[95%] md:max-w-[90%] max-h-[80%] md:max-h-[85%] rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />

            <button
              onClick={nextImage}
              className="absolute right-4 md:right-6 text-white text-3xl md:text-4xl"
            >
              ›
            </button>

          </div>
        )}
      </div>
    </PageWrapper>
  );
}

export default Gallery;