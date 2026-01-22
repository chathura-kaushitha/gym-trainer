import React, { useState } from "react";
import { User, Save } from "lucide-react";
import Card from "../ui/Card.jsx";
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";

export default function ProfileTab({ currentUser, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name || "",
    email: currentUser.email || "",
    phone: currentUser.phone || "",
    address: currentUser.address || "",
    height: currentUser.height || "175",
    targetMuscle: currentUser.targetMuscle || "General Fitness",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({ ...currentUser, ...formData });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-8 h-8 text-red-600" />
        <h2 className="text-3xl font-black uppercase italic">
          My <span className="text-red-600">Profile</span>
        </h2>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-red-600">Personal Information</h3>
            <Button
              variant={isEditing ? "outline" : "primary"}
              onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
              size="sm"
            >
              {isEditing ? "Cancel" : "Edit Details"}
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <Input
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={true}
                  className="opacity-50 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Address</label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Height (cm)</label>
                <Input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div>
                {/* Fixed layout by moving Fitness Goal to align with grid properly */}
                <label className="block text-sm text-gray-400 mb-1">Fitness Goal</label>
                <select
                  value={formData.targetMuscle}
                  onChange={(e) => setFormData({ ...formData, targetMuscle: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white focus:border-[rgb(220 38 38)] outline-none ${!isEditing && "opacity-50 cursor-not-allowed"}`}
                >
                  <option value="General Fitness">General Fitness</option>
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Muscle Gain">Muscle Gain</option>
                  <option value="Hypertrophy">Hypertrophy</option>
                  <option value="Strength">Strength</option>
                  <option value="Endurance">Endurance</option>
                </select>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end pt-4">
                <Button type="submit">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}
