import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Platform, View, useWindowDimensions } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { WebSidebar } from "@/components/web-sidebar";
import { useColors } from "@/hooks/use-colors";

/** Desktop breakpoint for web sidebar layout. */
const DESKTOP_BREAKPOINT = 768;

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const isDesktopWeb = Platform.OS === "web" && width >= DESKTOP_BREAKPOINT;
  const bottomPadding = Platform.OS === "web" ? 12 : Math.max(insets.bottom, 8);
  const tabBarHeight = 56 + bottomPadding;

  const tabScreens = (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: isDesktopWeb
          ? { display: "none" }
          : {
              paddingTop: 8,
              paddingBottom: bottomPadding,
              height: tabBarHeight,
              backgroundColor: colors.background,
              borderTopColor: colors.border,
              borderTopWidth: 0.5,
            },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="live"
        options={{
          title: "Live",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="play.circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="predictions"
        options={{
          title: "Predictions",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chart.bar.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="leagues"
        options={{
          title: "Leagues",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="trophy.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="ellipsis.circle.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );

  // Desktop web: sidebar + content side-by-side, capped at 1280 px and centered
  if (isDesktopWeb) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, alignItems: "center" }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            width: "100%",
            maxWidth: 1280,
          }}
        >
          <WebSidebar />
          <View style={{ flex: 1 }}>{tabScreens}</View>
        </View>
      </View>
    );
  }

  return tabScreens;
}
