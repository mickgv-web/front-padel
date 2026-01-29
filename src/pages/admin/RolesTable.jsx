import { useEffect, useState } from "react";
import { apiFetch } from "../../services/api";
import Modal from "../../components/ui/Modal";
import ModalConfirm from "../../components/ui/ModalConfirm";

export default function RolesTable() {
  const [roles, setRoles] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [newName, setNewName] = useState("");

  const [editRole, setEditRole] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    apiFetch("/admin/roles").then(setRoles);
  }, []);

  // -----------------------------
  // CREAR
  // -----------------------------
  const handleAdd = async () => {
    if (!newName.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    try {
      const res = await apiFetch("/admin/roles", {
        method: "POST",
        body: JSON.stringify({ nombre: newName })
      });

      setRoles(prev => [...prev, res]);
      setOpenAdd(false);
      setNewName("");
    } catch (err) {
      alert(err.error || "No se pudo crear el rol");
    }
  };

  // -----------------------------
  // EDITAR
  // -----------------------------
  const handleEdit = async () => {
    try {
      const updated = await apiFetch(`/admin/roles/${editRole.id}`, {
        method: "PUT",
        body: JSON.stringify({ nombre: editRole.nombre })
      });

      setRoles(prev =>
        prev.map(r => (r.id === updated.id ? updated : r))
      );
    } catch (err) {
      alert(err.error || "No se pudo actualizar el rol");
    }

    setEditRole(null);
  };

  // -----------------------------
  // ELIMINAR
  // -----------------------------
  const handleDelete = async () => {
    try {
      await apiFetch(`/admin/roles/${deleteId}`, { method: "DELETE" });
      setRoles(prev => prev.filter(r => r.id !== deleteId));
    } catch (err) {
      alert(err.error || "No se pudo eliminar el rol");
    }

    setDeleteId(null);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Roles</h2>
        <button
          onClick={() => setOpenAdd(true)}
          className="px-4 py-2 rounded-full bg-[#C7FF41] text-[#0A1A2F]"
        >
          Añadir rol
        </button>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/20">
            <th className="py-2">ID</th>
            <th>Nombre</th>
            <th className="text-right">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {roles.map(r => (
            <tr key={r.id} className="border-b border-white/10">
              <td className="py-2">{r.id}</td>
              <td>{r.nombre}</td>
              <td className="text-right space-x-4">
                <button
                  onClick={() => setEditRole(r)}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Editar
                </button>

                <button
                  onClick={() => setDeleteId(r.id)}
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
        <h3 className="text-xl font-bold mb-4 text-white">Nuevo rol</h3>
        <input
          className="w-full p-2 rounded bg-white/10 border border-white/20 mb-4 text-gray-300"
          placeholder="Nombre del rol"
          value={newName}
          onChange={e => setNewName(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 rounded-full bg-[#C7FF41] text-[#0A1A2F]"
        >
          Crear
        </button>
      </Modal>

      {/* Modal editar */}
      <Modal open={!!editRole} onClose={() => setEditRole(null)}>
        <h3 className="text-xl font-bold mb-4 text-white">Editar rol</h3>
        <input
          className="w-full p-2 rounded bg-white/10 border border-white/20 mb-4 text-gray-300"
          value={editRole?.nombre || ""}
          onChange={e => setEditRole({ ...editRole, nombre: e.target.value })}
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
        title="Eliminar rol"
        message="¿Seguro que quieres eliminar este rol?"
        onCancel={() => setDeleteId(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
