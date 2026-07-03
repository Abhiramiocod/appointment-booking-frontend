export default function BottomLinks() {
  return (
    <div
      style={{
        padding: "0 12px",
        borderTop: "1px solid #e9e6f3",
        paddingTop: 16,
      }}
    >
      {["Help Center", "Sign Out"].map((label) => (
        <div
          key={label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 12px",
            borderRadius: 8,
            color: "#464554",
            fontSize: 13,
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 14 }}>
            {label === "Help Center" ? "?" : "→"}
          </span>
          {label}
        </div>
      ))}
    </div>
  );
}
