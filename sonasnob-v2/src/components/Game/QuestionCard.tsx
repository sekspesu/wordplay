import { motion } from 'framer-motion';
import { Card } from '../UI/Card';
import { AnswerButton } from './AnswerButton';
import type { Word } from '../../types';

interface QuestionCardProps {
    word: Word;
    options: string[];
    onAnswer: (definition: string) => void;
    selectedAnswer: string | null;
    correctAnswer: string | null; // Only passed after answering
}

export const QuestionCard = ({
    word,
    options,
    onAnswer,
    selectedAnswer,
    correctAnswer
}: QuestionCardProps) => {
    const isAnswered = selectedAnswer !== null;

    return (
        <Card className="w-full max-w-md mx-auto p-6 md:p-8">
            <motion.div
                key={word.word}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center mb-8"
            >
                <h2 className="text-4xl font-bold text-[#EAEAEA] mb-2 tracking-tight drop-shadow-lg">
                    {word.word}
                </h2>
                <p className="text-[#D4AF37] text-sm uppercase tracking-wider font-medium opacity-90">
                    Mis on selle sõna tähendus?
                </p>
            </motion.div>

            <div className="space-y-3">
                {options.map((option, index) => {
                    let state: 'default' | 'correct' | 'incorrect' | 'disabled' = 'default';

                    if (isAnswered) {
                        if (option === correctAnswer) {
                            state = 'correct';
                        } else if (option === selectedAnswer) {
                            state = 'incorrect';
                        } else {
                            state = 'disabled';
                        }
                    }

                    return (
                        <motion.div
                            key={option}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <AnswerButton
                                onClick={() => !isAnswered && onAnswer(option)}
                                state={state}
                                disabled={isAnswered}
                            >
                                {option}
                            </AnswerButton>
                        </motion.div>
                    );
                })}
            </div>
        </Card>
    );
};
