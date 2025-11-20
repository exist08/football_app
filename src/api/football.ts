import client from './client';
import { LeagueOverview, LeagueStandings, LeagueStats, ApiResponse } from '../types/football';

export const getLeagueOverview = async (country: string, league: string): Promise<ApiResponse<LeagueOverview>> => {
    try {
        const response = await client.get(`/scrape/league/${country}/${league}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching league overview:', error);
        return { success: false, error: 'Failed to fetch league overview' };
    }
};

export const getLeagueStandings = async (country: string, league: string): Promise<ApiResponse<LeagueStandings>> => {
    try {
        const response = await client.get(`/scrape/standings/${country}/${league}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching standings:', error);
        return { success: false, error: 'Failed to fetch standings' };
    }
};

export const getLeagueStats = async (country: string, league: string): Promise<ApiResponse<LeagueStats>> => {
    try {
        const response = await client.get(`/scrape/stats/${country}/${league}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching stats:', error);
        return { success: false, error: 'Failed to fetch stats' };
    }
};
