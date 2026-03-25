import { View, Text, TouchableOpacity, type ViewStyle } from "react-native";
import { cn } from "@/lib/utils";

export interface PredictionCardProps {
  homeTeam: string;
  awayTeam: string;
  prediction: "Home" | "Draw" | "Away";
  confidence: number;
  matchDate: string;
  league: string;
  onPress?: () => void;
  className?: string;
  style?: ViewStyle;
}

export function PredictionCard({
  homeTeam,
  awayTeam,
  prediction,
  confidence,
  matchDate,
  league,
  onPress,
  className,
  style,
}: PredictionCardProps) {
  const getConfidenceColor = (conf: number) => {
    if (conf >= 80) return "text-success";
    if (conf >= 60) return "text-warning";
    return "text-error";
  };

  const getConfidenceBg = (conf: number) => {
    if (conf >= 80) return "bg-success/10";
    if (conf >= 60) return "bg-warning/10";
    return "bg-error/10";
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
      className={cn(
        "bg-surface rounded-2xl p-4 border border-border",
        "active:opacity-70",
        className
      )}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-xs text-muted font-medium">{league}</Text>
        <Text className="text-xs text-muted">{matchDate}</Text>
      </View>

      {/* Teams */}
      <View className="mb-3">
        <Text className="text-base font-semibold text-foreground" numberOfLines={1}>
          {homeTeam}
        </Text>
        <Text className="text-sm text-muted my-1">vs</Text>
        <Text className="text-base font-semibold text-foreground" numberOfLines={1}>
          {awayTeam}
        </Text>
      </View>

      {/* Prediction */}
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-xs text-muted mb-1">AI Prediction</Text>
          <Text className="text-lg font-bold text-primary">{prediction} Win</Text>
        </View>

        {/* Confidence Badge */}
        <View className={cn("px-4 py-2 rounded-full", getConfidenceBg(confidence))}>
          <Text className={cn("text-sm font-bold", getConfidenceColor(confidence))}>
            {confidence}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
