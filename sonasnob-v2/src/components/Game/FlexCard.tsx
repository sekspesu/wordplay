import { useRef } from 'react';
import html2canvas from 'html2canvas';
import { Button } from '../UI/Button';
import { Share2 } from 'lucide-react';

interface FlexCardProps {
    streak: number;
    level: string;
    wordsLearned: number;
}

export const FlexCard = ({ streak, level, wordsLearned }: FlexCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleShare = async () => {
        if (!cardRef.current) return;

        try {
            const canvas = await html2canvas(cardRef.current, {
                backgroundColor: null,
                scale: 2, // Higher quality
            });

            canvas.toBlob(async (blob) => {
                if (!blob) return;

                // Try native share first (mobile)
                if (navigator.share) {
                    try {
                        const file = new File([blob], 'sonasnob-flex.png', { type: 'image/png' });
                        await navigator.share({
                            title: 'Sõnasnob',
                            text: `Olen Sõnasnobis juba ${level}! 🔥 ${streak} päeva järjest.`,
                            files: [file],
                        });
                        return;
                    } catch (e) {
                        console.log('Native share failed, falling back to download', e);
                    }
                }

                // Fallback to download (desktop)
                const link = document.createElement('a');
                link.download = 'sonasnob-flex.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        } catch (err) {
            console.error('Failed to generate image', err);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            {/* The Card to Capture */}
            <div
                ref={cardRef}
                className="relative w-72 h-96 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 flex flex-col items-center justify-between text-white shadow-2xl overflow-hidden"
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />

                <div className="z-10 text-center mt-4">
                    <p className="text-sm font-medium opacity-80 uppercase tracking-widest">Sõnasnob</p>
                    <h2 className="text-3xl font-bold mt-1">Päev Tehtud!</h2>
                </div>

                <div className="z-10 flex flex-col items-center">
                    <div className="text-6xl mb-2">🔥</div>
                    <div className="text-5xl font-black">{streak}</div>
                    <div className="text-sm font-medium opacity-80">Päeva Järjest</div>
                </div>

                <div className="z-10 w-full bg-white/20 backdrop-blur-md rounded-xl p-4 flex justify-between items-center">
                    <div>
                        <p className="text-xs opacity-70">Tase</p>
                        <p className="font-bold text-lg">{level}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs opacity-70">Täna õpitud</p>
                        <p className="font-bold text-lg">{wordsLearned} sõna</p>
                    </div>
                </div>
            </div>

            <Button onClick={handleShare} className="flex items-center gap-2">
                <Share2 size={18} />
                Jaga tulemust
            </Button>
        </div>
    );
};
