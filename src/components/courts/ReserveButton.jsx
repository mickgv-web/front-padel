import { apiFetch } from "../../services/api";

export default function ReserveButton({ disabled, pista, fecha, slots, extras }) {
  const handleReserve = async () => {
    try {
      const payload = {
        pista_id: pista.pista_id,
        fecha: fecha,
        horarios: slots,
        extras: extras
      };

      const reserva = await apiFetch("/api/reservas", {
        method: "POST",
        body: JSON.stringify(payload)
      });

      console.log("Reserva creada:", reserva);

      alert(`Reserva confirmada en ${pista.pista_nombre} para el ${fecha}`);

      // Aquí luego puedes:
      // - redirigir a "Mis reservas"
      // - mostrar un modal
      // - resetear selección
    } catch (err) {
      console.error("Error al reservar:", err);
      alert("Hubo un error al crear la reserva");
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={handleReserve}
      className={`
        mt-6 w-full px-10 py-3 rounded-full font-bold text-lg tracking-wide transition
        ${
          disabled
            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
            : "bg-[#C7FF41] text-[#0A1A2F] hover:bg-[#b8f63a]"
        }
      `}
    >
      Reservar
    </button>
  );
}
