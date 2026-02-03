export default function TimeSlotButton({ slot, selected, eligible, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-3 py-1 text-xs rounded-full border-2 transition font-medium tracking-wide

        ${selected && "bg-[#C7FF41] text-[#0A1A2F] border-[#C7FF41]"}

        ${!selected && eligible && "border-[#C7FF41] text-[#C7FF41] hover:bg-[#C7FF41] hover:text-[#0A1A2F]"}

        ${!selected && !eligible && !disabled && "border-white/20 text-white/30 cursor-not-allowed"}

        ${disabled && "border-white/10 text-white/20 bg-transparent cursor-not-allowed"}
      `}
    >
      {slot.franja}
    </button>
  );
}
