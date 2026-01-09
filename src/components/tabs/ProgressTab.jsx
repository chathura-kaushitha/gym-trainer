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
import { Activity, TrendingUp, Dumbbell, Camera, Upload } from "lucide-react";

import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import { BODY_MEASUREMENTS, EXERCISE_TYPES } from "../../data/constants.js";

export default function ProgressTab({ currentUser, data, addEntry }) {
  const [metric, setMetric] = useState("Weight");
  const [val, setVal] = useState("");
  const [reps, setReps] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...BODY_MEASUREMENTS, ...EXERCISE_TYPES].map((m) => (
            <button
              key={m.id}
              onClick={() => setMetric(m.id)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${metric === m.id
                ? "bg-gradient-to-br from-orange-600 to-red-600 border-transparent text-white shadow-lg shadow-orange-900/30 transform scale-105"
                : "bg-neutral-900/50 border-white/5 text-gray-400 hover:border-orange-500/50 hover:text-white hover:bg-neutral-800"
                }`}
            >
              <div className={`p-2 rounded-lg mb-2 ${metric === m.id ? "bg-white/20" : "bg-neutral-800"
                }`}>
                {EXERCISE_TYPES.some(e => e.id === m.id) ? (
                  <Dumbbell className={`w-5 h-5 ${metric === m.id ? "text-white" : "text-orange-500"}`} />
                ) : (
                  <Activity className={`w-5 h-5 ${metric === m.id ? "text-white" : "text-orange-500"}`} />
                )}
              </div>
              <span className="font-bold text-sm text-center">{m.label}</span>
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add Entry Form */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <h3 className="text-xl font-bold mb-4 text-orange-500">Add New Entry</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
              <Button type="submit" className="w-full md:w-auto">
                <Activity className="w-4 h-4 mr-2" />
                Add Entry
              </Button>
            </form>
          </Card>
        </div>

        {/* Upload Photos Section (Newly Added) */}
        <div>
          <Card className="h-full flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-orange-500 flex items-center gap-2">
              <Camera className="w-5 h-5" /> Progress Photo
            </h3>

            <div className="flex-1 bg-neutral-900 rounded-xl border border-dashed border-neutral-700 flex flex-col items-center justify-center p-4 relative overflow-hidden group">
              {previewImage ? (
                <>
                  <img src={previewImage} alt="Progress Preview" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-bold">Change Photo</p>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500">
                  <Upload className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-xs uppercase font-bold">Upload Today's Physics</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleImageUpload}
              />
            </div>
            {previewImage && (
              <Button size="sm" className="mt-4 w-full bg-neutral-800 hover:bg-neutral-700" onClick={() => setPreviewImage(null)}>
                Clear
              </Button>
            )}
          </Card>
        </div>
      </div>

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
