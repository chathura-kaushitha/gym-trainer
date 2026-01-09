import React, { useState } from "react";
import { ArrowLeft, User, TrendingUp, Calendar, Utensils } from "lucide-react";
import Button from "../ui/Button.jsx";
import OverviewTab from "../tabs/OverviewTab.jsx";
import ScheduleTab from "../tabs/ScheduleTab.jsx";
import ProgressTab from "../tabs/ProgressTab.jsx";
import ProfileTab from "../tabs/ProfileTab.jsx";

export default function UserDetailView({
    user,
    onBack,
    progressData,
    onAddProgress,
    onUpdateProfile,
    schedule,
    onUpdateSchedule,
    mealPlan,
    onUpdateMealPlan
}) {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Button variant="outline" onClick={onBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </Button>
                <div>
                    <h1 className="text-3xl font-black uppercase italic text-orange-500">
                        {user.name}
                    </h1>
                    <p className="text-gray-400">Viewing user dashboard</p>
                </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-neutral-900/50 p-2 rounded-xl flex items-center justify-start gap-2 mb-8 overflow-x-auto">
                {["overview", "schedule", "progress", "profile"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg font-bold uppercase text-xs tracking-widest transition-all ${activeTab === tab
                            ? "bg-orange-500 text-white shadow-lg shadow-orange-900/20"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-neutral-950 border border-white/5 rounded-2xl p-6">
                {activeTab === "overview" && (
                    <OverviewTab
                        currentUser={user}
                        progressData={progressData || []}
                    />
                )}

                {activeTab === "schedule" && (
                    <ScheduleTab
                        schedule={schedule}
                        onUpdateSchedule={onUpdateSchedule}
                        mealPlan={mealPlan}
                        onUpdateMealPlan={onUpdateMealPlan}
                    />
                )}

                {activeTab === "progress" && (
                    <ProgressTab
                        currentUser={user}
                        data={progressData || []}
                        addEntry={onAddProgress}
                    />
                )}

                {activeTab === "profile" && (
                    <ProfileTab
                        currentUser={user}
                        onUpdateProfile={onUpdateProfile}
                    />
                )}
            </div>
        </div>
    );
}
