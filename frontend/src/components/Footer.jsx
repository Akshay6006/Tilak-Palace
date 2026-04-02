import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";

function Footer() {
  // const { language } = useLanguage();
  const { t } = useLanguage();

  return (
    <footer className="bg-black text-white px-6 md:px-20 py-12">
      
      {/* TOP */}
      <div className="grid md:grid-cols-4 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-xl font-bold mb-4">Tilak Palace</h2>
          <p className="text-gray-400">
            {t.footerTitle}
          </p>
        </div>

        {/* EXPLORE */}
        <div>
          <h3 className="font-bold mb-3">
            {t.explore}
          </h3>
          <ul className="space-y-2 text-gray-400">
  <li><Link to="/">{t.home}</Link></li>
  <li><Link to="/rooms">{t.rooms}</Link></li>
  <li><Link to="/gallery">{t.gallery}</Link></li>
  <li><Link to="/booking">{t.booking}</Link></li>
  <li><Link to="/feedback">{t.feedback}</Link></li>
</ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="font-bold mb-3">
            {t.services}
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li>{t.restaurant}</li>
            <li>{t.banquetHall}</li>
            <li>{t.parking}</li>
            <li>{t.roomService}</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-bold mb-3">
            {t.contactTitle}
          </h3>
          <p className="text-gray-400">📞 +91 9876543210</p>
          <p className="text-gray-400">📧 tilakpalace@gmail.com</p>
          <p className="text-gray-400">
            {t.location}
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
        {t.rights}
      </div>
    </footer>
  );
}

export default Footer;