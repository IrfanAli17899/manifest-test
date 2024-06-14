import { Dimensions, ImageBackground, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get("screen")

const Splash = () => {
    return (
        <ImageBackground
            source={Platform.OS === "web" ? require(`@assets/images/splash-web.png`) : require(`@assets/images/splash-mobile.png`)}
            style={styles.container}
        >
        </ImageBackground>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        width,
        height
    }
})