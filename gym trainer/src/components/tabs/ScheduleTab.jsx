import React, { useState } from "react";
import { Calendar, Plus, Edit2, Trash2, Save, X } from "lucide-react";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import { INITIAL_SCHEDULE } from "../../data/constants.js";

export default function ScheduleTab() {
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [isEditing, setIsEditing] = useState(null); // Index of item being edited
  const [editForm, setEditForm] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [newForm, setNewForm] = useState({ day: "", focus: "", time: "08:00 AM" });

  const handleEditClick = (idx, item) => {
    setIsEditing(idx);
    setEditForm(item);
  };

  const handleSaveEdit = (idx) => {
    const newSchedule = [...schedule];
    newSchedule[idx] = editForm;
    setSchedule(newSchedule);
    setIsEditing(null);
  };

  const handleDelete = (idx) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      const newSchedule = schedule.filter((_, i) => i !== idx);
      setSchedule(newSchedule);
    }
  };

  const handleAdd = () => {
    setSchedule([...schedule, newForm]);
    setIsAdding(false);
    setNewForm({ day: "", focus: "", time: "08:00 AM" });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="border-l-4 border-orange-600 pl-4">
          <h1 className="text-4xl font-black uppercase italic">
            <span className="text-white">Weekly</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600"> Schedule</span>
          </h1>
          <p className="text-gray-400 mt-2">Manage your workout routine</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="w-full sm:w-auto">
          <Plus className="w-5 h-5 mr-2" />
          Add Workout
        </Button>
      </div>

      {isAdding && (
        <Card className="mb-6 border-orange-500/50">
          <h3 className="text-xl font-bold mb-4 text-orange-500">Add New Workout</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Day (e.g., Monday)"
              value={newForm.day}
              onChange={(e) => setNewForm({ ...newForm, day: e.target.value })}
            />
            <Input
              placeholder="Focus (e.g., Chest & Triceps)"
              value={newForm.focus}
              onChange={(e) => setNewForm({ ...newForm, focus: e.target.value })}
            />
            <Input
              placeholder="Time (e.g., 06:00 PM)"
              value={newForm.time}
              onChange={(e) => setNewForm({ ...newForm, time: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Save Routine</Button>
          </div>
        </Card>
      )}
      
      <div className="grid grid-cols-1 gap-5">
        {schedule.map((item, idx) => (
          <Card key={idx} className="group hover:border-orange-600/50 transition-all duration-300 hover:shadow-orange-900/20">
            {isEditing === idx ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-black text-orange-500 uppercase mb-2">Day</label>
                    <Input
                      value={editForm.day}
                      onChange={(e) => setEditForm({ ...editForm, day: e.target.value })}
                      placeholder="e.g., Monday"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-orange-500 uppercase mb-2">Focus</label>
                    <Input
                      value={editForm.focus}
                      onChange={(e) => setEditForm({ ...editForm, focus: e.target.value })}
                      placeholder="e.g., Chest & Triceps"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-orange-500 uppercase mb-2">Time</label>
                    <Input
                      value={editForm.time}
                      onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                      placeholder="e.g., 06:00 PM"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="outline" onClick={() => setIsEditing(null)} size="sm">
                    <X className="w-4 h-4 mr-2" /> Cancel
                  </Button>
                  <Button onClick={() => handleSaveEdit(idx)} size="sm">
                    <Save className="w-4 h-4 mr-2" /> Save
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                    <h3 className="text-2xl font-black uppercase tracking-wide">{item.day}</h3>
                    <span className="bg-gradient-to-r from-orange-600 to-red-600 px-4 py-1.5 rounded-lg text-white font-black text-sm w-fit">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-gray-400 font-medium text-base">{item.focus}</p>
                </div>
                
                <div className="flex gap-2 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleEditClick(idx, item)}
                    className="p-3 hover:bg-neutral-900 rounded-lg text-gray-400 hover:text-orange-500 transition-all border border-transparent hover:border-orange-900/30"
                    title="Edit"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(idx)}
                    className="p-3 hover:bg-red-950/30 rounded-lg text-gray-400 hover:text-red-500 transition-all border border-transparent hover:border-red-900/30"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
