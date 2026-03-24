function Gallery({ language }) {
  const images = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427"
  ];

  return (
    <div className="py-20 bg-gray-100 text-center">
      <h2 className="text-4xl font-bold mb-12">
        {language === "en" ? "Gallery" : "गैलरी"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-5 md:px-10">
        {images.map((img, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl shadow-lg"
          >
            <img
              src={img}
              alt="gallery"
              className="w-full h-64 object-cover hover:scale-110 transition duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;