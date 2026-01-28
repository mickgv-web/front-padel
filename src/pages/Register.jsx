import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { MdPersonAdd } from "react-icons/md";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    dni: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await register(form);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A1A2F] px-4">

      {/* Card */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl shadow-xl w-full max-w-md text-white">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <MdPersonAdd className="text-4xl text-[#C7FF41]" />
          <h2 className="text-3xl font-extrabold tracking-wide">Crear cuenta</h2>
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            name="nombre"
            placeholder="Nombre"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-[#C7FF41] outline-none transition"
            onChange={handleChange}
          />

          <input
            name="dni"
            placeholder="DNI"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-[#C7FF41] outline-none transition"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-[#C7FF41] outline-none transition"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-[#C7FF41] outline-none transition"
            onChange={handleChange}
          />

          {/* Botón principal */}
          <button
            type="submit"
            className="w-full bg-[#C7FF41] text-[#0A1A2F] py-3 rounded-full font-bold tracking-wide hover:bg-[#b8f63a] transition"
          >
            Registrarse
          </button>
        </form>

        {/* Link a login */}
        <p className="text-center text-sm text-gray-300 mt-6">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="text-[#C7FF41] font-semibold hover:opacity-80 transition"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
