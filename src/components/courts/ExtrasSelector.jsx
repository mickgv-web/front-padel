import { BsPlusLg, BsCheckLg } from "react-icons/bs";

// Componente desacoplado (fuera del render)
function ExtraButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 text-sm px-4 py-2 rounded-full border-2 transition
        ${
          active
            ? "bg-[#C7FF41] text-[#0A1A2F] border-[#C7FF41]"
            : "border-[#C7FF41] text-[#C7FF41] hover:bg-[#C7FF41] hover:text-[#0A1A2F]"
        }
      `}
    >
      {active ? <BsCheckLg size={14} /> : <BsPlusLg size={14} />}
      {children}
    </button>
  );
}

export default function ExtrasSelector({ extras, setExtras }) {
  const toggle = (id) => {
    setExtras(prev =>
      prev.includes(id)
        ? prev.filter(e => e !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="mb-6">
      <h4 className="text-xs font-semibold mb-3 uppercase">Extras</h4>

      <div className="flex gap-4 flex-wrap">
        <ExtraButton
          active={extras.includes(1)}
          onClick={() => toggle(1)}
        >
          Luz artificial
        </ExtraButton>

        <ExtraButton
          active={extras.includes(3)}
          onClick={() => toggle(3)}
        >
          Pelotas premium
        </ExtraButton>
      </div>
    </div>
  );
}
