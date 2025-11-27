import { Link, useLocation } from 'react-router-dom';
import { Home, Trophy, Info, MessageSquare } from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export const Navbar = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', icon: Home, label: 'Mäng' },
        { path: '/leaderboard', icon: Trophy, label: 'Edetabel' },
        { path: '/about', icon: Info, label: 'Info' },
        { path: '/feedback', icon: MessageSquare, label: 'Tagasiside' },
    ];

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-auto">
            <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl shadow-black/50">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={clsx(
                                'relative flex flex-col items-center justify-center transition-all duration-300',
                                isActive ? 'text-[#D4AF37]' : 'text-white/50 hover:text-white/80'
                            )}
                        >
                            <div className={clsx(
                                "p-2 rounded-full transition-all duration-300",
                                isActive && "bg-[#D4AF37]/10"
                            )}>
                                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            </div>
                            {isActive && (
                                <motion.div
                                    layoutId="nav-indicator"
                                    className="absolute -bottom-1 w-1 h-1 bg-[#D4AF37] rounded-full"
                                />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};
