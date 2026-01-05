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
import { Activity, TrendingUp } from "lucide-react";

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
        <TrendingUp className="w-8 h-8 text-orange-500" />
        <h2 className="text-3xl font-black uppercase italic">
          Track Your <span className="text-orange-500">Progress</span>
        </h2>
      </div>

      {/* Metric Selector */}
      <Card>
        <h3 className="text-xl font-bold mb-4 text-orange-500">Select Metric</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[...BODY_MEASUREMENTS, ...EXERCISE_TYPES].map((m) => (
            <button
              key={m.id}
              onClick={() => setMetric(m.id)}
              className={`px-4 py-3 rounded-xl font-semibold transition-all ${
                metric === m.id
                  ? "bg-orange-500 text-white"
                  : "bg-neutral-800 text-gray-400 hover:bg-neutral-700"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Add Entry Form */}
      <Card>
        <h3 className="text-xl font-bold mb-4 text-orange-500">Add New Entry</h3>
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
        <h3 className="text-xl font-bold mb-4 text-orange-500">
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
                labelStyle={{ color: "#F97316" }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#F97316"
                strokeWidth={3}
                dot={{ fill: "#F97316", r: 5 }}
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
          <h3 className="text-xl font-bold mb-4 text-orange-500">Recent Entries</h3>
          <div className="space-y-2">
            {[...chartData].reverse().slice(0, 5).map((entry, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-neutral-800/50 rounded-lg"
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
