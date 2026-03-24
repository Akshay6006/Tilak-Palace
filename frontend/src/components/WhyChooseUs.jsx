function WhyChooseUs({ language }) {
  const features = [
    {
      icon: "⭐",
      title_en: "Premium Service",
      title_hi: "प्रीमियम सेवा",
      desc_en: "Experience top-class hospitality",
      desc_hi: "उत्तम सेवा का अनुभव करें"
    },
    {
      icon: "📍",
      title_en: "Prime Location",
      title_hi: "बेहतरीन स्थान",
      desc_en: "Located in the heart of the city",
      desc_hi: "शहर के केंद्र में स्थित"
    },
    {
      icon: "💰",
      title_en: "Affordable Pricing",
      title_hi: "किफायती कीमत",
      desc_en: "Luxury at a reasonable price",
      desc_hi: "उचित कीमत पर लक्ज़री"
    },
    {
      icon: "⏰",
      title_en: "24/7 Support",
      title_hi: "24/7 सेवा",
      desc_en: "Always ready to assist you",
      desc_hi: "हमेशा आपकी सेवा में"
    }
  ];

  return (
    <div className="py-20 bg-white text-center">
      <h2 className="text-4xl font-bold mb-12">
        {language === "en" ? "Why Choose Us" : "हमें क्यों चुनें"}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 px-5 md:px-10">
        {features.map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
          >
            <div className="text-4xl mb-4">{item.icon}</div>

            <h3 className="text-xl font-semibold mb-2">
              {language === "en" ? item.title_en : item.title_hi}
            </h3>

            <p className="text-gray-600">
              {language === "en" ? item.desc_en : item.desc_hi}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhyChooseUs;