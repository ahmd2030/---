"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import StudioLayout from "@/components/studio/StudioLayout";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 pb-20 sm:p-20 overflow-hidden">

      {/* Hero Section */}
      <section className="relative z-10 text-center max-w-4xl mx-auto py-20 flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 text-sm md:text-base text-indigo-300 font-medium mb-4"
        >
          <Sparkles size={16} className="text-secondary" />
          <span>الجيل القادم من تصميم الأزياء بالذكاء الاصطناعي</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-indigo-300 pb-2 leading-tight"
        >
          حوّل خيالك إلى <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">واقع</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed"
        >
          استخدم قوة "Nano Banana" و Gemini لتلبيس المودل في أي مكان، بأي زي، وفي ثوانٍ معدودة.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex gap-4 mt-8"
        >
          <button
            className="btn-primary group"
            onClick={() => document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' })}
          >
            ابدأ التصميم الآن
            <ArrowRight className="group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" size={20} />
          </button>
          <Link href="/pricing" className="btn-secondary">
            عرض الباقات
          </Link>
        </motion.div>
      </section>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

      {/* Studio Section */}
      <section id="workflow" className="w-full min-h-screen relative">
        <StudioLayout />
      </section>

    </div>
  );
}
