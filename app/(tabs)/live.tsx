import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Platform,
  useWindowDimensions,
} from "react-native";
import { useState, useEffect } from "react";
import { ScreenContainer } from "@/components/screen-container";
import { MatchCard } from "@/components/match-card";
import { FootballAPI, type Match } from "@/lib/football-api";
import { cn } from "@/lib/utils";

const DESKTOP_BREAKPOINT = 768;

/** Renders a list of matches in a 2-column grid on desktop. */
function MatchGrid({ matches, isDesktop }: { matches: Match[]; isDesktop: boolean }) {
  if (!isDesktop || matches.length === 0) {
    return (
      <View style={{ gap: 12 }}>
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            homeTeam={match.homeTeam}
            awayTeam={match.awayTeam}
            homeScore={match.homeScore}
            awayScore={match.awayScore}
            status={match.status}
            league={match.league}
            isLive={match.isLive}
            onPress={() => {}}
          />
        ))}
      </View>
    );
  }

  const rows: Match[][] = [];
  for (let i = 0; i < matches.length; i += 2) {
    rows.push(matches.slice(i, i + 2));
  }

  return (
    <View style={{ gap: 12 }}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: "row", gap: 12 }}>
          {row.map((match) => (
            <View key={match.id} style={{ flex: 1 }}>
              <MatchCard
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
                homeScore={match.homeScore}
                awayScore={match.awayScore}
                status={match.status}
                league={match.league}
                isLive={match.isLive}
                onPress={() => {}}
              />
            </View>
          ))}
          {row.length === 1 && <View style={{ flex: 1 }} />}
        </View>
      ))}
    </View>
  );
}

export default function LiveScreen() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === "web" && width >= DESKTOP_BREAKPOINT;

  const leagues = ["All", "Premier League", "La Liga", "Bundesliga", "Serie A", "Ligue 1", "Champions League"];

  const loadMatches = async () => {
    try {
      const data = await FootballAPI.getAllMatches();
      setMatches(data);
    } catch (error) {
      console.error("Failed to load matches:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMatches();
  };

  useEffect(() => {
    loadMatches();
  }, []);

  // Auto-refresh every 60 seconds
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      loadMatches();
    }, 60000);
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const filteredMatches =
    selectedLeague && selectedLeague !== "All"
      ? matches.filter((m) => m.league === selectedLeague)
      : matches;

  const liveMatches = filteredMatches.filter((m) => m.isLive);
  const recentMatches = filteredMatches.filter((m) => !m.isLive);

  if (loading) {
    return (
      <ScreenContainer className="bg-background">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
          <Text className="text-muted mt-4">Loading matches...</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="bg-background">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-3xl font-bold text-foreground">Live Matches</Text>
            <TouchableOpacity
              onPress={() => setAutoRefresh(!autoRefresh)}
              className="px-3 py-1.5 rounded-full bg-surface border border-border active:opacity-70"
            >
              <Text className={cn("text-xs font-semibold", autoRefresh ? "text-success" : "text-muted")}>
                {autoRefresh ? "Auto ✓" : "Manual"}
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-base text-muted">
            {liveMatches.length} live · Updated {autoRefresh ? "every 60s" : "manually"}
          </Text>
        </View>

        {/* League Filter */}
        <View className="mb-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 8 }}
          >
            {leagues.map((league) => (
              <TouchableOpacity
                key={league}
                onPress={() => setSelectedLeague(league === "All" ? null : league)}
                className={cn(
                  "px-4 py-2 rounded-full border",
                  selectedLeague === league || (league === "All" && !selectedLeague)
                    ? "bg-primary border-primary"
                    : "bg-surface border-border",
                )}
              >
                <Text
                  className={cn(
                    "text-sm font-semibold",
                    selectedLeague === league || (league === "All" && !selectedLeague)
                      ? "text-white"
                      : "text-foreground",
                  )}
                >
                  {league}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Live Matches */}
        {liveMatches.length > 0 && (
          <View className="mb-6">
            <View className="px-6 mb-3 flex-row items-center gap-2">
              <View className="w-2 h-2 rounded-full bg-live" />
              <Text className="text-xl font-bold text-foreground">Live Now</Text>
            </View>
            <View className="px-6">
              <MatchGrid matches={liveMatches} isDesktop={isDesktop} />
            </View>
          </View>
        )}

        {/* Recent Matches */}
        {recentMatches.length > 0 && (
          <View className="mb-6">
            <View className="px-6 mb-3">
              <Text className="text-xl font-bold text-foreground">Recent</Text>
            </View>
            <View className="px-6">
              <MatchGrid matches={recentMatches} isDesktop={isDesktop} />
            </View>
          </View>
        )}

        {/* No matches */}
        {filteredMatches.length === 0 && (
          <View className="px-6 py-12 items-center">
            <Text className="text-lg text-muted text-center">
              No matches found for {selectedLeague || "this filter"}
            </Text>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}
