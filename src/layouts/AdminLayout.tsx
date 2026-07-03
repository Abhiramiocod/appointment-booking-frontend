import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminTopbar from "../components/Admin/AdminTopbar";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f2fe", fontFamily: "Inter, sans-serif" }}>
      <AdminSidebar />
      <main style={{ marginLeft: 260, flex: 1, display: "flex", flexDirection: "column" }}>
        <AdminTopbar />
        <Outlet />
      </main>
    </div>
  );
}
