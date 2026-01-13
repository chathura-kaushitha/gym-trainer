import React, { useState } from "react";
import { CreditCard, Calendar, Bell, CheckCircle } from "lucide-react";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";

export default function PaymentsTab() {
    const [reminderEnabled, setReminderEnabled] = useState(false);
    const currentDate = new Date();

    // Generate days for visual calendar
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-8 h-8 text-orange-500" />
                <h2 className="text-3xl font-black uppercase italic">
                    Payments & <span className="text-orange-500">Reminders</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Payment Settings */}
                <Card className="flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Bell className="w-5 h-5 text-orange-500" />
                            Payment Reminder
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Get notified automatically on the 10th of every month for your gym membership renewal.
                        </p>

                        <div className="flex items-center justify-between bg-neutral-900 p-4 rounded-xl border border-neutral-800">
                            <span className="font-bold text-white">Enable Auto-Reminder</span>
                            <button
                                onClick={() => setReminderEnabled(!reminderEnabled)}
                                className={`w-14 h-7 rounded-full transition-colors relative ${reminderEnabled ? 'bg-orange-600' : 'bg-neutral-700'}`}
                            >
                                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${reminderEnabled ? 'left-8' : 'left-1'}`} />
                            </button>
                        </div>
                        {reminderEnabled && (
                            <div className="mt-4 flex items-center gap-2 text-green-500 text-sm animate-in fade-in slide-in-from-top-1">
                                <CheckCircle className="w-4 h-4" />
                                <span>Reminders active for the 10th of each month.</span>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5">
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Next Payment Due</h4>
                        <p className="text-3xl font-black text-white">
                            10th <span className="text-orange-500">{currentDate.toLocaleString('default', { month: 'long' })}</span>
                        </p>
                    </div>
                </Card>

                {/* Visual Calendar */}
                <Card>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-orange-500" />
                        Payment Calendar
                    </h3>

                    <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2 text-gray-500 font-bold">
                        <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {/* Empty slots for start of month offset (simplified, hardcoded for demo visual) */}
                        {[...Array(2)].map((_, i) => <div key={`empty-${i}`} />)}

                        {days.map(day => (
                            <div
                                key={day}
                                className={`aspect-square flex items-center justify-center rounded-lg text-sm font-bold relative
                            ${day === 10
                                        ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/50 scale-110 z-10'
                                        : 'bg-neutral-900/50 text-gray-400 hover:bg-neutral-800'
                                    }
                            ${day === currentDate.getDate() ? 'border border-white/30' : ''}
                        `}
                            >
                                {day}
                                {day === 10 && (
                                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 text-center text-xs text-gray-500">
                        <span className="inline-block w-3 h-3 bg-orange-600 rounded-sm mr-2 align-middle"></span>
                        Payment Due Date
                    </div>
                </Card>
            </div>
        </div>
    );
}
