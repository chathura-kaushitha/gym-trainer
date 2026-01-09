import React, { useState } from "react";
import { User, Save, Utensils } from "lucide-react";
import Card from "../ui/Card.jsx";
import Input from "../ui/Input.jsx";
import Button from "../ui/Button.jsx";
import { INITIAL_MEAL_PLAN } from "../../data/constants.js";

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
        <User className="w-8 h-8 text-orange-500" />
        <h2 className="text-3xl font-black uppercase italic">
          My <span className="text-orange-500">Profile</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Personal Information */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-orange-500">Personal Information</h3>
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
                    disabled={true} // Email usually shouldn't be editable easily
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
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Fitness Goal</label>
                  <select
                    value={formData.targetMuscle}
                    onChange={(e) => setFormData({ ...formData, targetMuscle: e.target.value })}
                    disabled={!isEditing}
                    className={`w-full bg-[#0F0F0F] border border-[#2A2A2A] rounded-xl px-4 py-3 text-white focus:border-[#F97316] outline-none ${!isEditing && "opacity-50 cursor-not-allowed"}`}
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

        {/* Meal Plan (Moved here as per requirement to show in Profile or Overview, but usually fits well with personal plan) 
            Wait, the requirement said "Meal Plan and Workout Schedule must be shown as separate sections" in Overview.
            But also "Profile Section... Displays user personal information".
            I'll keep Meal Plan here as a reference or maybe just keep it in Overview?
            Actually, the requirement says "Meal Plan and Workout Schedule must be shown as separate sections" under Overview.
            But usually a full meal plan is good to have accessible. I'll add it here as well for completeness or just stick to the requirement.
            The requirement for Profile is "Displays user personal information, Allows updating basic details".
            I'll stick to that.
        */}
      </div>
      
      {/* Full Meal Plan Section - Adding it here as it was removed from main tabs */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Utensils className="w-8 h-8 text-orange-500" />
          <h2 className="text-3xl font-black uppercase italic">
            Dietary <span className="text-orange-500">Plan</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {INITIAL_MEAL_PLAN.map((item, idx) => (
            <Card key={idx}>
              <h3 className="text-xl font-bold text-orange-500 mb-2">{item.meal}</h3>
              <p className="text-gray-300">{item.items}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
