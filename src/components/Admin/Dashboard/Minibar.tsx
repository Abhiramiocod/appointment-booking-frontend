export default function MiniBar({ accent }: { accent: string }) {
  const heights = [20, 30, 25, 45, 35, 50, 65];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 3,
        height: 40,
        marginTop: 12,
      }}
    >
      {heights.map((h, i) => (
        <div
          key={i}
          style={{
            width: 14,
            height: h,
            borderRadius: 3,
            background: i === heights.length - 1 ? accent : `${accent}40`,
            transition: "height 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}
