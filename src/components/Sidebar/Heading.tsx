interface HeadingProps {
  collapsed?: boolean;
}

export default function Heading({ collapsed = false }: HeadingProps) {
  return (
    <div style={{ padding: collapsed ? "0 0 28px" : "0 20px 28px", display: "flex", justifyContent: "center" }}>
      {collapsed ? (
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "12px",
            background: "#4648d4",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 16,
            boxShadow: "0 4px 12px rgba(70, 72, 212, 0.25)",
          }}
        >
          L
        </div>
      ) : (
        <div
          style={{
            color: "#4648d4",
            fontWeight: 700,
            fontSize: 18,
            letterSpacing: "-0.02em",
            width: "100%",
            textAlign: "left",
          }}
        >
          LuxBooking
        </div>
      )}
    </div>
  );
}
