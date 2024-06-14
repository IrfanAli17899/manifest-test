import { GradientText } from "@src/components";
import Text from "@src/components/text";
import { theme } from "@src/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Image, ImageSourcePropType, StyleSheet, View } from "react-native";

const { width } = Dimensions.get('window');

export interface PageProps {
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

export default Page;

const styles = StyleSheet.create({
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
    gradient: {
        width,
        position: "absolute",
        top: 0,
        bottom: 0,
        zIndex: 2,
    }
})