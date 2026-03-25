import { ScrollView, Text, View, TouchableOpacity, RefreshControl, Platform, useWindowDimensions } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import { ScreenContainer } from "@/components/screen-container";
import { MatchCard } from "@/components/match-card";
import { PredictionCard } from "@/components/prediction-card";

const DESKTOP_BREAKPOINT = 768;

/** Renders items in a 2-column grid on desktop, single column on mobile. */
function CardGrid<T extends { id: number }>({
  items,
  renderItem,
  isDesktop,
}: {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  isDesktop: boolean;
}) {
  if (!isDesktop) {
    return (
      <View style={{ gap: 12 }}>
        {items.map((item) => (
          <View key={item.id}>{renderItem(item)}</View>
        ))}
      </View>
    );
  }

  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }

  return (
    <View style={{ gap: 12 }}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: "row", gap: 12 }}>
          {row.map((item) => (
            <View key={item.id} style={{ flex: 1 }}>
              {renderItem(item)}
            </View>
          ))}
          {row.length === 1 && <View style={{ flex: 1 }} />}
        </View>
      ))}
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === "web" && width >= DESKTOP_BREAKPOINT;

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const featuredMatches = [
    {
      id: 1,
      homeTeam: "Liverpool",
      awayTeam: "Manchester City",
      homeScore: 2,
      awayScore: 1,
      status: "78'",
      league: "Premier League",
      isLive: true,
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
    },
  ];

  const topPredictions = [
    {
      id: 1,
      homeTeam: "Bayern Munich",
      awayTeam: "Borussia Dortmund",
      prediction: "Home" as const,
      confidence: 87,
      matchDate: "Today, 20:00",
      league: "Bundesliga",
    },
    {
      id: 2,
      homeTeam: "Arsenal",
      awayTeam: "Chelsea",
      prediction: "Home" as const,
      confidence: 75,
      matchDate: "Tomorrow, 17:30",
      league: "Premier League",
    },
  ];

  return (
    <ScreenContainer className="bg-background">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-3xl font-bold text-foreground">MatchBet Play</Text>
          <Text className="text-base text-muted mt-1">AI-Powered Football Analysis</Text>
        </View>

        {/* Quick Stats */}
        <View className="px-6 mb-6">
          <View className="flex-row gap-3">
            <View className="flex-1 bg-surface rounded-2xl p-4 border border-border">
              <Text className="text-2xl font-bold text-success">87%</Text>
              <Text className="text-xs text-muted mt-1">Win Rate</Text>
            </View>
            <View className="flex-1 bg-surface rounded-2xl p-4 border border-border">
              <Text className="text-2xl font-bold text-primary">156</Text>
              <Text className="text-xs text-muted mt-1">Predictions</Text>
            </View>
            <View className="flex-1 bg-surface rounded-2xl p-4 border border-border">
              <Text className="text-2xl font-bold text-accent">12</Text>
              <Text className="text-xs text-muted mt-1">Live Now</Text>
            </View>
          </View>
        </View>

        {/* Featured Live Matches */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between px-6 mb-3">
            <Text className="text-xl font-bold text-foreground">Live Matches</Text>
            <TouchableOpacity onPress={() => router.push("/live")}>
              <Text className="text-sm font-semibold text-primary">View All</Text>
            </TouchableOpacity>
          </View>
          <View className="px-6">
            <CardGrid
              items={featuredMatches}
              isDesktop={isDesktop}
              renderItem={(match) => (
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
              )}
            />
          </View>
        </View>

        {/* AI Predictions */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between px-6 mb-3">
            <Text className="text-xl font-bold text-foreground">Top Predictions</Text>
            <TouchableOpacity onPress={() => router.push("/predictions")}>
              <Text className="text-sm font-semibold text-primary">View All</Text>
            </TouchableOpacity>
          </View>
          <View className="px-6">
            <CardGrid
              items={topPredictions}
              isDesktop={isDesktop}
              renderItem={(prediction) => (
                <PredictionCard
                  homeTeam={prediction.homeTeam}
                  awayTeam={prediction.awayTeam}
                  prediction={prediction.prediction}
                  confidence={prediction.confidence}
                  matchDate={prediction.matchDate}
                  league={prediction.league}
                  onPress={() => {}}
                />
              )}
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-6 gap-3" style={isDesktop ? { flexDirection: "row" } : undefined}>
          <TouchableOpacity
            className="bg-primary rounded-2xl p-4 items-center active:opacity-80"
            style={isDesktop ? { flex: 1 } : undefined}
            onPress={() => router.push("/predictions")}
          >
            <Text className="text-base font-bold text-white">Browse All Predictions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-surface rounded-2xl p-4 items-center border border-border active:opacity-70"
            style={isDesktop ? { flex: 1 } : undefined}
            onPress={() => router.push("/leagues")}
          >
            <Text className="text-base font-bold text-foreground">View League Standings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
