import { MdSportsTennis } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-600 to-green-800 flex flex-col justify-center items-center text-white px-6">
      <MdSportsTennis className="text-7xl mb-4 drop-shadow-lg" />

      <h1 className="text-4xl font-extrabold mb-2 tracking-wide">
        Club de Pádel
      </h1>

      <p className="text-lg opacity-90 mb-8 text-center max-w-md">
        Reserva tu pista, gestiona tus partidos y disfruta del deporte con una experiencia ágil y moderna.
      </p>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-white text-green-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Iniciar sesión
        </Link>

        <Link
          to="/register"
          className="bg-green-900 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-green-950 transition"
        >
          Crear cuenta
        </Link>
      </div>
    </div>
  );
}
