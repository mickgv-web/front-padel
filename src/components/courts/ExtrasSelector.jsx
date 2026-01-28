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
      <h4 className="text-lg font-semibold mb-3">Extras</h4>

      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() => toggle(1)}
          className={`
            px-4 py-2 rounded-full border-2 transition
            ${
              extras.includes(1)
                ? "bg-[#C7FF41] text-[#0A1A2F] border-[#C7FF41]"
                : "border-[#C7FF41] text-[#C7FF41] hover:bg-[#C7FF41] hover:text-[#0A1A2F]"
            }
          `}
        >
          Luz artificial
        </button>

        <button
          onClick={() => toggle(3)}
          className={`
            px-4 py-2 rounded-full border-2 transition
            ${
              extras.includes(3)
                ? "bg-[#C7FF41] text-[#0A1A2F] border-[#C7FF41]"
                : "border-[#C7FF41] text-[#C7FF41] hover:bg-[#C7FF41] hover:text-[#0A1A2F]"
            }
          `}
        >
          Pelotas premium
        </button>
      </div>
    </div>
  );
}
