export default function ActivityAvatar({ item }) {
  return (
    <div style={{ position: "relative", flexShrink: 0 }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: item.color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 600,
          color: item.isAlert ? "#fff" : "#333",
          border: item.isAlert ? "none" : "none",
        }}
      >
        {item.isAlert ? "⚠" : item.initials}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: -2,
          right: -2,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: item.iconBg,
          border: "1.5px solid #fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 8,
        }}
      />
    </div>
  );
}
