import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Film, Clock, Tag, FileText, TrendingUp } from 'lucide-react';
import { MediaData } from '../api/client';

interface AgentFormProps {
    onSubmit: (data: MediaData) => void;
    isLoading: boolean;
}

const GENRES = [
    "Action", "Adventure", "Animation", "Comedy", "Crime",
    "Documentary", "Drama", "Fantasy", "Horror", "Musical",
    "Mystery", "Romance", "Sci-Fi", "Thriller", "Western",
    "Reality TV", "Talk Show", "Sport", "News", "Kids"
];

const defaultData: MediaData = {
    content: {
        title_id: "STR-THINGS-S05",
        duration_minutes: 52,
        genre: "Drama",
        description: "The final season of a beloved sci-fi drama series where a group of teenagers face their last battle against supernatural forces from an alternate dimension, in a small fictional town in Indiana."
    }
};

export function AgentForm({ onSubmit, isLoading }: AgentFormProps) {
    const [data, setData] = useState<MediaData>(defaultData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(data);
    };

    const setContent = (field: string, value: string | number) => {
        setData(prev => ({
            ...prev,
            content: { ...prev.content, [field]: value }
        }));
    };

    return (
        <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card flex flex-col gap-5"
            onSubmit={handleSubmit}
        >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-3 bg-primary/20 rounded-xl text-primary">
                    <Bot size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                        Content Intelligence
                    </h2>
                    <p className="text-sm text-gray-400">Provide content metadata to generate strategy</p>
                </div>
            </div>

            {/* Fields */}
            <div className="space-y-4">

                {/* Title ID */}
                <div>
                    <label className="flex items-center gap-2 text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">
                        <Film size={13} className="text-blue-400" />
                        Title ID
                    </label>
                    <input
                        type="text"
                        required
                        value={data.content.title_id}
                        onChange={e => setContent('title_id', e.target.value)}
                        placeholder="e.g. STR-THINGS-S05"
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500/60 focus:bg-black/60 transition-colors placeholder:text-gray-600"
                    />
                </div>

                {/* Duration + Genre row */}
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="flex items-center gap-2 text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">
                            <Clock size={13} className="text-purple-400" />
                            Duration (min)
                        </label>
                        <input
                            type="number"
                            required
                            min={1}
                            value={data.content.duration_minutes}
                            onChange={e => setContent('duration_minutes', parseInt(e.target.value) || 0)}
                            placeholder="e.g. 52"
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500/60 focus:bg-black/60 transition-colors placeholder:text-gray-600"
                        />
                    </div>

                    <div>
                        <label className="flex items-center gap-2 text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">
                            <Tag size={13} className="text-cyan-400" />
                            Genre
                        </label>
                        <select
                            required
                            value={data.content.genre}
                            onChange={e => setContent('genre', e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500/60 focus:bg-black/60 transition-colors text-gray-200 appearance-none cursor-pointer"
                        >
                            {GENRES.map(g => (
                                <option key={g} value={g} className="bg-gray-900">{g}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="flex items-center gap-2 text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">
                        <FileText size={13} className="text-orange-400" />
                        Description
                    </label>
                    <textarea
                        required
                        rows={5}
                        value={data.content.description}
                        onChange={e => setContent('description', e.target.value)}
                        placeholder="Describe the content — plot, themes, audience appeal..."
                        className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500/60 focus:bg-black/60 transition-colors placeholder:text-gray-600 resize-none leading-relaxed"
                    />
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all disabled:opacity-50 flex items-center justify-center gap-2 relative overflow-hidden group mt-1"
            >
                {isLoading ? (
                    <span className="flex items-center gap-2">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                            <Bot size={20} />
                        </motion.div>
                        Synthesizing Strategy...
                    </span>
                ) : (
                    <span className="flex items-center gap-2 z-10">
                        <TrendingUp size={20} />
                        Generate Strategy
                    </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[glare_1.5s_ease-in-out_infinite]" />
            </button>
        </motion.form>
    );
}
