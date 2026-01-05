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
    <div className="