import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";
import ReservaCard from "../components/reservas/ReservaCard";

export default function MisReservas() {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleCancel = (id) => {
        setReservas(prev => prev.filter(r => r.id !== id));
    };


    useEffect(() => {
        apiFetch("/api/mis_reservas")
            .then(data => {
                setReservas(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error cargando reservas:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-[#0A1A2F] text-white px-6 py-10">
            <h1 className="text-3xl font-extrabold text-[#C7FF41] mb-10 text-center">
                Mis reservas
            </h1>

            {loading && <p className="text-center">Cargando...</p>}

            <div className="max-w-4xl mx-auto flex flex-col gap-6">
                {reservas.length === 0 && !loading && (
                    <p className="text-center text-gray-300">No tienes reservas aún</p>
                )}

                {reservas.map(reserva => (
                    <ReservaCard key={reserva.id} reserva={reserva} onCancel={handleCancel} />
                ))}
            </div>
        </div>
    );
}
