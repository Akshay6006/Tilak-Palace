import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/21.png";

function Navbar({ language, setLanguage }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (id) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/60 text-white">

      <div className="flex justify-between items-center px-5 md:px-5 md:px-10 py-4">

        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img src={logo} alt="logo" className="h-10 w-10 rounded-full" />

          <h2 className="text-lg md:text-xl font-bold text-yellow-400">
            {language === "en" ? "Tilak Palace" : "तिलक पैलेस"}
          </h2>
        </div>

        {/* MENU */}
        <div className="hidden md:flex gap-8 cursor-pointer text-sm md:text-base">

          <span onClick={() => handleScroll("home")} className="hover:text-yellow-400">
            {language === "en" ? "Home" : "होम"}
          </span>

          <span onClick={() => handleScroll("rooms")} className="hover:text-yellow-400">
            {language === "en" ? "Rooms" : "कमरे"}
          </span>

          <span onClick={() => handleScroll("facilities")} className="hover:text-yellow-400">
            {language === "en" ? "Facilities" : "सुविधाएं"}
          </span>

          <span onClick={() => handleScroll("banquet")} className="hover:text-yellow-400">
            {language === "en" ? "Banquet" : "बैंक्वेट"}
          </span>

          <span onClick={() => handleScroll("contact")} className="hover:text-yellow-400">
            {language === "en" ? "Contact" : "संपर्क"}
          </span>
        </div>

        {/* LANGUAGE BUTTON */}
        <button
          onClick={() => setLanguage(language === "en" ? "hi" : "en")}
          className="bg-yellow-400 text-black px-3 py-1 rounded text-sm"
        >
          {language === "en" ? "हिंदी" : "English"}
        </button>

      </div>
    </div>
  );
}

export default Navbar;