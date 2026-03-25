import { View, Platform, useWindowDimensions, type ViewProps } from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";

import { cn } from "@/lib/utils";

export interface ScreenContainerProps extends ViewProps {
  /**
   * SafeArea edges to apply. Defaults to ["top", "left", "right"].
   * Bottom is typically handled by Tab Bar.
   */
  edges?: Edge[];
  /**
   * Tailwind className for the content area.
   */
  className?: string;
  /**
   * Additional className for the outer container (background layer).
   */
  containerClassName?: string;
  /**
   * Additional className for the SafeAreaView (content layer).
   */
  safeAreaClassName?: string;
}

const DESKTOP_BREAKPOINT = 768;

/**
 * A container component that properly handles SafeArea and background colors.
 *
 * On mobile: full-bleed layout with safe area insets.
 * On desktop web: content capped at 900 px and horizontally centred within
 * the available area (which is already constrained by the sidebar layout).
 */
export function ScreenContainer({
  children,
  edges = ["top", "left", "right"],
  className,
  containerClassName,
  safeAreaClassName,
  style,
  ...props
}: ScreenContainerProps) {
  const { width } = useWindowDimensions();
  const isDesktopWeb = Platform.OS === "web" && width >= DESKTOP_BREAKPOINT;

  return (
    <View
      className={cn("flex-1", "bg-background", containerClassName)}
      {...props}
    >
      <SafeAreaView
        edges={isDesktopWeb ? [] : edges}
        className={cn("flex-1", safeAreaClassName)}
        style={style}
      >
        <View
          className={cn("flex-1", className)}
          style={
            isDesktopWeb
              ? { maxWidth: 900, width: "100%", alignSelf: "center" }
              : undefined
          }
        >
          {children}
        </View>
      </SafeAreaView>
    </View>
  );
}
