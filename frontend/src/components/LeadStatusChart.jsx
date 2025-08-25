import React, { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";

const COLORS = ["#22c55e", "#ef4444", "#3b82f6", "#a855f7", "#f59e0b"];

const LeadStatusChart = () => {
  const leadsData = useSelector((state) => state.leads?.leads);

  const chartData = useMemo(() => {
    if (!leadsData?.data) return [];
    return [
      { name: "Won", value: leadsData.data.filter((l) => l.status === "won").length },
      { name: "Lost", value: leadsData.data.filter((l) => l.status === "lost").length },
      { name: "New", value: leadsData.data.filter((l) => l.status === "new").length },
      { name: "Qualified", value: leadsData.data.filter((l) => l.status === "qualified").length },
      { name: "Contacted", value: leadsData.data.filter((l) => l.status === "contacted").length },
    ];
  }, [leadsData]);

  return (
    <div className="flex justify-center items-center w-full h-[250px] md:h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="70%"
            paddingAngle={5}
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LeadStatusChart;
