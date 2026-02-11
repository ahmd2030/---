
import { motion } from "framer-motion";
import { Image as ImageIcon, Sparkles } from "lucide-react";

export default function MainCanvas({ currentImage, generatedImage, isGenerating }) {
    return (
        <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-[#050510]">

            {/* Dynamic Background Mesh */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] mix-blend-screen" />
            </div>

            <div className="relative w-full h-full max-w-[1400px] max-h-[90vh] p-4 flex items-center justify-center">

                {/* Empty State */}
                {!currentImage && !generatedImage && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-6 text-slate-500"
                    >
                        <div className="w-32 h-32 rounded-3xl border-2 border-dashed border-slate-700 flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <ImageIcon size={48} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
                        </div>
                        <p className="text-xl font-light">ابدأ برفع صورة أو اختيار مودل</p>
                    </motion.div>
                )}

                {/* Image Display */}
                {(currentImage || generatedImage) && (
                    <motion.div
                        layout
                        className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                    >
                        <img
                            src={generatedImage || currentImage}
                            alt="Workspace"
                            className="max-w-full max-h-full object-contain"
                        />

                        {/* Loading Overlay */}
                        {isGenerating && (
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center z-20">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-secondary blur-xl opacity-50 animate-pulse"></div>
                                    <Sparkles size={64} className="text-white relative z-10 animate-spin-slow" />
                                </div>
                                <p className="mt-8 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-secondary to-white animate-pulse">
                                    جاري نسج الخيال...
                                </p>
                            </div>
                        )}
                    </motion.div>
                )}

            </div>
        </div>
    );
}
