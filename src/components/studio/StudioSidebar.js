
import { motion } from "framer-motion";
import { Globe, User, Shirt, Sparkles, LogOut } from "lucide-react";

export default function StudioSidebar({ activeTab, setActiveTab, onGenerate, isGenerating }) {
    const menuItems = [
        { id: "background", icon: Globe, label: "البيئة" },
        { id: "model", icon: User, label: "المودل" },
        { id: "clothes", icon: Shirt, label: "الأزياء" },
    ];

    return (
        <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4"
        >
            <div className="glass-card p-3 rounded-2xl flex flex-col gap-6 items-center shadow-2xl border border-white/10 backdrop-blur-xl">

                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(isActive ? null : item.id)}
                            className={`relative group w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300
                ${isActive ? "bg-primary text-white shadow-[0_0_15px_var(--primary)] scale-110" : "text-slate-400 hover:text-white hover:bg-white/10"}
              `}
                        >
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />

                            {/* Tooltip */}
                            <span className="absolute right-14 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {item.label}
                            </span>
                        </button>
                    );
                })}

                <div className="w-8 h-[1px] bg-white/10 my-2" />

                {/* Generate Button */}
                <button
                    onClick={onGenerate}
                    disabled={isGenerating}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 relative
            ${isGenerating ? "bg-slate-700 cursor-not-allowed" : "bg-gradient-to-tr from-secondary to-accent shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:scale-110 hover:rotate-12"}
          `}
                >
                    <Sparkles size={28} className={`text-white ${isGenerating ? "animate-spin" : ""}`} />
                </button>

            </div>
        </motion.div>
    );
}
