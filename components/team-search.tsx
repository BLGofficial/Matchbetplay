import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { FootballAPI, type Team } from "@/lib/football-api";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";

export interface TeamSearchProps {
  onTeamSelect?: (team: Team) => void;
}

export function TeamSearch({ onTeamSelect }: TeamSearchProps) {
  const colors = useColors();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search query (500ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Perform search when debounced query changes
  useEffect(() => {
    const searchTeams = async () => {
      if (debouncedQuery.trim().length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const teams = await FootballAPI.searchTeams(debouncedQuery);
        setResults(teams);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    };

    searchTeams();
  }, [debouncedQuery]);

  const getTeamInitials = (name: string) => {
    const words = name.split(" ");
    if (words.length === 1) return name.substring(0, 2).toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  const getFormColor = (form: string[]) => {
    const wins = form.filter(r => r === "W").length;
    if (wins >= 4) return "text-success";
    if (wins >= 2) return "text-warning";
    return "text-error";
  };

  return (
    <View className="flex-1">
      {/* Search Input */}
      <View className="px-6 mb-4">
        <View className="flex-row items-center bg-surface rounded-2xl px-4 py-3 border border-border">
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search teams..."
            placeholderTextColor={colors.muted}
            className="flex-1 text-base text-foreground"
            returnKeyType="search"
          />
          {loading && <ActivityIndicator size="small" />}
        </View>
        {query.length > 0 && query.length < 2 && (
          <Text className="text-xs text-muted mt-2 px-2">
            Type at least 2 characters to search
          </Text>
        )}
      </View>

      {/* Search Results */}
      {results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => onTeamSelect?.(item)}
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

                {/* Form Indicator */}
                <View className="flex-row gap-1">
                  {item.form.slice(-5).map((result, index) => (
                    <View
                      key={index}
                      className={cn(
                        "w-6 h-6 rounded items-center justify-center",
                        result === "W" ? "bg-success/20" : result === "D" ? "bg-warning/20" : "bg-error/20"
                      )}
                    >
                      <Text
                        className={cn(
                          "text-xs font-bold",
                          result === "W" ? "text-success" : result === "D" ? "text-warning" : "text-error"
                        )}
                      >
                        {result}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : debouncedQuery.length >= 2 && !loading ? (
        <View className="px-6 py-12 items-center">
          <Text className="text-lg text-muted text-center">
            No teams found for "{debouncedQuery}"
          </Text>
        </View>
      ) : null}
    </View>
  );
}
