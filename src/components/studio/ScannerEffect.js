
import { motion } from "framer-motion";

export default function ScannerEffect({ isScanning }) {
    if (!isScanning) return null;

    return (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-xl">
            {/* Scanning Laser Line */}
            <motion.div
                initial={{ top: "-10%" }}
                animate={{ top: "110%" }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute left-0 right-0 h-2 bg-secondary blur-sm opacity-80 shadow-[0_0_20px_var(--secondary)]"
            />

            {/* Grid Overlay Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />

            {/* Scan Text */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-secondary/50 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-secondary text-xs font-mono tracking-wider">ANALYZING...</span>
            </div>
        </div>
    );
}
