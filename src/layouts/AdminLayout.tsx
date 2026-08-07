import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminTopbar from "../components/Admin/AdminTopbar";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("sidebar_collapsed") === "true";
  });

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const token = localStorage.getItem("token");

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    if (user.role === "staff") {
      return <Navigate to="/staff" replace />;
    }
    if (user.role === "customer") {
      return <Navigate to="/customer" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  const toggleSidebar = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("sidebar_collapsed", String(next));
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#FAF9F6", fontFamily: "Inter, sans-serif" }}>
      <AdminSidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <main
        style={{
          marginLeft: collapsed ? 80 : 260,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <AdminTopbar />
        <Outlet />
      </main>
    </div>
  );
}
