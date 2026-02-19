export interface Match {
    homeTeam: string;
    awayTeam: string;
    homeScore?: string;
    awayScore?: string;
    time: string;
    date: string; // e.g., "FT", "HT", "15'"
}

export interface LeagueOverview {
    matches: Match[];
    league: string;
    country: string;
}

export interface StandingTeam {
    position: number;
    team: string;
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    goalsDiff: number;
    points: number;
}

export interface LeagueStandings {
    standings: StandingTeam[];
    league: string;
    country: string;
}

export interface PlayerStat {
    rank: number;
    player: string;
    team: string;
    value?: number;
}

export interface LeagueStats {
    scrapedAt: string;
    stats: {
        "Assists": PlayerStat[];
        "Top Scorers": PlayerStat[];
        "Red Cards": PlayerStat[];
        "Yellow Cards": PlayerStat[];
        "Shots on Target": PlayerStat[];
        [key: string]: PlayerStat[];
    };
    league?: string;
    country?: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}
