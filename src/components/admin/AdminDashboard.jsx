import React, { useState } from "react";
import { Users, UserPlus, Search, Check, X, Shield, Activity, LogOut, Trash2, Eye } from "lucide-react";
import Card from "../ui/Card.jsx";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import { MOCK_USERS } from "../../data/mock.js";

export default function AdminDashboard({ currentUser, onLogout, users, setUsers, onViewUser }) {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [searchTerm, setSearchTerm] = useState("");
    const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "" });
    const [isAddingAdmin, setIsAddingAdmin] = useState(false);

    const pendingUsers = users.filter(u => u.status === "pending");
    const activeUsers = users.filter(u => u.status === "active" && u.role === "user");
    const admins = users.filter(u => u.role === "admin");
    const allAdmins = users.filter(u => u.role === "admin" || u.role === "owner");

    const handleApprove = (userId) => {
        setUsers(users.map(u => u.uid === userId ? { ...u, status: "active" } : u));
        alert("User Approved!");
    };

    const handleReject = (userId) => {
        if (window.confirm("Reject and remove this user request?")) {
            setUsers(users.filter(u => u.uid !== userId));
        }
    };

    const handleAddAdmin = (e) => {
        e.preventDefault();
        const newAdminUser = {
            uid: `admin${Date.now()}`,
            ...newAdmin,
            role: "admin",
            status: "active",
            joinedAt: new Date().toISOString(),
        };
        setUsers([...users, newAdminUser]);
        setNewAdmin({ name: "", email: "", password: "" });
        setIsAddingAdmin(false);
        alert("New Admin Added!");
    };

    const handleRemoveAdmin = (uid) => {
        if (window.confirm("Are you sure you want to remove this admin?")) {
            setUsers(users.filter(u => u.uid !== uid));
        }
    };

    const filteredUsers = activeUsers.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black text-white p-4 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-black uppercase italic">
                        <span className="text-red-600">{currentUser.role === 'owner' ? 'Super Admin' : 'Admin'}</span> Dashboard
                    </h1>
                    <p className="text-gray-400">Welcome back, {currentUser.name}</p>
                </div>

            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-white/10 pb-1">
                <button
                    onClick={() => setActiveTab("dashboard")}
                    className={`px-4 py-2 font-bold uppercase transition-colors ${activeTab === "dashboard" ? "text-red-600 border-b-2 border-red-600" : "text-gray-400 hover:text-white"}`}
                >
                    Overview
                </button>
                {currentUser.role === 'owner' && (
                    <button
                        onClick={() => setActiveTab("admins")}
                        className={`px-4 py-2 font-bold uppercase transition-colors ${activeTab === "admins" ? "text-red-600 border-b-2 border-red-600" : "text-gray-400 hover:text-white"}`}
                    >
                        Manage Admins
                    </button>
                )}
            </div>

            {activeTab === "dashboard" && (
                <div className="space-y-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="border border-white/5 hover:border-red-600/50 transition-all duration-300 bg-neutral-900/50">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Users</p>
                                    <h3 className="text-4xl font-black mt-2 text-white">{activeUsers.length}</h3>
                                </div>
                                <div className="p-3 rounded-xl bg-red-600/10 text-red-600">
                                    <Users className="w-8 h-8" />
                                </div>
                            </div>
                        </Card>
                        {currentUser.role === 'owner' && (
                            <Card className="border border-white/5 hover:border-yellow-500/50 transition-all duration-300 bg-neutral-900/50">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Pending Approvals</p>
                                        <h3 className="text-4xl font-black mt-2 text-white">{pendingUsers.length}</h3>
                                    </div>
                                    <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500">
                                        <Activity className="w-8 h-8" />
                                    </div>
                                </div>
                            </Card>
                        )}
                        <Card className="border border-white/5 hover:border-blue-500/50 transition-all duration-300 bg-neutral-900/50">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Total Admins</p>
                                    <h3 className="text-4xl font-black mt-2 text-white">{allAdmins.length}</h3>
                                </div>
                                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                                    <Shield className="w-8 h-8" />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Pending Approvals (Owner Only) */}
                    {currentUser.role === 'owner' && pendingUsers.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-yellow-500 flex items-center gap-2">
                                <Activity className="w-6 h-6" /> Pending Approvals
                            </h2>
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {pendingUsers.map(user => (
                                    <Card key={user.uid} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-yellow-500/5 border-yellow-500/20 p-4">
                                        <div className="flex items-center gap-4 flex-1 min-w-0">
                                            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-yellow-500 text-xl">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="font-bold text-lg leading-tight truncate">{user.name}</h3>
                                                <p className="text-sm text-gray-400 truncate">{user.email}</p>
                                                <div className="hidden sm:flex gap-2 text-xs text-gray-500 mt-1">
                                                    <span>Joined: {new Date(user.joinedAt).toLocaleDateString()}</span>
                                                    <span>•</span>
                                                    <span>Goal: {user.targetMuscle}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 flex-shrink-0 ml-auto">
                                            <button onClick={() => handleApprove(user.uid)} className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors duration-200" title="Approve User">
                                                <Check className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleReject(user.uid)} className="p-2 bg-neutral-800 hover:bg-neutral-700 text-red-500 rounded-full border border-neutral-700 hover:border-red-500/50 transition-all duration-200" title="Reject User">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* User Management */}
                    <section>
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <Users className="w-6 h-6 text-red-600" /> User Management
                            </h2>
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 outline-none focus:border-red-600 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="grid gap-4">
                            {filteredUsers.map(user => (
                                <Card key={user.uid} className="group hover:border-red-600/30 transition-all">
                                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-neutral-800 rounded-full flex items-center justify-center font-bold text-gray-400 group-hover:text-red-600 transition-colors">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg group-hover:text-red-600 transition-colors">{user.name}</h3>
                                                <p className="text-sm text-gray-400">{user.email}</p>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="secondary" onClick={() => onViewUser(user)}>
                                            <Eye className="w-4 h-4 mr-2" /> View Dashboard
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                            {filteredUsers.length === 0 && (
                                <p className="text-center text-gray-500 py-8">No active users found.</p>
                            )}
                        </div>
                    </section>
                </div>
            )}

            {/* Admin Management Tab (Owner Only) */}
            {activeTab === "admins" && currentUser.role === 'owner' && (
                <div className="space-y-8">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold text-blue-500">System Administrators</h2>
                        <Button onClick={() => setIsAddingAdmin(!isAddingAdmin)}>
                            <UserPlus className="w-4 h-4 mr-2" /> {isAddingAdmin ? "Cancel" : "Add New Admin"}
                        </Button>
                    </div>

                    {isAddingAdmin && (
                        <Card className="border-blue-500/50 max-w-2xl mx-auto">
                            <h3 className="text-xl font-bold mb-4">Create New Admin</h3>
                            <form onSubmit={handleAddAdmin} className="space-y-4">
                                <Input
                                    placeholder="Full Name"
                                    value={newAdmin.name}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                                    required
                                />
                                <Input
                                    type="email"
                                    placeholder="Email Address"
                                    value={newAdmin.email}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                                    required
                                />
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={newAdmin.password}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                                    required
                                />
                                <div className="flex justify-end">
                                    <Button type="submit">Create Admin Profile</Button>
                                </div>
                            </form>
                        </Card>
                    )}

                    <div className="grid gap-4">
                        {admins.map(admin => (
                            <Card key={admin.uid} className="flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center font-bold text-blue-500 text-xl">
                                        {admin.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{admin.name}</h3>
                                        <p className="text-sm text-gray-400">{admin.email}</p>
                                        <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded mt-1 inline-block">Admin Role</span>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" onClick={() => handleRemoveAdmin(admin.uid)} className="hover:text-red-500 hover:border-red-500">
                                    <Trash2 className="w-4 h-4" /> Remove
                                </Button>
                            </Card>
                        ))}
                        {admins.length === 0 && (
                            <p className="text-center text-gray-500 py-8">No other admins defined.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
