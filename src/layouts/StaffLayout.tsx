import { Outlet } from "react-router-dom";
import StaffSidebar from "../components/Staff/StaffSidebar";
import StaffTopBar from "../components/Staff/StaffTopBar";

export default function StaffLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f2fe", fontFamily: "Inter, sans-serif" }}>
      <StaffSidebar />
      <main style={{ marginLeft: 260, flex: 1, display: "flex", flexDirection: "column" }}>
        <StaffTopBar />
        <Outlet />
      </main>
    </div>
  );
}
