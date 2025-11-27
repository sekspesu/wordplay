import { motion } from 'framer-motion';

interface ProgressBarProps {
    current: number;
    total: number;
}

export const ProgressBar = ({ current, total }: ProgressBarProps) => {
    const progress = Math.min((current / total) * 100, 100);

    return (
        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
            />
        </div>
    );
};
