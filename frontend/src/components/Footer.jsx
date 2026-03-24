function Footer({ language }) {
  return (
    <div id="contact" className="bg-black text-white pt-16 pb-10 px-5 md:px-10">

      <div className="grid md:grid-cols-4 gap-10 text-left">

        {/* HOTEL INFO */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            Tilak Palace
          </h2>
          <p className="text-gray-400">
            {language === "en"
              ? "Luxury hotel, banquet & restaurant in Muzaffarpur."
              : "मुजफ्फरपुर में लक्ज़री होटल, बैंक्वेट और रेस्टोरेंट।"}
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl mb-4">
            {language === "en" ? "Quick Links" : "त्वरित लिंक"}
          </h3>

          <ul className="space-y-2 text-gray-400">
            <li>Home</li>
            <li>Rooms</li>
            <li>Restaurant</li>
            <li>Banquet</li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-xl mb-4">
            {language === "en" ? "Services" : "सेवाएं"}
          </h3>

          <ul className="space-y-2 text-gray-400">
            <li>Room Booking</li>
            <li>Event Booking</li>
            <li>Food Ordering</li>
            <li>Gym Access</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-xl mb-4">
            {language === "en" ? "Contact Us" : "संपर्क करें"}
          </h3>

          <p className="text-gray-400">Muzaffarpur, Bihar</p>
          <p className="text-gray-400">+91 9876543210</p>
          <p className="text-gray-400">tilakpalace@gmail.com</p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="text-center text-gray-500 mt-10 border-t border-gray-700 pt-5">
        © 2026 Tilak Palace. {language === "en" ? "All Rights Reserved" : "सर्वाधिकार सुरक्षित"}
      </div>

    </div>
  );
}

export default Footer;