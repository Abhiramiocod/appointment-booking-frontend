import { useState } from "react";
import { Outlet } from "react-router-dom";
import CustomerSidebar from "../components/Customer/CustomerSidebar";
import CustomerTopbar from "../components/Customer/CustomerTopbar";

export default function CustomerLayout() {
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("sidebar_collapsed") === "true";
  });

  const toggleSidebar = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("sidebar_collapsed", String(next));
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f2fe", fontFamily: "Inter, sans-serif" }}>
      <CustomerSidebar collapsed={collapsed} onToggle={toggleSidebar} />
      <main
        style={{
          marginLeft: collapsed ? 80 : 260,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <CustomerTopbar />
        <Outlet />
      </main>
    </div>
  );
}
