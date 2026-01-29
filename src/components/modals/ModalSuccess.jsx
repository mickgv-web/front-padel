import Modal from "../ui/Modal";
import { useEffect } from "react";

export default function ModalSuccess({ open, message, onFinish }) {
  useEffect(() => {
    if (!open) return;

    const timer = setTimeout(() => {
      onFinish();
    }, 1500);

    return () => clearTimeout(timer);
  }, [open, onFinish]);

  return (
    <Modal open={open} onClose={() => {}}>
      <div className="flex flex-col items-center text-center py-6">

        {/* Check animado */}
        <div className="w-16 h-16 mb-4 rounded-full border-4 border-[#C7FF41] flex items-center justify-center animate-pulse">
          <span className="text-4xl text-[#C7FF41]">✓</span>
        </div>

        <p className="text-xl font-semibold text-white">{message}</p>
      </div>
    </Modal>
  );
}
