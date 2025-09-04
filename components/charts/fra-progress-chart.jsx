"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const progressData = [
  {
    level: "Villages",
    total: 3450,
    completed: 2890,
    inProgress: 420,
    pending: 140,
  },
  {
    level: "Districts",
    total: 123,
    completed: 89,
    inProgress: 25,
    pending: 9,
  },
  {
    level: "States",
    total: 4,
    completed: 3,
    inProgress: 1,
    pending: 0,
  },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-white p-4 border rounded-lg shadow-lg">
        <p className="font-medium mb-2">{label}</p>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="text-green-600">●</span> Completed: {data.completed} (
            {Math.round((data.completed / data.total) * 100)}%)
          </p>
          <p className="text-sm">
            <span className="text-yellow-600">●</span> In Progress: {data.inProgress} (
            {Math.round((data.inProgress / data.total) * 100)}%)
          </p>
          <p className="text-sm">
            <span className="text-red-600">●</span> Pending: {data.pending} (
            {Math.round((data.pending / data.total) * 100)}%)
          </p>
          <p className="text-sm font-medium border-t pt-1 mt-2">Total: {data.total}</p>
        </div>
      </div>
    )
  }
  return null
}

export default function FRAProgressChart() {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={progressData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="level" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="completed" stackId="a" fill="#16a34a" name="Completed" />
          <Bar dataKey="inProgress" stackId="a" fill="#eab308" name="In Progress" />
          <Bar dataKey="pending" stackId="a" fill="#dc2626" name="Pending" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
