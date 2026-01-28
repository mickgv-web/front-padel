import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { FiMenu, FiX } from "react-icons/fi";

export default function PublicNavbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#0A1A2F] text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-[#C7FF41] hover:opacity-90 transition"
        >
          Club de Pádel
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">

          {!user && (
            <>
              <Link
                to="/login"
                className="text-white font-light hover:text-[#C7FF41] transition tracking-wide"
              >
                Iniciar sesión
              </Link>

              <Link
                to="/register"
                className="border-2 border-[#C7FF41] text-[#C7FF41] px-5 py-2 rounded-full font-semibold hover:bg-[#C7FF41] hover:text-[#0A1A2F] transition tracking-wide"
              >
                Crear cuenta
              </Link>
            </>
          )}

          {user && (
            <>
              {/* Navegación del usuario */}
              <Link
                to="/dashboard"
                className="text-white font-light hover:text-[#C7FF41] transition tracking-wide"
              >
                Crear reserva
              </Link>

              <Link
                to="/mis-reservas"
                className="text-white font-light hover:text-[#C7FF41] transition tracking-wide"
              >
                Mis reservas
              </Link>

              {/* Saludo */}
              <span className="font-light text-gray-200">
                Hola, <span className="font-semibold text-white">{user.nombre}</span>
              </span>

              {/* Logout */}
              <button
                onClick={logout}
                className="border-2 border-red-500 text-red-400 px-5 py-2 rounded-full font-semibold hover:bg-red-500 hover:text-white transition tracking-wide"
              >
                Salir
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-3xl text-[#C7FF41]"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-[#0A1A2F] border-t border-[#C7FF41]/20 px-6 py-4 flex flex-col gap-4">

          {!user && (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="text-white font-light hover:text-[#C7FF41] transition tracking-wide"
              >
                Iniciar sesión
              </Link>

              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="border-2 border-[#C7FF41] text-[#C7FF41] px-5 py-2 rounded-full font-semibold hover:bg-[#C7FF41] hover:text-[#0A1A2F] transition tracking-wide text-center"
              >
                Crear cuenta
              </Link>
            </>
          )}

          {user && (
            <>
              {/* Navegación del usuario */}
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="text-white font-light hover:text-[#C7FF41] transition tracking-wide"
              >
                Crear reserva
              </Link>

              <Link
                to="/mis-reservas"
                onClick={() => setOpen(false)}
                className="text-white font-light hover:text-[#C7FF41] transition tracking-wide"
              >
                Mis reservas
              </Link>

              {/* Saludo */}
              <span className="font-light text-gray-200">
                Hola, <span className="font-semibold text-white">{user.nombre}</span>
              </span>

              {/* Logout */}
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="border-2 border-red-500 text-red-400 px-5 py-2 rounded-full font-semibold hover:bg-red-500 hover:text-white transition tracking-wide"
              >
                Salir
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
