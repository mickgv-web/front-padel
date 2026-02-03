import { useState, useEffect } from "react";
import { apiFetch } from "../../services/api";
import TimeSlotButton from "./TimeSlotButton";
import ExtrasSelector from "./ExtrasSelector";
import PriceDisplay from "./PriceDisplay";
import ReserveButton from "./ReserveButton";

export default function CourtCard({ pista, fecha }) {
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [extras, setExtras] = useState([]);
  const [price, setPrice] = useState(null);

  // Agrupar franjas por turno
  const groupedSlots = {
    mañana: [],
    tarde: [],
    noche: []
  };

  pista.disponibles.forEach(slot => {
    groupedSlots[slot.turno].push(slot);
  });

  // Comprobar contigüidad
  const isContiguous = (selected, newId) => {
    if (selected.length === 0) return true;
    const sorted = [...selected].sort((a, b) => a - b);
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    return newId === first - 1 || newId === last + 1;
  };

  // Calcular franjas elegibles visualmente
  const getEligibleSlots = () => {
    if (selectedSlots.length === 0) {
      return pista.disponibles.map(s => s.horario_id);
    }

    const sorted = [...selectedSlots].sort((a, b) => a - b);
    const first = sorted[0];
    const last = sorted[sorted.length - 1];

    return [first - 1, last + 1];
  };

  const eligibleSlots = getEligibleSlots();

  const handleSlotClick = (slotId) => {
    // Si ya está seleccionado → solo permitir desmarcar extremos
    if (selectedSlots.includes(slotId)) {
      const sorted = [...selectedSlots].sort((a, b) => a - b);
      const first = sorted[0];
      const last = sorted[sorted.length - 1];

      // Si intenta desmarcar algo que no es extremo → ignorar
      if (slotId !== first && slotId !== last) return;

      setSelectedSlots(selectedSlots.filter(id => id !== slotId));
      return;
    }

    // Si no está seleccionado → solo permitir si es contiguo
    if (isContiguous(selectedSlots, slotId)) {
      setSelectedSlots(prev => [...prev, slotId]);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (selectedSlots.length === 0) {
      setPrice(null);
      return;
    }

    Promise.all(
      selectedSlots.map(slotId =>
        apiFetch("/api/calcular_precio", {
          method: "POST",
          body: JSON.stringify({
            pista_id: pista.pista_id,
            horario_id: slotId,
            extras
          })
        })
      )
    ).then(results => {
      const total = results.reduce((sum, r) => sum + r.precio, 0);
      setPrice(total);
    });
  }, [selectedSlots, extras, pista.pista_id]);


  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg">

      <h3 className="text-2xl font-bold mb-6 text-[#C7FF41]">
        {pista.pista_nombre}
      </h3>

      {/* Franjas agrupadas por turno */}
      {["mañana", "tarde", "noche"].map(turno => (
        groupedSlots[turno].length > 0 && (
          <div key={turno} className="mb-6">
            <h4 className="text-lg font-semibold mb-2 capitalize">{turno}</h4>
            <div className="flex flex-wrap gap-2">
              {groupedSlots[turno].map(slot => {
                const id = slot.horario_id;

                return (
                  <TimeSlotButton
                    key={id}
                    slot={slot}
                    selected={selectedSlots.includes(id)}
                    eligible={eligibleSlots.includes(id)}
                    disabled={false} // futuro: !slot.disponible
                    onClick={() => handleSlotClick(id)}
                  />
                );
              })}
            </div>
          </div>
        )
      ))}

      {/* Extras */}
      <ExtrasSelector extras={extras} setExtras={setExtras} />

      {/* Precio */}
      <PriceDisplay price={price} />

      {/* Reservar */}
      <ReserveButton
        disabled={selectedSlots.length === 0}
        pista={pista}
        fecha={fecha}
        slots={selectedSlots}
        extras={extras}
        price={price}
      />
    </div>
  );
}
