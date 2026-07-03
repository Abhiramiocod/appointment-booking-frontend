import Heading from "../Sidebar/Heading";
import Navbar from "../Sidebar/Navbar";
import BottomLinks from "../Sidebar/BottomLinks";

export default function AdminSidebar() {
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

      {/* Bottom links */}
      <BottomLinks />
    </aside>
  );
}
