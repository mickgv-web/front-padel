const baseClasses = "px-3 py-1 text-xs rounded-full border-2 transition font-medium tracking-wide";

const stateClasses = {
  selected: "bg-[#C7FF41] text-[#0A1A2F] border-[#C7FF41]",
  eligible: "border-[#C7FF41] text-[#C7FF41] hover:bg-[#C7FF41] hover:text-[#0A1A2F]",
  notEligible: "border-white/20 text-white/30 cursor-not-allowed",
  disabled: "border-white/10 text-white/20 bg-transparent cursor-not-allowed"
};

export default function TimeSlotButton({ slot, selected, eligible, disabled, onClick }) {
  let variant = "";

  if (disabled) variant = stateClasses.disabled;
  else if (selected) variant = stateClasses.selected;
  else if (eligible) variant = stateClasses.eligible;
  else variant = stateClasses.notEligible;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variant}`}
    >
      {slot.franja}
    </button>
  );
}
