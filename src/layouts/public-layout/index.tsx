import { Dimensions, Image, ImageBackground, Platform, Pressable, StyleSheet, View } from 'react-native'
import React, { ReactNode } from 'react'
import { theme } from '@src/theme';
import { useNavigation } from '@react-navigation/native';
import Text from '@src/components/text';
import { IconButton } from '@src/components';

type PublicLayoutProps = {
    children: ReactNode;
    title: string;
    description: string;
    hideBackButton?: boolean
}

const { width } = Dimensions.get("screen")

const PublicLayout = (props: PublicLayoutProps) => {
    const { children, description, title, hideBackButton } = props
    const { goBack } = useNavigation()
    const isWebPlatform = Platform.OS === "web";

    return (
        <ImageBackground
            source={require("@assets/images/general/auth-cover-mobile.png")}
            style={[styles.container, isWebPlatform && styles.webContainer]}
        >
            {isWebPlatform && (
                <>
                    <View style={styles.logoContainer}>
                        <Image source={require("@assets/images/manifest-icon.png")} style={styles.logoIcon} />
                        <Image source={require("@assets/images/manifest.png")} style={styles.logoText} />
                    </View>
                    {!hideBackButton && (
                        <IconButton
                            onPress={() => goBack()}
                            iconStyle={styles.backIcon}
                            icon={require("@assets/images/icons/arrow-left-icon.png")}
                        />
                    )}
                </>
            )}
            <View style={[styles.contentContainer, isWebPlatform && styles.webContentContainer]}>
                <View style={[styles.innerContainer, isWebPlatform && styles.webInnerContainer]}>
                    {(!isWebPlatform && !hideBackButton) && (
                        <Pressable onPress={() => goBack()}>
                            <View style={styles.backIconContainer}>
                                <Image source={require("@assets/images/icons/arrow-left-icon.png")} style={styles.backIcon} />
                                <Text style={styles.backText}>Back</Text>
                            </View>
                        </Pressable>
                    )}
                    <View style={styles.hero}>
                        {!isWebPlatform && (
                            <View style={styles.logoContainer}>
                                <Image source={require("@assets/images/manifest-icon.png")} style={styles.logoIcon} />
                                <Image source={require("@assets/images/manifest.png")} style={styles.logoText} />
                            </View>
                        )}
                        <Text type='title1' style={isWebPlatform && styles.title}>{title}</Text>
                        <Text style={isWebPlatform && styles.description}>{description}</Text>
                    </View>
                    <View style={styles.content}>
                        {children}
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default PublicLayout

const styles = StyleSheet.create({
    container: {
        width,
        paddingHorizontal: 16,
        paddingVertical: 56,
        flex: 1,
    },
    webContainer: {
        paddingVertical: 24,
        paddingHorizontal: 100,
    },
    contentContainer: {
        alignItems: "stretch",
        flex: 1
    },
    webContentContainer: {
        alignItems: "center"
    },
    innerContainer: {
        flex: 1,
        maxWidth: "100%"
    },
    webInnerContainer: {
        maxWidth: 420
    },
    backIconContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    backIcon: {
        height: 9,
        width: 12
    },
    backIconWeb: {
        width: 18,
        height: 13
    },
    backText: {
        marginLeft: 4
    },
    hero: {
        marginVertical: 24
    },
    logoContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 24
    },
    logoIcon: {
        width: 34,
        height: 23
    },
    logoText: {
        width: 80,
        height: 16
    },
    title: {
        textAlign: "center"
    },
    description: {
        textAlign: "center"
    },
    content: {
        flex: 1
    }
})