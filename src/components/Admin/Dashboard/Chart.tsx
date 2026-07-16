import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartProps {
  trendData: any[];
}

export default function Chart({ trendData }: ChartProps) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        padding: "20px 24px",
        border: "1px solid #e9e6f3",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 20,
        }}
      >
        <div>
          <div style={{ fontWeight: 600, fontSize: 15, color: "#1b1b23" }}>
            Revenue Trends
          </div>
          <div style={{ color: "#767586", fontSize: 12, marginTop: 2 }}>
            Visualizing gross profits and earnings growth
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={
            trendData.length > 0 ? trendData : [{ day: "None", completed: 0 }]
          }
          margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4648d4" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#4648d4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#767586" }}
          />
          <YAxis hide />
          <Tooltip
            formatter={(value) => [`$${value}`, "Gross revenue"]}
            contentStyle={{
              background: "#fff",
              border: "1px solid #e4e1ed",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="completed"
            stroke="#4648d4"
            strokeWidth={2.5}
            fill="url(#colorCompleted)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#4648d4",
            }}
          />
          <span style={{ fontSize: 12, color: "#767586" }}>
            Monthly Gross Sales
          </span>
        </div>
      </div>
    </div>
  );
}
