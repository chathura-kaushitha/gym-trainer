import React, { useState, useEffect } from "react";
import { Dumbbell, Users, TrendingUp, Calendar, LogOut, User } from "lucide-react";
import BMICalculator from "./components/BMICalculator.jsx";
import ProgressTab from "./components/tabs/ProgressTab.jsx";
import Button from "./components/ui/Button.jsx";
import Card from "./components/ui/Card.jsx";
import { MOCK_USERS, MOCK_PROGRESS } from "./data/mock.js";
import { COACHES, INITIAL_REVIEWS, INITIAL_SCHEDULE, INITIAL_MEAL_PLAN } from "./data/constants.js";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const [progressData, setProgressData] = useState(MOCK_PROGRESS);

  useEffect(() => {
    const savedUser = localStorage.getItem("gymUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = MOCK_USERS.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("gymUser", JSON.stringify(user));
      setEmail("");
      setPassword("");
    } else {
      alert("Invalid credentials. Try: user@gym.lk / 123");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("gymUser");
    setActiveTab("home");
  };

  const addProgressEntry = (userId, type, value, reps = null) => {
    const newEntry = {
      date: new Date().toISOString().split("T")[0],
      type,
      value: parseFloat(value),
      ...(reps && { reps: parseInt(reps) }),
    };

    setProgressData((prev) => ({
      ...prev,
      [userId]: [...(prev[userId] || []), newEntry],
    }));
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-white">
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070')] bg-cover bg-center opacity-20"></div>
          
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Dumbbell className="w-16 h-16 text-orange-500" />
              <h1 className="text-7xl font-black uppercase italic">
                <span className="text-white">Gym</span>
                <span className="text-orange-500"> Trainer</span>
              </h1>
            </div>
            
            <p className="text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Transform Your Body, Transform Your Life
            </p>

            {/* Login Form */}
            <div className="max-w-md mx-auto bg-neutral-900/80 backdrop-blur-sm border border-neutral-800 rounded-2xl p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6 text-orange-500">Member Login</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none"
                  required
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
              <p className="text-sm text-gray-400 mt-4">
                Demo: user@gym.lk / 123
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              <Card className="text-center">
                <Users className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Expert Coaches</h3>
                <p className="text-gray-400">Professional trainers to guide you</p>
              </Card>
              <Card className="text-center">
                <TrendingUp className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Track Progress</h3>
                <p className="text-gray-400">Monitor your fitness journey</p>
              </Card>
              <Card className="text-center">
                <Calendar className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Custom Plans</h3>
                <p className="text-gray-400">Personalized workout schedules</p>
              </Card>
            </div>
          </div>
        </div>

        {/* BMI Calculator Section */}
        <BMICalculator />

        {/* Coaches Section */}
        <div className="max-w-6xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-black text-center mb-12 uppercase italic">
            Meet Our <span className="text-orange-500">Coaches</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {COACHES.map((coach) => (
              <Card key={coach.id} className="text-center">
                <img
                  src={coach.img}
                  alt={coach.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className="text-xl font-bold">{coach.name}</h3>
                <p className="text-orange-500">{coach.role}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="max-w-4xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-black text-center mb-12 uppercase italic">
            Member <span className="text-orange-500">Reviews</span>
          </h2>
          <div className="space-y-4">
            {INITIAL_REVIEWS.map((review) => (
              <Card key={review.id}>
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{review.name}</h4>
                    <p className="text-gray-400 mt-2">{review.text}</p>
                    <div className="flex gap-1 mt-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-orange-500">★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-white">
      {/* Header */}
      <header className="bg-neutral-900/50 backdrop-blur-sm border-b border-neutral-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Dumbbell className="w-8 h-8 text-orange-500" />
              <h1 className="text-2xl font-black uppercase italic">
                <span className="text-white">Gym</span>
                <span className="text-orange-500"> Trainer</span>
              </h1>
            </div>
            
            <nav className="flex items-center gap-6">
              <button
                onClick={() => setActiveTab("home")}
                className={`font-semibold ${activeTab === "home" ? "text-orange-500" : "text-gray-400 hover:text-white"}`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab("progress")}
                className={`font-semibold ${activeTab === "progress" ? "text-orange-500" : "text-gray-400 hover:text-white"}`}
              >
                Progress
              </button>
              <button
                onClick={() => setActiveTab("schedule")}
                className={`font-semibold ${activeTab === "schedule" ? "text-orange-500" : "text-gray-400 hover:text-white"}`}
              >
                Schedule
              </button>
              <button
                onClick={() => setActiveTab("meals")}
                className={`font-semibold ${activeTab === "meals" ? "text-orange-500" : "text-gray-400 hover:text-white"}`}
              >
                Meals
              </button>
            </nav>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-orange-500" />
                <span className="font-semibold">{currentUser.name}</span>
              </div>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "home" && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-black mb-2">Welcome back, {currentUser.name}!</h2>
              <p className="text-gray-400">Let's crush your fitness goals today</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <h3 className="text-lg font-bold mb-2 text-orange-500">Status</h3>
                <p className="text-2xl font-black">{currentUser.status.toUpperCase()}</p>
              </Card>
              <Card>
                <h3 className="text-lg font-bold mb-2 text-orange-500">Target</h3>
                <p className="text-2xl font-black">{currentUser.targetMuscle}</p>
              </Card>
              <Card>
                <h3 className="text-lg font-bold mb-2 text-orange-500">Member Since</h3>
                <p className="text-2xl font-black">
                  {new Date(currentUser.joinedAt).toLocaleDateString()}
                </p>
              </Card>
            </div>

            <BMICalculator />
          </div>
        )}

        {activeTab === "progress" && (
          <ProgressTab
            currentUser={currentUser}
            data={progressData[currentUser.uid] || []}
            addEntry={addProgressEntry}
          />
        )}

        {activeTab === "schedule" && (
          <div>
            <h2 className="text-3xl font-black mb-6 uppercase italic">
              Weekly <span className="text-orange-500">Schedule</span>
            </h2>
            <div className="space-y-4">
              {INITIAL_SCHEDULE.map((item, idx) => (
                <Card key={idx}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{item.day}</h3>
                      <p className="text-gray-400">{item.focus}</p>
                    </div>
                    <div className="text-orange-500 font-bold text-lg">{item.time}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === "meals" && (
          <div>
            <h2 className="text-3xl font-black mb-6 uppercase italic">
              Meal <span className="text-orange-500">Plan</span>
            </h2>
            <div className="space-y-4">
              {INITIAL_MEAL_PLAN.map((item, idx) => (
                <Card key={idx}>
                  <h3 className="text-xl font-bold text-orange-500 mb-2">{item.meal}</h3>
                  <p className="text-gray-300">{item.items}</p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
