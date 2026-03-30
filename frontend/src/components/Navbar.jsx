import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";
import { useState, useEffect } from "react";
import logo from "../assets/21.png";

function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language];

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-black shadow-lg"
          : "bg-black/30 backdrop-blur-md"
      }`}
    >
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} className="w-10 h-10 object-contain" />
        <span className="text-white font-bold text-lg">
          Tilak Palace
        </span>
      </Link>

      {/* MENU */}
      <div className="hidden md:flex gap-6 text-white font-medium">
        <Link to="/" className="hover:text-yellow-400">Home</Link>
        <Link to="/rooms" className="hover:text-yellow-400">Rooms</Link>
        <Link to="/booking" className="hover:text-yellow-400">Booking</Link>
        <Link to="/gallery" className="hover:text-yellow-400">Gallery</Link>
        <Link to="/contact" className="hover:text-yellow-400">Contact</Link>
      </div>

      {/* LANGUAGE BUTTON */}
      <button
        onClick={toggleLanguage}
        className="bg-yellow-400 px-3 py-1 rounded font-semibold hover:scale-105 transition"
      >
        {language === "en" ? "हिंदी" : "EN"}
      </button>
    </div>
  );
}

export default Navbar;