import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  useWindowDimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { FootballAPI, type Standing } from "@/lib/football-api";
import { cn } from "@/lib/utils";

const DESKTOP_BREAKPOINT = 768;

export default function LeaguesScreen() {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLeague, setSelectedLeague] = useState("Premier League");

  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === "web" && width >= DESKTOP_BREAKPOINT;

  const leagues = FootballAPI.getLeagues();

  const loadStandings = async (league: string) => {
    setLoading(true);
    try {
      const data = await FootballAPI.getStandings(league);
      setStandings(data);
    } catch (error) {
      console.error("Failed to load standings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStandings(selectedLeague);
  }, [selectedLeague]);

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-3xl font-bold text-foreground">Leagues</Text>
          <Text className="text-base text-muted mt-1">Current standings</Text>
        </View>

        {/* League Selector */}
        <View className="mb-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 8 }}
          >
            {leagues.map((league) => (
              <TouchableOpacity
                key={league}
                onPress={() => setSelectedLeague(league)}
                className={cn(
                  "px-4 py-2 rounded-full border",
                  selectedLeague === league
                    ? "bg-primary border-primary"
                    : "bg-surface border-border",
                )}
              >
                <Text
                  className={cn(
                    "text-sm font-semibold",
                    selectedLeague === league ? "text-white" : "text-foreground",
                  )}
                >
                  {league}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Standings Table */}
        {loading ? (
          <View className="flex-1 items-center justify-center py-12">
            <ActivityIndicator size="large" />
            <Text className="text-muted mt-4">Loading standings...</Text>
          </View>
        ) : (
          <View className="px-6">
            {/* Table Header — extra columns visible on desktop */}
            <View className="flex-row items-center py-3 border-b border-border">
              <Text className="text-xs font-bold text-muted w-10">#</Text>
              <Text className="text-xs font-bold text-muted flex-1">Team</Text>
              <Text className="text-xs font-bold text-muted w-10 text-center">P</Text>
              <Text className="text-xs font-bold text-muted w-10 text-center">W</Text>
              <Text className="text-xs font-bold text-muted w-10 text-center">D</Text>
              <Text className="text-xs font-bold text-muted w-10 text-center">L</Text>
              {isDesktop && (
                <>
                  <Text className="text-xs font-bold text-muted w-12 text-center">GF</Text>
                  <Text className="text-xs font-bold text-muted w-12 text-center">GA</Text>
                </>
              )}
              <Text className="text-xs font-bold text-muted w-12 text-center">GD</Text>
              <Text className="text-xs font-bold text-muted w-12 text-right">Pts</Text>
            </View>

            {/* Table Rows */}
            {standings.map((standing) => (
              <TouchableOpacity
                key={standing.rank}
                className="flex-row items-center py-4 border-b border-border/50 active:opacity-70"
                onPress={() => {}}
              >
                <View className="w-10">
                  <Text
                    className={cn(
                      "text-sm font-bold",
                      standing.rank <= 4 ? "text-success" : "text-foreground",
                    )}
                  >
                    {standing.rank}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text
                    className="text-sm font-semibold text-foreground"
                    numberOfLines={1}
                    style={isDesktop ? { fontSize: 15 } : undefined}
                  >
                    {standing.team}
                  </Text>
                </View>
                <Text className="text-sm text-muted w-10 text-center">{standing.played}</Text>
                <Text className="text-sm text-muted w-10 text-center">{standing.won}</Text>
                <Text className="text-sm text-muted w-10 text-center">{standing.drawn}</Text>
                <Text className="text-sm text-muted w-10 text-center">{standing.lost}</Text>
                {isDesktop && (
                  <>
                    <Text className="text-sm text-muted w-12 text-center">
                      {standing.goalsFor ?? "-"}
                    </Text>
                    <Text className="text-sm text-muted w-12 text-center">
                      {standing.goalsAgainst ?? "-"}
                    </Text>
                  </>
                )}
                <Text
                  className={cn(
                    "text-sm font-medium w-12 text-center",
                    standing.goalDifference > 0
                      ? "text-success"
                      : standing.goalDifference < 0
                        ? "text-error"
                        : "text-muted",
                  )}
                >
                  {standing.goalDifference > 0 ? "+" : ""}
                  {standing.goalDifference}
                </Text>
                <Text className="text-sm font-bold text-foreground w-12 text-right">
                  {standing.points}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Legend */}
        <View className="px-6 mt-6 bg-surface rounded-2xl p-4 border border-border mx-6">
          <Text className="text-xs font-bold text-foreground mb-2">Legend</Text>
          <View className="gap-1">
            <View className="flex-row items-center gap-2">
              <View className="w-3 h-3 rounded-full bg-success" />
              <Text className="text-xs text-muted">Top 4 — Champions League qualification</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
