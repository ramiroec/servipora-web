export default function ProfesionalDashboard() {
  return (
    <div className="dash">
      <h2>Dashboard de Profesional</h2>
      <div className="cards">
        <div className="kpi">
          <span className="kpi-label">Solicitudes recibidas</span>
          <span className="kpi-value">2</span>
        </div>
        <div className="kpi">
          <span className="kpi-label">Cotizaciones enviadas</span>
          <span className="kpi-value">5</span>
        </div>
        <div className="kpi">
          <span className="kpi-label">Calificación promedio</span>
          <span className="kpi-value">4.8</span>
        </div>
      </div>

      <div className="panel">
        <h3>Tareas próximas</h3>
        <ul className="list">
          <li>Visita técnica — Mañana 09:00</li>
          <li>Instalación eléctrica — Jueves 14:00</li>
        </ul>
      </div>
    </div>
  );
}
