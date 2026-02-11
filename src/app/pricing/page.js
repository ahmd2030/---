"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const TIERS = [
    { credits: 50, price: "99 ر.س", duration: "شهر واحد", popular: false },
    { credits: 100, price: "189 ر.س", duration: "شهرين", popular: true },
    { credits: 150, price: "269 ر.س", duration: "شهرين ونصف", popular: false },
    { credits: 250, price: "429 ر.س", duration: "3 أشهر", popular: false },
    { credits: 500, price: "799 ر.س", duration: "4 أشهر", popular: false },
    { credits: 700, price: "1099 ر.س", duration: "6 أشهر", popular: false },
];

export default function PricingPage() {
    return (
        <div className="min-h-screen p-8 pb-20 flex flex-col items-center">

            <div className="w-full max-w-6xl mb-8 flex justify-start">
                <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                    العودة للرئيسية
                </Link>
            </div>

            <div className="text-center mb-16 relative z-10">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-brand mb-4">
                    باقات المصمم المحترف
                </h1>
                <p className="text-slate-400 text-lg">اختر الباقة التي تناسب حجم إبداعك</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full relative z-10">
                {TIERS.map((tier, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className={`glass-card relative flex flex-col gap-6 p-8 ${tier.popular ? "border-primary/50 shadow-[0_0_30px_rgba(99,102,241,0.2)]" : "border-white/5"}`}
                    >
                        {tier.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-accent text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                                الأكثر طلباً
                            </div>
                        )}

                        <div className="flex flex-col gap-1">
                            <h3 className="text-2xl font-bold text-white">{tier.credits} صورة</h3>
                            <span className="text-slate-400 text-sm">صالحة لمدة {tier.duration}</span>
                        </div>

                        <div className="text-4xl font-bold text-white">
                            {tier.price}
                        </div>

                        <ul className="flex flex-col gap-3 flex-1">
                            <li className="flex items-center gap-3 text-slate-300">
                                <div className="bg-primary/20 p-1 rounded-full text-primary">
                                    <Check size={14} />
                                </div>
                                <span>جودة Nano Banana فائق الدقة</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <div className="bg-primary/20 p-1 rounded-full text-primary">
                                    <Check size={14} />
                                </div>
                                <span>تحسين الوصف بـ Gemini</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-300">
                                <div className="bg-primary/20 p-1 rounded-full text-primary">
                                    <Check size={14} />
                                </div>
                                <span>استخدام تجاري</span>
                            </li>
                        </ul>

                        <button className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2
              ${tier.popular ? "bg-primary hover:bg-primary/90 text-white" : "bg-white/10 hover:bg-white/20 text-white"}`}>
                            <Zap size={18} />
                            اشترك الآن
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
