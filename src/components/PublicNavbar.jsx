import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { FiMenu, FiX } from "react-icons/fi";

const NAV_ITEMS = {
  0: [
    { to: "/login", label: "Iniciar sesión" },
    { to: "/register", label: "Crear cuenta", button: true }
  ],
  1: [
    { to: "/admin", label: "Panel admin" },
    { to: "/dashboard", label: "Crear reserva" },
    { to: "/mis-reservas", label: "Mis reservas" }
  ],
  2: [
    { to: "/dashboard", label: "Crear reserva" },
    { to: "/mis-reservas", label: "Mis reservas" }
  ]
};

export default function PublicNavbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const role = user ? user.rol_id : 0; 
  const items = NAV_ITEMS[role] || NAV_ITEMS[0];

  return (
    <header className="bg-[#0A1A2F] text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-[#C7FF41] hover:opacity-90 transition"
        >
          Club de Pádel
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">

          {items.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={
                item.button
                  ? "border-2 border-[#C7FF41] text-[#C7FF41] px-5 py-2 rounded-full font-semibold hover:bg-[#C7FF41] hover:text-[#0A1A2F] transition tracking-wide"
                  : "text-white font-light hover:text-[#C7FF41] transition tracking-wide"
              }
            >
              {item.label}
            </Link>
          ))}

          {user && (
            <>
              <span className="font-light text-gray-200">
                Hola, <span className="font-semibold text-white">{user.nombre}</span>
              </span>

              <button
                onClick={logout}
                className="border-2 border-red-500 text-red-400 px-5 py-2 rounded-full font-semibold hover:bg-red-500 hover:text-white transition tracking-wide"
              >
                Salir
              </button>
            </>
          )}
        </div>

        {/* Mobile button */}
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

          {items.map(item => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={
                item.button
                  ? "border-2 border-[#C7FF41] text-[#C7FF41] px-5 py-2 rounded-full font-semibold hover:bg-[#C7FF41] hover:text-[#0A1A2F] transition tracking-wide text-center"
                  : "text-white font-light hover:text-[#C7FF41] transition tracking-wide"
              }
            >
              {item.label}
            </Link>
          ))}

          {user && (
            <>
              <span className="font-light text-gray-200">
                Hola, <span className="font-semibold text-white">{user.nombre}</span>
              </span>

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
