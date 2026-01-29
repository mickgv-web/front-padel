import { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";
import Modal from "../../components/ui/Modal";
import ModalConfirm from "../../components/ui/ModalConfirm";

export default function PistasTable() {
  const [pistas, setPistas] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editPista, setEditPista] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    cubierta: false,
    plazas: 4,
    precio_base: 0
  });

  useEffect(() => {
    apiFetch("/admin/pistas").then(setPistas);
  }, []);

  // -----------------------------
  // CREAR
  // -----------------------------
  const handleAdd = async () => {
    if (!form.nombre.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    try {
      const res = await apiFetch("/admin/pistas", {
        method: "POST",
        body: JSON.stringify(form)
      });

      setPistas(prev => [...prev, { id: res.id, ...form }]);
      setOpenAdd(false);
      setForm({ nombre: "", cubierta: false, plazas: 4, precio_base: 0 });
    } catch (err) {
      alert(err.error || "No se pudo crear la pista");
    }
  };

  // -----------------------------
  // EDITAR
  // -----------------------------
  const handleEdit = async () => {
    try {
      const updated = await apiFetch(`/admin/pistas/${editPista.id}`, {
        method: "PUT",
        body: JSON.stringify({
          nombre: editPista.nombre,
          cubierta: editPista.cubierta,
          plazas: editPista.plazas,
          precio_base: editPista.precio_base
        })
      });

      setPistas(prev =>
        prev.map(p => (p.id === updated.id ? updated : p))
      );
    } catch (err) {
      alert(err.error || "No se pudo actualizar la pista");
    }

    setEditPista(null);
  };

  // -----------------------------
  // ELIMINAR
  // -----------------------------
  const handleDelete = async () => {
    try {
      await apiFetch(`/admin/pistas/${deleteId}`, { method: "DELETE" });
      setPistas(prev => prev.filter(p => p.id !== deleteId));
    } catch (err) {
      alert(err.error || "No se pudo eliminar la pista");
    }

    setDeleteId(null);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Pistas</h2>
        <button
          onClick={() => setOpenAdd(true)}
          className="px-4 py-2 rounded-full bg-[#C7FF41] text-[#0A1A2F]"
        >
          Añadir pista
        </button>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/20">
            <th className="py-2">ID</th>
            <th>Nombre</th>
            <th>Cubierta</th>
            <th>Plazas</th>
            <th>Precio base</th>
            <th className="text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pistas.map(p => (
            <tr key={p.id} className="border-b border-white/10">
              <td className="py-2">{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.cubierta ? "Sí" : "No"}</td>
              <td>{p.plazas}</td>
              <td>{p.precio_base} €</td>
              <td className="text-right space-x-4">
                <button
                  onClick={() => setEditPista(p)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Editar
                </button>

                <button
                  onClick={() => setDeleteId(p.id)}
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
        <h3 className="text-xl font-bold mb-4 text-white">Nueva pista</h3>

        <input
          className="w-full p-2 rounded bg-white/10 border border-white/20 mb-3 text-gray-300"
          placeholder="Nombre"
          value={form.nombre}
          onChange={e => setForm({ ...form, nombre: e.target.value })}
        />

        <label className="flex items-center gap-2 mb-3 text-white">
          <input
            type="checkbox"
            checked={form.cubierta}
            onChange={e => setForm({ ...form, cubierta: e.target.checked })}
          />
          Cubierta
        </label>

        <input
          type="number"
          className="text-gray-300 w-full p-2 rounded bg-white/10 border border-white/20 mb-3"
          placeholder="Plazas"
          value={form.plazas}
          onChange={e => setForm({ ...form, plazas: Number(e.target.value) })}
        />

        <input
          type="number"
          className="text-gray-300 w-full p-2 rounded bg-white/10 border border-white/20 mb-4"
          placeholder="Precio base"
          value={form.precio_base}
          onChange={e => setForm({ ...form, precio_base: Number(e.target.value) })}
        />

        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-full bg-[#C7FF41] text-[#0A1A2F]"
        >
          Crear
        </button>
      </Modal>

      {/* Modal editar */}
      <Modal open={!!editPista} onClose={() => setEditPista(null)}>
        <h3 className="text-xl font-bold mb-4 text-white">Editar pista</h3>

        <input
          className="w-full p-2 rounded bg-white/10 border border-white/20 mb-3 text-gray-300"
          value={editPista?.nombre || ""}
          onChange={e => setEditPista({ ...editPista, nombre: e.target.value })}
        />

        <label className="flex items-center gap-2 mb-3 text-white">
          <input
            type="checkbox"
            checked={editPista?.cubierta || false}
            onChange={e => setEditPista({ ...editPista, cubierta: e.target.checked })}
          />
          Cubierta
        </label>

        <input
          type="number"
          className="text-gray-300 w-full p-2 rounded bg-white/10 border border-white/20 mb-3"
          value={editPista?.plazas || 0}
          onChange={e => setEditPista({ ...editPista, plazas: Number(e.target.value) })}
        />

        <input
          type="number"
          className="text-gray-300 w-full p-2 rounded bg-white/10 border border-white/20 mb-4"
          value={editPista?.precio_base || 0}
          onChange={e => setEditPista({ ...editPista, precio_base: Number(e.target.value) })}
        />

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
        title="Eliminar pista"
        message="¿Seguro que quieres eliminar esta pista?"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
