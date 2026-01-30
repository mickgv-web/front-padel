import { MdSportsTennis } from "react-icons/md";
import { Link } from "react-router-dom";
import background from '../assets/img/background.jpg';

export default function Landing() {
  return (
    <div className="relative min-h-screen flex items-center justify-center text-white">

      {/* Hero image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${background})`,
        }}
      />

      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-[#0A1A2F]/80 backdrop-blur-sm" />

      {/* Contenido */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        <MdSportsTennis className="text-7xl mx-auto mb-6 text-[#C7FF41]" />

        <h1 className="text-5xl font-extrabold tracking-wide mb-4">
          Vive el Pádel al Máximo
        </h1>

        <p className="text-lg font-light text-gray-200 mb-10">
          Reserva tu pista, organiza tus partidos y disfruta de una experiencia
          deportiva moderna, rápida y diseñada para ti.
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          {/* Botón principal */}
          <Link
            to="/login"
            className="bg-[#C7FF41] text-[#0A1A2F] font-bold px-8 py-3 rounded-full shadow-lg hover:bg-[#b8f63a] transition tracking-wide"
          >
            Iniciar sesión
          </Link>

          {/* Botón outlined */}
          <Link
            to="/register"
            className="border-2 border-[#C7FF41] text-[#C7FF41] font-semibold px-8 py-3 rounded-full hover:bg-[#C7FF41] hover:text-[#0A1A2F] transition tracking-wide"
          >
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}
