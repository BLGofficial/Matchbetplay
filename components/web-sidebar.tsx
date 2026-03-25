import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: "house.fill" },
  { href: "/live", label: "Live", icon: "play.circle.fill" },
  { href: "/predictions", label: "Predictions", icon: "chart.bar.fill" },
  { href: "/leagues", label: "Leagues", icon: "trophy.fill" },
  { href: "/more", label: "More", icon: "ellipsis.circle.fill" },
] as const;

/**
 * Persistent sidebar navigation rendered only on desktop web (≥768 px).
 * Replaces the bottom tab bar with a left-hand navigation panel.
 */
export function WebSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const colors = useColors();

  return (
    <View
      style={{
        width: 220,
        backgroundColor: colors.background,
        borderRightWidth: 0.5,
        borderRightColor: colors.border,
        paddingTop: 4,
        paddingBottom: 16,
      }}
    >
      {/* Brand */}
      <View style={{ paddingHorizontal: 20, paddingTop: 28, paddingBottom: 20 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "800",
            color: colors.primary,
            letterSpacing: -0.5,
          }}
        >
          MatchBet
        </Text>
        <Text style={{ fontSize: 11, color: colors.muted, marginTop: 2, fontWeight: "500" }}>
          Play · AI Football Analysis
        </Text>
      </View>

      {/* Divider */}
      <View
        style={{
          height: 0.5,
          backgroundColor: colors.border,
          marginHorizontal: 14,
          marginBottom: 8,
        }}
      />

      {/* Nav Items */}
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/" || pathname === ""
            : pathname.startsWith(item.href);

        return (
          <TouchableOpacity
            key={item.href}
            onPress={() => router.push(item.href as any)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              marginHorizontal: 10,
              marginVertical: 2,
              paddingHorizontal: 14,
              paddingVertical: 11,
              borderRadius: 10,
              backgroundColor: isActive ? `${colors.primary}1A` : "transparent",
            }}
          >
            <IconSymbol
              size={20}
              name={item.icon as any}
              color={isActive ? colors.primary : colors.muted}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: isActive ? "600" : "400",
                color: isActive ? colors.primary : colors.foreground,
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
