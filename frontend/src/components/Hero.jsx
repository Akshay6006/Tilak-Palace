import { useNavigate } from "react-router-dom";

function Hero({ language }) {
  const navigate = useNavigate();

  return (
    <div
      id="home"
      className="h-[90vh] bg-cover bg-center flex flex-col justify-center items-center text-white relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1566073771259-6a8506099945')"
      }}
    >
      {/* Overlay */}
      <div className="bg-black/60 absolute inset-0"></div>

      {/* Content */}
      <div className="relative text-center px-5">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          {language === "en"
            ? "Welcome to Tilak Palace"
            : "तिलक पैलेस में आपका स्वागत है"}
        </h1>

        <p className="text-lg md:text-xl mb-6">
          {language === "en"
            ? "Luxury Stay in Muzaffarpur, Bihar"
            : "मुजफ्फरपुर, बिहार में लक्ज़री अनुभव"}
        </p>

        <button
          onClick={() => navigate("/booking")}
          className="bg-yellow-400 text-black px-6 py-3 rounded-full"
        >
          {language === "en" ? "Book Now" : "अभी बुक करें"}
        </button>
      </div>
    </div>
  );
}

export default Hero;