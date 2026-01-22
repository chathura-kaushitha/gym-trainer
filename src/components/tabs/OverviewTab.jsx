import React from "react";
import Card from "../ui/Card.jsx";
import { INITIAL_SCHEDULE, INITIAL_MEAL_PLAN } from "../../data/constants.js";

export default function OverviewTab({ currentUser, progressData }) {
  // Get latest weight from progress data or default
  const latestWeight = progressData
    ?.filter((d) => d.type === "Weight")
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.value || "N/A";

  return (
    <div className="space-y-10">
      {/* Page Title */}
      <div className="border-l-4 border-orange-600 pl-4">
        <h1 className="text-4xl font-black uppercase italic">
          <span className="text-white">Dashboard</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-600"> Overview</span>
        </h1>
        <p className="text-gray-400 mt-2">Track your fitness journey and progress</p>
      </div>

      {/* User Details Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="text-center">
          <h3 className="text-xs font-black text-red-600 uppercase mb-2 tracking-wider">User Name</h3>
          <p className="text-xl font-black truncate">{currentUser.name}</p>
        </Card>
        <Card className="text-center">
          <h3 className="text-xs font-black text-red-600 uppercase mb-2 tracking-wider">Member Since</h3>
          <p className="text-xl font-black">
            {new Date(currentUser.joinedAt).toLocaleDateString()}
          </p>
        </Card>
        <Card className="text-center">
          <h3 className="text-xs font-black text-red-600 uppercase mb-2 tracking-wider">Current Weight</h3>
          <p className="text-xl font-black">{latestWeight} <span className="text-sm text-gray-400">kg</span></p>
        </Card>
        <Card className="text-center">
          <h3 className="text-xs font-black text-red-600 uppercase mb-2 tracking-wider">Height</h3>
          <p className="text-xl font-black">{currentUser.height || "175"} <span className="text-sm text-gray-400">cm</span></p>
        </Card>
        <Card className="text-center">
          <h3 className="text-xs font-black text-red-600 uppercase mb-2 tracking-wider">Target Goal</h3>
          <p className="text-xl font-black truncate">{currentUser.targetMuscle}</p>
        </Card>
      </div>

      {/* Before & After Section */}
      <section>
        <div className="border-l-4 border-orange-600 pl-4 mb-6">
          <h2 className="text-3xl font-black uppercase italic">
            Transformation <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-600">Journey</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="overflow-hidden">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-black uppercase tracking-wider">
                <span className="text-gray-400">Before</span>
              </h3>
            </div>
            <div className="aspect-[4/3] bg-neutral-900 rounded-xl overflow-hidden border-2 border-neutral-800">
              <img 
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070" 
                alt="Before Transformation" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Card>
          <Card className="overflow-hidden">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-black uppercase tracking-wider">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-600">After</span>
              </h3>
            </div>
            <div className="aspect-[4/3] bg-neutral-900 rounded-xl overflow-hidden border-2 border-red-900/30">
              <img 
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070" 
                alt="After Transformation" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Card>
        </div>
      </section>

      {/* Schedule & Meal Plan Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Workout Schedule Summary */}
        <section>
          <div className="border-l-4 border-orange-600 pl-4 mb-6">
            <h2 className="text-2xl font-black uppercase italic">
              Today's <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-600">Workout</span>
            </h2>
          </div>
          <div className="space-y-3">
            {INITIAL_SCHEDULE.slice(0, 3).map((item, idx) => (
              <Card key={idx} className="hover:scale-[1.02] transition-transform">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-black uppercase">{item.day}</h3>
                    <p className="text-gray-400 text-sm mt-1">{item.focus}</p>
                  </div>
                  <div className="bg-gradient-to-r from-orange-600 to-red-600 px-4 py-2 rounded-lg">
                    <span className="text-white font-black text-sm">{item.time}</span>
                  </div>
                </div>
              </Card>
            ))}
            <p className="text-center text-gray-500 text-xs mt-4 uppercase tracking-wider">→ View full schedule in Schedule tab</p>
          </div>
        </section>

        {/* Meal Plan Summary */}
        <section>
          <div className="border-l-4 border-orange-600 pl-4 mb-6">
            <h2 className="text-2xl font-black uppercase italic">
              Daily <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-600">Nutrition</span>
            </h2>
          </div>
          <div className="space-y-3">
            {INITIAL_MEAL_PLAN.slice(0, 3).map((item, idx) => (
              <Card key={idx} className="hover:scale-[1.02] transition-transform">
                <h3 className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-600 uppercase mb-2">{item.meal}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{item.items}</p>
              </Card>
            ))}
            <p className="text-center text-gray-500 text-xs mt-4 uppercase tracking-wider">→ View full plan in Profile tab</p>
          </div>
        </section>
      </div>
    </div>
  );
}
