import React, { useState } from "react";
import { Calendar, Plus, Edit2, Trash2, Save, X, Utensils } from "lucide-react";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";

export default function ScheduleTab({ schedule, onUpdateSchedule, mealPlan, onUpdateMealPlan }) {
  // Edit States
  const [editingScheduleIdx, setEditingScheduleIdx] = useState(null);
  const [editingMealIdx, setEditingMealIdx] = useState(null);
  const [scheduleForm, setScheduleForm] = useState({});
  const [mealForm, setMealForm] = useState({});

  // Add States
  const [isAddingSchedule, setIsAddingSchedule] = useState(false);
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [newSchedule, setNewSchedule] = useState({ day: "", focus: "", time: "08:00 AM" });
  const [newMeal, setNewMeal] = useState({ meal: "", items: "" });

  // --- Schedule Handlers ---
  const handleEditSchedule = (idx, item) => {
    setEditingScheduleIdx(idx);
    setScheduleForm(item);
  };

  const saveSchedule = (idx) => {
    const updated = [...schedule];
    updated[idx] = scheduleForm;
    onUpdateSchedule(updated);
    setEditingScheduleIdx(null);
  };

  const deleteSchedule = (idx) => {
    if (window.confirm("Delete this workout?")) {
      onUpdateSchedule(schedule.filter((_, i) => i !== idx));
    }
  };

  const addSchedule = () => {
    onUpdateSchedule([...schedule, newSchedule]);
    setIsAddingSchedule(false);
    setNewSchedule({ day: "", focus: "", time: "08:00 AM" });
  };

  // --- Meal Plan Handlers ---
  const handleEditMeal = (idx, item) => {
    setEditingMealIdx(idx);
    setMealForm(item);
  };

  const saveMeal = (idx) => {
    const updated = [...mealPlan];
    updated[idx] = mealForm;
    onUpdateMealPlan(updated);
    setEditingMealIdx(null);
  };

  const deleteMeal = (idx) => {
    if (window.confirm("Delete this meal?")) {
      onUpdateMealPlan(mealPlan.filter((_, i) => i !== idx));
    }
  };

  const addMeal = () => {
    onUpdateMealPlan([...mealPlan, newMeal]);
    setIsAddingMeal(false);
    setNewMeal({ meal: "", items: "" });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-4xl font-black uppercase italic">
            <span className="text-white">Plan Your</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600"> Week</span>
          </h1>
          <p className="text-gray-400 mt-2">Manage your workout routine and diet in one place</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* --- LEFT COLUMN: WORKOUT SCHEDULE --- */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-black uppercase italic">Workout Schedule</h2>
            </div>
            <Button onClick={() => setIsAddingSchedule(true)} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>

          {isAddingSchedule && (
            <Card className="mb-6 border-orange-500/50">
              <h3 className="text-lg font-bold mb-4 text-orange-500">Add New Workout</h3>
              <div className="grid grid-cols-1 gap-3">
                <Input
                  placeholder="Day (e.g., Monday)"
                  value={newSchedule.day}
                  onChange={(e) => setNewSchedule({ ...newSchedule, day: e.target.value })}
                />
                <Input
                  placeholder="Focus (e.g., Chest & Triceps)"
                  value={newSchedule.focus}
                  onChange={(e) => setNewSchedule({ ...newSchedule, focus: e.target.value })}
                />
                <Input
                  placeholder="Time (e.g., 06:00 PM)"
                  value={newSchedule.time}
                  onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <Button variant="outline" onClick={() => setIsAddingSchedule(false)} size="sm">Cancel</Button>
                <Button onClick={addSchedule} size="sm">Save</Button>
              </div>
            </Card>
          )}

          <div className="space-y-4">
            {schedule.map((item, idx) => (
              <Card key={idx} className="group hover:border-orange-600/30 transition-all duration-300">
                {editingScheduleIdx === idx ? (
                  <div className="space-y-3">
                    <Input
                      value={scheduleForm.day}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, day: e.target.value })}
                      placeholder="Day"
                    />
                    <Input
                      value={scheduleForm.focus}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, focus: e.target.value })}
                      placeholder="Focus"
                    />
                    <Input
                      value={scheduleForm.time}
                      onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                      placeholder="Time"
                    />
                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="outline" onClick={() => setEditingScheduleIdx(null)} size="sm">Cancel</Button>
                      <Button onClick={() => saveSchedule(idx)} size="sm">Save</Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold uppercase">{item.day}</h3>
                        <span className="text-xs bg-neutral-800 text-orange-500 px-2 py-0.5 rounded font-bold">{item.time}</span>
                      </div>
                      <p className="text-gray-400">{item.focus}</p>
                    </div>
                    <div className="flex flex-col gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEditSchedule(idx, item)} className="text-gray-500 hover:text-orange-500"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => deleteSchedule(idx)} className="text-gray-500 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* --- RIGHT COLUMN: MEAL PLAN --- */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <Utensils className="w-6 h-6 text-orange-500" />
              <h2 className="text-2xl font-black uppercase italic">Dietary Plan</h2>
            </div>
            <Button onClick={() => setIsAddingMeal(true)} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </div>

          {isAddingMeal && (
            <Card className="mb-6 border-orange-500/50">
              <h3 className="text-lg font-bold mb-4 text-orange-500">Add New Meal</h3>
              <div className="grid grid-cols-1 gap-3">
                <Input
                  placeholder="Meal Name (e.g., Breakfast)"
                  value={newMeal.meal}
                  onChange={(e) => setNewMeal({ ...newMeal, meal: e.target.value })}
                />
                <Input
                  placeholder="Items (e.g., Oats, Eggs...)"
                  value={newMeal.items}
                  onChange={(e) => setNewMeal({ ...newMeal, items: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <Button variant="outline" onClick={() => setIsAddingMeal(false)} size="sm">Cancel</Button>
                <Button onClick={addMeal} size="sm">Save</Button>
              </div>
            </Card>
          )}

          <div className="space-y-4">
            {mealPlan.map((item, idx) => (
              <Card key={idx} className="group hover:border-orange-600/30 transition-all duration-300">
                {editingMealIdx === idx ? (
                  <div className="space-y-3">
                    <Input
                      value={mealForm.meal}
                      onChange={(e) => setMealForm({ ...mealForm, meal: e.target.value })}
                      placeholder="Meal Name"
                    />
                    <Input
                      value={mealForm.items}
                      onChange={(e) => setMealForm({ ...mealForm, items: e.target.value })}
                      placeholder="Items"
                    />
                    <div className="flex justify-end gap-2 pt-2">
                      <Button variant="outline" onClick={() => setEditingMealIdx(null)} size="sm">Cancel</Button>
                      <Button onClick={() => saveMeal(idx)} size="sm">Save</Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold uppercase text-orange-500 mb-1">{item.meal}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{item.items}</p>
                    </div>
                    <div className="flex flex-col gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEditMeal(idx, item)} className="text-gray-500 hover:text-orange-500"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => deleteMeal(idx)} className="text-gray-500 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
