import { Outlet } from "react-router-dom";
import CustomerSidebar from "../components/Customer/CustomerSidebar";
import CustomerTopbar from "../components/Customer/CustomerTopbar";


export default function CustomerLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f2fe", fontFamily: "Inter, sans-serif" }}>
      <CustomerSidebar />
      <main style={{ marginLeft: 260, flex: 1, display: "flex", flexDirection: "column" }}>
        <CustomerTopbar />
        <Outlet />
      </main>
    </div>
  );
}
