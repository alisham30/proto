"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  {
    state: "Madhya Pradesh",
    total: 45230,
    approved: 32150,
    pending: 10080,
    rejected: 3000,
  },
  {
    state: "Odisha",
    total: 38920,
    approved: 27840,
    pending: 8580,
    rejected: 2500,
  },
  {
    state: "Telangana",
    total: 28760,
    approved: 20330,
    pending: 6930,
    rejected: 1500,
  },
  {
    state: "Tripura",
    total: 12450,
    approved: 8920,
    pending: 2860,
    rejected: 670,
  },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border rounded-lg shadow-lg">
        <p className="font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value.toLocaleString()}
          </p>
        ))}
        <p className="text-sm text-gray-600 mt-1 pt-1 border-t">
          Total: {payload.reduce((sum, entry) => sum + entry.value, 0).toLocaleString()}
        </p>
      </div>
    )
  }
  return null
}

export default function ClaimsByStateBarChart() {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="state" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="approved" stackId="a" fill="#16a34a" name="Approved" />
          <Bar dataKey="pending" stackId="a" fill="#eab308" name="Pending" />
          <Bar dataKey="rejected" stackId="a" fill="#dc2626" name="Rejected" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
