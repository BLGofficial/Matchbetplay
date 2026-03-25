import AsyncStorage from "@react-native-async-storage/async-storage";
import { type Team } from "./football-api";

const FAVORITES_KEY = "@matchbet_favorites";

export interface FavoriteTeam {
  id: number;
  name: string;
  country: string;
  league: string;
  addedAt: string;
}

/**
 * Favorites management service
 */
export const Favorites = {
  /**
   * Get all favorite teams
   */
  async getAll(): Promise<FavoriteTeam[]> {
    try {
      const data = await AsyncStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to load favorites:", error);
      return [];
    }
  },

  /**
   * Add a team to favorites
   */
  async add(team: Team): Promise<boolean> {
    try {
      const favorites = await this.getAll();
      
      // Check if already exists
      if (favorites.some(f => f.id === team.id)) {
        return false;
      }

      const newFavorite: FavoriteTeam = {
        id: team.id,
        name: team.name,
        country: team.country,
        league: team.league,
        addedAt: new Date().toISOString(),
      };

      favorites.push(newFavorite);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      return true;
    } catch (error) {
      console.error("Failed to add favorite:", error);
      return false;
    }
  },

  /**
   * Remove a team from favorites
   */
  async remove(teamId: number): Promise<boolean> {
    try {
      const favorites = await this.getAll();
      const filtered = favorites.filter(f => f.id !== teamId);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      return false;
    }
  },

  /**
   * Check if a team is in favorites
   */
  async isFavorite(teamId: number): Promise<boolean> {
    try {
      const favorites = await this.getAll();
      return favorites.some(f => f.id === teamId);
    } catch (error) {
      console.error("Failed to check favorite:", error);
      return false;
    }
  },

  /**
   * Clear all favorites
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.removeItem(FAVORITES_KEY);
    } catch (error) {
      console.error("Failed to clear favorites:", error);
    }
  },
};
