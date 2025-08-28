import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

type Item = { to: string; label: string };

export default function Sidebar({
  title,
  items
}: {
  title: string;
  items: Item[];
}) {
  const [open, setOpen] = useState(false);

  // Cierra el menú al cambiar tamaño a desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <button
        className="sidebar-toggle"
        aria-label="Abrir menú"
        onClick={() => setOpen(true)}
      >
        <Menu size={22} />
      </button>

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <span>{title}</span>
          <button className="close-btn" aria-label="Cerrar" onClick={() => setOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <nav className="nav">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={() => setOpen(false)}
            >
              {it.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
