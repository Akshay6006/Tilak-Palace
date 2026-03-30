import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";

function Rooms() {
  const { language } = useLanguage();

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  };

  const rooms = [
    {
      id: "single",
      type: "Single Room",
      price: 800,
      img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
      desc: "Comfortable room perfect for solo travelers with modern amenities.",
      features: ["Free WiFi", "AC", "TV", "Room Service"]
    },
    {
      id: "deluxe",
      type: "Deluxe Room",
      price: 1500,
      img: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      desc: "Spacious and elegant room ideal for couples and small families.",
      features: ["King Bed", "AC", "Smart TV", "Premium Interior"]
    },
    {
      id: "suite",
      type: "Suite Room",
      price: 2500,
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      desc: "Luxury suite offering ultimate comfort, space, and premium experience.",
      features: ["Living Area", "Luxury Bed", "Mini Bar", "Premium View"]
    }
  ];

  return (
    <PageWrapper>
      <div className="bg-gray-100 min-h-screen py-16 px-6 md:px-20">

        {/* TITLE */}
        <motion.h1
          className="text-4xl font-bold text-center mb-12"
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          {language === "en" ? "Our Rooms" : "हमारे कमरे"}
        </motion.h1>

        {/* ROOMS GRID */}
        <div className="grid md:grid-cols-3 gap-10">
          {rooms.map((room, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-xl shadow-lg overflow-hidden group"
              initial="hidden"
              whileInView="show"
              variants={fadeUp}
              transition={{ duration: 0.6 }}
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={room.img}
                  className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
                />

                {/* HOVER OVERLAY */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition">
                  {language === "en" ? "View Details" : "देखें"}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6">

                <h2 className="text-xl font-bold mb-2">{room.type}</h2>

                <p className="text-gray-500 mb-2">
                  ₹{room.price} / {language === "en" ? "night" : "रात"}
                </p>

                <p className="text-gray-600 mb-4 text-sm">
                  {room.desc}
                </p>

                {/* FEATURES */}
                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  {room.features.map((f, index) => (
                    <li key={index}>✔ {f}</li>
                  ))}
                </ul>

                {/* BUTTON */}
                <Link
  to={`/rooms/${room.id}`}
  className="block text-center bg-black text-white py-2 rounded"
>
  View Details
</Link>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

export default Rooms;