import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Booking from "./pages/Booking";
import Rooms from "./components/Rooms";
import Footer from "./components/Footer";
import WhyChooseUs from "./components/WhyChooseUs";
import Gallery from "./components/Gallery";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
function App() {
  
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 2500);

  return () => clearTimeout(timer);
}, []);
  return (
    <div>
      {/* ✅ PASS LANGUAGE PROPS */}
      <Navbar language={language} setLanguage={setLanguage} />

      

      <Routes>
        {/* ================= HOME PAGE ================= */}
        <Route
          path="/"
          element={
            <>
              {/* ===== HERO ===== */}
              <Hero language={language} />

              {/* ===== ABOUT ===== */}
              <div
                id="about"
                className="relative py-20 text-white text-center bg-gradient-to-r from-black via-gray-900 to-black"
              >
                <h2 className="text-4xl font-bold mb-6">
                  {language === "en"
                    ? "Experience Luxury at Tilak Palace"
                    : "तिलक पैलेस में लक्ज़री का अनुभव करें"}
                </h2>

                <p className="max-w-3xl mx-auto text-lg text-gray-300">
                  {language === "en"
                    ? "Located in the heart of Muzaffarpur, Tilak Palace offers luxury rooms, banquet halls, restaurant, gym and premium services."
                    : "मुजफ्फरपुर के केंद्र में स्थित तिलक पैलेस लक्ज़री कमरे, बैंक्वेट हॉल, रेस्टोरेंट और जिम की सुविधाएं प्रदान करता है।"}
                </p>
              </div>

              <WhyChooseUs language={language}/>

              {/* ===== FACILITIES ===== */}
              <div
                id="facilities"
                className="py-20 bg-gray-900 text-white text-center"
              >
                <h2 className="text-4xl font-bold mb-12">
                  {language === "en" ? "Our Premium Facilities" : "हमारी सुविधाएं"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 px-5 md:px-10">

                  <div className="bg-black p-6 rounded-xl">
                    <div className="text-4xl mb-3">🏨</div>
                    <h3>{language === "en" ? "Rooms" : "कमरे"}</h3>
                  </div>

                  <div className="bg-black p-6 rounded-xl">
                    <div className="text-4xl mb-3">🍽</div>
                    <h3>{language === "en" ? "Restaurant" : "रेस्टोरेंट"}</h3>
                  </div>

                  <div className="bg-black p-6 rounded-xl">
                    <div className="text-4xl mb-3">🎉</div>
                    <h3>{language === "en" ? "Banquet" : "बैंक्वेट"}</h3>
                  </div>

                  <div className="bg-black p-6 rounded-xl">
                    <div className="text-4xl mb-3">🏋️</div>
                    <h3>{language === "en" ? "Gym" : "जिम"}</h3>
                  </div>

                  <div className="bg-black p-6 rounded-xl">
                    <div className="text-4xl mb-3">🚗</div>
                    <h3>{language === "en" ? "Parking" : "पार्किंग"}</h3>
                  </div>

                </div>
              </div>

              {/* ===== BANQUET ===== */}
              <div
                id="banquet"
                className="py-20 bg-gradient-to-r from-yellow-500 to-yellow-300 text-black text-center"
              >
                <h2 className="text-4xl font-bold mb-10">
                  {language === "en"
                    ? "Host Your Events With Us"
                    : "अपने कार्यक्रम हमारे साथ आयोजित करें"}
                </h2>

                <div className="flex flex-wrap justify-center gap-10 px-5 md:px-10">

                  <div className="bg-white p-8 rounded-xl shadow w-80">
                    <h3 className="text-xl font-semibold mb-2">
                      {language === "en" ? "Grand Hall" : "ग्रैंड हॉल"}
                    </h3>
                    <p>400 Guests</p>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow w-80">
                    <h3 className="text-xl font-semibold mb-2">
                      {language === "en" ? "Medium Hall" : "मीडियम हॉल"}
                    </h3>
                    <p>150 Guests</p>
                  </div>

                  <div className="bg-white p-8 rounded-xl shadow w-80">
                    <h3 className="text-xl font-semibold mb-2">
                      {language === "en" ? "Conference Hall" : "कॉन्फ्रेंस हॉल"}
                    </h3>
                    <p>200 Guests</p>
                  </div>

                </div>

                <button className="mt-10 bg-black text-white px-8 py-3 rounded-full">
                  {language === "en" ? "Book Banquet Now" : "अभी बुक करें"}
                </button>
              </div>

              {/* ===== ROOMS ===== */}
              <Rooms language={language}/>

              {/* ===== GALLERY ===== */}
              <Gallery language={language}/>

              {/* ===== FOOTER ===== */}
              <Footer language={language}/>
            </>
          }
        />

        {/* ================= BOOKING PAGE ================= */}
        <Route path="/booking" element={<Booking language={language} />} />
      </Routes>
    </div>
  );
}

export default App;