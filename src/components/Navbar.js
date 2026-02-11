"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path) => pathname === path;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-center">
            <div className="glass px-6 py-3 rounded-full flex items-center justify-between gap-8 md:gap-12 min-w-[320px] md:min-w-[600px]">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white">
                    <div className="w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded-lg flex items-center justify-center">
                        <Sparkles size={18} className="text-white" />
                    </div>
                    <span className="hidden md:inline">تلبيس المودل</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
                    <Link href="/" className={`hover:text-white transition-colors ${isActive('/') ? "text-white font-bold" : ""}`}>
                        الرئيسية
                    </Link>
                    <Link href="/pricing" className={`hover:text-white transition-colors ${isActive('/pricing') ? "text-white font-bold" : ""}`}>
                        الباقات
                    </Link>
                    <Link href="/admin" className={`hover:text-secondary transition-colors ${isActive('/admin') ? "text-secondary font-bold" : ""}`}>
                        لوحة الإدارة
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* CTA */}
                <button
                    className="hidden md:block bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-full text-sm transition-colors border border-white/5"
                    onClick={() => document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    ابدأ الآن
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-20 left-4 right-4 glass p-6 rounded-2xl md:hidden flex flex-col gap-4 text-center z-50"
                    >
                        <Link href="/" onClick={() => setIsOpen(false)} className="text-white py-2 border-b border-white/5">الرئيسية</Link>
                        <Link href="/pricing" onClick={() => setIsOpen(false)} className="text-white py-2 border-b border-white/5">الباقات</Link>
                        <Link href="/admin" onClick={() => setIsOpen(false)} className="text-secondary py-2 border-b border-white/5">لوحة الإدارة</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
