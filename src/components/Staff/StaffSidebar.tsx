import { Link, useLocation, useNavigate } from "react-router-dom";
import { navItems } from "../../lib/Staffs/navItems";
import Heading from "../Sidebar/Heading";
import { LogOut } from "lucide-react";
import { Colors } from "../../lib/utils";

export default function StaffSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <aside
      style={{
        width: 260,
        background: "#fff",
        borderRight: "1px solid #e9e6f3",
        display: "flex",
        flexDirection: "column",
        padding: "24px 0",
        position: "fixed",
        height: "100vh",
        zIndex: 10,
      }}
    >
      {/* Logo */}
      <Heading />

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: "0 16px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <div key={item.path} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 8,
                  background: isActive ? Colors.primary : "transparent",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <Link
                  to={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "10px 12px",
                    flex: 1,
                    color: isActive ? "#fff" : Colors.onSurfaceVariant,
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 500,
                    textDecoration: "none",
                    transition: "color 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <Icon size={18} style={{ opacity: isActive ? 1 : 0.7 }} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                </Link>
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}