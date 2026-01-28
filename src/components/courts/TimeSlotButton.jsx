export default function TimeSlotButton({ slot, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        px-3 py-1 text-sm rounded-full border-2 transition
        ${
          selected
            ? "bg-[#C7FF41] text-[#0A1A2F] border-[#C7FF41] font-bold"
            : "border-[#C7FF41] text-[#C7FF41] hover:bg-[#C7FF41] hover:text-[#0A1A2F]"
        }
      `}
    >
      {slot.franja}
    </button>
  );
}
