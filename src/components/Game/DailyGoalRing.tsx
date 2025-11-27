import { motion } from 'framer-motion';

interface DailyGoalRingProps {
    current: number;
    total: number;
    size?: number;
}

export const DailyGoalRing = ({ current, total, size = 60 }: DailyGoalRingProps) => {
    const progress = Math.min(current / total, 1);
    const radius = size / 2 - 4;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - progress * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90 w-full h-full">
                <circle
                    className="text-white/10"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <motion.circle
                    className="text-[#D4AF37]"
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            <div className="absolute text-xs font-bold text-white/90">
                {current}/{total}
            </div>
        </div>
    );
};
