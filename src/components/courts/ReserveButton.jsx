import { useState } from "react";
import { apiFetch } from "../../services/api";
import { useNavigate } from "react-router-dom";
import ModalReservaConfirm from "../modals/ModalReservaConfirm";
import ModalSuccess from "../modals/ModalSuccess";

export default function ReserveButton({ disabled, pista, fecha, slots, extras, price }) {
  const [open, setOpen] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const navigate = useNavigate();

  const franjas = pista.disponibles
    .filter(s => slots.includes(s.horario_id))
    .map(s => s.franja);

  const handleConfirm = async () => {
    try {
      const payload = {
        pista_id: pista.pista_id,
        fecha,
        horarios: slots,
        extras
      };

      await apiFetch("/api/reservas", {
        method: "POST",
        body: JSON.stringify(payload)
      });

      setOpen(false);
      setOpenSuccess(true);

    } catch (err) {
      console.error("Error al reservar:", err);
      alert("Hubo un error al crear la reserva");
    }
  };

  return (
    <>
      <button
        disabled={disabled}
        onClick={() => setOpen(true)}
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

      <ModalReservaConfirm
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleConfirm}
        pistaNombre={pista.pista_nombre}
        fecha={fecha}
        franjas={franjas}
        extras={extras}
        precio={price}
      />

      <ModalSuccess 
        open={openSuccess} 
        message="Reserva completada" 
        onFinish={() => navigate("/mis-reservas")}
      />
    </>
  );
}
