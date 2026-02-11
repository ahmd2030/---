"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera, Sparkles, Check, ChevronRight, ChevronLeft, Image as ImageIcon } from "lucide-react";

// Mock Data for Backgrounds
const BACKGROUNDS = [
    { id: "studio", name: "استوديو احترافي", img: "linear-gradient(to tr, #e2e8f0, #cbd5e1)" },
    { id: "outdoor", name: "طبيعة خارجية", img: "linear-gradient(to tr, #ecfccb, #bef264)" },
    { id: "office", name: "مكتب عصري", img: "linear-gradient(to tr, #e0f2fe, #bae6fd)" },
    { id: "urban", name: "شارع مدني", img: "linear-gradient(to tr, #f1f5f9, #94a3b8)" },
];

export default function WorkflowSteps() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        background: null,
        age: 25,
        details: "",
        images: [],
        instructions: ""
    });
    const [isGenerating, setIsGenerating] = useState(false);

    const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
    const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

    const updateForm = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        // In a real app, we'd upload these to a blob storage
        // For now, we'll just create object URLs
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));
        updateForm("images", [...formData.images, ...newImages]);
    };

    const startGeneration = async () => {
        setIsGenerating(true);
        // Simulate API call to "Nano Banana"
        await new Promise(resolve => setTimeout(resolve, 3000));
        setIsGenerating(false);
        setStep(4); // Move to results
    };

    return (
        <div className="w-full max-w-4xl mx-auto glass-card min-h-[600px] flex flex-col p-6 md:p-10 relative overflow-hidden">

            {/* Progress Bar */}
            <div className="flex justify-between items-center mb-10 relative z-10">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex flex-col items-center gap-2">
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 border-2
              ${step >= s ? "bg-primary border-primary text-white shadow-[0_0_15px_var(--primary)]" : "bg-transparent border-slate-600 text-slate-500"}`}
                        >
                            {step > s ? <Check size={20} /> : s}
                        </div>
                        <span className={`text-xs ${step >= s ? "text-white" : "text-slate-600"}`}>
                            {s === 1 ? "الخلفية" : s === 2 ? "التفاصيل" : "الصور"}
                        </span>
                    </div>
                ))}
                {/* Connector Line */}
                <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-800 -z-10" />
                <motion.div
                    className="absolute top-5 right-0 h-0.5 bg-primary -z-10"
                    initial={{ width: "0%" }}
                    animate={{ width: `${((step - 1) / 2) * 100}%` }}
                />
            </div>

            {/* Step Content */}
            <div className="flex-1 flex flex-col relative z-20">
                <AnimatePresence mode="wait">

                    {/* Step 1: Background */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col gap-6"
                        >
                            <h2 className="text-2xl font-bold text-white">اختر بيئة التصوير</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {BACKGROUNDS.map((bg) => (
                                    <div
                                        key={bg.id}
                                        onClick={() => updateForm("background", bg.id)}
                                        className={`cursor-pointer rounded-xl p-4 flex flex-col items-center gap-3 transition-all border-2
                    ${formData.background === bg.id ? "border-secondary bg-secondary/10 shadow-[0_0_20px_rgba(236,72,153,0.3)]" : "border-slate-700 hover:border-slate-500 bg-slate-800/50"}`}
                                    >
                                        <div className="w-full h-24 rounded-lg" style={{ background: bg.img }} />
                                        <span className="font-medium text-sm">{bg.name}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Details */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col gap-6 max-w-lg mx-auto w-full"
                        >
                            <h2 className="text-2xl font-bold text-white text-center">تفاصيل المودل</h2>

                            <div className="flex flex-col gap-2">
                                <label className="text-slate-300">العمر التقريبي</label>
                                <input
                                    type="range"
                                    min="18" max="60"
                                    value={formData.age}
                                    onChange={(e) => updateForm("age", e.target.value)}
                                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <span className="text-right text-primary font-bold">{formData.age} سنة</span>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-slate-300">تعليمات إضافية (اختياري)</label>
                                <textarea
                                    placeholder="مثلاً: أضف حذاء رياضي أبيض، شعر طويل، إكسسوارات ذهبية..."
                                    className="w-full p-4 rounded-xl bg-slate-800/50 border border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none text-white min-h-[120px]"
                                    value={formData.instructions}
                                    onChange={(e) => updateForm("instructions", e.target.value)}
                                />
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Images */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col gap-6"
                        >
                            <h2 className="text-2xl font-bold text-white text-center">رفع صور الملابس</h2>

                            <div className="border-2 border-dashed border-slate-600 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors bg-slate-800/20">
                                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-primary">
                                    <Upload size={32} />
                                </div>
                                <div className="text-center">
                                    <p className="text-lg font-medium text-white mb-1">اضغط للرفع أو اسحب الصور هنا</p>
                                    <p className="text-sm text-slate-400">يدعم JPG, PNG (بحد أقصى 5 صور)</p>
                                </div>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>

                            {formData.images.length > 0 && (
                                <div className="flex gap-4 overflow-x-auto pb-2">
                                    {formData.images.map((img, idx) => (
                                        <div key={idx} className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-slate-600">
                                            <img src={img.preview} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Step 4: Results */}
                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center h-full gap-6 text-center"
                        >
                            {isGenerating ? (
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                        جاري استدعاء Nano Banana...
                                    </h2>
                                    <p className="text-slate-400">يقوم Gemini بتحسين الوصف الآن</p>
                                </div>
                            ) : (
                                <>
                                    <div className="w-full h-64 bg-slate-800 rounded-xl flex items-center justify-center mb-4 border border-white/10 relative overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 opacity-50" />
                                        <Sparkles size={48} className="text-white/50" />
                                        <span className="absolute bottom-4 text-sm text-white/50">صورة تجريبية (Mockup)</span>
                                    </div>
                                    <h2 className="text-3xl font-bold text-white">تمت العملية بنجاح!</h2>
                                    <p className="text-slate-300 max-w-md">تم تطبيق الملابس على المودل بناءً على خياراتك.</p>
                                    <button onClick={() => setStep(1)} className="btn-secondary mt-4">
                                        تصميم جديد
                                    </button>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            {step < 4 && (
                <div className="flex justify-between mt-10 pt-6 border-t border-white/5">
                    <button
                        onClick={handleBack}
                        disabled={step === 1}
                        className={`btn-secondary flex items-center gap-2 ${step === 1 ? "opacity-0 pointer-events-none" : ""}`}
                    >
                        <ChevronRight size={18} />
                        سابق
                    </button>

                    {step === 3 ? (
                        <button
                            onClick={startGeneration}
                            disabled={formData.images.length === 0}
                            className="btn-primary"
                        >
                            <Sparkles size={18} />
                            توليد بالذكاء الاصطناعي
                        </button>
                    ) : (
                        <button onClick={handleNext} className="btn-primary">
                            التالي
                            <ChevronLeft size={18} />
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
