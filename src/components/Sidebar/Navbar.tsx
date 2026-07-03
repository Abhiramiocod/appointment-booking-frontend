import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../lib/Admin/navItems";

export default function Navbar() {
    const location = useLocation();
    return (
        <nav style={{ flex: 1, padding: "0 12px" }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 12px",
                  borderRadius: 8,
                  marginBottom: 2,
                  background: isActive ? "#4648d4" : "transparent",
                  color: isActive ? "#fff" : "#464554",
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  cursor: "pointer",
                  transition: "background 0.15s",
                  textDecoration: "none",
                }}
              >
                <Icon />
                {item.label}
              </Link>
            );
          })}
        </nav>
    )
}