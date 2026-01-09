import React, { useState, useEffect } from "react";
import { Dumbbell, Users, TrendingUp, Calendar, LogOut, User, Menu, X, Lock, CheckCircle, AlertCircle } from "lucide-react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import BMICalculator from "./components/BMICalculator.jsx";
import ProgressTab from "./components/tabs/ProgressTab.jsx";
import OverviewTab from "./components/tabs/OverviewTab.jsx";
import ScheduleTab from "./components/tabs/ScheduleTab.jsx";
import ProfileTab from "./components/tabs/ProfileTab.jsx";
import ReviewsTab from "./components/tabs/ReviewsTab.jsx";
import PaymentsTab from "./components/tabs/PaymentsTab.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Button from "./components/ui/Button.jsx";
import Card from "./components/ui/Card.jsx";
import Input from "./components/ui/Input.jsx";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import UserDetailView from "./components/admin/UserDetailView.jsx";
import { MOCK_USERS, MOCK_PROGRESS } from "./data/mock.js";
import { COACHES, INITIAL_REVIEWS, INITIAL_SCHEDULE, INITIAL_MEAL_PLAN } from "./data/constants.js";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" or "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("home"); // Changed default to "home"
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Data State with Persistence
  const [progressData, setProgressData] = useState(MOCK_PROGRESS);
  const [scheduleData, setScheduleData] = useState({}); // { uid: [scheduleItems] }
  const [mealPlanData, setMealPlanData] = useState({}); // { uid: [mealItems] }

  // Registration State
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    targetMuscle: "General Fitness",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Admin Feature Stats
  const [users, setUsers] = useState(MOCK_USERS);
  const [viewingUser, setViewingUser] = useState(null); // For admin impersonation

  // Load Data
  useEffect(() => {
    const savedUser = localStorage.getItem("gymUser");
    const savedProgress = localStorage.getItem("gymProgress");
    const savedSchedules = localStorage.getItem("gymSchedules");
    const savedMeals = localStorage.getItem("gymMeals");
    const savedUsers = localStorage.getItem("gymAllUsers");

    // Only restore user if valid
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setCurrentUser(parsedUser);
      // If user was saved but is pending, ensure we show pending screen
      if (parsedUser.status === 'pending') {
        setActiveTab('pending_approval');
      } else if (activeTab === 'home') {
        // If restored and active, go to dashboard/overview
        setActiveTab(parsedUser.role === 'user' ? 'overview' : 'dashboard');
      }
    }

    if (savedProgress) setProgressData(JSON.parse(savedProgress));
    if (savedSchedules) setScheduleData(JSON.parse(savedSchedules));
    if (savedMeals) setMealPlanData(JSON.parse(savedMeals));
    if (savedUsers) setUsers(JSON.parse(savedUsers));
  }, []);

  // Save Data on Change
  useEffect(() => {
    if (Object.keys(progressData).length > 0) localStorage.setItem("gymProgress", JSON.stringify(progressData));
  }, [progressData]);

  useEffect(() => {
    if (Object.keys(scheduleData).length > 0) localStorage.setItem("gymSchedules", JSON.stringify(scheduleData));
  }, [scheduleData]);

  useEffect(() => {
    if (Object.keys(mealPlanData).length > 0) localStorage.setItem("gymMeals", JSON.stringify(mealPlanData));
  }, [mealPlanData]);

  useEffect(() => {
    localStorage.setItem("gymAllUsers", JSON.stringify(users));
  }, [users]);


  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("gymUser", JSON.stringify(user));
      setEmail("");
      setPassword("");
      setShowAuthModal(false);

      if (user.status === "pending") {
        setActiveTab("pending_approval");
      } else {
        setActiveTab(user.role === "admin" || user.role === "owner" ? "dashboard" : "overview");
      }
    } else {
      alert("Invalid credentials. Try: user@gym.lk / 123");
    }
  };



  const handleRegister = (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert("You must agree to the Terms & Conditions to register.");
      return;
    }

    const newUser = {
      uid: `user${Date.now()}`,
      ...registerData,
      role: "user",
      status: "pending",
      joinedAt: new Date().toISOString(),
    };

    // Save new user
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);

    // Auto-login as pending
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
    setTermsAccepted(false);
    setShowAuthModal(false);
    setActiveTab("pending_approval");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("gymUser");
    setActiveTab("home");
  };

  const handleUpdateProfile = (updatedUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem("gymUser", JSON.stringify(updatedUser));
    setUsers(users.map(u => u.uid === updatedUser.uid ? updatedUser : u));
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

  // Helper to update schedule/meal for a specific user
  const updateUserSchedule = (uid, newSchedule) => {
    setScheduleData(prev => ({ ...prev, [uid]: newSchedule }));
  };

  const updateUserMealPlan = (uid, newMealPlan) => {
    setMealPlanData(prev => ({ ...prev, [uid]: newMealPlan }));
  };


  if (!currentUser && activeTab !== "home" && activeTab !== "about" && activeTab !== "contact") {
    // Redirect to home if accessing protected route without user (cleanup state)
    setActiveTab("home");
  }


  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      {/* Header */}
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
        setActiveTab={(tab) => {
          if (currentUser && currentUser.status === 'pending' && tab !== 'home' && tab !== 'contact' && tab !== 'about') {
            return; // Block access to app features if pending
          }
          setActiveTab(tab);
        }}
        currentUser={currentUser} // Pass currentUser to header to show Dashboard/Logout
        onLogout={handleLogout}
      />


      {/* Main Content */}
      <main className="flex-grow">
        {activeTab === "home" && <LandingPage />}
        {activeTab === "about" && <AboutUs />}
        {activeTab === "contact" && <ContactUs />}

        {/* Pending Approval Screen */}
        {activeTab === "pending_approval" && (
          <div className="max-w-md mx-auto mt-20 p-8 text-center">
            <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-yellow-500" />
            </div>
            <h2 className="text-3xl font-black uppercase italic mb-4">Waiting for <span className="text-orange-500">Approval</span></h2>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-8">
              <p className="text-gray-300 leading-relaxed">
                Your account has been created successfully!
                <br /><br />
                The gym administrator needs to approve your request before you can access the dashboard, schedules, and meal plans.
                <br /><br />
                Please check back later.
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        )}

        {/* Protected Routes */}
        {currentUser && currentUser.status === 'active' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Sub Header for App Tabs */}
            {currentUser.role === 'user' && !['home', 'about', 'contact', 'pending_approval'].includes(activeTab) && (
              <div className="mb-8 overflow-x-auto no-scrollbar">
                <nav className="flex items-center justify-center gap-2">
                  {["overview", "schedule", "progress", "profile", "payments", "reviews"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-5 py-2.5 rounded-xl font-black uppercase text-xs tracking-widest transition-all duration-300 ${activeTab === tab
                        ? "bg-[#F97316] text-white shadow-lg shadow-orange-900/20"
                        : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
              </div>
            )}

            {activeTab === "overview" && (
              <OverviewTab
                currentUser={currentUser}
                progressData={progressData[currentUser.uid] || []}
              />
            )}

            {activeTab === "dashboard" && (
              viewingUser ? (
                <UserDetailView
                  user={viewingUser}
                  onBack={() => setViewingUser(null)}
                  progressData={progressData[viewingUser.uid] || []}
                  onAddProgress={addProgressEntry}
                  onUpdateProfile={(updated) => {
                    setUsers(users.map(u => u.uid === updated.uid ? updated : u));
                    setViewingUser(updated);
                    alert("User Profile Updated");
                  }}
                  schedule={scheduleData[viewingUser.uid] || INITIAL_SCHEDULE}
                  onUpdateSchedule={(newS) => updateUserSchedule(viewingUser.uid, newS)}
                  mealPlan={mealPlanData[viewingUser.uid] || INITIAL_MEAL_PLAN}
                  onUpdateMealPlan={(newM) => updateUserMealPlan(viewingUser.uid, newM)}
                />
              ) : (
                <AdminDashboard
                  currentUser={currentUser}
                  users={users}
                  setUsers={setUsers}
                  onViewUser={setViewingUser}
                />
              )
            )}

            {activeTab === "schedule" && (
              <ScheduleTab
                schedule={scheduleData[currentUser.uid] || INITIAL_SCHEDULE}
                onUpdateSchedule={(newS) => updateUserSchedule(currentUser.uid, newS)}
                mealPlan={mealPlanData[currentUser.uid] || INITIAL_MEAL_PLAN}
                onUpdateMealPlan={(newM) => updateUserMealPlan(currentUser.uid, newM)}
              />
            )}

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

            {activeTab === "reviews" && <ReviewsTab />}
            {activeTab === "payments" && <PaymentsTab />}

          </div>
        )}
      </main>

      <Footer />

      {/* Auth Modal (Login/Register) */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-neutral-900 to-black border-2 border-neutral-800 rounded-2xl p-8 max-w-md w-full my-8 relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

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
                <div className="flex gap-3 pt-2">
                  <Button type="submit" className="flex-1">
                    Login
                  </Button>
                </div>

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

                {/* Terms & Conditions Checkbox */}
                <label className="flex items-start gap-3 p-3 bg-neutral-900/50 rounded-lg border border-neutral-800 cursor-pointer hover:border-orange-500/30 transition-colors">
                  <div className="relative flex items-center mt-1">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="w-5 h-5 appearance-none bg-neutral-800 border-2 border-neutral-600 rounded checked:bg-orange-500 checked:border-orange-500 transition-colors"
                    />
                    {termsAccepted && <CheckCircle className="absolute inset-0 w-5 h-5 text-white pointer-events-none" />}
                  </div>
                  <span className="text-sm text-gray-400">
                    I agree to the <a href="#" className="text-orange-500 hover:underline">Terms of Service</a> and <a href="#" className="text-orange-500 hover:underline">Privacy Policy</a>
                  </span>
                </label>

                <div className="flex gap-3 pt-2">
                  <Button type="submit" className="flex-1" disabled={!termsAccepted}>
                    Register
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
    </div>
  );
}

export default App;
