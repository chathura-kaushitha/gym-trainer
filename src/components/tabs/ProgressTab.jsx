import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Activity, TrendingUp, Dumbbell } from "lucide-react";

import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import { BODY_MEASUREMENTS, EXERCISE_TYPES } from "../../data/constants.js";

export default function ProgressTab({ currentUser, data, addEntry }) {
  const [metric, setMetric] = useState("Weight");
  const [val, setVal] = useState("");
  const [reps, setReps] = useState("");

  const isExercise = useMemo(() => EXERCISE_TYPES.some((e) => e.id === metric), [metric]);

  const chartData = useMemo(() => {
    return [...data]
      .filter((d) => d.type === metric)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [data, metric]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!val) return;

    addEntry(currentUser.uid, metric, val, reps);
    setVal("");
    setReps("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-8 h-8 text-red-600" />
        <h2 className="text-3xl font-black uppercase italic">
          Track Your <span className="text-red-600">Progress</span>
        </h2>
      </div>

      {/* Metric Selector */}
      <Card>
        <h3 className="text-xl font-bold mb-4 text-red-600">Select Metric</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...BODY_MEASUREMENTS, ...EXERCISE_TYPES].map((m) => (
            <button
              key={m.id}
              onClick={() => setMetric(m.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${metric === m.id
                  ? "bg-gradient-to-br from-orange-600 to-red-600 border-transparent text-white shadow-lg shadow-red-900/30 transform scale-105"
                  : "bg-neutral-900/50 border-white/5 text-gray-400 hover:border-red-600/50 hover:text-white hover:bg-neutral-800"
                }`}
            >
              <div className={`p-2 rounded-lg mb-2 ${metric === m.id ? "bg-white/20" : "bg-neutral-800"
                }`}>
                {EXERCISE_TYPES.some(e => e.id === m.id) ? (
                  <Dumbbell className={`w-5 h-5 ${metric === m.id ? "text-white" : "text-red-600"}`} />
                ) : (
                  <Activity className={`w-5 h-5 ${metric === m.id ? "text-white" : "text-red-600"}`} />
                )}
              </div>
              <span className="font-bold text-sm text-center">{m.label}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Add Entry Form */}
      <Card>
        <h3 className="text-xl font-bold mb-4 text-red-600">Add New Entry</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="number"
              step="0.1"
              placeholder={`Value ${isExercise ? "(kg)" : BODY_MEASUREMENTS.find((m) => m.id === metric)?.unit || ""}`}
              value={val}
              onChange={(e) => setVal(e.target.value)}
              required
            />
            {isExercise && (
              <Input
                type="number"
                placeholder="Reps"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
              />
            )}
            <Button type="submit">
              <Activity className="w-4 h-4 mr-2" />
              Add Entry
            </Button>
          </div>
        </form>
      </Card>

      {/* Chart */}
      <Card>
        <h3 className="text-xl font-bold mb-4 text-red-600">
          {metric} Progress
        </h3>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="date"
                stroke="#9CA3AF"
                tick={{ fill: "#9CA3AF" }}
              />
              <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  border: "1px solid #374151",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "rgb(220 38 38)" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="rgb(220 38 38)"
                strokeWidth={3}
                dot={{ fill: "rgb(220 38 38)", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No data yet. Add your first entry above!
          </div>
        )}
      </Card>

      {/* Recent Entries */}
      {chartData.length > 0 && (
        <Card>
          <h3 className="text-xl font-bold mb-4 text-red-600">Recent Entries</h3>
          <div className="space-y-2">
            {[...chartData].reverse().slice(0, 5).map((entry, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-[#2A2A2A] rounded-lg border border-[#333333]"
              >
                <span className="text-gray-400">{entry.date}</span>
                <span className="font-bold text-white">
                  {entry.value} {entry.reps && `× ${entry.reps} reps`}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
