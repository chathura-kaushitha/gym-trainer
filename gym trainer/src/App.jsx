import React, { useState, useEffect } from "react";
import { Dumbbell, Users, TrendingUp, Calendar, LogOut, User } from "lucide-react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import BMICalculator from "./components/BMICalculator.jsx";
import ProgressTab from "./components/tabs/ProgressTab.jsx";
import OverviewTab from "./components/tabs/OverviewTab.jsx";
import ScheduleTab from "./components/tabs/ScheduleTab.jsx";
import ProfileTab from "./components/tabs/ProfileTab.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Button from "./components/ui/Button.jsx";
import Card from "./components/ui/Card.jsx";
import Input from "./components/ui/Input.jsx";
import { MOCK_USERS, MOCK_PROGRESS } from "./data/mock.js";
import { COACHES, INITIAL_REVIEWS } from "./data/constants.js";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" or "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [progressData, setProgressData] = useState(MOCK_PROGRESS);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    targetMuscle: "General Fitness",
  });

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
      setShowAuthModal(false);
      setActiveTab("overview");
    } else {
      alert("Invalid credentials. Try: user@gym.lk / 123");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      uid: `user${Date.now()}`,
      ...registerData,
      role: "user",
      status: "active",
      joinedAt: new Date().toISOString(),
    };
    MOCK_USERS.push(newUser);
    setCurrentUser(newUser);
    localStorage.setItem("gymUser", JSON.stringify(newUser));
    setRegisterData({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      targetMuscle: "General Fitness",
    });
    setShowAuthModal(false);
    setActiveTab("overview");
    alert("Registration successful! Welcome to Gym Trainer!");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("gymUser");
    setActiveTab("home");
  };

  const handleUpdateProfile = (updatedUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem("gymUser", JSON.stringify(updatedUser));
    // Update in MOCK_USERS as well if needed, but for now local state is enough
    const userIndex = MOCK_USERS.findIndex(u => u.uid === updatedUser.uid);
    if (userIndex !== -1) {
      MOCK_USERS[userIndex] = updatedUser;
    }
    alert("Profile updated successfully!");
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
        <Header
          onLoginClick={() => {
            setAuthMode("login");
            setShowAuthModal(true);
          }}
          onRegisterClick={() => {
            setAuthMode("register");
            setShowAuthModal(true);
          }}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Auth Modal (Login/Register) */}
        {showAuthModal && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-gradient-to-br from-neutral-900 to-black border-2 border-neutral-800 rounded-2xl p-8 max-w-md w-full my-8 shadow-2xl">
              <h2 className="text-3xl font-black mb-6 uppercase italic text-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                  {authMode === "login" ? "Welcome Back" : "Join Us"}
                </span>
              </h2>

              {authMode === "login" ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1">
                      Login
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAuthModal(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                  <p className="text-sm text-gray-400 mt-4 text-center">
                    Demo: user@gym.lk / 123
                  </p>
                  <div className="text-center mt-4 pt-4 border-t border-neutral-800">
                    <p className="text-gray-400 text-sm">
                      Don't have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setAuthMode("register")}
                        className="text-orange-500 font-bold hover:text-orange-400 transition-colors"
                      >
                        Register here
                      </button>
                    </p>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Full Name"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                  />
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Address"
                    value={registerData.address}
                    onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}
                    required
                  />
                  <select
                    value={registerData.targetMuscle}
                    onChange={(e) => setRegisterData({ ...registerData, targetMuscle: e.target.value })}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none"
                  >
                    <option value="General Fitness">General Fitness</option>
                    <option value="Weight Loss">Weight Loss</option>
                    <option value="Muscle Gain">Muscle Gain</option>
                    <option value="Hypertrophy">Hypertrophy</option>
                    <option value="Strength">Strength</option>
                    <option value="Endurance">Endurance</option>
                  </select>
                  <div className="flex gap-3">
                    <Button type="submit" className="flex-1">
                      Register
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAuthModal(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                  <div className="text-center mt-4 pt-4 border-t border-neutral-800">
                    <p className="text-gray-400 text-sm">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setAuthMode("login")}
                        className="text-orange-500 font-bold hover:text-orange-400 transition-colors"
                      >
                        Login here
                      </button>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {activeTab === "home" && (
          <>
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
          </>
        )}

        {activeTab === "about" && <AboutUs />}
        {activeTab === "contact" && <ContactUs />}

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-black via-neutral-950 to-black border-b-2 border-orange-600/30 sticky top-0 z-50 shadow-2xl shadow-orange-900/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-600 to-red-600 p-3 rounded-lg shadow-lg shadow-orange-600/50 border border-orange-500/30">
                <Dumbbell className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-black uppercase italic tracking-tighter">
                <span className="text-white drop-shadow-lg">GYM</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 drop-shadow-lg">TRAINER</span>
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-2 bg-black p-1.5 rounded-xl border-2 border-neutral-900 shadow-inner">
              {["overview", "schedule", "progress", "profile", "about", "contact"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2.5 rounded-lg font-black uppercase text-xs tracking-wider transition-all duration-200 ${
                    activeTab === tab 
                      ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-600/50 border border-orange-500/50" 
                      : "text-gray-500 hover:text-white hover:bg-neutral-900 border border-transparent"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-neutral-950 px-4 py-2 rounded-lg border border-neutral-800">
                <User className="w-5 h-5 text-orange-500" />
                <span className="font-bold text-sm">{currentUser.name}</span>
              </div>
              <Button onClick={handleLogout} variant="secondary" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                LOGOUT
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === "overview" && (
          <OverviewTab 
            currentUser={currentUser} 
            progressData={progressData[currentUser.uid] || []} 
          />
        )}

        {activeTab === "schedule" && <ScheduleTab />}

        {activeTab === "progress" && (
          <ProgressTab
            currentUser={currentUser}
            data={progressData[currentUser.uid] || []}
            addEntry={addProgressEntry}
          />
        )}

        {activeTab === "profile" && (
          <ProfileTab 
            currentUser={currentUser} 
            onUpdateProfile={handleUpdateProfile} 
          />
        )}

        {activeTab === "about" && <AboutUs />}

        {activeTab === "contact" && <ContactUs />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
