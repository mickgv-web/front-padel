import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import CourtCard from "../components/courts/CourtCard";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });

  const [availability, setAvailability] = useState([]);

  useEffect(() => {
    apiFetch(`/api/disponibilidad?fecha=${selectedDate}`)
      .then(data => setAvailability(data))
      .catch(err => console.error("Error disponibilidad:", err));
  }, [selectedDate]);

  return (
    <div className="min-h-screen bg-[#0A1A2F] text-white px-6 py-10">

      {/* Selector de fecha */}
      <div className="max-w-md mx-auto mb-10">
        <label className="block mb-2 text-lg font-semibold tracking-wide">
          Selecciona fecha
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-[#C7FF41] outline-none transition"
        />
      </div>

      {/* Lista de pistas */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {availability.map(court => (
          <CourtCard
            key={court.pista_id}
            pista={court}
            fecha={selectedDate}
          />
        ))}
      </div>
    </div>
  );
}
