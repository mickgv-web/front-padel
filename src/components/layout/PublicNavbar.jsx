import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function PublicNavbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-green-700 text-white shadow">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-wide">
          Club de Pádel
        </Link>

        {/* Links */}
        <div className="flex items-center gap-4">
          {!user && (
            <>
              <Link
                to="/login"
                className="hover:text-gray-200 transition"
              >
                Iniciar sesión
              </Link>

              <Link
                to="/register"
                className="bg-white text-green-700 px-3 py-1 rounded-md font-semibold hover:bg-gray-100 transition"
              >
                Registrarse
              </Link>
            </>
          )}

          {user && (
            <>
              <span className="font-semibold">
                Hola, {user.nombre}
              </span>

              <button
                onClick={logout}
                className="bg-red-600 px-3 py-1 rounded-md hover:bg-red-700 transition"
              >
                Salir
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
