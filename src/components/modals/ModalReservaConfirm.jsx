import Modal from "../ui/Modal";

export default function ModalReservaConfirm({
  open,
  onCancel,
  onConfirm,
  pistaNombre,
  fecha,
  franjas,
  extras,
  precio
}) {
  return (
    <Modal open={open} onClose={onCancel}>
      <h2 className="text-xl font-bold text-[#C7FF41] mb-4">
        Confirmar reserva
      </h2>

      <div className="text-gray-300 space-y-3">

        <p>
          <span className="font-semibold text-white">Pista:</span> {pistaNombre}
        </p>

        <p>
          <span className="font-semibold text-white">Fecha:</span> {fecha}
        </p>

        <div>
          <span className="font-semibold text-white">Franjas:</span>
          <ul className="ml-4 mt-1 list-disc">
            {franjas.map(f => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>

        {extras.length > 0 && (
          <div>
            <span className="font-semibold text-white">Extras:</span>
            <ul className="ml-4 mt-1 list-disc">
              {extras.map(e => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-xl font-bold text-[#C7FF41] mt-4">
          Total: {precio} €
        </p>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-full border border-gray-500 text-gray-300 hover:bg-gray-700 transition"
        >
          Cancelar
        </button>

        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-full border border-[#C7FF41] text-[#C7FF41] hover:bg-[#C7FF41] hover:text-[#0A1A2F] transition"
        >
          Confirmar reserva
        </button>
      </div>
    </Modal>
  );
}
