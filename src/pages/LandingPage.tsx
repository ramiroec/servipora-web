import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing">
      <header className="hero">
        <div className="hero-inner">
          <h1>ServiPora</h1>
          <p>Plataforma para buscar y ofrecer servicios profesionales de calidad.</p>
          <p className="subtitle">Albañilería · Electricidad · Plomería · Herrería · y más</p>
        </div>
      </header>

      <section className="choice-grid">
        <Link to="/cliente" className="card choice">
          <div className="card-body">
            <h2>Quiero contratar</h2>
            <p>Encuentra profesionales verificados cerca de ti, compara y agenda.</p>
          </div>
          <div className="card-footer">Entrar como Cliente</div>
        </Link>

        <Link to="/profesional" className="card choice">
          <div className="card-body">
            <h2>Quiero ofrecer</h2>
            <p>Crea tu perfil, recibe solicitudes y crece tu cartera de clientes.</p>
          </div>
          <div className="card-footer">Entrar como Profesional</div>
        </Link>
      </section>

      <footer className="landing-footer">
        <small>© {new Date().getFullYear()} ServiPora — “Servicio Bueno”</small>
      </footer>
    </div>
  );
}
