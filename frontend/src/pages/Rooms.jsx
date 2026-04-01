import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { motion } from "framer-motion";

function Rooms() {
  const { t } = useLanguage();

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 },
  };

  const rooms = [
    {
      id: "single",
      type: t.singleRoom,
      price: 800,
      img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
      desc: t.singleDesc,
      features: [t.features.wifi, t.features.ac, t.features.tv, t.features.roomService]
    },
    {
      id: "deluxe",
      type: t.deluxeRoom,
      price: 1500,
      img: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
      desc: t.deluxeDesc,
      features: [t.features.kingBed, t.features.ac, t.features.smartTV, t.features.premiumInterior]
    },
    {
      id: "suite",
      type: t.suiteRoom,
      price: 2500,
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      desc: t.suiteDesc,
      features: [t.features.livingArea, t.features.luxuryBed, t.features.minibar, t.features.premiumView]
    }
  ];

  return (
    <PageWrapper>
      <div className="bg-gray-100 min-h-screen py-16 px-6 md:px-20">

        {/* TITLE */}
        <motion.h1
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          {t.roomsTitle}
        </motion.h1>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition"
              initial="hidden"
              whileInView="show"
              variants={fadeUp}
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden">
                <img
                  src={room.img}
                  className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white font-semibold transition">
                  {t.viewDetails}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">

                <h2 className="text-lg md:text-xl font-bold mb-2">
                  {room.type}
                </h2>

                <p className="text-yellow-600 font-semibold mb-2">
                  ₹{room.price} / {t.night}
                </p>

                <p className="text-gray-600 text-sm mb-4">
                  {room.desc}
                </p>

                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  {room.features.map((f, index) => (
                    <li key={index}>✔ {f}</li>
                  ))}
                </ul>

                <Link
                  to={`/rooms/${room.id}`}
                  className="block text-center bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  {t.viewDetails}
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