
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function FloatingPanel({ title, isOpen, onClose, children }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 50, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed right-20 top-1/2 -translate-y-1/2 z-40 w-80 max-h-[80vh] overflow-y-auto"
                >
                    <div className="glass-card p-5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl bg-[#0a0a0f]/90">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                            <h3 className="text-xl font-bold text-white tracking-wide">{title}</h3>
                            <button
                                onClick={onClose}
                                className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex flex-col gap-4">
                            {children}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
