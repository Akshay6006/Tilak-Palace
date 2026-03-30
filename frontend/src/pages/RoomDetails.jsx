import { useParams, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import PageWrapper from "../components/PageWrapper";
import { useState } from "react";

function RoomDetails() {
  const { id } = useParams();
  const { language } = useLanguage();

  const [current, setCurrent] = useState(0);

  const rooms = [
    {
      id: "single",
      type: "Single Room",
      price: 800,
      images: [
        "https://images.unsplash.com/photo-1618773928121-c32242e63f39",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
      ],
      desc: "Comfortable room perfect for solo travelers.",
      features: ["Free WiFi", "AC", "TV", "Room Service"]
    },
    {
      id: "deluxe",
      type: "Deluxe Room",
      price: 1500,
      images: [
        "https://images.unsplash.com/photo-1590490360182-c33d57733427",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      ],
      desc: "Spacious and elegant room ideal for couples.",
      features: ["King Bed", "AC", "Smart TV", "Premium Interior"]
    },
    {
      id: "suite",
      type: "Suite Room",
      price: 2500,
      images: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
        "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
      ],
      desc: "Luxury suite offering ultimate comfort.",
      features: ["Living Area", "Mini Bar", "Luxury Bed", "Premium View"]
    }
  ];

  const room = rooms.find((r) => r.id === id);

  if (!room) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-3xl font-bold">Room Not Found ❌</h1>
      </div>
    );
  }

  return (
    <PageWrapper>
      <div className="p-10 bg-gray-100 min-h-screen">

        <h1 className="text-4xl font-bold mb-6">{room.type}</h1>

        {/* 🔥 IMAGE SLIDER */}
        <div className="mb-8">
          <img
            src={room.images[current]}
            className="w-full h-[400px] object-cover rounded-xl mb-4"
          />

          <div className="flex gap-4 justify-center">
            {room.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setCurrent(i)}
                className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                  current === i ? "border-black" : "border-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="text-lg text-gray-700 mb-4">{room.desc}</p>

        {/* FEATURES */}
        <ul className="mb-6 text-gray-600 space-y-1">
          {room.features.map((f, i) => (
            <li key={i}>✔ {f}</li>
          ))}
        </ul>

        {/* EXTRA TRUST BOX */}
        <div className="bg-white shadow p-6 rounded-xl mb-6">
          <h3 className="font-bold mb-2">Why choose this room?</h3>
          <p className="text-gray-600 text-sm">
            Ideal for comfort, privacy and premium stay experience.
          </p>
        </div>

        {/* PRICE */}
        <p className="text-2xl font-bold mb-6">
          ₹{room.price} / {language === "en" ? "night" : "रात"}
        </p>

        {/* 🔥 AUTO BOOK BUTTON */}
        <Link
          to={`/booking?room=${room.type}`}
          className="bg-black text-white px-6 py-3 rounded"
        >
          {language === "en" ? "Book Now" : "बुक करें"}
        </Link>

      </div>
    </PageWrapper>
  );
}

export default RoomDetails;