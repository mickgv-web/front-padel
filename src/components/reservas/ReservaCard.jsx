import { useState } from "react";
import { apiFetch } from "../../services/api";
import ModalConfirm from "../ui/ModalConfirm";

export default function ReservaCard({ reserva, onCancel }) {
  const [open, setOpen] = useState(false);

  if (!reserva) return null;

  const fecha = reserva.fecha;
  const pistaNombre = reserva.pista_nombre;
  const horarios = reserva.horarios || [];
  const total = reserva.total_precio;

  const handleConfirm = async () => {
    try {
      await apiFetch(`/api/reservas/${reserva.id}`, { method: "DELETE" });
      onCancel(reserva.id);
    } catch (err) {
      console.error(err);
      alert("No se pudo cancelar la reserva");
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg">

        {/* Pista y fecha */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-[#C7FF41]">
            {pistaNombre}
          </h3>
          <span className="text-gray-300">{fecha}</span>
        </div>

        {/* Franjas */}
        <div className="mb-4">
          <h4 className="font-semibold mb-2">Franjas reservadas</h4>
          <div className="flex flex-wrap gap-2">
            {horarios.map(h => (
              <span
                key={h.horario_reserva_id}
                className="px-3 py-1 text-sm rounded-full border border-[#C7FF41] text-[#C7FF41]"
              >
                {h.franja}
              </span>
            ))}
          </div>
        </div>

        {/* Precio total + botón cancelar */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-2xl font-extrabold text-[#C7FF41]">
            {total} €
          </div>

          <button onClick={() => setOpen(true)}
            className="px-4 py-2 rounded-full border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition"
          >
            Cancelar
          </button>

        </div>

      </div>
      <ModalConfirm
        open={open}
        title="Cancelar reserva"
        message={`¿Seguro que quieres cancelar la reserva del ${reserva.fecha} en ${reserva.pista_nombre}?`}
        onCancel={() => setOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
