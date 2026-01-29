import Modal from "./Modal";

export default function ModalConfirm({
  open,
  title,
  message,
  onCancel,
  onConfirm
}) {
  return (
    <Modal open={open} onClose={onCancel}>
      <h2 className="text-xl font-bold text-[#C7FF41] mb-4">{title}</h2>

      <p className="text-gray-300 mb-6">{message}</p>

      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-full border border-gray-500 text-gray-300 hover:bg-gray-700 transition"
        >
          No
        </button>

        <button
          onClick={onConfirm}
          className="px-4 py-2 rounded-full border border-red-500 text-red-400 hover:bg-red-500 hover:text-white transition"
        >
          Sí, cancelar
        </button>
      </div>
    </Modal>
  );
}
