import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

type DominanceData = {
  [key: string]: number;
};

type ChartData = {
  name: string;
  value: number;
};

export default function Dominance({ cryptos }: { cryptos: DominanceData }) {
  const dominanceList = Object.entries(cryptos).map(([id, value]) => ({
    name: id.toUpperCase(),
    value: Number(value),
  }));

  const top3 = dominanceList.slice(0, 3);

  const COLORS = [
    "#3B82F6", // blue-500
    "#10B981", // emerald-500
    "#F59E0B", // amber-500
    "#6366F1", // indigo-500
    "#EC4899", // pink-500
    "#8B5CF6", // violet-500
  ];

  return (
    <div className="max-w-sm p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md h-min">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Market Dominance
      </h2>

      {/* Top 3 Display */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {top3.map((crypto) => (
          <div
            key={crypto.name}
            className="flex flex-col items-center p-2 rounded-md bg-gray-50 dark:bg-gray-700/50"
          >
            <span className="font-semibold text-sm text-gray-900 dark:text-gray-100 uppercase mb-1">
              {crypto.name}
            </span>
            <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
              {crypto.value.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dominanceList}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={80}
              paddingAngle={3}
              strokeWidth={2}
              stroke="#fff"
            >
              {dominanceList.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => `${value.toFixed(1)}%`}
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "8px",
                border: "none",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                padding: "8px 12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
