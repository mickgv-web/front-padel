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
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center gap-2 mb-6">
          <MdLogin className="text-3xl text-green-600" />
          <h2 className="text-2xl font-bold text-gray-800">Iniciar sesión</h2>
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-green-700 font-semibold hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
