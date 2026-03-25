import { ScrollView, Text, View, TouchableOpacity, Switch, Platform } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";

export default function MoreScreen() {
  const router = useRouter();
  const colors = useColors();
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(60);

  const menuSections = [
    {
      title: "Features",
      items: [
        {
          icon: "star.fill",
          label: "Favorites",
          subtitle: "Your favorite teams",
          onPress: () => router.push("/favorites"),
        },
        {
          icon: "chart.bar.fill",
          label: "Betting Hub",
          subtitle: "Track your bets",
          onPress: () => {},
        },
        {
          icon: "magnifyingglass",
          label: "Search Teams",
          subtitle: "Find any team",
          onPress: () => router.push("/search"),
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          icon: "gear",
          label: "Auto-Refresh",
          subtitle: autoRefresh ? "Enabled" : "Disabled",
          toggle: true,
          value: autoRefresh,
          onToggle: setAutoRefresh,
        },
        {
          icon: "gear",
          label: "Notifications",
          subtitle: notifications ? "Enabled" : "Disabled",
          toggle: true,
          value: notifications,
          onToggle: setNotifications,
        },
      ],
    },
  ];

  return (
    <ScreenContainer className="bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-3xl font-bold text-foreground">More</Text>
          <Text className="text-base text-muted mt-1">
            Settings and preferences
          </Text>
        </View>

        {/* User Stats */}
        <View className="px-6 mb-6">
          <View className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6">
            <Text className="text-white text-lg font-bold mb-2">Your Stats</Text>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-white/80 text-xs">Win Rate</Text>
                <Text className="text-white text-2xl font-bold">87%</Text>
              </View>
              <View>
                <Text className="text-white/80 text-xs">Total Bets</Text>
                <Text className="text-white text-2xl font-bold">156</Text>
              </View>
              <View>
                <Text className="text-white/80 text-xs">Active</Text>
                <Text className="text-white text-2xl font-bold">12</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} className="mb-6">
            <View className="px-6 mb-3">
              <Text className="text-sm font-bold text-muted">{section.title}</Text>
            </View>
            <View className="px-6 gap-2">
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  onPress={'onPress' in item ? item.onPress : undefined}
                  disabled={'toggle' in item && item.toggle}
                  className={cn(
                    "bg-surface rounded-2xl p-4 border border-border flex-row items-center justify-between",
                    !('toggle' in item && item.toggle) && "active:opacity-70"
                  )}
                >
                  <View className="flex-row items-center gap-3 flex-1">
                    <View className="w-10 h-10 rounded-full bg-primary/10 items-center justify-center">
                      <IconSymbol name={item.icon as any} size={20} color={colors.primary} />
                    </View>
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-foreground">{item.label}</Text>
                      <Text className="text-xs text-muted mt-0.5">{item.subtitle}</Text>
                    </View>
                  </View>
                  {'toggle' in item && item.toggle && 'value' in item && 'onToggle' in item ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: colors.border, true: colors.primary }}
                      thumbColor={Platform.OS === "android" ? colors.surface : undefined}
                    />
                  ) : (
                    <IconSymbol name="chevron.right" size={20} color={colors.muted} />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Refresh Interval */}
        {autoRefresh && (
          <View className="px-6 mb-6">
            <View className="mb-3">
              <Text className="text-sm font-bold text-muted">Refresh Interval</Text>
            </View>
            <View className="flex-row gap-2">
              {[30, 60, 120].map((interval) => (
                <TouchableOpacity
                  key={interval}
                  onPress={() => setRefreshInterval(interval)}
                  className={cn(
                    "flex-1 py-3 rounded-xl border",
                    refreshInterval === interval
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  )}
                >
                  <Text
                    className={cn(
                      "text-center font-semibold",
                      refreshInterval === interval ? "text-white" : "text-foreground"
                    )}
                  >
                    {interval}s
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* API Status */}
        <View className="px-6 mb-6">
          <View className="bg-surface rounded-2xl p-4 border border-border">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-sm font-semibold text-foreground">API Status</Text>
                <Text className="text-xs text-muted mt-0.5">Connection status</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <View className="w-2 h-2 rounded-full bg-success" />
                <Text className="text-xs font-semibold text-success">Connected</Text>
              </View>
            </View>
          </View>
        </View>

        {/* About */}
        <View className="px-6">
          <View className="bg-surface rounded-2xl p-4 border border-border">
            <Text className="text-sm font-semibold text-foreground mb-2">About MatchBet Play</Text>
            <Text className="text-xs text-muted leading-relaxed">
              Version 1.0.0 • AI-powered football match analysis and betting companion. 
              Get real-time data, intelligent predictions, and betting recommendations.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
