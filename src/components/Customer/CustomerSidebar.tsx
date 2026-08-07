import { Link, useLocation } from "react-router-dom";
import { navItems } from "../../lib/Customers/navItems";
import Heading from "../Sidebar/Heading";
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
        background: "#ffffff",
        borderRight: "1px solid #eef0f5",
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
            top: 24,
            right: -12,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#6b7280",
            cursor: "pointer",
            boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
            zIndex: 20,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#0052cc";
            e.currentTarget.style.borderColor = "#0052cc";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#6b7280";
            e.currentTarget.style.borderColor = "#e5e7eb";
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
          padding: collapsed ? "0 8px" : "0 12px",
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
            (item.path === "/customer" && location.pathname === "/customer/schedule");

          return (
            <div
              key={item.path}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              {/* Active Bar Indicator */}
              {isActive && !collapsed && (
                <div
                  style={{
                    position: "absolute",
                    left: -12,
                    width: 4,
                    height: 24,
                    borderRadius: "0 4px 4px 0",
                    background: "#0052cc",
                  }}
                />
              )}

              <Link
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: collapsed ? "center" : "flex-start",
                  gap: collapsed ? 0 : 12,
                  padding: "11px 16px",
                  width: "100%",
                  borderRadius: 14,
                  background: isActive ? "#f0f5ff" : "transparent",
                  color: isActive ? "#0052cc" : "#0f172a",
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "#f8fafc";
                    e.currentTarget.style.color = "#0052cc";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#0f172a";
                  }
                }}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  size={20}
                  style={{
                    color: isActive ? "#0052cc" : "#0f172a",
                    transition: "color 0.2s ease",
                  }}
                />
                {!collapsed && (
                  <span
                    style={{
                      flex: 1,
                      fontFamily: "Inter, system-ui, sans-serif",
                    }}
                  >
                    {item.label}
                  </span>
                )}
              </Link>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
