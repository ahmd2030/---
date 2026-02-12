"use client";

import { useState } from "react";
import StudioSidebar from "./StudioSidebar";
import FloatingPanel from "./FloatingPanel";
import MainCanvas from "./MainCanvas";
import { Upload } from "lucide-react";
import ScannerEffect from "./ScannerEffect";

// Mock Assets
const BACKGROUNDS = [
    { id: "studio", name: "استوديو", img: "linear-gradient(to tr, #e2e8f0, #cbd5e1)" },
    { id: "outdoor", name: "طبيعة", img: "linear-gradient(to tr, #ecfccb, #bef264)" },
    { id: "office", name: "مكتب", img: "linear-gradient(to tr, #e0f2fe, #bae6fd)" },
    { id: "neon", name: "نيون", img: "linear-gradient(to tr, #4c1d95, #c026d3)" },
];

export default function StudioLayout() {
    const [activeTab, setActiveTab] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isScanning, setIsScanning] = useState(false); // New state
    const [generatedImage, setGeneratedImage] = useState(null);
    const [detectedTags, setDetectedTags] = useState(null); // New state for tags

    const [state, setState] = useState({
        background: null,
        age: 25,
        images: [],
        instructions: ""
    });

    const updateState = (key, value) => setState(prev => ({ ...prev, [key]: value }));

    const handleImageUpload = async (file) => {
        // 1. Show Preview
        const preview = URL.createObjectURL(file);
        updateState('images', [{ file, preview }]);

        // 2. Start Scanning
        setIsScanning(true);
        setActiveTab(null); // Close panel to show scan

        try {
            // Convert to Base64
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                const base64 = reader.result;

                // 3. Call API
                const response = await fetch('/api/analyze', {
                    method: 'POST',
                    body: JSON.stringify({ image: base64 })
                });
                const data = await response.json();

                if (data.success) {
                    setDetectedTags(data.data);
                    // Auto-fill instructions
                    const autoDesc = `${data.data.color} ${data.data.material} ${data.data.type}, ${data.data.style} style`;
                    updateState('instructions', autoDesc);
                }

                // 4. Stop Scanning
                setTimeout(() => setIsScanning(false), 1500); // Min 1.5s scan time for effect
            };
        } catch (e) {
            console.error("Scan failed", e);
            setIsScanning(false);
        }
    };

    const handleGenerate = async () => {
        if (state.images.length === 0) {
            setActiveTab('clothes'); // Prompt user to upload
            return;
        }
        setIsGenerating(true);
        setActiveTab(null); // Close panels

        // Simulate API
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: `Fashion model, ${state.age} years old, wearing uploaded clothes, ${state.instructions}`,
                    imageUrl: state.images[0].preview // In real app would be URL
                })
            });
            const data = await response.json();
            if (data.result) {
                setGeneratedImage(data.result);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsGenerating(false);
        }
    };

    const currentImage = state.images.length > 0 ? state.images[0].preview : null;

    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#050510] font-sans text-right" dir="rtl">

            {/* Scanner Overlay */}
            <ScannerEffect isScanning={isScanning} />

            {/* Main Workspace */}
            <MainCanvas
                currentImage={currentImage}
                generatedImage={generatedImage}
                isGenerating={isGenerating}
            />

            {/* Navigation Sidebar */}
            <StudioSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
            />

            {/* Floating Options Panels */}

            {/* 1. Backgrounds */}
            <FloatingPanel
                title="بيئة التصوير"
                isOpen={activeTab === 'background'}
                onClose={() => setActiveTab(null)}
            >
                <div className="grid grid-cols-2 gap-3">
                    {BACKGROUNDS.map(bg => (
                        <button
                            key={bg.id}
                            onClick={() => updateState('background', bg.id)}
                            className={`aspect-square rounded-full border-2 transition-all overflow-hidden relative group
                            ${state.background === bg.id ? "border-primary scale-105" : "border-transparent hover:border-slate-500"}
                        `}
                        >
                            <div className="absolute inset-0" style={{ background: bg.img }} />
                            <span className="absolute bottom-2 left-0 right-0 text-xs font-bold text-slate-800 bg-white/50 backdrop-blur-md py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                {bg.name}
                            </span>
                        </button>
                    ))}
                </div>
            </FloatingPanel>

            {/* 2. Model Settings */}
            <FloatingPanel
                title="خصائص المودل"
                isOpen={activeTab === 'model'}
                onClose={() => setActiveTab(null)}
            >
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm text-slate-400">العمر: <span className="text-white font-bold">{state.age}</span></label>
                        <input
                            type="range" min="18" max="50"
                            value={state.age}
                            onChange={(e) => updateState('age', e.target.value)}
                            className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm text-slate-400">تعليمات خاصة</label>
                        <textarea
                            className="w-full h-24 bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white text-sm focus:border-primary outline-none resize-none"
                            placeholder="شعر أشقر، إضاءة سينمائية..."
                            value={state.instructions}
                            onChange={(e) => updateState('instructions', e.target.value)}
                        />
                    </div>
                </div>
            </FloatingPanel>

            {/* 3. Upload Clothes */}
            <FloatingPanel
                title="رفع الأزياء"
                isOpen={activeTab === 'clothes'}
                onClose={() => setActiveTab(null)}
            >
                <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center gap-4 hover:bg-slate-800/30 transition-colors relative cursor-pointer">
                    <input
                        type="file" accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) handleImageUpload(file);
                        }}
                    />
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-primary">
                        <Upload size={20} />
                    </div>
                    <p className="text-sm text-slate-400 text-center">اضغط لرفع صورة قطعة الملابس</p>
                </div>

                {state.images.length > 0 && (
                    <div className="mt-4 p-2 bg-slate-800/50 rounded-lg flex items-center gap-3">
                        <img src={state.images[0].preview} className="w-12 h-12 rounded-md object-cover" alt="preview" />
                        <span className="text-xs text-slate-300 truncate flex-1">{state.images[0].file.name}</span>
                    </div>
                )}

                {/* Show Detected Tags */}
                {detectedTags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {Object.values(detectedTags).filter(Boolean).map((tag, i) => (
                            <span key={i} className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-full border border-secondary/50">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </FloatingPanel>

        </div>
    );
}
