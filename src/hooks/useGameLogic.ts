import { useState, useEffect } from 'react';
import wordsData from '../data/words.json';
import type { Word, GameState, LeaderboardEntry } from '../types';

// const WORDS_PER_GAME = 10; // Unused for now
// The user didn't specify a limit, but "after guessing 5 words" implies a continuous flow.
// Let's make it an endless mode until they quit or finish all words.

export const useGameLogic = () => {
    const [gameState, setGameState] = useState<GameState>({
        currentWordIndex: 0,
        score: 0,
        streak: 0,
        isGameOver: false,
        words: [],
        currentOptions: [],
        history: [],
        showNamePrompt: false,
        dailyProgress: 0,
        dailyGoal: 10,
        showDailyComplete: false,
        totalScore: 0,
        showLevelUp: false,
        currentLevel: 'Algaja',
    });

    // Shuffle array utility
    const shuffle = <T,>(array: T[]): T[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    };

    // Initialize game
    useEffect(() => {
        const shuffledWords = shuffle(wordsData as Word[]);

        // Load persisted state
        const today = new Date().toISOString().split('T')[0];
        const lastPlayed = localStorage.getItem('lastPlayedDate');
        const storedStreak = parseInt(localStorage.getItem('streak') || '0', 10);
        const storedTotalScore = parseInt(localStorage.getItem('totalScore') || '0', 10);
        let currentStreak = storedStreak;
        let dailyProg = 0;

        if (lastPlayed !== today) {
            // New day
            dailyProg = 0;
            // Check if streak is broken (if last played was before yesterday)
            if (lastPlayed) {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split('T')[0];
                if (lastPlayed !== yesterdayStr) {
                    currentStreak = 0;
                }
            }
            localStorage.setItem('lastPlayedDate', today);
            localStorage.setItem('streak', currentStreak.toString());
            localStorage.setItem('dailyProgress', '0');
        } else {
            // Same day, load progress
            dailyProg = parseInt(localStorage.getItem('dailyProgress') || '0', 10);
        }

        setGameState(prev => ({
            ...prev,
            words: shuffledWords,
            currentOptions: generateOptions(shuffledWords[0], shuffledWords),
            streak: currentStreak,
            dailyProgress: dailyProg,
            dailyGoal: 10,
            totalScore: storedTotalScore,
            currentLevel: getLevel(storedTotalScore),
        }));
    }, []);

    const getLevel = (score: number) => {
        if (score >= 500) return 'Sõnasnob';
        if (score >= 200) return 'Teadlane'; // Scholar
        if (score >= 50) return 'Õpipoiss'; // Apprentice
        return 'Algaja'; // Novice
    };

    const generateOptions = (currentWord: Word, allWords: Word[]) => {
        if (!currentWord) return [];
        const otherWords = allWords.filter(w => w.word !== currentWord.word);
        const decoys = shuffle(otherWords).slice(0, 2).map(w => w.definition);
        return shuffle([currentWord.definition, ...decoys]);
    };

    const handleAnswer = (selectedDefinition: string) => {
        const currentWord = gameState.words[gameState.currentWordIndex];
        const isCorrect = selectedDefinition === currentWord.definition;

        setGameState(prev => {
            const newScore = isCorrect ? prev.score + 1 : prev.score;
            const newHistory = [...prev.history, { word: currentWord.word, correct: isCorrect }];

            // Daily Progress Logic
            let newDailyProgress = prev.dailyProgress;
            let newStreak = prev.streak;
            let showDailyComplete = false;
            let newTotalScore = prev.totalScore;
            let showLevelUp = false;
            let newLevel = prev.currentLevel;

            if (isCorrect) {
                newDailyProgress = Math.min(prev.dailyProgress + 1, prev.dailyGoal);
                localStorage.setItem('dailyProgress', newDailyProgress.toString());

                // Total Score & Level Logic
                newTotalScore = prev.totalScore + 1;
                localStorage.setItem('totalScore', newTotalScore.toString());

                const calculatedLevel = getLevel(newTotalScore);
                if (calculatedLevel !== prev.currentLevel) {
                    showLevelUp = true;
                    newLevel = calculatedLevel;
                }

                // Check for Daily Goal Completion
                if (newDailyProgress === prev.dailyGoal && prev.dailyProgress < prev.dailyGoal) {
                    showDailyComplete = true;
                    newStreak += 1;
                    localStorage.setItem('streak', newStreak.toString());
                }
            }

            // Check for name prompt trigger (after 5th word)
            const shouldShowNamePrompt = prev.currentWordIndex === 4;

            return {
                ...prev,
                score: newScore,
                history: newHistory,
                showNamePrompt: shouldShowNamePrompt,
                dailyProgress: newDailyProgress,
                streak: newStreak,
                showDailyComplete,
                totalScore: newTotalScore,
                showLevelUp,
                currentLevel: newLevel,
            };
        });

        return isCorrect;
    };

    const nextQuestion = () => {
        setGameState(prev => {
            const nextIndex = prev.currentWordIndex + 1;
            if (nextIndex >= prev.words.length) {
                return { ...prev, isGameOver: true };
            }
            return {
                ...prev,
                currentWordIndex: nextIndex,
                currentOptions: generateOptions(prev.words[nextIndex], prev.words),
                showNamePrompt: false, // Reset prompt
            };
        });
    };

    const saveScore = (name: string) => {
        const entry: LeaderboardEntry = {
            name,
            score: gameState.score,
            date: new Date().toISOString(),
        };

        const existing = JSON.parse(localStorage.getItem('leaderboard') || '[]');
        const newLeaderboard = [...existing, entry].sort((a, b) => b.score - a.score).slice(0, 100);
        localStorage.setItem('leaderboard', JSON.stringify(newLeaderboard));
    };

    return {
        gameState,
        handleAnswer,
        nextQuestion,
        saveScore,
    };
};
