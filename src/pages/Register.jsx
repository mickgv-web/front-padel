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
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center gap-2 mb-6">
          <MdPersonAdd className="text-3xl text-green-600" />
          <h2 className="text-2xl font-bold text-gray-800">Crear cuenta</h2>
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="nombre"
            placeholder="Nombre"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            onChange={handleChange}
          />

          <input
            name="dni"
            placeholder="DNI"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Registrarse
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-green-700 font-semibold hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
