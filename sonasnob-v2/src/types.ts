export interface Word {
    word: string;
    definition: string;
}

export interface GameState {
    currentWordIndex: number;
    score: number;
    streak: number;
    isGameOver: boolean;
    words: Word[];
    currentOptions: string[];
    history: { word: string; correct: boolean }[];
    showNamePrompt: boolean;
    dailyProgress: number;
    dailyGoal: number;
    showDailyComplete: boolean;
    totalScore: number;
    showLevelUp: boolean;
    currentLevel: string;
}

export interface LeaderboardEntry {
    name: string;
    score: number;
    date: string;
}
