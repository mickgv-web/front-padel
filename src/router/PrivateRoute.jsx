import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function PrivateRoute({ children }) {
  const { user, token } = useAuth();

  if (!token) return <Navigate to="/login" />;

  if (user.rol_id === 1) {
    return <Navigate to="/admin" />;
  }

  return children;
}
