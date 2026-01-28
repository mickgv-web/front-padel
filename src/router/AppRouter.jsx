import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

import MainLayout from "../layouts/MainLayout";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import MisReservas from "../pages/MisReservas";
import AdminPanel from "../pages/AdminPanel";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Rutas con layout (navbar + estructura) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Landing />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/mis-reservas"
            element={
              <PrivateRoute>
                <MisReservas />
              </PrivateRoute>
            }
          />


          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />
        </Route>

        {/* Rutas sin layout (login/register limpias) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}
