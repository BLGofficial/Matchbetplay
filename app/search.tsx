import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { TeamSearch } from "@/components/team-search";
import { Favorites } from "@/lib/favorites";
import { useColors } from "@/hooks/use-colors";
import { type Team } from "@/lib/football-api";

export default function SearchScreen() {
  const router = useRouter();
  const colors = useColors();

  const handleTeamSelect = async (team: Team) => {
    Alert.alert(
      team.name,
      `${team.country} • ${team.league}`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Add to Favorites",
          onPress: async () => {
            const success = await Favorites.add(team);
            if (success) {
              Alert.alert("Success", `${team.name} added to favorites`);
            } else {
              Alert.alert("Info", `${team.name} is already in favorites`);
            }
          },
        },
        {
          text: "View Profile",
          onPress: () => {
            // Navigate to team profile
          },
        },
      ]
    );
  };

  return (
    <ScreenContainer className="bg-background">
      <View className="flex-1">
        {/* Header */}
        <View className="px-6 pt-6 pb-4 flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-3xl font-bold text-foreground">Search Teams</Text>
            <Text className="text-base text-muted mt-1">
              Find any football team
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-surface border border-border items-center justify-center active:opacity-70"
          >
            <IconSymbol name="chevron.right" size={20} color={colors.foreground} style={{ transform: [{ rotate: "180deg" }] }} />
          </TouchableOpacity>
        </View>

        {/* Team Search */}
        <TeamSearch onTeamSelect={handleTeamSelect} />
      </View>
    </ScreenContainer>
  );
}
