import { GradientText, Swiper, Text } from "@src/components";
import { theme } from "@src/theme";
import { PublicScreenProps } from "@src/types";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Image, ImageBackground, ImageSourcePropType, StyleSheet, View, TouchableOpacity, Platform } from "react-native";

const { width } = Dimensions.get('window');


interface PageProps {
    title: string;
    subTitle: string;
    description: string;
    image: ImageSourcePropType;
    extraImage?: ImageSourcePropType;
}

const Page: React.FC<PageProps> = ({ title, subTitle, extraImage, description, image }) => {
    return (
        <View style={styles.page}>
            <LinearGradient
                colors={["#fff6f436", "#fff6f436", "#FFF6F4"]}
                locations={[0, 0.3, 0.6]}
                style={styles.gradient}
            />
            <Image source={image} style={styles.image} />
            {extraImage && <Image source={extraImage} style={styles.extraImage} />}
            <View style={styles.content}>
                <Text type="title2" style={styles.title}>{title}</Text>
                <GradientText type="subTitle2" style={styles.subtitle}>{subTitle}</GradientText>
                <Text style={styles.description}>{description}</Text>
            </View>
        </View>
    );
};

const OnboardingScreen = ({ navigation: { navigate } }: PublicScreenProps<"Intro">) => {
    const items = [
        {
            title: "Dream It, Be It",
            subTitle: "Welcome to Manifest",
            description: `Dream big with Manifest!\nWhip up your own whimsical images to spark your next big adventure.`,
            image: require("@assets/images/general/intro-1.png")
        },
        {
            title: "See It, Believe It",
            subTitle: "Craft Your Image",
            description: "Upload a photo, choose your dream scenario, and let Manifest paint your future.",
            image: require("@assets/images/general/intro-2.png"),
            extraImage: require("@assets/images/general/toast.png")
        },
        {
            title: "Map It, Track It",
            subTitle: "Your Vision Board Awaits",
            description: "Create vision boards with images that mirror your ambitions.",
            image: require("@assets/images/general/intro-3.png")
        }
    ]

    const isWeb = Platform.OS === "web";
    return (
        <ImageBackground
            source={require("@assets/images/general/auth-cover-mobile.png")}
            style={styles.container}
        >
            <View style={[styles.header, isWeb && styles.webHeader]}>
                <View style={styles.logoContainer}>
                    <Image source={require("@assets/images/manifest-icon.png")} style={styles.logoIcon} />
                    <Image source={require("@assets/images/manifest.png")} style={styles.logoText} />
                </View>
                <TouchableOpacity onPress={() => navigate("Auth")}>
                    <Text style={styles.skip}>Skip</Text>
                </TouchableOpacity>
            </View>
            <Swiper>
                {items.map((props, index) => (
                    <Page key={index} {...props} />
                ))}
            </Swiper>
        </ImageBackground>
    )

}

const styles = StyleSheet.create({
    container: {
        width,
        flex: 1,
        backgroundColor: "#FFF6F4"
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 56,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    webHeader: {
        paddingHorizontal: 100
    },
    skip: {
        color: theme.colors.link
    },
    page: {
        position: "relative",
        paddingBottom: 130,
        flex: 1,
        width,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    subtitle: {
        color: theme.colors.primary,
        textAlign: "center"
    },
    description: {
        textAlign: "center"
    },
    title: {
        textAlign: "center"
    },
    content: {
        gap: 16,
        padding: 16,
        maxWidth: 480,
        position: "relative",
        zIndex: 3
    },
    image: {
        position: "absolute",
        width,
        top: 50,
        height: "100%",
        resizeMode: "contain",
        zIndex: 1
    },
    extraImage: {
        width: 250,
        height: 150,
        zIndex: 3,
        resizeMode:"contain"
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    logoIcon: {
        width: 34,
        height: 23
    },
    logoText: {
        width: 80,
        height: 16
    },
    gradient: {
        width,
        position: "absolute",
        top: 0,
        bottom: 0,
        zIndex: 2,
    }
})

export default OnboardingScreen;
