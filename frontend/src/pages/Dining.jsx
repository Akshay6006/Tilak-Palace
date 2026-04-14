import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

function Dining() {
  const { language } = useLanguage();
  const t = translations[language];

const menu = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `${t.foodItem || "Food Item"} ${i + 1}`,
  price: 100 + i * 5,
  type: i % 2 === 0 ? "Veg" : "NonVeg", // ✅ ADD THIS
}));

  const [cart, setCart] = useState([]);
  const [tableForm, setTableForm] = useState({
  name: "",
  guests: "",
  date: "",
});
  const [receipt, setReceipt] = useState("");
const [filter, setFilter] = useState("All");
  const [showPayment, setShowPayment] = useState(false);

  const handleReceipt = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    setReceipt(reader.result);
  };

  if (file) reader.readAsDataURL(file);
};
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gray-100">

        <div
          className="h-[300px] flex items-center justify-center text-white text-4xl font-bold"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {t.diningTitle}
        </div>

        <div className="px-6 md:px-20 py-10">

          <div className="bg-white p-6 rounded-xl shadow mb-10">
            <h2 className="text-2xl font-bold mb-4">
              {t.bookTable}
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              <input
  placeholder={t.name}
  value={tableForm.name}
  onChange={(e) =>
    setTableForm({ ...tableForm, name: e.target.value })
  }
  className="p-3 border rounded"
/>
              <input type="date" className="p-3 border rounded" />
             <input
  placeholder={t.guests}
  value={tableForm.guests}
  onChange={(e) =>
    setTableForm({ ...tableForm, guests: e.target.value })
  }
  className="p-3 border rounded"
/>
            </div>

            <button
  onClick={async () => {
    await fetch("https://tilak-palace.onrender.com/book-table", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
     body: JSON.stringify(tableForm)
    });
    alert("Table booked ✅");
  }}
  className="mt-4 bg-yellow-400 px-6 py-2 rounded"
>
              {t.bookNow}
            </button>
          </div>

          <h2 className="text-3xl font-bold mb-6">
            {/* <div className="flex gap-4 mb-6 flex-wrap">
  <button onClick={() => setFilter("All")} className="px-4 py-2 bg-gray-200 rounded">
    {t.all || "All"}
  </button>
  <button onClick={() => setFilter("Veg")} className="px-4 py-2 bg-green-200 rounded">
    Veg
  </button>
  <button onClick={() => setFilter("NonVeg")} className="px-4 py-2 bg-red-200 rounded">
    Non-Veg
  </button>
</div> */}
            {t.menu}
          </h2>
        <div className="flex gap-4 mb-6 flex-wrap">
  <button onClick={() => setFilter("All")} className="px-4 py-2 bg-gray-200 rounded">
    {t.all || "All"}
  </button>
  <button onClick={() => setFilter("Veg")} className="px-4 py-2 bg-green-200 rounded">
    Veg
  </button>
  <button onClick={() => setFilter("NonVeg")} className="px-4 py-2 bg-red-200 rounded">
    Non-Veg
  </button>
</div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {menu
  .filter(item => filter === "All" || item.type === filter)
  .map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg"
              >
                <h3 className="font-semibold">{item.name}</h3>
                <p>₹{item.price}</p>

                <button
                  onClick={() => addToCart(item)}
                  className="mt-2 bg-black text-white px-3 py-1 rounded"
                >
                  {t.addToCart}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">
              {t.yourOrder}
            </h2>

            {cart.map((item, i) => (
              <p key={i}>{item.name} - ₹{item.price}</p>
            ))}

            <h3 className="mt-4 font-bold">
              {t.total}: ₹{total}
            </h3>

            <button
              onClick={() => setShowPayment(true)}
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded"
            >
              {t.payNow}
            </button>
          </div>

          {showPayment && (
            <div className="mt-10 bg-white p-6 rounded-xl shadow text-center">
              <h2 className="text-2xl font-bold mb-4">
                {t.payViaUPI}
              </h2>

              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=yourupi@upi"
                className="mx-auto mb-4"
              />
              <input type="file" onChange={handleReceipt} className="mt-4" />

<button
  onClick={async () => {
    if (!receipt) {
  alert("Please upload receipt first");
  return;
}
    await fetch("https://tilak-palace.onrender.com/upload-receipt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ receipt }),
    });

    alert("Receipt uploaded ✅");
  }}
  className="mt-3 bg-black text-white px-4 py-2 rounded"
>
  Upload Receipt
</button>

              <p>{t.upiId}: yourupi@upi</p>
            </div>
          )}

        </div>
      </div>
    </PageWrapper>
  );
}

export default Dining;