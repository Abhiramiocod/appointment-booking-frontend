import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../lib/Customers/navItems";
import Heading from "../Sidebar/Heading";
import { Colors } from "../../lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomerSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function CustomerSidebar({
  collapsed = false,
  onToggle,
}: CustomerSidebarProps) {
  const location = useLocation();

  return (
    <aside
      style={{
        width: collapsed ? 80 : 260,
        background: "#fff",
        borderRight: "1px solid #e9e6f3",
        display: "flex",
        flexDirection: "column",
        padding: "24px 0",
        position: "fixed",
        height: "100vh",
        zIndex: 10,
        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Collapse Toggle Button */}
      {onToggle && (
        <button
          onClick={onToggle}
          style={{
            position: "absolute",
            top: 28,
            right: -12,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "#fff",
            border: "1px solid #e9e6f3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6b7280",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            zIndex: 20,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#4648d4";
            e.currentTarget.style.borderColor = "#4648d4";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#6b7280";
            e.currentTarget.style.borderColor = "#e9e6f3";
          }}
        >
          {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
        </button>
      )}

      {/* Logo */}
      <Heading collapsed={collapsed} />

      {/* Nav */}
      <nav
        style={{
          flex: 1,
          padding: collapsed ? "0 8px" : "0 16px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          transition: "padding 0.3s ease",
        }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.path ||
            (item.path === "/customer/schedule" &&
              location.pathname === "/customer/book");

          return (
            <div
              key={item.path}
              style={{ display: "flex", flexDirection: "column", gap: "4px" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 12,
                  background: isActive ? Colors.primary : "transparent",
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <Link
                  to={item.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: collapsed ? "center" : "flex-start",
                    gap: collapsed ? 0 : 12,
                    padding: "10px 12px",
                    flex: collapsed ? "none" : 1,
                    width: collapsed ? "100%" : "auto",
                    color: isActive ? "#fff" : Colors.onSurfaceVariant,
                    fontSize: 14,
                    fontWeight: isActive ? 600 : 500,
                    textDecoration: "none",
                    transition: "color 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon size={18} style={{ opacity: isActive ? 1 : 0.7 }} />
                  {!collapsed && <span style={{ flex: 1 }}>{item.label}</span>}
                </Link>
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
