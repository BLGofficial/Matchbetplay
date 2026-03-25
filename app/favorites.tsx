import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Favorites, type FavoriteTeam } from "@/lib/favorites";
import { useColors } from "@/hooks/use-colors";

export default function FavoritesScreen() {
  const router = useRouter();
  const colors = useColors();
  const [favorites, setFavorites] = useState<FavoriteTeam[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    setLoading(true);
    const data = await Favorites.getAll();
    setFavorites(data);
    setLoading(false);
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const handleRemove = async (team: FavoriteTeam) => {
    Alert.alert(
      "Remove Favorite",
      `Remove ${team.name} from favorites?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            await Favorites.remove(team.id);
            await loadFavorites();
          },
        },
      ]
    );
  };

  const getTeamInitials = (name: string) => {
    const words = name.split(" ");
    if (words.length === 1) return name.substring(0, 2).toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  return (
    <ScreenContainer className="bg-background">
      <View className="flex-1">
        {/* Header */}
        <View className="px-6 pt-6 pb-4 flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-3xl font-bold text-foreground">Favorites</Text>
            <Text className="text-base text-muted mt-1">
              {favorites.length} {favorites.length === 1 ? "team" : "teams"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-surface border border-border items-center justify-center active:opacity-70"
          >
            <IconSymbol name="chevron.right" size={20} color={colors.foreground} style={{ transform: [{ rotate: "180deg" }] }} />
          </TouchableOpacity>
        </View>

        {/* Favorites List */}
        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 20 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  // Navigate to team profile
                }}
                className="bg-surface rounded-2xl p-4 border border-border mb-3 active:opacity-70"
              >
                <View className="flex-row items-center gap-3">
                  {/* Team Logo Placeholder */}
                  <View className="w-12 h-12 rounded-full bg-primary/10 items-center justify-center">
                    <Text className="text-base font-bold text-primary">
                      {getTeamInitials(item.name)}
                    </Text>
                  </View>

                  {/* Team Info */}
                  <View className="flex-1">
                    <Text className="text-base font-semibold text-foreground" numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text className="text-xs text-muted mt-0.5">
                      {item.country} • {item.league}
                    </Text>
                  </View>

                  {/* Remove Button */}
                  <TouchableOpacity
                    onPress={() => handleRemove(item)}
                    className="w-10 h-10 rounded-full bg-error/10 items-center justify-center active:opacity-70"
                  >
                    <IconSymbol name="star.fill" size={20} color={colors.error} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View className="flex-1 items-center justify-center px-6">
            <View className="w-20 h-20 rounded-full bg-surface items-center justify-center mb-4">
              <IconSymbol name="star.fill" size={40} color={colors.muted} />
            </View>
            <Text className="text-xl font-bold text-foreground mb-2">No Favorites Yet</Text>
            <Text className="text-base text-muted text-center mb-6">
              Add your favorite teams to track their matches and get personalized updates
            </Text>
            <TouchableOpacity
              onPress={() => router.back()}
              className="bg-primary rounded-full px-6 py-3 active:opacity-80"
            >
              <Text className="text-base font-bold text-white">Browse Teams</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}
