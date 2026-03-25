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
import { PredictionCard } from "@/components/prediction-card";
import { FootballAPI, type Prediction } from "@/lib/football-api";
import { cn } from "@/lib/utils";

const DESKTOP_BREAKPOINT = 768;

/** Renders predictions in a 2-column grid on desktop. */
function PredictionGrid({
  predictions,
  isDesktop,
}: {
  predictions: Prediction[];
  isDesktop: boolean;
}) {
  if (!isDesktop || predictions.length === 0) {
    return (
      <View style={{ gap: 12 }}>
        {predictions.map((p) => (
          <PredictionCard
            key={p.id}
            homeTeam={p.homeTeam}
            awayTeam={p.awayTeam}
            prediction={p.prediction}
            confidence={p.confidence}
            matchDate={p.matchDate}
            league={p.league}
            onPress={() => {}}
          />
        ))}
      </View>
    );
  }

  const rows: Prediction[][] = [];
  for (let i = 0; i < predictions.length; i += 2) {
    rows.push(predictions.slice(i, i + 2));
  }

  return (
    <View style={{ gap: 12 }}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={{ flexDirection: "row", gap: 12 }}>
          {row.map((p) => (
            <View key={p.id} style={{ flex: 1 }}>
              <PredictionCard
                homeTeam={p.homeTeam}
                awayTeam={p.awayTeam}
                prediction={p.prediction}
                confidence={p.confidence}
                matchDate={p.matchDate}
                league={p.league}
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

export default function PredictionsScreen() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [confidenceFilter, setConfidenceFilter] = useState<"all" | "high" | "medium">("all");

  const { width } = useWindowDimensions();
  const isDesktop = Platform.OS === "web" && width >= DESKTOP_BREAKPOINT;

  const loadPredictions = async () => {
    setLoading(true);
    try {
      const data = await FootballAPI.getPredictions();
      setPredictions(data);
    } catch (error) {
      console.error("Failed to load predictions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPredictions();
  }, []);

  const filteredPredictions = predictions.filter((pred) => {
    if (confidenceFilter === "high") return pred.confidence >= 80;
    if (confidenceFilter === "medium") return pred.confidence >= 60 && pred.confidence < 80;
    return true;
  });

  if (loading) {
    return (
      <ScreenContainer className="bg-background">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
          <Text className="text-muted mt-4">Loading predictions...</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-3xl font-bold text-foreground">AI Predictions</Text>
          <Text className="text-base text-muted mt-1">
            Intelligent match forecasts powered by AI
          </Text>
        </View>

        {/* Stats Cards */}
        <View className="px-6 mb-6">
          <View className="flex-row gap-3">
            <View className="flex-1 bg-surface rounded-2xl p-4 border border-border">
              <Text className="text-2xl font-bold text-success">87%</Text>
              <Text className="text-xs text-muted mt-1">Accuracy</Text>
            </View>
            <View className="flex-1 bg-surface rounded-2xl p-4 border border-border">
              <Text className="text-2xl font-bold text-primary">{predictions.length}</Text>
              <Text className="text-xs text-muted mt-1">Active</Text>
            </View>
            <View className="flex-1 bg-surface rounded-2xl p-4 border border-border">
              <Text className="text-2xl font-bold text-accent">156</Text>
              <Text className="text-xs text-muted mt-1">Total</Text>
            </View>
          </View>
        </View>

        {/* Confidence Filter */}
        <View className="mb-6">
          <View className="px-6 mb-3">
            <Text className="text-sm font-semibold text-foreground">Filter by Confidence</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, gap: 8 }}
          >
            <TouchableOpacity
              onPress={() => setConfidenceFilter("all")}
              className={cn(
                "px-4 py-2 rounded-full border",
                confidenceFilter === "all" ? "bg-primary border-primary" : "bg-surface border-border",
              )}
            >
              <Text
                className={cn(
                  "text-sm font-semibold",
                  confidenceFilter === "all" ? "text-white" : "text-foreground",
                )}
              >
                All Predictions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setConfidenceFilter("high")}
              className={cn(
                "px-4 py-2 rounded-full border",
                confidenceFilter === "high" ? "bg-success border-success" : "bg-surface border-border",
              )}
            >
              <Text
                className={cn(
                  "text-sm font-semibold",
                  confidenceFilter === "high" ? "text-white" : "text-foreground",
                )}
              >
                High (80%+)
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setConfidenceFilter("medium")}
              className={cn(
                "px-4 py-2 rounded-full border",
                confidenceFilter === "medium"
                  ? "bg-warning border-warning"
                  : "bg-surface border-border",
              )}
            >
              <Text
                className={cn(
                  "text-sm font-semibold",
                  confidenceFilter === "medium" ? "text-white" : "text-foreground",
                )}
              >
                Medium (60-79%)
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Predictions Grid */}
        <View className="px-6">
          <PredictionGrid predictions={filteredPredictions} isDesktop={isDesktop} />
        </View>

        {/* No predictions */}
        {filteredPredictions.length === 0 && (
          <View className="px-6 py-12 items-center">
            <Text className="text-lg text-muted text-center">
              No predictions found for this filter
            </Text>
          </View>
        )}

        {/* Info Card */}
        <View className="px-6 mt-6">
          <View className="bg-primary/10 rounded-2xl p-4 border border-primary/30">
            <Text className="text-sm font-bold text-primary mb-2">How AI Predictions Work</Text>
            <Text className="text-xs text-foreground leading-relaxed">
              Our AI analyses team form, head-to-head records, player statistics, home advantage,
              injuries, and historical data to generate accurate match predictions with confidence
              scores.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
