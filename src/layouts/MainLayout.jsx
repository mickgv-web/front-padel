import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";
import { useAuth } from "../context/useAuth";

export default function MainLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex bg-[#0A1A2F] text-white flex-col">
      <PublicNavbar user={user} />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
