import MiniBar from "./Minibar";

interface StatCardsProps {
  stats: any[];
}

export default function StatCards({ stats }: StatCardsProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 16,
        marginBottom: 24,
      }}
    >
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={stat.label}
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: "18px 20px",
              border: "1px solid #e9e6f3",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: stat.bgAccent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                }}
              >
                {IconComponent && <IconComponent size={16} />}
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: stat.badgeColor,
                  background: `${stat.badgeColor}18`,
                  padding: "3px 7px",
                  borderRadius: 20,
                }}
              >
                {stat.badge}
              </span>
            </div>
            <div style={{ color: "#767586", fontSize: 12, marginBottom: 4 }}>
              {stat.label}
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: "#1b1b23",
                letterSpacing: "-0.02em",
              }}
            >
              {stat.value}
            </div>
            <MiniBar accent={stat.accent} />
          </div>
        );
      })}
    </div>
  );
}
