import { useNavigate } from "react-router-dom";
function Rooms({ language }) {
  const navigate = useNavigate();
  const rooms = [
    {
      id: 1,
      name_en: "Single Room",
      name_hi: "सिंगल कमरा",
      price: 800,
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
    },
    {
      id: 2,
      name_en: "Deluxe Room",
      name_hi: "डीलक्स कमरा",
      price: 1500,
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a"
    },
    {
      id: 3,
      name_en: "Super Deluxe Suite",
      name_hi: "सुपर डीलक्स सुइट",
      price: 2500,
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
    }
  ];

  return (
    <div id="rooms" className="py-20 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold mb-12">
        {language === "en" ? "Our Rooms" : "हमारे कमरे"}
      </h2>

      <div className="flex flex-wrap justify-center gap-10 px-5 md:px-10">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-xl shadow-lg w-80 overflow-hidden hover:scale-105 transition"
          >
            <img
              src={room.image}
              alt="room"
              className="h-52 w-full object-cover"
            />

            <div className="p-5">
              <h3 className="text-xl font-semibold">
                {language === "en" ? room.name_en : room.name_hi}
              </h3>

              <p className="text-gray-600 mt-2">
                ₹{room.price} {language === "en" ? "/ night" : "/ रात"}
              </p>

              <button
  onClick={() => navigate("/booking")}
  className="mt-4 bg-yellow-400 px-5 py-2 rounded-full hover:bg-yellow-300"
>
  {language === "en" ? "Book Now" : "अभी बुक करें"}
</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;