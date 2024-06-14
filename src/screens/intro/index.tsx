import { Swiper, Text } from "@src/components";
import { theme } from "@src/theme";
import { PublicScreenProps } from "@src/types";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Page from "./page";

const { width } = Dimensions.get("window");

const pages = [
  {
    title: "Dream It, Be It",
    subTitle: "Welcome to Manifest",
    description: `Dream big with Manifest!\nWhip up your own whimsical images to spark your next big adventure.`,
    image: require("@assets/images/general/intro-1.png"),
  },
  {
    title: "See It, Believe It",
    subTitle: "Craft Your Image",
    description:
      "Upload a photo, choose your dream scenario, and let Manifest paint your future.",
    image: require("@assets/images/general/intro-2.png"),
    extraImage: require("@assets/images/general/toast.png"),
  },
  {
    title: "Map It, Track It",
    subTitle: "Your Vision Board Awaits",
    description: "Create vision boards with images that mirror your ambitions.",
    image: require("@assets/images/general/intro-3.png"),
  },
];

const OnboardingScreen = ({
  navigation: { navigate },
}: PublicScreenProps<"Intro">) => {
  const isWeb = Platform.OS === "web";
  const currentPage = useSharedValue(0);

  const skipStyle = useAnimatedStyle(() => {
    return {
      opacity:
        currentPage.value < pages.length - 1 ? withTiming(1) : withTiming(0),
    };
  });
  const continueStyle = useAnimatedStyle(() => {
      return {
          opacity: currentPage.value === pages.length -1 ? withTiming(1) : withTiming(0),
      };
  });

  return (
    <ImageBackground
      source={require("@assets/images/general/auth-cover-mobile.png")}
      style={styles.container}
    >
      <View style={[styles.header, isWeb && styles.webHeader]}>
        <View style={styles.logoContainer}>
          <Image
            source={require("@assets/images/manifest-icon.png")}
            style={styles.logoIcon}
          />
          <Image
            source={require("@assets/images/manifest.png")}
            style={styles.logoText}
          />
        </View>
        <TouchableOpacity style={{position: 'relative'}} onPress={() => navigate("Auth")}>
          <Animated.Text style={[styles.skip, skipStyle]}><Text>Skip</Text></Animated.Text>
          <Animated.Text style={[styles.skip, continueStyle]}><Text>Continue</Text></Animated.Text>
        </TouchableOpacity>
      </View>
      <Swiper currentPage={currentPage}>
        {pages.map((props, index) => (
          <Page key={index} {...props} />
        ))}
      </Swiper>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    flex: 1,
    backgroundColor: "#FFF6F4",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  webHeader: {
    paddingHorizontal: 100,
  },
  skip: {
    color: theme.colors.link,
    position: "absolute",
    right: 0,
    top: -10 ,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logoIcon: {
    width: 34,
    height: 23,
  },
  logoText: {
    width: 80,
    height: 16,
  },
});

export default OnboardingScreen;
