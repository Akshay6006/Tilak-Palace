import { useLanguage } from "../context/LanguageContext";

function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-black text-white px-6 md:px-20 py-12">
      
      {/* TOP SECTION */}
      <div className="grid md:grid-cols-4 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-xl font-bold mb-4">Tilak Palace</h2>
          <p className="text-gray-400">
            {language === "en"
              ? "Luxury stay and premium hospitality in Muzaffarpur."
              : "मुज़फ्फरपुर में लक्ज़री होटल और प्रीमियम सुविधाएं।"}
          </p>
        </div>

        {/* EXPLORE */}
        <div>
          <h3 className="font-bold mb-3">
            {language === "en" ? "Explore" : "खोजें"}
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>Rooms</li>
            <li>Gallery</li>
            <li>Booking</li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="font-bold mb-3">
            {language === "en" ? "Services" : "सेवाएं"}
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li>Restaurant</li>
            <li>Banquet Hall</li>
            <li>Parking</li>
            <li>Room Service</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-bold mb-3">
            {language === "en" ? "Contact" : "संपर्क"}
          </h3>
          <p className="text-gray-400">📞 +91 9876543210</p>
          <p className="text-gray-400">📧 tilakpalace@gmail.com</p>
          <p className="text-gray-400">
            {language === "en"
              ? "Muzaffarpur, Bihar"
              : "मुज़फ्फरपुर, बिहार"}
          </p>
        </div>

      </div>

      {/* SOCIAL */}
      <div className="flex justify-center gap-6 mt-10 text-gray-400">
        <span className="hover:text-white cursor-pointer">Instagram</span>
        <span className="hover:text-white cursor-pointer">Facebook</span>
        <span className="hover:text-white cursor-pointer">YouTube</span>
      </div>

      {/* BOTTOM */}
      <div className="text-center mt-8 text-gray-500 text-sm">
        © 2026 Tilak Palace. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;