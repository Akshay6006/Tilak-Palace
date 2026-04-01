import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) setLanguage(savedLang);
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  const t = translations[language]; // ✅ THIS IS CRITICAL

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);