import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import api from "../../Api";

export default function RegistroCliente() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    telefono: "",
    direccion: "",
    ciudad_id: ""
  });
  const [departamentos, setDepartamentos] = useState<{ value: string; label: string }[]>([]);
  const [ciudades, setCiudades] = useState<{ value: string; label: string }[]>([]);
  const [departamentoId, setDepartamentoId] = useState<{ value: string; label: string } | null>(null);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/departamentos").then(res => {
      setDepartamentos(res.data.map((d: any) => ({
        value: d.id, label: d.nombre
      })));
    });
  }, []);

  useEffect(() => {
    if (departamentoId) {
      api.get(`/ciudades?departamento_id=${departamentoId.value}`).then(res => {
        setCiudades(res.data.map((c: any) => ({
          value: c.id, label: c.nombre_ciudad
        })));
      });
    } else {
      setCiudades([]);
    }
    setForm(f => ({ ...f, ciudad_id: "" }));
  }, [departamentoId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCiudadChange = (option: any) => {
    setForm({ ...form, ciudad_id: option ? option.value : "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setExito("");
    try {
      await api.post("/usuarios/registro-cliente", form);
      setExito("¡Registro exitoso! Ahora puedes iniciar sesión.");
      setTimeout(() => navigate("/login-cliente"), 1500);
    } catch (err: any) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)"
    }}>
      <div className="card" style={{
        maxWidth: 400, width: "100%", padding: "32px 28px", borderRadius: "var(--radius)",
        boxShadow: "var(--shadow)", border: "1px solid var(--stroke)", background: "var(--surface)",
        display: "flex", flexDirection: "column", alignItems: "center"
      }}>
        <h2 style={{ color: "var(--brand)", marginBottom: 8, fontWeight: 800, fontSize: "2rem" }}>
          Registro Cliente
        </h2>
        <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16 }}>
          <input name="nombre" placeholder="Nombre completo" value={form.nombre} onChange={handleChange} required style={{ padding: "12px", borderRadius: 10, border: "1px solid var(--stroke)", fontSize: 16 }} />
          <input name="email" type="email" placeholder="Correo electrónico" value={form.email} onChange={handleChange} required style={{ padding: "12px", borderRadius: 10, border: "1px solid var(--stroke)", fontSize: 16 }} />
          <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required style={{ padding: "12px", borderRadius: 10, border: "1px solid var(--stroke)", fontSize: 16 }} />
          <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required style={{ padding: "12px", borderRadius: 10, border: "1px solid var(--stroke)", fontSize: 16 }} />
          <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} required style={{ padding: "12px", borderRadius: 10, border: "1px solid var(--stroke)", fontSize: 16 }} />
          <Select
            options={departamentos}
            value={departamentoId}
            onChange={setDepartamentoId}
            placeholder="Selecciona un departamento"
            isClearable
            styles={{ menu: base => ({ ...base, zIndex: 9999 }) }}
          />
          <Select
            options={ciudades}
            value={ciudades.find(c => c.value === form.ciudad_id) || null}
            onChange={handleCiudadChange}
            placeholder="Selecciona una ciudad"
            isDisabled={!departamentoId}
            isClearable
            styles={{ menu: base => ({ ...base, zIndex: 9999 }) }}
          />
          <button type="submit" style={{
            padding: "12px", borderRadius: 10, background: "linear-gradient(90deg, var(--brand), var(--brand-2))",
            color: "#fff", fontWeight: 700, fontSize: 16, border: "none", boxShadow: "0 2px 8px rgba(39,80,217,.08)",
            cursor: "pointer", marginTop: 8, transition: "background .2s"
          }}>
            Registrarme
          </button>
          {error && <p style={{ color: "var(--brand-2)", background: "#fff0f5", borderRadius: 8, padding: "8px 12px", marginTop: 8, textAlign: "center", fontWeight: 500 }}>{error}</p>}
          {exito && <p style={{ color: "green", background: "#eaffea", borderRadius: 8, padding: "8px 12px", marginTop: 8, textAlign: "center", fontWeight: 500 }}>{exito}</p>}
        </form>
        <div style={{ marginTop: 18, color: "var(--muted)", fontSize: 14, textAlign: "center" }}>
          ¿Ya tienes cuenta? <span style={{ color: "var(--brand-2)", fontWeight: 600, cursor: "pointer" }} onClick={() => navigate("/login-cliente")}>Inicia sesión</span>
        </div>
      </div>
    </div>
  );
}