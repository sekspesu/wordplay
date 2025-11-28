import { Card } from '../components/UI/Card';
import { Navbar } from '../components/Layout/Navbar';

export const About = () => {
    return (
        <div className="min-h-screen pb-24 md:pb-0 md:pt-24 px-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-md mb-6">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    Meist
                </h1>
            </div>

            <Card className="w-full max-w-md p-6 md:p-8 space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-white mb-2">Mis on Sõnasnob?</h2>
                    <p className="text-white/70 leading-relaxed">
                        Sõnasnob on interaktiivne keeleõppe rakendus, mis aitab sul rikastada oma sõnavara põnevate võõrsõnadega.
                        Meie eesmärk on muuta õppimine mänguliseks ja nauditavaks.
                    </p>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-white mb-2">Kuidas mängida?</h2>
                    <ul className="space-y-2 text-white/70 list-disc list-inside">
                        <li>Sulle näidatakse ühte sõna.</li>
                        <li>Vali kolme variandi hulgast õige tähendus.</li>
                        <li>Kogu punkte ja jõua edetabeli tippu!</li>
                        <li>Iga 5 sõna järel saad oma tulemuse salvestada.</li>
                    </ul>
                </div>

                <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-white/40 text-center">
                        Versioon 2.0 • Tehtud armastusega Eestis 🇪🇪
                    </p>
                </div>
            </Card>

            <Navbar />
        </div>
    );
};
