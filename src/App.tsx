import { Routes, Route, Navigate, Outlet, Link, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Sidebar from "./components/Sidebar";
import ClienteDashboard from "./pages/cliente/Dashboard";
import ProfesionalDashboard from "./pages/profesional/DashBoard";

function ClienteLayout() {
  const location = useLocation();
  const items = [
    { to: "/cliente", label: "Dashboard" },
    // aquí puedes agregar más secciones del cliente
  ];
  return (
    <div className="layout">
      <Sidebar title="ServiPora · Cliente" items={items} />
      <main className="content">
        <header className="topbar">
          <div className="brand-mini">
            <Link to="/">ServiPora</Link>
          </div>
          <div className="path">{location.pathname}</div>
        </header>
        <div className="page"><Outlet /></div>
      </main>
    </div>
  );
}

function ProfesionalLayout() {
  const location = useLocation();
  const items = [
    { to: "/profesional", label: "Dashboard" },
    // aquí puedes agregar más secciones del profesional
  ];
  return (
    <div className="layout">
      <Sidebar title="ServiPora · Profesional" items={items} />
      <main className="content">
        <header className="topbar">
          <div className="brand-mini">
            <Link to="/">ServiPora</Link>
          </div>
          <div className="path">{location.pathname}</div>
        </header>
        <div className="page"><Outlet /></div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/cliente" element={<ClienteLayout />}>
        <Route index element={<ClienteDashboard />} />
        {/* más rutas del cliente */}
      </Route>

      <Route path="/profesional" element={<ProfesionalLayout />}>
        <Route index element={<ProfesionalDashboard />} />
        {/* más rutas del profesional */}
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
