import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { MdLogin } from "react-icons/md";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate("/dashboard");
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
          <MdLogin className="text-4xl text-[#C7FF41]" />
          <h2 className="text-3xl font-extrabold tracking-wide">Iniciar sesión</h2>
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-[#C7FF41] outline-none transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-[#C7FF41] outline-none transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Botón principal */}
          <button
            type="submit"
            className="w-full bg-[#C7FF41] text-[#0A1A2F] py-3 rounded-full font-bold tracking-wide hover:bg-[#b8f63a] transition"
          >
            Entrar
          </button>
        </form>

        {/* Link a registro */}
        <p className="text-center text-sm text-gray-300 mt-6">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-[#C7FF41] font-semibold hover:opacity-80 transition"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
