import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Navbar } from '../components/Layout/Navbar';
import type { LeaderboardEntry } from '../types';
import { clsx } from 'clsx';

const MOCK_DATA: LeaderboardEntry[] = [];

export const Leaderboard = () => {
    const [scores, setScores] = useState<LeaderboardEntry[]>([]);

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem('leaderboard') || '[]');
        const merged = [...MOCK_DATA, ...local]
            .sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.score - a.score)
            .slice(0, 100);
        setScores(merged);
    }, []);

    const getRankIcon = (index: number) => {
        if (index === 0) return <Trophy className="text-yellow-500" size={24} />;
        if (index === 1) return <Medal className="text-slate-400" size={24} />;
        if (index === 2) return <Medal className="text-amber-600" size={24} />;
        return <span className="text-slate-500 font-bold w-6 text-center">{index + 1}</span>;
    };

    return (
        <div className="min-h-screen pb-24 md:pb-0 md:pt-24 px-4 flex flex-col items-center">
            <div className="w-full max-w-md mt-8 mb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    Edetabel
                </h1>
                <p className="text-slate-500">TOP 100 sõnatundjat</p>
            </div>

            <Card className="w-full max-w-md flex-1 overflow-hidden flex flex-col max-h-[70vh]">
                <div className="overflow-y-auto p-4 space-y-2">
                    {scores.map((entry, index) => (
                        <motion.div
                            key={`${entry.name}-${index}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={clsx(
                                "flex items-center p-4 rounded-xl transition-colors",
                                index < 3 ? "bg-indigo-50/50" : "hover:bg-slate-50"
                            )}
                        >
                            <div className="mr-4 flex-shrink-0">
                                {getRankIcon(index)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-slate-900 truncate">{entry.name}</p>
                                <p className="text-xs text-slate-400">{new Date(entry.date).toLocaleDateString('et-EE')}</p>
                            </div>
                            <div className="text-indigo-600 font-bold text-lg">
                                {entry.score}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Card>

            <Navbar />
        </div>
    );
};
