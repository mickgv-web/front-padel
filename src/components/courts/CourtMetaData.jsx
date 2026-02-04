import { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";
import { BsHouseFill, BsCloudRainFill, BsPeopleFill, BsCoin } from "react-icons/bs";

export default function CourtMetaData({ pistaId }) {
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    apiFetch("/api/pistas")
      .then(data => {
        const pista = data.find(p => p.id === pistaId);
        setMeta(pista || null);
      })
      .catch(() => setMeta(null));
  }, [pistaId]);

  if (!meta) return null;

  return (
    <div className="flex items-center gap-4 text-white/60 text-sm mb-4">

      <div className="flex items-center gap-1">
        {meta.cubierta ? <BsHouseFill /> : <BsCloudRainFill />}
        <span>{meta.cubierta ? "Cubierta" : "Exterior"}</span>
      </div>

      <div className="flex items-center gap-1">
        <BsPeopleFill />
        <span>x{meta.plazas}</span>
      </div>

      <div className="flex items-center gap-1">
        <BsCoin />
        <span>{meta.precio_base} €</span>
      </div>

    </div>
  );
}
