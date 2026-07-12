"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#8b5cf6",
  "#3b82f6",
  "#22c55e",
];

type Props = {
  taskStatus: {
    todo: number;
    in_progress: number;
    done: number;
  };
};

export default function TaskStatusChart({
  taskStatus,
}: Props) {
  const data = [
    {
      name: "Todo",
      value: taskStatus.todo,
    },
    {
      name: "In Progress",
      value: taskStatus.in_progress,
    },
    {
      name: "Completed",
      value: taskStatus.done,
    },
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6">
        Task Status Distribution
      </h2>

      <div className="grid md:grid-cols-2 gap-6 items-center">

        <ResponsiveContainer
          width="100%"
          height={280}
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={90}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="space-y-5">
          {data.map((item, index) => (
            <div
              key={item.name}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{
                    background: COLORS[index],
                  }}
                />

                <span className="text-white">
                  {item.name}
                </span>
              </div>

              <span className="font-semibold text-white">
                {item.value}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}