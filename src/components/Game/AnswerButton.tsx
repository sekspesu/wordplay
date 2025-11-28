import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface AnswerButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    state?: 'default' | 'correct' | 'incorrect' | 'disabled';
    disabled?: boolean;
}

export const AnswerButton = ({ children, onClick, state = 'default', disabled }: AnswerButtonProps) => {


    return (
        <motion.button
            whileHover={!disabled ? { scale: 1.02, y: -2 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                'w-full p-4 text-left rounded-2xl transition-all duration-200 border font-medium relative overflow-hidden backdrop-blur-sm',
                state === 'default' && 'bg-white/5 border-white/10 text-white/90 hover:bg-white/10 hover:border-white/20',
                state === 'correct' && 'bg-[#85DCB0]/20 border-[#85DCB0]/50 text-[#85DCB0]',
                state === 'incorrect' && 'bg-[#E27D60]/20 border-[#E27D60]/50 text-[#E27D60]',
                state === 'disabled' && 'opacity-50 cursor-not-allowed bg-white/5 border-transparent text-white/30'
            )}
        >
            <span className="relative z-10">{children}</span>
            {state === 'correct' && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.5, opacity: 0.1 }}
                    className="absolute inset-0 bg-green-500 rounded-xl"
                />
            )}
        </motion.button>
    );
};
