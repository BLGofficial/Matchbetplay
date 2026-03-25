/**
 * Football API Service
 * 
 * Provides football match data, league standings, team information, and predictions.
 * Uses mock data for development. In production, this would connect to a real API.
 */

export interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: string;
  league: string;
  isLive: boolean;
  elapsed?: number;
  halftimeScore?: { home: number; away: number };
}

export interface Standing {
  rank: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

export interface Prediction {
  id: number;
  homeTeam: string;
  awayTeam: string;
  prediction: "Home" | "Draw" | "Away";
  confidence: number;
  matchDate: string;
  league: string;
  keyFactors: string[];
}

export interface Team {
  id: number;
  name: string;
  country: string;
  league: string;
  form: string[];
}

// Mock data for live matches
const mockLiveMatches: Match[] = [
  {
    id: 1,
    homeTeam: "Liverpool",
    awayTeam: "Manchester City",
    homeScore: 2,
    awayScore: 1,
    status: "78'",
    league: "Premier League",
    isLive: true,
    elapsed: 78,
    halftimeScore: { home: 1, away: 1 },
  },
  {
    id: 2,
    homeTeam: "Real Madrid",
    awayTeam: "Barcelona",
    homeScore: 1,
    awayScore: 1,
    status: "HT",
    league: "La Liga",
    isLive: true,
    elapsed: 45,
    halftimeScore: { home: 1, away: 1 },
  },
  {
    id: 3,
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    homeScore: 3,
    awayScore: 2,
    status: "89'",
    league: "Bundesliga",
    isLive: true,
    elapsed: 89,
    halftimeScore: { home: 2, away: 1 },
  },
  {
    id: 4,
    homeTeam: "Inter Milan",
    awayTeam: "AC Milan",
    homeScore: 0,
    awayScore: 0,
    status: "34'",
    league: "Serie A",
    isLive: true,
    elapsed: 34,
    halftimeScore: { home: 0, away: 0 },
  },
  {
    id: 5,
    homeTeam: "PSG",
    awayTeam: "Marseille",
    homeScore: 2,
    awayScore: 0,
    status: "67'",
    league: "Ligue 1",
    isLive: true,
    elapsed: 67,
    halftimeScore: { home: 1, away: 0 },
  },
  {
    id: 6,
    homeTeam: "Chelsea",
    awayTeam: "Arsenal",
    homeScore: 1,
    awayScore: 2,
    status: "FT",
    league: "Premier League",
    isLive: false,
  },
];

// Mock data for league standings
const mockStandings: Record<string, Standing[]> = {
  "Premier League": [
    { rank: 1, team: "Liverpool", played: 22, won: 17, drawn: 4, lost: 1, goalsFor: 54, goalsAgainst: 20, goalDifference: 34, points: 55 },
    { rank: 2, team: "Arsenal", played: 22, won: 14, drawn: 6, lost: 2, goalsFor: 45, goalsAgainst: 20, goalDifference: 25, points: 48 },
    { rank: 3, team: "Manchester City", played: 22, won: 13, drawn: 5, lost: 4, goalsFor: 48, goalsAgainst: 26, goalDifference: 22, points: 44 },
    { rank: 4, team: "Chelsea", played: 22, won: 12, drawn: 5, lost: 5, goalsFor: 40, goalsAgainst: 26, goalDifference: 14, points: 41 },
    { rank: 5, team: "Tottenham", played: 22, won: 11, drawn: 5, lost: 6, goalsFor: 38, goalsAgainst: 28, goalDifference: 10, points: 38 },
    { rank: 6, team: "Manchester United", played: 22, won: 9, drawn: 6, lost: 7, goalsFor: 30, goalsAgainst: 26, goalDifference: 4, points: 33 },
  ],
  "La Liga": [
    { rank: 1, team: "Real Madrid", played: 21, won: 15, drawn: 4, lost: 2, goalsFor: 42, goalsAgainst: 18, goalDifference: 24, points: 49 },
    { rank: 2, team: "Barcelona", played: 21, won: 14, drawn: 5, lost: 2, goalsFor: 48, goalsAgainst: 20, goalDifference: 28, points: 47 },
    { rank: 3, team: "Atletico Madrid", played: 21, won: 13, drawn: 4, lost: 4, goalsFor: 35, goalsAgainst: 22, goalDifference: 13, points: 43 },
    { rank: 4, team: "Athletic Bilbao", played: 21, won: 11, drawn: 5, lost: 5, goalsFor: 32, goalsAgainst: 24, goalDifference: 8, points: 38 },
    { rank: 5, team: "Real Sociedad", played: 21, won: 10, drawn: 6, lost: 5, goalsFor: 28, goalsAgainst: 22, goalDifference: 6, points: 36 },
    { rank: 6, team: "Villarreal", played: 21, won: 9, drawn: 7, lost: 5, goalsFor: 30, goalsAgainst: 26, goalDifference: 4, points: 34 },
  ],
  "Bundesliga": [
    { rank: 1, team: "Bayern Munich", played: 20, won: 15, drawn: 3, lost: 2, goalsFor: 52, goalsAgainst: 18, goalDifference: 34, points: 48 },
    { rank: 2, team: "Bayer Leverkusen", played: 20, won: 14, drawn: 4, lost: 2, goalsFor: 45, goalsAgainst: 20, goalDifference: 25, points: 46 },
    { rank: 3, team: "Borussia Dortmund", played: 20, won: 12, drawn: 5, lost: 3, goalsFor: 42, goalsAgainst: 24, goalDifference: 18, points: 41 },
    { rank: 4, team: "RB Leipzig", played: 20, won: 11, drawn: 4, lost: 5, goalsFor: 38, goalsAgainst: 26, goalDifference: 12, points: 37 },
    { rank: 5, team: "Freiburg", played: 20, won: 10, drawn: 5, lost: 5, goalsFor: 32, goalsAgainst: 28, goalDifference: 4, points: 35 },
    { rank: 6, team: "Eintracht Frankfurt", played: 20, won: 9, drawn: 6, lost: 5, goalsFor: 34, goalsAgainst: 30, goalDifference: 4, points: 33 },
  ],
  "Serie A": [
    { rank: 1, team: "Inter Milan", played: 21, won: 16, drawn: 3, lost: 2, goalsFor: 48, goalsAgainst: 18, goalDifference: 30, points: 51 },
    { rank: 2, team: "Napoli", played: 21, won: 14, drawn: 5, lost: 2, goalsFor: 42, goalsAgainst: 20, goalDifference: 22, points: 47 },
    { rank: 3, team: "Juventus", played: 21, won: 13, drawn: 6, lost: 2, goalsFor: 38, goalsAgainst: 18, goalDifference: 20, points: 45 },
    { rank: 4, team: "AC Milan", played: 21, won: 12, drawn: 5, lost: 4, goalsFor: 36, goalsAgainst: 24, goalDifference: 12, points: 41 },
    { rank: 5, team: "Atalanta", played: 21, won: 11, drawn: 6, lost: 4, goalsFor: 40, goalsAgainst: 26, goalDifference: 14, points: 39 },
    { rank: 6, team: "Roma", played: 21, won: 10, drawn: 6, lost: 5, goalsFor: 32, goalsAgainst: 24, goalDifference: 8, points: 36 },
  ],
  "Ligue 1": [
    { rank: 1, team: "PSG", played: 20, won: 16, drawn: 3, lost: 1, goalsFor: 50, goalsAgainst: 16, goalDifference: 34, points: 51 },
    { rank: 2, team: "Monaco", played: 20, won: 13, drawn: 5, lost: 2, goalsFor: 42, goalsAgainst: 22, goalDifference: 20, points: 44 },
    { rank: 3, team: "Marseille", played: 20, won: 12, drawn: 4, lost: 4, goalsFor: 38, goalsAgainst: 24, goalDifference: 14, points: 40 },
    { rank: 4, team: "Lille", played: 20, won: 11, drawn: 5, lost: 4, goalsFor: 34, goalsAgainst: 22, goalDifference: 12, points: 38 },
    { rank: 5, team: "Lyon", played: 20, won: 10, drawn: 6, lost: 4, goalsFor: 32, goalsAgainst: 24, goalDifference: 8, points: 36 },
    { rank: 6, team: "Nice", played: 20, won: 9, drawn: 7, lost: 4, goalsFor: 28, goalsAgainst: 22, goalDifference: 6, points: 34 },
  ],
  "Champions League": [
    { rank: 1, team: "Manchester City", played: 6, won: 5, drawn: 1, lost: 0, goalsFor: 18, goalsAgainst: 6, goalDifference: 12, points: 16 },
    { rank: 2, team: "Bayern Munich", played: 6, won: 4, drawn: 2, lost: 0, goalsFor: 16, goalsAgainst: 8, goalDifference: 8, points: 14 },
    { rank: 3, team: "Real Madrid", played: 6, won: 4, drawn: 1, lost: 1, goalsFor: 14, goalsAgainst: 8, goalDifference: 6, points: 13 },
    { rank: 4, team: "Inter Milan", played: 6, won: 3, drawn: 2, lost: 1, goalsFor: 12, goalsAgainst: 8, goalDifference: 4, points: 11 },
    { rank: 5, team: "Arsenal", played: 6, won: 3, drawn: 1, lost: 2, goalsFor: 10, goalsAgainst: 8, goalDifference: 2, points: 10 },
    { rank: 6, team: "PSG", played: 6, won: 2, drawn: 3, lost: 1, goalsFor: 10, goalsAgainst: 8, goalDifference: 2, points: 9 },
  ],
};

// Mock data for predictions
const mockPredictions: Prediction[] = [
  {
    id: 1,
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    prediction: "Home",
    confidence: 87,
    matchDate: "Today, 20:00",
    league: "Bundesliga",
    keyFactors: ["Home advantage", "Superior form", "Head-to-head record"],
  },
  {
    id: 2,
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    prediction: "Home",
    confidence: 75,
    matchDate: "Tomorrow, 17:30",
    league: "Premier League",
    keyFactors: ["Recent form", "Home record", "Defensive strength"],
  },
  {
    id: 3,
    homeTeam: "Barcelona",
    awayTeam: "Atletico Madrid",
    prediction: "Draw",
    confidence: 68,
    matchDate: "Tomorrow, 21:00",
    league: "La Liga",
    keyFactors: ["Evenly matched", "Recent draws", "Tactical balance"],
  },
  {
    id: 4,
    homeTeam: "Napoli",
    awayTeam: "Roma",
    prediction: "Home",
    confidence: 82,
    matchDate: "Jan 28, 19:45",
    league: "Serie A",
    keyFactors: ["Top form", "Home advantage", "Attacking prowess"],
  },
  {
    id: 5,
    homeTeam: "Monaco",
    awayTeam: "Lyon",
    prediction: "Away",
    confidence: 71,
    matchDate: "Jan 28, 20:00",
    league: "Ligue 1",
    keyFactors: ["Lyon's away record", "Monaco's injuries", "Recent form"],
  },
];

// Mock data for teams
const mockTeams: Team[] = [
  { id: 1, name: "Liverpool", country: "England", league: "Premier League", form: ["W", "W", "D", "W", "W"] },
  { id: 2, name: "Manchester City", country: "England", league: "Premier League", form: ["W", "L", "W", "D", "W"] },
  { id: 3, name: "Arsenal", country: "England", league: "Premier League", form: ["W", "W", "W", "D", "D"] },
  { id: 4, name: "Chelsea", country: "England", league: "Premier League", form: ["L", "W", "D", "W", "W"] },
  { id: 5, name: "Real Madrid", country: "Spain", league: "La Liga", form: ["W", "W", "W", "D", "W"] },
  { id: 6, name: "Barcelona", country: "Spain", league: "La Liga", form: ["W", "D", "W", "W", "W"] },
  { id: 7, name: "Bayern Munich", country: "Germany", league: "Bundesliga", form: ["W", "W", "W", "W", "D"] },
  { id: 8, name: "Borussia Dortmund", country: "Germany", league: "Bundesliga", form: ["W", "W", "L", "W", "D"] },
  { id: 9, name: "Inter Milan", country: "Italy", league: "Serie A", form: ["W", "W", "W", "D", "W"] },
  { id: 10, name: "AC Milan", country: "Italy", league: "Serie A", form: ["W", "D", "L", "W", "W"] },
  { id: 11, name: "PSG", country: "France", league: "Ligue 1", form: ["W", "W", "W", "W", "D"] },
  { id: 12, name: "Marseille", country: "France", league: "Ligue 1", form: ["W", "L", "W", "D", "W"] },
];

/**
 * Football API Service
 */
export const FootballAPI = {
  /**
   * Get live matches
   */
  async getLiveMatches(): Promise<Match[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockLiveMatches.filter(m => m.isLive);
  },

  /**
   * Get all matches (live and recent)
   */
  async getAllMatches(): Promise<Match[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockLiveMatches;
  },

  /**
   * Get league standings
   */
  async getStandings(league: string): Promise<Standing[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockStandings[league] || [];
  },

  /**
   * Get all available leagues
   */
  getLeagues(): string[] {
    return Object.keys(mockStandings);
  },

  /**
   * Get AI predictions
   */
  async getPredictions(): Promise<Prediction[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockPredictions;
  },

  /**
   * Search teams
   */
  async searchTeams(query: string): Promise<Team[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const lowerQuery = query.toLowerCase();
    return mockTeams.filter(team => 
      team.name.toLowerCase().includes(lowerQuery) ||
      team.country.toLowerCase().includes(lowerQuery) ||
      team.league.toLowerCase().includes(lowerQuery)
    );
  },

  /**
   * Get team by ID
   */
  async getTeam(id: number): Promise<Team | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockTeams.find(team => team.id === id) || null;
  },
};
