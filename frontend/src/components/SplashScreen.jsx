import logo from "../assets/21.png";

function SplashScreen() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black text-white">

      <img src={logo} alt="logo" className="h-24 w-24 mb-4 animate-pulse" />

      <h1 className="text-3xl font-bold text-yellow-400">
        Tilak Palace
      </h1>

    </div>
  );
}

export default SplashScreen;