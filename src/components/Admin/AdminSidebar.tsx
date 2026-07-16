import { useState } from "react";
import Heading from "../Sidebar/Heading";
import Navbar from "../Sidebar/Navbar";
import CreateAppointmentModal from "./Appointments/CreateAppointmentModal";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

interface AdminSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export default function AdminSidebar({ collapsed = false, onToggle }: AdminSidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div style={{ padding: collapsed ? "0 8px 28px" : "0 20px 28px" }}>
        <Heading collapsed={collapsed} />
      </div>

      {/* Nav */}
      <Navbar collapsed={collapsed} />

      {/* New Appointment Button */}
      <div style={{ padding: collapsed ? "0 12px 16px" : "0 20px 16px" }}>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            width: "100%",
            height: collapsed ? 44 : "auto",
            padding: collapsed ? "0" : "12px",
            background: "#4648d4",
            color: "#fff",
            border: "none",
            borderRadius: collapsed ? "12px" : "12px",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: collapsed ? "0" : "8px",
            transition: "all 0.15s",
          }}
          title={collapsed ? "New Appointment" : undefined}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#3b3dbb";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#4648d4";
          }}
        >
          <Plus size={16} />
          {!collapsed && <span>New Appointment</span>}
        </button>
      </div>

      {/* Bottom links */}
      <CreateAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </aside>
  );
}
