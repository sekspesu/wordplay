import { useState } from 'react';
import { Send } from 'lucide-react';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Navbar } from '../components/Layout/Navbar';

export const Feedback = () => {
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        // In a real app, send to backend. Here just mock it.
        console.log('Feedback sent:', message);
        setSent(true);
        setMessage('');
        setTimeout(() => setSent(false), 3000);
    };

    return (
        <div className="min-h-screen pb-24 md:pb-0 md:pt-24 px-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-md mb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    Tagasiside
                </h1>
                <p className="text-slate-500">Aita meil paremaks saada!</p>
            </div>

            <Card className="w-full max-w-md p-6 md:p-8">
                {sent ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Send size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Aitäh!</h3>
                        <p className="text-slate-600">Sinu tagasiside on teele pandud.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                                Sinu teade
                            </label>
                            <textarea
                                id="message"
                                rows={5}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
                                placeholder="Kirjuta siia oma mõtted, ideed või mured..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={!message.trim()}>
                            Saada teele
                        </Button>
                    </form>
                )}
            </Card>

            <Navbar />
        </div>
    );
};
