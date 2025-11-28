import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';




interface CardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export const Card = ({ children, className, delay = 0 }: CardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay }}
            className={clsx(
                'bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-[32px] p-6',
                className
            )}
        >
            {children}
        </motion.div>
    );
};
