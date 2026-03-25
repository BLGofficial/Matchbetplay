import { View, Text, TouchableOpacity, type ViewStyle } from "react-native";
import { cn } from "@/lib/utils";

export interface MatchCardProps {
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: string;
  league: string;
  isLive?: boolean;
  onPress?: () => void;
  className?: string;
  style?: ViewStyle;
}

export function MatchCard({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  status,
  league,
  isLive = false,
  onPress,
  className,
  style,
}: MatchCardProps) {
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
      {/* League Badge */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-xs text-muted font-medium">{league}</Text>
        {isLive && (
          <View className="flex-row items-center gap-1.5">
            <View className="w-2 h-2 rounded-full bg-live" />
            <Text className="text-xs text-live font-bold">{status}</Text>
          </View>
        )}
        {!isLive && (
          <Text className="text-xs text-muted font-medium">{status}</Text>
        )}
      </View>

      {/* Match Score */}
      <View className="flex-row items-center justify-between">
        {/* Home Team */}
        <View className="flex-1">
          <Text className="text-base font-semibold text-foreground" numberOfLines={1}>
            {homeTeam}
          </Text>
        </View>

        {/* Score */}
        <View className="flex-row items-center gap-3 mx-4">
          <Text className="text-2xl font-bold text-foreground">
            {homeScore ?? "-"}
          </Text>
          <Text className="text-xl font-medium text-muted">:</Text>
          <Text className="text-2xl font-bold text-foreground">
            {awayScore ?? "-"}
          </Text>
        </View>

        {/* Away Team */}
        <View className="flex-1 items-end">
          <Text className="text-base font-semibold text-foreground" numberOfLines={1}>
            {awayTeam}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
