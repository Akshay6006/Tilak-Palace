import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function Navbar() {
  const { t, toggleLanguage, language } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-black/90 backdrop-blur-md text-white fixed w-full top-0 z-50 shadow-md">
      
      
      <div className="flex justify-between items-center px-6 h-16">

        
        <div className="flex items-center gap-2">
          <img src="/21.png" className="w-8 h-8" />
          <h1 className="font-semibold text-lg tracking-wide">
            Tilak Palace
          </h1>
        </div>

       
        <div className="hidden md:flex gap-8 items-center text-sm font-medium">

          <Link to="/" className="hover:text-yellow-400 transition">
            {t.home}
          </Link>

          <Link to="/rooms" className="hover:text-yellow-400 transition">
            {t.rooms}
          </Link>

          <Link to="/booking" className="hover:text-yellow-400 transition">
            {t.booking}
          </Link>

          <Link to="/gallery" className="hover:text-yellow-400 transition">
            {t.gallery}
          </Link>

          <Link to="/contact" className="hover:text-yellow-400 transition">
            {t.contact}
          </Link>

          <Link to="/feedback" className="hover:text-yellow-400 transition">
  {t.feedback || "Feedback"}
</Link>

        
          <button
            onClick={toggleLanguage}
            className="bg-yellow-400 text-black px-3 py-1 rounded font-semibold hover:scale-105 transition"
          >
            {language === "en" ? "हिंदी" : "EN"}
          </button>
        </div>

       
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl text-yellow-400 font-bold"
          >
            ☰
          </button>
        </div>
      </div>

    
      {menuOpen && (
        <div className="md:hidden fixed top-16 left-0 w-full h-screen bg-black text-white flex flex-col items-center justify-center gap-8 text-xl z-[999]">

          <Link to="/" onClick={() => setMenuOpen(false)}>
            {t.home}
          </Link>

          <Link to="/rooms" onClick={() => setMenuOpen(false)}>
            {t.rooms}
          </Link>

          <Link to="/booking" onClick={() => setMenuOpen(false)}>
            {t.booking}
          </Link>

          <Link to="/gallery" onClick={() => setMenuOpen(false)}>
            {t.gallery}
          </Link>

          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            {t.contact}
          </Link>

          <Link to="/feedback" onClick={() => setMenuOpen(false)}>
            {t.feedback}
          </Link>

          <button
            onClick={() => {
              toggleLanguage();
              setMenuOpen(false);
            }}
            className="bg-yellow-400 text-black px-6 py-2 rounded font-semibold"
          >
            {language === "en" ? "हिंदी" : "EN"}
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;