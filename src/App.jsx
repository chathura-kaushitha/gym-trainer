import React, { useState, useEffect } from "react";
import { Dumbbell, Users, TrendingUp, Calendar, LogOut, User, Menu, X } from "lucide-react";
import { auth, googleProvider } from "./firebase";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import BMICalculator from "./components/BMICalculator.jsx";
import ProgressTab from "./components/tabs/ProgressTab.jsx";
import OverviewTab from "./components/tabs/OverviewTab.jsx";
import ScheduleTab from "./components/tabs/ScheduleTab.jsx";
import ProfileTab from "./components/tabs/ProfileTab.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Button from "./components/ui/Button.jsx";
import Card from "./components/ui/Card.jsx";
import Input from "./components/ui/Input.jsx";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import UserDetailView from "./components/admin/UserDetailView.jsx";
import { MOCK_USERS, MOCK_PROGRESS } from "./data/mock.js";
import { COACHES, INITIAL_REVIEWS } from "./data/constants.js";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // "login" or "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [progressData, setProgressData] = useState(MOCK_PROGRESS);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    targetMuscle: "General Fitness",
  });

  // Admin Feature Stats
  const [users, setUsers] = useState(MOCK_USERS);
  const [viewingUser, setViewingUser] = useState(null); // For admin impersonation

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Here we would typically fetch the user role from Firestore.
        // For now, we'll try to match with mock users or default to "user"
        const existingMockUser = MOCK_USERS.find(u => u.email === firebaseUser.email);

        const user = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || existingMockUser?.name || "User",
          role: existingMockUser?.role || "user", // Default to user if not found in mock
          photoURL: firebaseUser.photoURL,
          status: "active"
        };
        setCurrentUser(user);

        // Also ensure user is in our "database" (mock state) so admin can see them
        setUsers(prevUsers => {
          if (!prevUsers.find(u => u.uid === user.uid)) {
            return [...prevUsers, user];
          }
          return prevUsers;
        });

      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setShowAuthModal(false);
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed: " + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setShowAuthModal(false);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert("Google Sign-In failed: " + error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, registerData.email, registerData.password);
      // Additional user data should be saved to Firestore here...
      setRegisterData({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        targetMuscle: "General Fitness",
      });
      setShowAuthModal(false);
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Registration failed: " + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setActiveTab("home");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handleUpdateProfile = (updatedUser) => {
    setCurrentUser(updatedUser);
    // In a real app, we would update Firestore here
    const userIndex = users.findIndex(u => u.uid === updatedUser.uid);
    if (userIndex !== -1) {
      const newUsers = [...users];
      newUsers[userIndex] = updatedUser;
      setUsers(newUsers);
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
            <div className="bg-gradient-to-br from-neutral-900 to-black border-2 border-neutral-800 rounded-2xl p-8 max-w-md w-full my-8">
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
                  <div className="flex gap-3 flex-col">
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
                    <Button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="w-full bg-white text-black hover:bg-gray-100 font-bold flex items-center justify-center gap-2"
                    >
                      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                      Sign in with Google
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

        {activeTab === "home" && <LandingPage />}

        {activeTab === "about" && <AboutUs />}
        {activeTab === "contact" && <ContactUs />}

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-black via-neutral-950 to-black border-b-2 border-orange-600/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-600 to-red-600 p-3 rounded-lg border border-orange-500/30">
                <Dumbbell className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-black uppercase italic tracking-tighter">
                <span className="text-white">GYM</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">TRAINER</span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => setActiveTab("home")}
                className={`font-semibold transition-colors ${activeTab === "home"
                  ? "text-orange-500"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                Home
              </button>
              <button
                onClick={() => setActiveTab("about")}
                className={`font-semibold transition-colors ${activeTab === "about"
                  ? "text-orange-500"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                About Us
              </button>
              <button
                onClick={() => setActiveTab("contact")}
                className={`font-semibold transition-colors ${activeTab === "contact"
                  ? "text-orange-500"
                  : "text-gray-400 hover:text-white"
                  }`}
              >
                Contact Us
              </button>
            </nav>

            {/* Desktop User Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setActiveTab(currentUser.role === "admin" || currentUser.role === "owner" ? "dashboard" : "overview")}
                className="flex items-center gap-2 bg-neutral-950 px-4 py-2 rounded-lg border border-neutral-800 hover:bg-neutral-900 transition-colors"
              >
                <User className="w-5 h-5 text-orange-500" />
                <span className="font-bold text-sm uppercase">Dashboard</span>
              </button>
              <Button onClick={handleLogout} variant="secondary" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                LOGOUT
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-neutral-800 flex flex-col gap-4 animate-in slide-in-from-top-2">
              <button
                onClick={() => { setActiveTab("home"); setIsMobileMenuOpen(false); }}
                className={`text-left py-2 font-semibold transition-colors ${activeTab === "home" ? "text-orange-500" : "text-gray-400"}`}
              >
                Home
              </button>
              <button
                onClick={() => { setActiveTab("about"); setIsMobileMenuOpen(false); }}
                className={`text-left py-2 font-semibold transition-colors ${activeTab === "about" ? "text-orange-500" : "text-gray-400"}`}
              >
                About Us
              </button>
              <button
                onClick={() => { setActiveTab("contact"); setIsMobileMenuOpen(false); }}
                className={`text-left py-2 font-semibold transition-colors ${activeTab === "contact" ? "text-orange-500" : "text-gray-400"}`}
              >
                Contact Us
              </button>

              <div className="h-px bg-neutral-800 my-2" />

              <button
                onClick={() => { setActiveTab(currentUser.role === "admin" || currentUser.role === "owner" ? "dashboard" : "overview"); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-2 text-gray-300 py-2"
              >
                <User className="w-5 h-5 text-orange-500" />
                Dashboard
              </button>
              <button
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                className="flex items-center gap-2 text-red-500 py-2"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Sub Header Navigation */}
      {!["home", "about", "contact", "dashboard"].includes(activeTab) && (
        <div className="bg-neutral-950/50 border-b border-white/5 backdrop-blur-sm sticky top-[73px] z-40">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
              {["overview", "schedule", "progress", "profile"].map((tab) => (
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
        </div>
      )}

      {/* Main Content */}
      {/* Main Content */}
      {activeTab === "home" ? (
        <LandingPage />
      ) : (
        <main className="max-w-7xl mx-auto px-4 py-8">
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
              />
            ) : (
              <AdminDashboard
                currentUser={currentUser}
                // onLogout={handleLogout} // Logout is now in Header
                users={users}
                setUsers={setUsers}
                onViewUser={setViewingUser}
              />
            )
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
      )}

      <Footer />
    </div>
  );
}

export default App;
