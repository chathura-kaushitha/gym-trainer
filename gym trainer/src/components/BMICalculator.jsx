import React, { useState } from "react";
import { Calculator } from "lucide-react";
import Button from "./ui/Button.jsx";

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState({ text: "", color: "" });

  const calculateBMI = () => {
    if (!height || !weight) return;

    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    const val = (w / (h * h)).toFixed(1);

    setBmi(val);

    if (val < 18.5) setCategory({ text: "Underweight", color: "text-blue-400" });
    else if (val < 25) setCategory({ text: "Normal", color: "text-green-400" });
    else if (val < 30) setCategory({ text: "Overweight", color: "text-yellow-400" });
    else setCategory({ text: "Obese", color: "text-red-500" });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-neutral-900/50 border border-neutral-800 rounded-3xl p-8">
        <div>
          <h2 className="text-3xl font-black text-white mb-4 uppercase italic flex items-center gap-3">
            <Calculator className="text-orange-500 w-8 h-8" /> BMI Calculator
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Height (cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none"
              />
              <input
                type="number"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none"
              />
            </div>

            <Button onClick={calculateBMI} className="w-full">
              Calculate Now
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-black/40 rounded-2xl border border-white/5 text-center min-h-[200px]">
          {bmi ? (
            <>
              <span className="text-gray-400 text-sm uppercase mb-2">Your BMI</span>
              <span className="text-6xl font-black text-white mb-2">{bmi}</span>
              <span className={`text-xl font-bold uppercase ${category.color}`}>{category.text}</span>
            </>
          ) : (
            <span className="text-gray-500">Enter details to see result</span>
          )}
        </div>
      </div>
    </div>
  );
}