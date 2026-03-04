import { useState } from 'react';
import { AgentForm } from './components/AgentForm';
import { DecisionDisplay } from './components/DecisionDisplay';
import { analyzeMedia, MediaData, AgentDecision } from './api/client';
import { Hexagon, TrendingUp, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
    const [decision, setDecision] = useState<AgentDecision | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<str | null>(null);

    const handleAnalyze = async (data: MediaData) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await analyzeMedia(data);
            setDecision(result);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to connect to agent backend.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background relative overflow-hidden font-sans text-gray-100 selection:bg-primary/30">
            {/* Dynamic Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] sm:top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] sm:bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-cyan-600/5 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 hidden sm:block">

                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 flex items-center justify-between"
                >
                    <div className="flex items-center gap-4">
                        <div className="relative flex items-center justify-center w-12 h-12">
                            <div className="absolute inset-0 bg-blue-500 rounded-xl blur-lg opacity-50 animate-pulse" />
                            <div className="relative bg-surface/80 border border-white/20 p-2.5 rounded-xl text-white backdrop-blur-xl">
                                <Hexagon size={24} className="text-blue-400" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                                Nexus<span className="text-blue-500">AI</span> Media
                            </h1>
                            <p className="text-sm text-gray-400 font-medium flex items-center gap-2">
                                <Cpu size={14} className="text-blue-400" />
                                Autonomous Strategy Engine
                            </p>
                        </div>
                    </div>

                    <div className="hidden sm:flex items-center gap-3 glass px-4 py-2 rounded-full border border-white/10">
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse" />
                        <span className="text-xs font-mono text-gray-300">SYSTEM.ONLINE</span>
                    </div>
                </motion.header>

                {/* Error Dialog */}
                {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
                        {error}
                    </motion.div>
                )}

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full min-h-[600px]">

                    {/* Left Column: Form Controls */}
                    <div className="lg:col-span-4 h-full">
                        <AgentForm onSubmit={handleAnalyze} isLoading={isLoading} />
                    </div>

                    {/* Right Column: Output Dash */}
                    <div className="lg:col-span-8 h-full">
                        <DecisionDisplay decision={decision} />
                    </div>

                </div>

            </div>
        </div>
    );
}

export default App;
