import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001/api';

export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface MediaData {
    content: {
        title_id: string;
        duration_minutes: number;
        description: string;
        genre: string;
    };
}

export interface AgentDecision {
    title_id: string;
    recommended_release_schedule: string;
    windowing_strategy: string;
    promotional_spend_allocation: Record<string, number>;
    platform_placement: string[];
    reasoning: string;
    estimated_lifetime_value_uplift: number;
}

export const analyzeMedia = async (data: MediaData): Promise<AgentDecision> => {
    const response = await apiClient.post<AgentDecision>('/analyze', data);
    return response.data;
};
