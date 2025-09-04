"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { month: "Jan", approved: 6800, pending: 2400, submitted: 8900 },
  { month: "Feb", approved: 7200, pending: 2600, submitted: 9200 },
  { month: "Mar", approved: 7800, pending: 2800, submitted: 9800 },
  { month: "Apr", approved: 8200, pending: 3100, submitted: 10400 },
  { month: "May", approved: 8600, pending: 3300, submitted: 11200 },
  { month: "Jun", approved: 9100, pending: 3500, submitted: 11800 },
  { month: "Jul", approved: 9400, pending: 3200, submitted: 12100 },
  { month: "Aug", approved: 9800, pending: 2900, submitted: 12400 },
  { month: "Sep", approved: 10200, pending: 2700, submitted: 12800 },
  { month: "Oct", approved: 10600, pending: 2500, submitted: 13200 },
  { month: "Nov", approved: 11000, pending: 2300, submitted: 13600 },
  { month: "Dec", approved: 11400, pending: 2100, submitted: 14000 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="font-medium mb-2">{label} 2024</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function MonthlyTrendsChart() {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="submitted"
            stroke="#3b82f6"
            strokeWidth={2}
            name="New Submissions"
            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="approved"
            stroke="#16a34a"
            strokeWidth={2}
            name="Approved"
            dot={{ fill: "#16a34a", strokeWidth: 2, r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="pending"
            stroke="#eab308"
            strokeWidth={2}
            name="Pending"
            dot={{ fill: "#eab308", strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
