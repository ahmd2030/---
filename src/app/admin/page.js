"use client";

import { useState } from "react";
import { Users, CreditCard, Settings, Search, Plus, Save } from "lucide-react";
import Link from "next/link";

// Mock Data
const INITIAL_USERS = [
    { id: 1, name: "أحمد محمد", email: "ahmed@example.com", plan: "100 صورة", credits: 45, status: "active" },
    { id: 2, name: "سارة علي", email: "sara@example.com", plan: "500 صورة", credits: 320, status: "active" },
    { id: 3, name: "شركة الأناقة", email: "contact@elegance.com", plan: "700 صورة", credits: 10, status: "expiring" },
];

const INITIAL_PLANS = [
    { id: 1, name: "باقة 50 صورة", credits: 50, price: 99, duration: "1 شهر" },
    { id: 2, name: "باقة 100 صورة", credits: 100, price: 189, duration: "2 شهر" },
    { id: 3, name: "باقة 150 صورة", credits: 150, price: 269, duration: "2.5 شهر" },
    { id: 4, name: "باقة 250 صورة", credits: 250, price: 429, duration: "3 أشهر" },
    { id: 5, name: "باقة 500 صورة", credits: 500, price: 799, duration: "4 أشهر" },
    { id: 6, name: "باقة 700 صورة", credits: 700, price: 1099, duration: "6 أشهر" },
];

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("users");
    const [users, setUsers] = useState(INITIAL_USERS);
    const [plans, setPlans] = useState(INITIAL_PLANS);

    const handlePlanChange = (id, field, value) => {
        setPlans(plans.map(p => p.id === id ? { ...p, [field]: value } : p));
    };

    return (
        <div className="min-h-screen p-6 md:p-10">

            <header className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold text-white">لوحة التحكم</h1>
                <Link href="/" className="text-slate-400 hover:text-white">العودة للرئيسية</Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                {/* Sidebar */}
                <aside className="glass-card h-fit flex flex-col gap-2 p-4">
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === "users" ? "bg-primary text-white" : "text-slate-300 hover:bg-white/5"}`}
                    >
                        <Users size={20} />
                        <span>إدارة المستخدمين</span>
                    </button>
                    <button
                        onClick={() => setActiveTab("plans")}
                        className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${activeTab === "plans" ? "bg-primary text-white" : "text-slate-300 hover:bg-white/5"}`}
                    >
                        <CreditCard size={20} />
                        <span>إدارة الاشتراكات</span>
                    </button>
                    <button
                        className="flex items-center gap-3 p-3 rounded-lg transition-colors text-slate-300 hover:bg-white/5"
                    >
                        <Settings size={20} />
                        <span>الإعدادات العامة</span>
                    </button>
                </aside>

                {/* Content Area */}
                <main className="md:col-span-3">

                    {activeTab === "users" && (
                        <div className="glass-card">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-white">المستخدمين المسجلين</h2>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="بحث عن مستخدم..."
                                        className="bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm text-slate-300">
                                    <thead className="bg-slate-800/50 text-slate-100 uppercase">
                                        <tr>
                                            <th className="px-6 py-3">الاسم</th>
                                            <th className="px-6 py-3">الباقة</th>
                                            <th className="px-6 py-3">الرصيد المتبقي</th>
                                            <th className="px-6 py-3">الحالة</th>
                                            <th className="px-6 py-3">إجراءات</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id} className="border-b border-slate-700/50 hover:bg-white/5">
                                                <td className="px-6 py-4 font-medium text-white">
                                                    <div className="flex flex-col">
                                                        <span>{user.name}</span>
                                                        <span className="text-xs text-slate-500">{user.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">{user.plan}</td>
                                                <td className="px-6 py-4 font-mono text-primary">{user.credits}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${user.status === "active" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                                        {user.status === "active" ? "نشط" : "منتهي"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button className="text-blue-400 hover:text-blue-300 text-xs">تعديل الرصيد</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === "plans" && (
                        <div className="glass-card">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-white">باقات الاشتراك</h2>
                                <button className="btn-primary text-sm py-2 px-4">
                                    <Plus size={16} />
                                    إضافة باقة
                                </button>
                            </div>

                            <div className="grid gap-4">
                                {plans.map((plan) => (
                                    <div key={plan.id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex flex-wrap items-center gap-4">
                                        <div className="flex-1 min-w-[200px]">
                                            <label className="text-xs text-slate-500 mb-1 block">اسم الباقة</label>
                                            <input
                                                type="text"
                                                value={plan.name}
                                                onChange={(e) => handlePlanChange(plan.id, "name", e.target.value)}
                                                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm"
                                            />
                                        </div>
                                        <div className="w-24">
                                            <label className="text-xs text-slate-500 mb-1 block">الرصيد</label>
                                            <input
                                                type="number"
                                                value={plan.credits}
                                                onChange={(e) => handlePlanChange(plan.id, "credits", e.target.value)}
                                                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm"
                                            />
                                        </div>
                                        <div className="w-24">
                                            <label className="text-xs text-slate-500 mb-1 block">السعر (ريال)</label>
                                            <input
                                                type="number"
                                                value={plan.price}
                                                onChange={(e) => handlePlanChange(plan.id, "price", e.target.value)}
                                                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm"
                                            />
                                        </div>
                                        <div className="w-32">
                                            <label className="text-xs text-slate-500 mb-1 block">المدة</label>
                                            <input
                                                type="text"
                                                value={plan.duration}
                                                onChange={(e) => handlePlanChange(plan.id, "duration", e.target.value)}
                                                className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 text-white text-sm"
                                            />
                                        </div>
                                        <div className="flex items-end">
                                            <button className="bg-green-600/20 text-green-400 p-2 rounded hover:bg-green-600/30">
                                                <Save size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}
