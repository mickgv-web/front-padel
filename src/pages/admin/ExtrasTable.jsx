import { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";
import Modal from "../../components/ui/Modal";
import ModalConfirm from "../../components/ui/ModalConfirm";

export default function ExtrasTable() {
  const [extras, setExtras] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editExtra, setEditExtra] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    precio_extra: 0
  });

  useEffect(() => {
    apiFetch("/admin/extras").then(setExtras);
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
      const res = await apiFetch("/admin/extras", {
        method: "POST",
        body: JSON.stringify(form)
      });

      setExtras(prev => [...prev, { id: res.id, ...form }]);
      setOpenAdd(false);
      setForm({ nombre: "", precio_extra: 0 });
    } catch (err) {
      alert(err.error || "No se pudo crear el extra");
    }
  };

  // -----------------------------
  // EDITAR
  // -----------------------------
  const handleEdit = async () => {
    try {
      const updated = await apiFetch(`/admin/extras/${editExtra.id}`, {
        method: "PUT",
        body: JSON.stringify({
          nombre: editExtra.nombre,
          precio_extra: editExtra.precio_extra
        })
      });

      setExtras(prev =>
        prev.map(e => (e.id === updated.id ? updated : e))
      );
    } catch (err) {
      alert(err.error || "No se pudo actualizar el extra");
    }

    setEditExtra(null);
  };

  // -----------------------------
  // ELIMINAR
  // -----------------------------
  const handleDelete = async () => {
    try {
      await apiFetch(`/admin/extras/${deleteId}`, { method: "DELETE" });
      setExtras(prev => prev.filter(e => e.id !== deleteId));
    } catch (err) {
      alert(err.error || "No se pudo eliminar el extra");
    }

    setDeleteId(null);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Extras</h2>
        <button
          onClick={() => setOpenAdd(true)}
          className="px-4 py-2 rounded-full bg-[#C7FF41] text-[#0A1A2F]"
        >
          Añadir extra
        </button>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/20">
            <th className="py-2">ID</th>
            <th>Nombre</th>
            <th>Precio extra</th>
            <th className="text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {extras.map(e => (
            <tr key={e.id} className="border-b border-white/10">
              <td className="py-2">{e.id}</td>
              <td>{e.nombre}</td>
              <td>{e.precio_extra} €</td>
              <td className="text-right space-x-4">
                <button
                  onClick={() => setEditExtra(e)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Editar
                </button>

                <button
                  onClick={() => setDeleteId(e.id)}
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
        <h3 className="text-xl text-white font-bold mb-4">Nuevo extra</h3>

        <input
          className="w-full p-2 rounded bg-white/10 border border-white/20 mb-3 text-gray-300"
          placeholder="Nombre"
          value={form.nombre}
          onChange={e => setForm({ ...form, nombre: e.target.value })}
        />

        <input
          type="number"
          className="w-full p-2 rounded text-gray-300 bg-white/10 border border-white/20 mb-4"
          placeholder="Precio extra"
          value={form.precio_extra}
          onChange={e => setForm({ ...form, precio_extra: Number(e.target.value) })}
        />

        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-full bg-[#C7FF41] text-[#0A1A2F]"
        >
          Crear
        </button>
      </Modal>

      {/* Modal editar */}
      <Modal open={!!editExtra} onClose={() => setEditExtra(null)}>
        <h3 className="text-xl text-white font-bold mb-4">Editar extra</h3>

        <input
          className="w-full p-2 rounded bg-white/10 border border-white/20 mb-3 text-gray-300"
          value={editExtra?.nombre || ""}
          onChange={e => setEditExtra({ ...editExtra, nombre: e.target.value })}
        />

        <input
          type="number"
          className="w-full p-2 rounded text-gray-300 bg-white/10 border border-white/20 mb-4"
          value={editExtra?.precio_extra || 0}
          onChange={e =>
            setEditExtra({ ...editExtra, precio_extra: Number(e.target.value) })
          }
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
        title="Eliminar extra"
        message="¿Seguro que quieres eliminar este extra?"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
