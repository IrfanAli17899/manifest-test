import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  GestureResponderEvent,
  Platform,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import Text from "../text"; // Update the path to your Text component
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "@src/theme";

interface ButtonProps {
  children?: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: "primary" | "outline";
  style?: StyleProp<ViewStyle>;
  icon?: any; // Update the type according to your icon type,
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const {
    onPress,
    children,
    variant = "primary",
    icon,
    style,
    loading
  } = props;

  const isMobile = Platform.OS !== "web";
  const isPrimary = variant === "primary";

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={theme.colors["manifest-gradient"]}
        locations={[0, 34, 100]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient_container}
      >
        <View
          style={[
            styles.container,
            !isPrimary && styles.outlineContainer,
            { height: isMobile ? 48 : 56, justifyContent: isPrimary ? "center" : "space-between", },
            style
          ]}
        >
          {icon && <Image source={icon} style={styles.icon} />}
          {loading ? (
            <ActivityIndicator color={isPrimary ? theme.colors.white : theme.colors.body} size={25} />
          ) : (<Text type="cta" style={{ color: isPrimary ? theme.colors.white : theme.colors.body }}>{children}</Text>)}
          {icon && <View />}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradient_container: {
    borderRadius: 50,
    padding: 1,
  },
  container: {
    borderRadius: 50,
    paddingHorizontal: 17,
    flexDirection: "row",
    alignItems: "center",
  },
  outlineContainer: {
    backgroundColor: "#FFF6F4",
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default Button;
