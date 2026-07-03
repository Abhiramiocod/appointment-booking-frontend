import { useNavigate } from "react-router-dom";

export default function AdminTopbar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    console.log("🔐 Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid #e9e6f3",
        padding: "12px 32px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        position: "sticky",
        top: 0,
        zIndex: 5,
      }}
    >
      {/* Search */}
      <div
        style={{
          flex: 1,
          maxWidth: 480,
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#f5f2fe",
          border: "1px solid #e4e1ed",
          borderRadius: 10,
          padding: "8px 14px",
        }}
      >
        <span style={{ color: "#767586", fontSize: 14 }}>🔍</span>
        <input
          style={{
            border: "none",
            background: "transparent",
            outline: "none",
            fontSize: 13,
            color: "#464554",
            flex: 1,
          }}
          placeholder="Search appointments, clients..."
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: "auto" }}>
        <span style={{ color: "#767586", fontSize: 18, cursor: "pointer" }}>🔔</span>
        <span style={{ color: "#767586", fontSize: 18, cursor: "pointer" }}>🌙</span>
        <span style={{ color: "#767586", fontSize: 18, cursor: "pointer" }}>⠿</span>
        <button
          style={{
            padding: "7px 16px",
            borderRadius: 20,
            border: "1.5px solid #4648d4",
            color: "#4648d4",
            background: "transparent",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Upgrade Plan
        </button>
        <button
          onClick={handleLogout}
          style={{
            padding: "7px 16px",
            borderRadius: 20,
            border: "1.5px solid #e74c3c",
            color: "#e74c3c",
            background: "transparent",
            fontWeight: 600,
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          Logout
        </button>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#e4e1ed",
            overflow: "hidden",
            cursor: "pointer",
          }}
        />
      </div>
    </header>
  );
}
