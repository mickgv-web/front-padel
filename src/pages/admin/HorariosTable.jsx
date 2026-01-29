import { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";
import Modal from "../../components/ui/Modal";
import ModalConfirm from "../../components/ui/ModalConfirm";

export default function HorariosTable() {
  const [horarios, setHorarios] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editHorario, setEditHorario] = useState(null);

  const [form, setForm] = useState({
    franja: "",
    turno: ""
  });

  useEffect(() => {
    apiFetch("/admin/horarios").then(setHorarios);
  }, []);

  // -----------------------------
  // CREAR
  // -----------------------------
  const handleAdd = async () => {
    if (!form.franja.trim() || !form.turno.trim()) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await apiFetch("/admin/horarios", {
        method: "POST",
        body: JSON.stringify(form)
      });

      setHorarios(prev => [...prev, { id: res.id, ...form }]);
      setOpenAdd(false);
      setForm({ franja: "", turno: "" });
    } catch (err) {
      alert(err.error || "No se pudo crear el horario");
    }
  };

  // -----------------------------
  // EDITAR
  // -----------------------------
  const handleEdit = async () => {
    try {
      const updated = await apiFetch(`/admin/horarios/${editHorario.id}`, {
        method: "PUT",
        body: JSON.stringify({
          franja: editHorario.franja,
          turno: editHorario.turno
        })
      });

      setHorarios(prev =>
        prev.map(h => (h.id === updated.id ? updated : h))
      );
    } catch (err) {
      alert(err.error || "No se pudo actualizar el horario");
    }

    setEditHorario(null);
  };

  // -----------------------------
  // ELIMINAR
  // -----------------------------
  const handleDelete = async () => {
    try {
      await apiFetch(`/admin/horarios/${deleteId}`, { method: "DELETE" });
      setHorarios(prev => prev.filter(h => h.id !== deleteId));
    } catch (err) {
      alert(err.error || "No se pudo eliminar el horario");
    }

    setDeleteId(null);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Horarios</h2>
        <button
          onClick={() => setOpenAdd(true)}
          className="px-4 py-2 rounded-full bg-[#C7FF41] text-[#0A1A2F]"
        >
          Añadir horario
        </button>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/20">
            <th className="py-2">ID</th>
            <th>Franja</th>
            <th>Turno</th>
            <th className="text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map(h => (
            <tr key={h.id} className="border-b border-white/10">
              <td className="py-2">{h.id}</td>
              <td>{h.franja}</td>
              <td>{h.turno}</td>
              <td className="text-right space-x-4">
                <button
                  onClick={() => setEditHorario(h)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Editar
                </button>

                <button
                  onClick={() => setDeleteId(h.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal añadir */}
      <Modal open={openAdd} onClose={() => setOpenAdd(false)}>
        <h3 className="text-xl font-bold text-white mb-4">Nuevo horario</h3>

        <input
          className="w-full p-2 rounded bg-white/10 border border-white/20 mb-3 text-gray-300"
          placeholder="Franja (ej: 10:00 - 11:00)"
          value={form.franja}
          onChange={e => setForm({ ...form, franja: e.target.value })}
        />

        <select
          className="text-gray-500 w-full p-2 rounded bg-white/10 border border-white/20 mb-4"
          value={form.turno}
          onChange={e => setForm({ ...form, turno: e.target.value })}
        >
          <option value="">Selecciona turno</option>
          <option value="mañana">Mañana</option>
          <option value="tarde">Tarde</option>
          <option value="noche">Noche</option>
        </select>

        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-full bg-[#C7FF41] text-[#0A1A2F]"
        >
          Crear
        </button>
      </Modal>

      {/* Modal editar */}
      <Modal open={!!editHorario} onClose={() => setEditHorario(null)}>
        <h3 className="text-xl font-bold text-white mb-4">Editar horario</h3>

        <input
          className="w-full p-2 rounded bg-white/10 border border-white/20 mb-3 text-gray-300"
          value={editHorario?.franja || ""}
          onChange={e => setEditHorario({ ...editHorario, franja: e.target.value })}
        />

        <select
          className="text-gray-500 w-full p-2 rounded bg-white/10 border border-white/20 mb-4"
          value={editHorario?.turno || ""}
          onChange={e => setEditHorario({ ...editHorario, turno: e.target.value })}
        >
          <option value="">Selecciona turno</option>
          <option value="mañana">Mañana</option>
          <option value="tarde">Tarde</option>
          <option value="noche">Noche</option>
        </select>

        <button
          onClick={handleEdit}
          className="px-4 py-2 rounded-full bg-[#C7FF41] text-[#0A1A2F]"
        >
          Guardar
        </button>
      </Modal>

      {/* Modal eliminar */}
      <ModalConfirm
        open={deleteId !== null}
        title="Eliminar horario"
        message="¿Seguro que quieres eliminar este horario?"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
