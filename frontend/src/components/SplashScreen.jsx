import { useEffect, useState } from "react";
import logo from "../assets/21.png";

function SplashScreen() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 500);
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <img
        src={logo}
        alt="logo"
        className={`w-32 md:w-48 transition-all duration-1000 ${
          animate ? "scale-125 opacity-0" : "scale-100 opacity-100"
        }`}
      />
    </div>
  );
}

export default SplashScreen;