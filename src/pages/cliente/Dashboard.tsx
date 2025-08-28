export default function ClienteDashboard() {
  return (
    <div className="dash">
      <h2>Dashboard de Cliente</h2>
      <div className="cards">
        <div className="kpi">
          <span className="kpi-label">Solicitudes activas</span>
          <span className="kpi-value">0</span>
        </div>
        <div className="kpi">
          <span className="kpi-label">Profesionales cerca</span>
          <span className="kpi-value">12</span>
        </div>
        <div className="kpi">
          <span className="kpi-label">Mensajes</span>
          <span className="kpi-value">3</span>
        </div>
      </div>

      <div className="panel">
        <h3>Recomendados para ti</h3>
        <ul className="list">
          <li>Electricista — Zona Centro</li>
          <li>Plomero — Barrio San Roque</li>
          <li>Herrería — Microcentro</li>
        </ul>
      </div>
    </div>
  );
}
