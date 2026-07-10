import { useState } from "react";
import Heading from "../Sidebar/Heading";
import Navbar from "../Sidebar/Navbar";
import BottomLinks from "../Sidebar/BottomLinks";
import CreateAppointmentModal from "./Appointments/CreateAppointmentModal";
import { Plus } from "lucide-react";

export default function AdminSidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div style={{ padding: "0 20px 28px" }}>
        <Heading />
      </div>

      {/* Nav */}
      <Navbar />

      {/* New Appointment Button */}
      <div style={{ padding: "0 20px 16px" }}>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            width: "100%",
            padding: "12px",
            background: "#4648d4",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#3b3dbb";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#4648d4";
          }}
        >
          <Plus size={16} />
          New Appointment
        </button>
      </div>

      {/* Bottom links */}
      <BottomLinks />

      <CreateAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </aside>
  );
}

