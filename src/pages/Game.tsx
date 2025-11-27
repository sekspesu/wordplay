import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useGameLogic } from '../hooks/useGameLogic';
import { QuestionCard } from '../components/Game/QuestionCard';
import { ProgressBar } from '../components/Game/ProgressBar';
import { DailyGoalRing } from '../components/Game/DailyGoalRing';
import { Modal } from '../components/UI/Modal';
import { Button } from '../components/UI/Button';
import { Navbar } from '../components/Layout/Navbar';
import { FlexCard } from '../components/Game/FlexCard';
import { Flame, Award } from 'lucide-react';

export const Game = () => {
    const { gameState, handleAnswer, nextQuestion, saveScore } = useGameLogic();
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
    const [showNameModal, setShowNameModal] = useState(false);
    const [showDailyCompleteModal, setShowDailyCompleteModal] = useState(false);
    const [showLevelUpModal, setShowLevelUpModal] = useState(false);
    const [playerName, setPlayerName] = useState('');

    // Reset local state when question changes
    useEffect(() => {
        setSelectedAnswer(null);
        setCorrectAnswer(null);
    }, [gameState.currentWordIndex]);

    // Handle name prompt trigger
    useEffect(() => {
        if (gameState.showNamePrompt) {
            const timer = setTimeout(() => setShowNameModal(true), 1500);
            return () => clearTimeout(timer);
        }
    }, [gameState.showNamePrompt]);

    // Handle Daily Complete trigger
    useEffect(() => {
        if (gameState.showDailyComplete) {
            setShowDailyCompleteModal(true);
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#FFD700', '#FFA500', '#FF4500']
            });
        }
    }, [gameState.showDailyComplete]);

    // Handle Level Up trigger
    useEffect(() => {
        if (gameState.showLevelUp) {
            setShowLevelUpModal(true);
            confetti({
                particleCount: 300,
                spread: 120,
                origin: { y: 0.6 },
                colors: ['#FFD700', '#C0C0C0', '#CD7F32'] // Gold, Silver, Bronzeish
            });
        }
    }, [gameState.showLevelUp]);

    const onAnswer = (definition: string) => {
        setSelectedAnswer(definition);
        const isCorrect = handleAnswer(definition);

        const currentWord = gameState.words[gameState.currentWordIndex];
        setCorrectAnswer(currentWord.definition);

        if (isCorrect) {
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#4F46E5', '#EC4899', '#10B981']
            });
        }

        // Auto advance after delay
        if (!gameState.showNamePrompt && !gameState.showDailyComplete && !gameState.showLevelUp) {
            setTimeout(nextQuestion, 2000);
        }
    };

    const handleNameSubmit = () => {
        if (playerName.trim()) {
            saveScore(playerName);
            setShowNameModal(false);
            nextQuestion(); // Resume game
        }
    };

    if (gameState.words.length === 0) return <div>Laen...</div>;

    return (
        <div className="min-h-screen pb-24 md:pb-0 md:pt-24 px-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-md mb-6 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <DailyGoalRing current={gameState.dailyProgress} total={gameState.dailyGoal} />
                    <div>
                        <p className="text-xs font-medium text-white/50 uppercase tracking-wider">Päeva eesmärk</p>
                        <p className="text-sm font-bold text-[#D4AF37]">{gameState.dailyProgress} / {gameState.dailyGoal} sõna</p>
                    </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 text-[#E27D60]">
                        <Flame size={20} fill="currentColor" />
                        <span className="text-xl font-bold">{gameState.streak}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#85DCB0] bg-[#85DCB0]/10 px-2 py-0.5 rounded-full border border-[#85DCB0]/20">
                        <Award size={14} />
                        <span className="text-xs font-bold uppercase">{gameState.currentLevel}</span>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-md mb-8">
                <ProgressBar current={gameState.currentWordIndex + 1} total={gameState.words.length} />
            </div>

            <QuestionCard
                word={gameState.words[gameState.currentWordIndex]}
                options={gameState.currentOptions}
                onAnswer={onAnswer}
                selectedAnswer={selectedAnswer}
                correctAnswer={correctAnswer}
            />

            <Modal
                isOpen={showNameModal}
                onClose={() => setShowNameModal(false)}
                title="Suurepärane töö!"
            >
                <div className="space-y-4">
                    <p className="text-white/70">
                        Oled juba 5 sõna ära arvanud! Sisesta oma nimi, et salvestada tulemus edetabelisse.
                    </p>
                    <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Sinu nimi"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-white/30 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all backdrop-blur-sm"
                        autoFocus
                    />
                    <Button onClick={handleNameSubmit} className="w-full">
                        Salvesta ja jätka
                    </Button>
                </div>
            </Modal>

            <Modal
                isOpen={showDailyCompleteModal}
                onClose={() => {
                    setShowDailyCompleteModal(false);
                    nextQuestion();
                }}
                title="Päev tehtud! 🎉"
            >
                <div className="flex flex-col items-center space-y-6">
                    <p className="text-white/70 text-center">
                        Oled täna õppinud <strong>10 uut sõna</strong>! Jaga oma saavutust sõpradega.
                    </p>

                    <FlexCard
                        streak={gameState.streak}
                        level={gameState.currentLevel}
                        wordsLearned={gameState.dailyProgress}
                    />

                    <Button variant="secondary" onClick={() => {
                        setShowDailyCompleteModal(false);
                        nextQuestion();
                    }} className="w-full">
                        Õpi veel 10
                    </Button>
                </div>
            </Modal>

            <Modal
                isOpen={showLevelUpModal}
                onClose={() => {
                    setShowLevelUpModal(false);
                    nextQuestion();
                }}
                title="Tase tõusis! 🚀"
            >
                <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#D4AF37] to-[#C5A028] rounded-full flex items-center justify-center mx-auto text-5xl shadow-lg shadow-yellow-900/40">
                        🏆
                    </div>
                    <h3 className="text-2xl font-bold text-[#D4AF37]">
                        {gameState.currentLevel}
                    </h3>
                    <p className="text-white/70">
                        Palju õnne! Oled saavutanud uue taseme. Jätka samas vaimus!
                    </p>
                    <Button onClick={() => {
                        setShowLevelUpModal(false);
                        nextQuestion();
                    }} className="w-full">
                        Vägev!
                    </Button>
                </div>
            </Modal>

            <Navbar />
        </div>
    );
};
