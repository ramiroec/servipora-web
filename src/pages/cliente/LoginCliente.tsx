import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api";

export default function LoginCliente() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/usuarios/login", { email, password });
      const data = res.data;
      if (data.rol !== "cliente") throw new Error("No tienes acceso como cliente");
      navigate("/cliente");
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--bg)"
    }}>
      <div
        className="card"
        style={{
          maxWidth: 400,
          width: "100%",
          padding: "32px 28px",
          borderRadius: "var(--radius)",
          boxShadow: "var(--shadow)",
          border: "1px solid var(--stroke)",
          background: "var(--surface)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <h2 style={{
          color: "var(--brand)",
          marginBottom: 8,
          fontWeight: 800,
          fontSize: "2rem"
        }}>
          ¡Bienvenido Cliente!
        </h2>
        <p style={{
          color: "var(--muted)",
          marginBottom: 24,
          textAlign: "center"
        }}>
          Ingresa tus datos para acceder y contratar servicios profesionales de calidad.
        </p>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}
        >
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{
              padding: "12px",
              borderRadius: 10,
              border: "1px solid var(--stroke)",
              fontSize: 16,
              marginBottom: 4
            }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              padding: "12px",
              borderRadius: 10,
              border: "1px solid var(--stroke)",
              fontSize: 16,
              marginBottom: 4
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px",
              borderRadius: 10,
              background: "linear-gradient(90deg, var(--brand), var(--brand-2))",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              border: "none",
              boxShadow: "0 2px 8px rgba(39,80,217,.08)",
              cursor: "pointer",
              marginTop: 8,
              transition: "background .2s"
            }}
          >
            Ingresar
          </button>
          {error && (
            <p style={{
              color: "var(--brand-2)",
              background: "#fff0f5",
              borderRadius: 8,
              padding: "8px 12px",
              marginTop: 8,
              textAlign: "center",
              fontWeight: 500
            }}>
              {error}
            </p>
          )}
        </form>
        <div style={{
          marginTop: 18,
          color: "var(--muted)",
          fontSize: 14,
          textAlign: "center"
        }}>
          ¿No tienes cuenta? <span style={{ color: "var(--brand-2)", fontWeight: 600 }}>Regístrate pronto</span>
        </div>
      </div>
    </div>
  );
}