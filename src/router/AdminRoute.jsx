import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function AdminRoute({ children }) {
  const { user, token } = useAuth();
  return token && user?.rol_id === 1 ? children : <Navigate to="/" replace />;
}
