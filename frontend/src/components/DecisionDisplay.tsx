import { motion } from 'framer-motion';
import { AgentDecision } from '../api/client';
import { Calendar, MonitorPlay, BarChart3, Target, Sparkles, BrainCircuit, Lightbulb } from 'lucide-react';

interface DecisionDisplayProps {
    decision: AgentDecision | null;
}

export function DecisionDisplay({ decision }: DecisionDisplayProps) {
    if (!decision) {
        return (
            <div className="h-full glass-card flex flex-col items-center justify-center text-gray-500 p-12 text-center min-h-[400px]">
                <BrainCircuit size={48} className="mb-4 opacity-50" />
                <p className="text-lg">Agent is standing by.</p>
                <p className="text-sm mt-2 max-w-sm">Provide content metadata — title, duration, genre, and description — to initiate autonomous strategic planning.</p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card flex flex-col gap-6 h-full relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-32 bg-primary/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 p-32 bg-accent/5 blur-[120px] rounded-full -z-10" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-500/20 rounded-xl text-green-400">
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Synthesized Strategy</h2>
                        <p className="text-sm text-green-400/80 font-mono">LTV Uplift Estimate: +{decision.estimated_lifetime_value_uplift}%</p>
                    </div>
                </div>
            </div>

            <div className="space-y-5 flex-1 overflow-y-auto pr-1">

                {/* ── REASONING — elevated to prime position ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent p-5 overflow-hidden"
                >
                    {/* Glow bar left */}
                    <div className="absolute left-0 top-0 w-1 h-full rounded-l-2xl bg-gradient-to-b from-amber-400 via-orange-500 to-amber-400 shadow-[0_0_12px_#f59e0b]" />

                    <div className="flex items-center gap-2 mb-3 ml-2">
                        <div className="p-1.5 bg-amber-500/20 rounded-lg">
                            <Lightbulb size={16} className="text-amber-400" />
                        </div>
                        <h3 className="font-bold text-amber-300 text-base">Why the Agent Made This Decision</h3>
                    </div>

                    <p className="text-sm text-gray-200 leading-relaxed ml-2 border-l-2 border-amber-500/40 pl-3">
                        {decision.reasoning}
                    </p>
                </motion.div>

                {/* Release Schedule + Windowing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 text-cyan-400 mb-2">
                            <Calendar size={18} />
                            <h3 className="font-semibold">Release Schedule</h3>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">{decision.recommended_release_schedule}</p>
                    </div>

                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 text-purple-400 mb-2">
                            <MonitorPlay size={18} />
                            <h3 className="font-semibold">Windowing Strategy</h3>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">{decision.windowing_strategy}</p>
                    </div>
                </div>

                {/* Platform Placement */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="flex items-center gap-2 text-orange-400 mb-3">
                        <Target size={18} />
                        <h3 className="font-semibold">Platform Placement</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {decision.platform_placement.map((p, i) => (
                            <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs border border-white/20 text-gray-200">
                                {p}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Promotional Spend */}
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <div className="flex items-center gap-2 text-pink-400 mb-3">
                        <BarChart3 size={18} />
                        <h3 className="font-semibold">Promotional Distribution</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {Object.entries(decision.promotional_spend_allocation).map(([channel, pct], i) => {
                            const percent = (Number(pct) * 100).toFixed(0);
                            return (
                                <div key={i} className="bg-black/30 p-3 rounded-lg">
                                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{channel}</div>
                                    <div className="text-lg font-bold text-white">{percent}%</div>
                                    <div className="mt-1.5 h-1 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percent}%` }}
                                            transition={{ delay: 0.3 + i * 0.05, duration: 0.6, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
