import { useState } from "react";
import RolesTable from "./RolesTable";
import PistasTable from "./PistasTable";
import HorariosTable from "./HorariosTable";
import ExtrasTable from "./ExtrasTable";

export default function AdminPanel() {
  const [section, setSection] = useState("roles");

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-[#C7FF41]">Panel de Administración</h1>

      <div className="flex gap-4 mb-8">
        {["roles", "pistas", "horarios", "extras"].map(s => (
          <button
            key={s}
            onClick={() => setSection(s)}
            className={`px-4 py-2 rounded-full border ${
              section === s
                ? "bg-[#C7FF41] text-[#0A1A2F]"
                : "border-white/20 text-white hover:bg-white/10"
            }`}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      {section === "roles" && <RolesTable />}
      {section === "pistas" && <PistasTable />}
      {section === "horarios" && <HorariosTable />}
      {section === "extras" && <ExtrasTable />}
    </div>
  );
}
