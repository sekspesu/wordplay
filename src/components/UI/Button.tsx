import type { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    children: ReactNode;
}

export const Button = ({
    className,
    variant = 'primary',
    size = 'md',
    children,
    ...props
}: ButtonProps) => {
    const variants = {
        primary: 'bg-[#D4AF37] text-[#1A1C20] hover:bg-[#C5A028] shadow-lg shadow-yellow-900/20 font-bold',
        secondary: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/5',
        outline: 'border-2 border-white/20 text-white/70 hover:border-white/40 hover:text-white',
        ghost: 'text-white/50 hover:text-white hover:bg-white/5',
        danger: 'bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/20',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg font-semibold',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                'relative inline-flex items-center justify-center rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
};
